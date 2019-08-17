---
title: 'Architecture of the codebase of react-bootstrap repository'
date: "2019-06-02"
excerpt: 'Learn about the architecture of react-bootstrap codebase.'
versionControl: GitHub
repositoryUrl: https://github.com/react-bootstrap/react-bootstrap
repoOrganization: react-bootstrap
repoName: react-bootstrap
author: sant0shg
draft: true
---

# Introduction

The architecture of react-bootstrap is simple. 

The main code for bootstrap components like an accordion, tooltip, button, etc resides in the src folder. All the names of the files are self-explanatory. The file Alert.js default exports the "alert" component. Similarly, other files default export their respective components. 

```js
...
export default Alert;
```

All of these files are again exported from the index.js file. 


```js
export Accordion from './Accordion';
export Alert from './Alert';
export Badge from './Badge';
export Breadcrumb from './Breadcrumb';
export BreadcrumbItem from './BreadcrumbItem';
export Button from './Button';
export ButtonGroup from './ButtonGroup';
export ButtonToolbar from './ButtonToolbar';
export Card from './Card';
export CardColumns from './CardColumns';
export CardDeck from './CardDeck';
export CardImg from './CardImg';
export CardGroup from './CardGroup';
export Carousel from './Carousel';
export CarouselItem from './CarouselItem';
export CloseButton from './CloseButton';
...
```

In order to get started with the development of the codebase of react bootstrap, follow the steps as mentioned in the readme file.

[https://github.com/react-bootstrap/react-bootstrap#local-setup](https://github.com/react-bootstrap/react-bootstrap#local-setup)

```
Yarn is our package manager of choice here. Check out setup instructions here if you don't have it installed already. After that you can run yarn run bootstrap to install all the needed dependencies.

From there you can:

Run the tests once with yarn test (Or run them in watch mode with yarn run tdd).
Start a local copy of the docs site with yarn start
Or build a local copy of the library with yarn run build
```

The "yarn start" command starts the gatsby server from "www" folder.

