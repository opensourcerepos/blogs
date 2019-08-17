---
title: 'High level architecture of deck.gl visualization library
'
date: "2019-06-05"
excerpt: 'Deck.gl uses Luma.gl which in turn uses WebGL2 to visualize the data.'
versionControl: GitHub
repositoryUrl: https://github.com/uber/deck.gl
repoOrganization: uber
repoName: deck.gl
author: sant0shg
---

# Introduction

Deck.gl is developed from Uber. In this blog, we are not going to look into how the code works, or the code walkthrough, but go through a high level of architecture. We will look into the libraries that Deck.gl depends upon, and what are the modules exposed. We will look into codebase (code walkthrough) in another blog post.

Deck.gl codebase is divided into multiple modules. These modules are present in the modules folder. Deck.gl uses Lerna to install the modules and the dependencies. 

Deck.gl uses a module called Luma.gl to render the graphs. Luma.gl uses WebGL2 to visualize the data. 

<img src="/assets/high-level-architecture-of-deck-gl-visualization-library/deckgl.png" width="100%" height="300">