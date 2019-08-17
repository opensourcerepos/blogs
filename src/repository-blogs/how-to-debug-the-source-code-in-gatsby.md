---
title: 'How to debug the source code in gatsby?'
date: "2019-07-21"
excerpt: 'We are going to put a debug point in the source code of gatsby using VSCode Editor.'
versionControl: GitHub
repositoryUrl: https://github.com/gatsbyjs/gatsby
repoOrganization: gatsbyjs
repoName: gatsby
author: sant0shg
---

# Introduction

In the [previous blog](https://opensourcerepos.com/how-to-link-the-gatsby-project-with-the-source-code-of-gatsby/), we learned how to link the gatsby source code with the gatsby project. We created a gatsby demo project and linked the demo project with the source code of gatsby package. We were able to do a console log in the gatsby package, and see it reflected in the demo project. In this blog, we are going to explore further and learn how to put a debug point in the source code of gatsby package. 

# Node debug flag
In order to debug a node application, we have to pass the flag "--inspect-brk". This will start the debugger at port 9229. We can then use VSCode editor to listen to that port and start debugging. 

We have two gatsby application running. One of them is the source code of gatsby, running in the "gatsby" folder. Another application is the gatsby-demo application, running in the "gatsby-demo" folder. We have used the "gatsby-dev-cli" to link the gatsby with the gatsby-demo. Due to this, the gatsby-demo project is using the gatsby package from the gatsby folder, and not from the npm. 

In the gatsby folder, start watching for the file changes for gatsby package. Run the following command

```
yarn run watch --scope=gatsby
```

This will start watching for the file changes that you do in the gatsby package.

In the gatsby-demo folder, run the following command to start the gatsby server with the node debug flag.

```
node --inspect node_modules/.bin/gatsby develop
```

Here, we are starting the "develop" script from the package.json using the gatsby from the node_modules folder. This gatsby package is symlinked to the gatsby folder using gatsby-dev-cli. If you do not understand how then please go through the [previous tutorial about linking the gatsby source code with the gatsby demo project](https://opensourcerepos.com/how-to-link-the-gatsby-project-with-the-source-code-of-gatsby/).

After running the above command, you will see that the debugger has started listening at port 9229.

# Debug configuration in VSCode
We are going to use the VSCode Editor to start the debugger and attach it to port 9229. In order to start debugging using the VSCode Editor, you will have to add the debug configuration. Follow the below steps

1. Click on the debug icon at the left-hand sidebar of VSCode Editor.

<img src="/assets/how-to-debug-the-source-code-in-gatsby/img1.png" width="100%" height="300">

2. You will see a list of debug configuration available. If the list is empty, you can always click on "Add Configuration" to add a new configuration.

<img src="/assets/how-to-debug-the-source-code-in-gatsby/img2.png" width="100%" height="300">

3. If you do not have any configuration related to attaching the debugger to port 9229, click on "Add Configuration". This will open the file called "launch.json", where it will give you options on choosing list of configurations.

<img src="/assets/how-to-debug-the-source-code-in-gatsby/img3.png" width="100%" height="300">

4. Click on the first configuration called "Attach". This will add a json configuration called "Attach" as follows.

<img src="/assets/how-to-debug-the-source-code-in-gatsby/img4.png" width="100%" height="300">

# Attaching the debugger
Now we have started the debugger which is listening to port 9229 from the gatsby folder, and also added the debug configuration in VSCode Editor. Let us attach this debugger to port 9229.

We want to debug the source code of gatsby and not the gatsby-demo project. So you have to add the debug configuration in the editor where the gatsby source code is opened. Then click of the "Attach" configuration that we have recently added. This will add the attach the debugger to port 9229, and then you can put a breakpoint in the gatsby source code and debug it. 

Once you attach this configuration, you can see following debug options on top of VSCode. 

<img src="/assets/how-to-debug-the-source-code-in-gatsby/img5.png" width="100%" height="300">

We have put a debugger in the file called "components.js" in the gatsby source code, and you can see the debugger has stopped at the below line when we started the gatsby server in the gatsby demo project. 

<img src="/assets/how-to-debug-the-source-code-in-gatsby/img6.png" width="100%" height="300">
