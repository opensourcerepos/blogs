---
title: 'How does logback work? Understanding the source code of logback getLogger and log methods'
date: "2022-01-19"
excerpt: 'Logback is intended as a successor to the popular log4j project, picking up where log4j 1.x leaves off. In this blog, we will go through the source code of logback core module and understand its working'
versionControl: GitHub
repositoryUrl: https://github.com/qos-ch/logback/tree/master/logback-core
repoOrganization: qos-ch
repoName: logback
author: sant0shg
---

#Introduction

Logback is primarily divided into three major modules - [logback-core](https://github.com/qos-ch/logback/tree/master/logback-core), [logback-classic](https://github.com/qos-ch/logback/tree/master/logback-classic) and [logback-access](https://github.com/qos-ch/logback/tree/master/logback-access).


Excerpt from the logback website on the use of above three modules

`
The logback-core module lays the groundwork for the other two modules. The logback-classic module can be assimilated to a significantly improved version of log4j 1.x. Moreover, logback-classic natively implements the SLF4J API so that you can readily switch back and forth between logback and other logging frameworks such as log4j 1.x or java.util.logging (JUL).
`

`The logback-access module integrates with Servlet containers, such as Tomcat and Jetty, to provide HTTP-access log functionality. Note that you could easily build your own module on top of logback-core.
`

# Getting started

In this blog, we will focus on the inner workings of logback library. So we will mainly focus on [logback-core](https://github.com/qos-ch/logback/tree/master/logback-core) module.

SLF4J provides interfaces for logging, and the logback is one of such implementation. Another implementation is log4j. This helps to swap out the logback with another other implementation of SLF4J

Simple example of logging in logback is as follows

```
package com.opensourcerepos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class Bar {
    public static void main(String [] args) {
        Logger logger = LoggerFactory.getLogger(Bar.class);
        logger.debug("Hello world");
    }
}
```

Here we import two methods - `Logger` and `LoggerFactory` from SLF4J. We obtain the Logger from LoggerFactory by passing in the class name. Then in the `doIt` function, we are logging at debug level - "Hello world". This will be logged as follows

```
DEBUG com.opensourcerepos.Bar - Hello world
```

Logback architecture is divided into 3 main parts - `Appenders`, `Layouts` and `Logger`.

Logger is present in the logback-classic module, while Appenders and Layouts are present in the logback-core module.

# GetLogger method
The main source code of `getLogger` is present in `LoggerContext` class present in `logger-classic` ie ch.qos.logback.classic package.

Here is the excerpt

```
public Logger getLogger(String name) {
    if (name == null) {
        throw new IllegalArgumentException("name argument cannot be null");
    } else if ("ROOT".equalsIgnoreCase(name)) {
        return this.root;
    } else {
        int i = 0;
        Logger logger = this.root;
        Logger childLogger = (Logger)this.loggerCache.get(name);
        if (childLogger != null) {
            return childLogger;
        } else {
            int h;
            do {
                h = LoggerNameUtil.getSeparatorIndexOf(name, i);
                String childName;
                if (h == -1) {
                    childName = name;
                } else {
                    childName = name.substring(0, h);
                }

                i = h + 1;
                synchronized(logger) {
                    childLogger = logger.getChildByName(childName);
                    if (childLogger == null) {
                        childLogger = logger.createChildByName(childName);
                        this.loggerCache.put(childName, childLogger);
                        this.incSize();
                    }
                }

                logger = childLogger;
            } while(h != -1);

            return childLogger;
        }
    }
}
```

Following things we can deduce from the above code

### Singleton pattern

As shown earlier, we obtain Logger using the `LoggerFactory.getLogger` method. This method returns same Logger if the parameter name is same. For example

```
Logger A = LoggerFactory.getLogger("com.opensourcerepos.Bar");
Logger B = LoggerFactory.getLogger("com.opensourcerepos.Bar");
```
Here B will refer to A itself. This means that it is possible to obtain any specific instance of Logger if we pass the same name

It is because when we passing name to `getLogger`, we have a check for finding the logger from `loggerCache` which is an in-memory Map variable (Map<String, Logger>). If it is not null, the same object is passed back.
```
Logger childLogger = (Logger)this.loggerCache.get(name);
if (childLogger != null) {
    return childLogger;
}
```
And if the logger is not present, then it is created and put in `loggerCache`. But loggerCache does not have only the logger for this package. The loggers for each of the name splitted by DOT are present in `loggerCache`

As you can see, the creation of logger in above code is inside a loop. What happens is there are two variables `h` and `i`. `i=0` before start of loop. The exit condition for loop is `h=-1`.
When it goes inside this loop, the h is assigned `LoggerNameUtil.getSeparatorIndexOf(name, i);`. In our case `name` is "com.opensourcerepos.Bar". You can look into the implementation of `getSeparatorIndexOf`, but what is essentially does get the indexOf  DOT and DOLLAR seperator from the startIndex (here it is 0), and return the index value

So here i=0, h=3 because "com.opensourcerepos.Bar".indexOf(".",0) is 3.
So childName will be subString of name from 0 to h. So 
childName is "com"

<table border="1">
<tr>
<th>i</th><th>h</th><th>childName</th>
</tr>
<tr>
<td>0</td><td>3</td><td>com</td>
</tr>
<tr>
<td>4</td><td>19</td><td>com.opensourcerepos</td>
</tr>
<tr>
<td>20</td><td>-1</td><td>com.opensourcerepos.Bar</td>
</tr>
</table>

Note that the root logger "name as ROOT" is initially created and stored in loggerCache. 

### Hierarchy 
LoggerContext, creates loggers, and also stores all the loggers in tree like structures.
The logger with name "com.opensourcerepos" is parent of logger with name "com.opensourcerepos.Bar".

### Levels

The logger, is it is casted to ch.qos.logback.classic.Logger type, then level can be set at Logger level. Or we can directly using the Logger class from logback classic package instead of slf4j.
It means that if the Logger with level WARN tries to log at DEBUG level (using logger.DEBUG), then it wont work. 

```
package com.opensourcerepos;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;

class Bar {
    public static void main(String [] args) {
        Logger logger = (Logger) LoggerFactory.getLogger(Bar.class);
        logbackLogger.debug("Hello world");
    }
}
```
It follows this hiearchy of levels: TRACE < DEBUG < INFO <  WARN < ERROR.

<table border="1">
<tr>
<th>Logger level</th><th>logger.TRACE</th><th>logger.DEBUG</th><th>logger.INFO</th><th>logger.WARN</th><th>logger.ERROR</th>
<tr>
<tr>
<td>TRACE</td><td>Work</td><td>Work</td><td>Work</td><td>Work</td><td>Work</td>
</tr>
<tr>
<td>DEBUG</td><td>Not work</td><td>Work</td><td>Work</td><td>Work</td><td>Work</td>
</tr>
<tr>
<td>INFO</td><td>Not work</td><td>Not Work</td><td>Work</td><td>Work</td><td>Work</td>
</tr>
<tr>
<td>WARN</td><td>Not work</td><td>Not Work</td><td>Not Work</td><td>Work</td><td>Work</td>
</tr>
<tr>
<td>ERROR</td><td>Not work</td><td>Not Work</td><td>Not Work</td><td>Not Work</td><td>Work</td>
</tr>
</table>

**There is another level called "OFF", which if set, then none of the above will work.**

# SLF4J Providers & Appenders
Along with the above creating of Logger instance, another activity that is performed is attaching the appenders.
SLF4J, when creating the Logger, calls the provider initialise method which calls the child library initialise method.
**LoggerFactory.class in SLF4J**
```
static SLF4JServiceProvider getProvider() {
if (INITIALIZATION_STATE == UNINITIALIZED) {
    synchronized (LoggerFactory.class) {
        if (INITIALIZATION_STATE == UNINITIALIZED) {
            INITIALIZATION_STATE = ONGOING_INITIALIZATION;
            performInitialization(); // here performInitialization is called, which ultimately calls PROVIDER.initialize();
        }
    }
}
```        
```
private final static void bind() {
    ...
    PROVIDER.initialize();
    ...
}
```

This calls the initialize method of the LogbackServiceProvider class. This class implements the SLF4J's SLF4JServiceProvider interface.
The initialize method of the LogbackServiceProvider class is as follows
```
@Override
public void initialize() {
    ...
    initializeLoggerContext();
    ...
}

private void initializeLoggerContext() {
    ...
    new ContextInitializer(defaultLoggerContext).autoConfig();
    ...
}
```
The ContextInitializer class contains the code for autoconfiguration. The auto configuration reads the configuration from logback.xml file or logback-test.xml, else it will pick default values. By default, the "console" logging is appended.
This is important to understand for how the "debug" method (or any of the logging level) works.

# Debug method
When the `logger.debug("Hello world");` is called, it will go to debug method of Logger class. This will call the ultimately call all the appenders of logger that have been attached to it.
For now, the console appender is attached, as its the default one, and we did not specify other appender like File appender.
The Console Appender works as follows

ConsoleAppender extends OutputSteamAppender class. ConsoleAppender has the method `start` method which sets the target of output stream to the `System.out`

When the `logger.debug` is called, it will call the console appender. The `append` method of OutputSteamAppender is called.
```
@Override
protected void append(E eventObject) {
    if (!isStarted()) {
        return;
    }
    subAppend(eventObject);
}
```
The subAppend method encodes the data, 
```
protected void subAppend(E event) {
...
    byte[] byteArray = this.encoder.encode(event);
    writeBytes(byteArray);
...
}
```
The `writeBytes` method then writes to the target `System.out`. 
```
private void writeBytes(byte[] byteArray) throws IOException {
    if(byteArray == null || byteArray.length == 0)
        return;
    
    lock.lock();
    try {
        this.outputStream.write(byteArray);
        if (immediateFlush) {
            this.outputStream.flush();
        }
    } finally {
        lock.unlock();
    }
}
```

To understand how this work in simpler form, you can assume it as this way

```
// the below code is copied from ConsoleAppender class, where it is called this way - protected ConsoleTarget target = // ConsoleTarget.SystemOut;
OutputStream outputStream = new OutputStream() {
    @Override
    public void write(int b) throws IOException {
        System.out.write(b);
    }

    @Override
    public void write(byte b[]) throws IOException {
        System.out.write(b);
    }
};
byte[] b = "test string".getBytes();
try {
    outputStream.write(b);
} catch (IOException e) {
    e.printStackTrace();
} 
```