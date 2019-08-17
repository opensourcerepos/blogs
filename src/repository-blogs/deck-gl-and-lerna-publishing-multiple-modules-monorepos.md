---
title: 'Deck.GL and Lerna - publishing multiple modules (monorepos)'
date: "2019-06-05"
excerpt: 'Learn how deck.gl repository uses lerna and manages multiple packages in its repository.'
versionControl: GitHub
repositoryUrl: https://github.com/uber/deck.gl
repoOrganization: uber
repoName: deck.gl
author: sant0shg
---

# Introduction

Deck.gl repository is a collection of multiple npm packages. Each of the folder in the repository is an npm package

[https://github.com/uber/deck.gl/tree/master/modules](https://github.com/uber/deck.gl/tree/master/modules)

# How does Deck.GL manage multiple packages?

Deck.gl uses [Lerna](https://github.com/lerna/lerna) to maintain and update multiple packages. You can find the lerna config file [https://github.com/uber/deck.gl/blob/master/lerna.json](https://github.com/uber/deck.gl/blob/master/lerna.json)

```json
{
  "lerna": "2.0.0",
  "version": "7.1.0-beta.1",
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": [
    "modules/*"
  ],
  "command": {
    "publish": {},
    "bootstrap": {}
  }
}
```

The "modules" folder is specified as "packages". It means that npm packages are present in the modules folder in deck.gl repository. If you open any folder in the "modules" folder, you will see a package.json file. Following are the modules published from Deck.GL repository

<table style="border-collapse: collapse; width: 100%;" border="1">
<tbody>
<tr>
<td style="width: 50%;"><strong>Folder</strong></td>
<td style="width: 50%;"><strong>NPM Package</strong></td>
</tr>
<tr>
<td style="width: 50%;">aggregation-layers</td>
<td style="width: 50%;">@deck.gl/aggregation-layers</td>
</tr>
<tr>
<td style="width: 50%;">core</td>
<td style="width: 50%;">@deck.gl/core</td>
</tr>
<tr>
<td style="width: 50%;">geo-layers</td>
<td style="width: 50%;">@deck.gl/geo-layers</td>
</tr>
<tr>
<td style="width: 50%;">google-maps</td>
<td style="width: 50%;">@deck.gl/google-maps</td>
</tr>
<tr>
<td style="width: 50%;">json</td>
<td style="width: 50%;">@deck.gl/json</td>
</tr>
<tr>
<td style="width: 50%;">jupyter-widget</td>
<td style="width: 50%;">@deck.gl/jupyter-widget</td>
</tr>
<tr>
<td style="width: 50%;">layers</td>
<td style="width: 50%;">@deck.gl/layers</td>
</tr>
<tr>
<td style="width: 50%;">main</td>
<td style="width: 50%;">deck.gl</td>
</tr>
<tr>
<td style="width: 50%;">mapbox</td>
<td style="width: 50%;">@deck.gl/mapbox</td>
</tr>
<tr>
<td style="width: 50%;">mesh-layers</td>
<td style="width: 50%;">@deck.gl/mesh-layers</td>
</tr>
<tr>
<td style="width: 50%;">react</td>
<td style="width: 50%;">@deck.gl/react</td>
</tr>
<tr>
<td style="width: 50%;">test-utils</td>
<td style="width: 50%;">@deck.gl/test-utils</td>
</tr>
</tbody>
</table>
