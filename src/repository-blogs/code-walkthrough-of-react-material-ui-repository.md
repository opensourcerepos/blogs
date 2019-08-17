---
title: 'Code walkthrough of React Material UI repository'
date: "2019-05-25"
excerpt: 'Code walkthrough of React Material UI repository. Learn about monorepo used in react material ui, and description about files and folders in repo.'
versionControl: GitHub
repositoryUrl: https://github.com/mui-org/material-ui
repoOrganization: mui-org
repoName: material-ui
author: sant0shg
---

# Introduction

[Material UI design](https://material.io/design/) is a popular design guideline for webpages from Google. There are many libraries in the various framework that have implemented material design. React Material UI library ie [https://material-ui.com/](https://material-ui.com/) is a popular material UI library in React. 

The GitHub repository details are mentioned in the meta information of the blog. Nevertheless, here is the link to the Github repository of material UI.  [https://github.com/mui-org/material-ui](https://github.com/mui-org/material-ui)

Let us go through the code of Material UI.

# Introduction to codebase

If you open the GitHub repository of material UI, you will find many folders and files like examples, docs, modules, packages and files like .circlei, .github, .eslintrc, etc. Explanation of each of these folders and files are in the table at the end of this blog post. As a beginner to the codebase of Material UI, you have to understand a few things first. 

Material UI codebase is built using the concept of monorepos. Monorepos means that a single repository hosts multiple npm packages. Advantage of doing so is that all packages are tracked from a single repository, there is no need to clone multiple packages and update the versions for each of them individually. 

Monorepos can be implemented in a few ways. Yarn supports something called workspaces. If you are using npm, then you can use a popular library called [Lerna](https://github.com/lerna/lerna). 

Material UI using Lerna library to support the development of multiple packages of Material UI from the single Github codebase. 

The Lerna config is stored in the file called lerna.json. Below are the contents of the file

```json
{
  "packages": [
    "packages/*"
  ],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "independent"
}
```

The above config means that the "packages" folder contains the multiple npm packages, the client used is yarn. Lerna supports both yarn and npm.

# Packages Folder
If you open the packages folder, you will find many packages that Material UI uses. Each of these packages is an npm module. So you will find "package.json" file in this folder.  Here is the screenshot of the packages folder.


<img src="/assets/code-walkthrough-of-react-material-ui-repository/packages.png" width="100%" height="300">

The core code of Material UI is present in the folder "material-ui". Let us explore this folder a bit more.

# material-ui folder

Material UI exports the components such as "Button", "Card", "List", "Modal", "Tabs", "Table", etc. Each of these components is a React class in their own folders. So if you browse to [src folder of the material-ui package](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src), you will find many folders like "Button", "Card", etc. Needless to say, these folders contain the respective code of that component which Material UI exports. 

Let us explore the sample code of "Button" code.  Go to the folder "Button" in "src" folder of "material-ui" package.  Here is the direct link to it. [https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Button](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Button)

<img src="/assets/code-walkthrough-of-react-material-ui-repository/material-ui-folder.png" width="100%" height="300">

# Explanation of files of Button component
index.js
This file exports the Button component. Exporting a component from "index.js" folder allows you to directly import the component from the "Button" folder, instead of referencing the Button.js file in Button folder. 

index.d.ts
This file provides typescript type information about index.js.

Button.js
This file exports the default Button component. The detailed explanation of this component will be explained in a different blog post. 

Button.d.ts
This file contains the typescript type information about the Button.js file. If you are coding in typescript, then you get useful information when using Button component like what is the type of props exported by component ( boolean, enums like small, medium or large, etc). 

Button.test.js
This file contains the unit test cases for the Button component.

# Explanations of all important files and folders in material ui

Here is the description of some of the important folders and files

<table style="border-collapse: collapse; width: 100%; height: 1474px;" border="1">
<tbody>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">.circleci</td>
<td style="width: 81.3187%; height: 30px;">Hidden file related to CircleCI tool (Continous Integration Tool)</td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">.gtihub&nbsp;</td>
<td style="width: 81.3187%; height: 30px;">Hidden file related to Github</td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">docs</td>
<td style="width: 81.3187%; height: 30px;">The folder containing the documentation and website&nbsp;<a href="https://material-ui.com/">https://material-ui.com</a></td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">examples</td>
<td style="width: 81.3187%; height: 30px;">This folder contains examples of using the Material UI library.</td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">modules</td>
<td style="width: 81.3187%; height: 30px;">Common modules like logging and async/await library WaterFall</td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">packages</td>
<td style="width: 81.3187%; height: 30px;">This folder contains various npm packages</td>
</tr>
<tr style="height: 60px;">
<td style="width: 18.6813%; height: 60px;">pages</td>
<td style="width: 81.3187%; height: 60px;">This folder contains the documentation of the website. The script copies the markdown files from this folder and puts it into the docs folder, from where documentation is rendered.</td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">scripts</td>
<td style="width: 81.3187%; height: 30px;">Some scripts like prettier and git wrapper commands.</td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">static</td>
<td style="width: 81.3187%; height: 30px;">This folder contains static assets like images.&nbsp;</td>
</tr>
<tr style="height: 30px;">
<td style="width: 18.6813%; height: 30px;">test</td>
<td style="width: 81.3187%; height: 30px;">Contains regression test cases.</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.browserlistrc</p>
</td>
<td style="width: 81.3187%; height: 62px;">Contains a list of browsers that are supported.&nbsp;</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.codecov.yml</p>
</td>
<td style="width: 81.3187%; height: 62px;">Contains the code coverage threshold.&nbsp;</td>
</tr>
<tr style="height: 90px;">
<td style="width: 18.6813%; height: 90px;">
<p>.editorconfig</p>
</td>
<td style="width: 81.3187%; height: 90px;">EditorConfig contains the config for editors. This config is respected by many editors and IDEs. This config file mentions configurations like trailing spaces, indentation, etc. Read more about editorconfig here <a href="https://editorconfig.org/">https://editorconfig.org</a></td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.eslintignore</p>
</td>
<td style="width: 81.3187%; height: 62px;">Contains the configuration to ignore the files for eslint. Same like the gitignore file.</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.eslintrc.js</p>
</td>
<td style="width: 81.3187%; height: 62px;">Contains the configuration for eslint</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.gitattributes</p>
</td>
<td style="width: 81.3187%; height: 62px;">Contains the attributes for file types. For example, text=auto means that for txt types of files, the end of line should be automatically normalized.</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.gitignore</p>
</td>
<td style="width: 81.3187%; height: 62px;">Ignore files for git</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.size-limit.js</p>
</td>
<td style="width: 81.3187%; height: 62px;">Config file for <a href="https://www.npmjs.com/package/size-limit">size-limit npm package</a>.</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.tidelift.yml</p>
</td>
<td style="width: 81.3187%; height: 62px;">Config file for <a href="https://tidelift.com/docs/config">tidelift</a>&nbsp;</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.yarnrc</p>
</td>
<td style="width: 81.3187%; height: 62px;">Config file for the yarn package manager</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>babel.config.js</p>
</td>
<td style="width: 81.3187%; height: 62px;">Contains the config for babel plugin</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>.crowdin.yml</p>
</td>
<td style="width: 81.3187%; height: 62px;">Config file for <a href="https://crowdin.com/">crowdin</a></td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>docker-compose.yml</p>
</td>
<td style="width: 81.3187%; height: 62px;">Docker file</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>lerna.json</p>
</td>
<td style="width: 81.3187%; height: 62px;">Config file for Lerna&nbsp;</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>prettier.config.js<a id="ab9b36d6b3d8ecb76af4ab93254abde4-364abe0968c31aeb5c6149be816419c6befeb01f" class="js-navigation-open" style="box-sizing: border-box; background-color: #f6f8fa; color: #0366d6; outline-width: 0px; font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 14px; white-space: nowrap;" title="prettier.config.js" href="https://github.com/mui-org/material-ui/blob/master/prettier.config.js"></a></p>
</td>
<td style="width: 81.3187%; height: 62px;">Config file for prettier&nbsp;</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>tsconfig.json</p>
</td>
<td style="width: 81.3187%; height: 62px;">Config file for typescript</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>tslint.json</p>
</td>
<td style="width: 81.3187%; height: 62px;">Lint for typescript</td>
</tr>
<tr style="height: 62px;">
<td style="width: 18.6813%; height: 62px;">
<p>yarn.lock</p>
</td>
<td style="width: 81.3187%; height: 62px;">Lock file for yarn. Similar to package-lock.json</td>
</tr>
<tr>
<td style="width: 18.6813%;">
<p>Other markdown files used by GitHub like CHANGELOG.md, CODE_OF_CONDUCT.md, CONTRIBUTING.md and other markdown files like BACKERS.md,&nbsp;</p>
</td>
<td style="width: 81.3187%;">Markdown files contains the data in markdown format.</td>
</tr>
</tbody>
</table>