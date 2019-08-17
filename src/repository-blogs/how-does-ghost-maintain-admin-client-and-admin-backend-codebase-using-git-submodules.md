---
title: 'How does Ghost maintain admin client and admin backend codebase using git submodules?'
date: "2019-06-09"
excerpt: 'Learn how ghost manages admin client and backend using git submodules.'
versionControl: GitHub
repositoryUrl: https://github.com/TryGhost/Ghost
repoOrganization: TryGhost
repoName: Ghost
author: sant0shg
---

# Introduction

If you see the Ghost repository, you will find the client code resides in the "core" folder. This is how the repository looks.

<img src="/assets/how-does-ghost-maintain-admin-client-and-admin-backend-codebase-using-git-submodules/repo.png" height="300">

But that folder is not clickable. This client folder contains the code for the admin client of the ghost repository. But it is maintained separately in [another repository](https://github.com/TryGhost/Ghost-Admin). 

# Setting up the local environment
In order to set up the local environment, you have to run the git clone command along with the flag 

```
--recurse-submodules
```
So the git clone command for Ghost would be 

```
git clone --recurse-submodules https://github.com/TryGhost/Ghost
```

# What are submodules in git?
Submodules allow you to keep a Git repository as a subdirectory of another Git repository. This lets you clone another repository into your project and keep your commits separate.

[https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

Git submodules allow you to include other repositories inside the current one. Adding submodule is as simple as running the following command

```
git submodule add https://github.com/<repository_name>
```

The submodule will be added to the folder called <repository_name> by default. 

So Ghost team has added the "[Ghost-Admin](https://github.com/TryGhost/Ghost-Admin)" repository as a submodule to the [main Ghost repository](https://github.com/TryGhost/Ghost) 

# What other ways are there to track multiple modules?
Many repositories follow "mono-repos" approach. This approach allows you to have multiple npm packages in a single Github repository. All of these packages will be tracked by single git history, but their versioning and release can be independent. This also reduces the number of repositories needed to maintain a package. There are many popular open source projects like React, React-Dnd, etc which follow this style. Usually, they use a package called Lerna. Yarn supports it by default as well. 