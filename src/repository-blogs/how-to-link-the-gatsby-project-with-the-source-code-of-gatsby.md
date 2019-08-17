---
title: 'How to link the gatsby project with the source code of gatsby?'
date: "2019-06-20"
excerpt: 'Use gatsby-dev-cli to link the gatsby demo project with the source code of core gatsby package, and also watch for the changes in core package.'
versionControl: GitHub
repositoryUrl: https://github.com/gatsbyjs/gatsby
repoOrganization: gatsbyjs
repoName: gatsby
author: sant0shg
---

# Introduction

The Gatsby repository contains many npm packages in the [packages](https://github.com/gatsbyjs/gatsby/tree/master/packages) folder. Below is the screenshot of the [packages](https://github.com/gatsbyjs/gatsby/tree/master/packages) folder.

<img src="/assets/how-to-link-the-gatsby-project-with-the-source-code-of-gatsby/folders.png" width="100%" height="300">

One of the npm packages is the core Gatsby package. If you want to debug the core Gatsby package, or any other package from that repository, follow the below steps.

# Debugging the packages
We are going to debug a core package called "gatsby". In order to debug this package, we need to create a gatsby project that uses the core package of gatsby from the above repository and not from the node_modules folder of the gatsby project. 

## Step1 - Clone the gatsby repository

```
git clone https://github.com/gatsbyjs/gatsby
```

The above command will clone the gatsby repository into the folder called gatsby.

## Step2 - Create a gatsby project using gatsby cli

If you do not have gatsby-cli module, install the module using the following command


```
npm install -g gatsby-cli
```

Once the gatsby-cli is installed, create a new gatsby project using the following command

```
gatsby new gatsby-demo
```

Go inside the gatsby-demo folder

``` 
cd gatsby-demo
```

Run the gatsby-demo project

```
gatsby develop
```

You will see the project running in port 8000 (default) ([http://localhost:8000](http://localhost:8000))


## Step3 - Linking the gatsby core package

Now we have two folders - one folder called "gatsby" which contains the source code of the core package of gatsby, and another folder called "gatsby-demo" which contains a project created using gatsby cli.

Right now, the gatsby demo project is using the core package of gatsby from the "node_modules" folder. In order to debug the source code of gatsby, we need to tell our gatsby demo project that "Hey, instead of using the gatsby package from the node_modules folder, use the gatsby package from the project containing the source code of gatsby". In order to that, we need to install another package called "gatsby-dev-cli". Run the following command to install gatsby-dev-cli.

 
```
npm install -g gatsby-dev-cli
```

We need to build and watch for the changes in the source code package of gatsby, so that any change we do in that package is reflected in the gatsby-cli project. But there are many packages in the gatsby core repository, so we will selectively watch for the changes in our concerned package - the gatsby core package. Run the command to build and selectively watch for the changes.
 
```
yarn run watch --scope=gatsby
```

You will see the command line output something like this below.

<img src="/assets/how-to-link-the-gatsby-project-with-the-source-code-of-gatsby/cmd.png" width="100%" height="300">

Now go the gatsby-demo folder, and run the following command to link the gatsby core package

```
gatsby-dev --set-path-to-repo <Absolute path to gatsby project>
```

Give the absolute path to the gatsby project in the last param. Example command is shown below

``` 
gatsby-dev --set-path-to-repo /Users/abc/Projects/gatsby/gatsby
```

After running the above command, open a new command terminal, and run the below command to install the latest dependencies again in the gatsby-demo project. Now, the gatsby will pick the dependency of core gatsby project from the source code repository. Run the following command in the gatsby-demo project

```
gatsby-dev
```

You will see that the gatsby is copying the files from source code repository folder to the node_modules folder in our demo project. 

```
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-image/index.js to node_modules/gatsby-image/index.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-offline/gatsby-browser.js to node_modules/gatsby-plugin-offline/gatsby-browser.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-offline/app-shell.js to node_modules/gatsby-plugin-offline/app-shell.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-offline/gatsby-node.js to node_modules/gatsby-plugin-offline/gatsby-node.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-offline/get-resources-from-html.js to node_modules/gatsby-plugin-offline/get-resources-from-html.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-offline/sw-append.js to node_modules/gatsby-plugin-offline/sw-append.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-offline/gatsby-ssr.js to node_modules/gatsby-plugin-offline/gatsby-ssr.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-offline/index.js to node_modules/gatsby-plugin-offline/index.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-react-helmet/gatsby-ssr.js to node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby-plugin-react-helmet/index.js to node_modules/gatsby-plugin-react-helmet/index.js
Copied /Users/abc/Projects/gatsby/gatsby/packages/gatsby/babel.config.js to node_modules/gatsby/babel.config.js
```

## Step4 - Start the gatsby project

Open a new command terminal in the gatsby-demo project, and run the following command 
 
```
yarn run develop
```

## Step5 - Test - Do a console log in the core gatsby project

Let us do a console log in the core source code of gatsby and check if that is picked up when running the gatsby-demo project

Go to the "packages/gatsby/src/commands/develop.js" file in core gatsby project, and in the [startServer command section](https://github.com/gatsbyjs/gatsby/blob/96aa8900b0762137ab820408d982420416ce8d45/packages/gatsby/src/commands/develop.js#L82), do a console log.

```js
async function startServer(program) {
  console.log('server is being started');
  ...
}
```

Now when do restart the server at the gatsby demo project, you can see the log in command line terminal that "server is being started". 

<img src="/assets/how-to-link-the-gatsby-project-with-the-source-code-of-gatsby/cmd2.png" width="529px" height="102px">

So finally, you have linked the gatsby demo project with the source code of gatsby core repository. Whatever change you do in the source code of gatsby project will be reflected in the gatsby demo project.

