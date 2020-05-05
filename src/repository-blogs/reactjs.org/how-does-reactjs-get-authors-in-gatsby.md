---
title: 'How does reactjs.org gatsby repository get the details of authors'
date: "2020-05-04"
excerpt: 'Learn how to use the mapping feature of Gatsby to map the custom nodes with the MarkdownRemark frontmatter and use it in your project'
versionControl: GitHub
repositoryUrl: https://github.com/reactjs/reactjs.org
repoOrganization: reactjs
repoName: reactjs.org
author: sant0shg
---

# Introduction

In this tutorial, we are going to look into the source code of [documentation website of reactjs](https://reactjs.org/docs/getting-started.html). 
The reactjs website source code resides in the repository [https://github.com/reactjs/reactjs.org](https://github.com/reactjs/reactjs.org)
We will mainly focus on how does this repository fetch the details of the authors.

# Authors.yml

So we have a list of authors and their details in the [content/authors.yml](https://github.com/reactjs/reactjs.org/blob/master/content/authors.yml) file. 

```yml
acdlite:
  name: Andrew Clark
  url: https://twitter.com/acdlite
benigeri:
  name: Paul Benigeri
  url: https://github.com/benigeri
bvaughn:
  name: Brian Vaughn
  url: https://github.com/bvaughn
chenglou:
  name: Cheng Lou
  url: https://twitter.com/_chenglou
...
```

# What part we are focusing on

So we want to fetch the details of the author in the markdown frontmatter query that we will make in our [src/templates/blog.js](https://github.com/reactjs/reactjs.org/blob/master/src/templates/blog.js) file.

```js
query TemplateBlogMarkdown($slug: String!) {
    ...
      frontmatter {
        title
        next
        prev
        author {
          frontmatter {
            name
            url
          }
        }
      }
      ...
```
Here the `name` and `url` field are present inside the author nodetype. But we are able to query it inside the `markdown` query because we have mapped both these node types. Let us learn how to do it.

# Mapping feature in gatsby

Gatsby provides a feature to create "mappings" between node types. You can read more about the [mappings feature](https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types) in gatsby here.

You can map two different node types together by specifying the attribute you want to. For example

```json
mapping: {
  "people.country": "country"
}
```

Will map the `people` nodetype to the `country` nodetype by matching the country field of `people` to the "id" field of `country`.
This is you people node type data
```json
// people.json
[{
  "id": "Adam",
  "country": "United Kingdom"
}]
```

```json
// country.json
[{
  "id": "United Kingdom",
  "description": "United Kingdom is madeup of 3 islands"
}]
```

Once you have mapped `people` and `country` node type, you can fetch the details of `country` node inside the `people` itself

```js
query {
  people {
    id
    country {
      desc 
    }
  }
}
```
So we are getting the desc for the country using 

```js
country {
  desc
}
```

# Mapping author with authorYaml

So in the mapping config, the reactjs.org website has the following mapping

```js
mapping: {
  'MarkdownRemark.frontmatter.author': 'AuthorYaml',
},
```

Here the author field comes from the markdown file of blogs

```md
---
title: "Use React and JSX in ASP.NET MVC"
author: [Daniel15]
---
```

The AuthorYaml is a custom node type that they have created using the `createNode` api from the [content/authors.yml](https://github.com/reactjs/reactjs.org/blob/master/content/authors.yml) file inside the plugin [plugins/gatsby-transformer-authors-yaml](https://github.com/reactjs/reactjs.org/tree/master/plugins/gatsby-transformer-authors-yaml).

*gatsby-transformer-authors-yml*
```jsx
exports.sourceNodes = ({graphql, actions}) => {
  const {createNode} = actions;

  const path = resolve(__dirname, '../../content/authors.yml');
  const file = readFileSync(path, 'utf8');
  const authors = safeLoad(file);

  // authors.yml structure is {[username: string]: {name: string, url: string}}
  Object.keys(authors).forEach(username => {
    const author = authors[username];

    createNode({
      id: username,
      children: [],
      parent: 'AUTHORS',
      internal: {
        type: 'AuthorYaml',
        contentDigest: JSON.stringify(author),
      },
      frontmatter: author,
    });
  });
};
```

# Mapping array of fields of authors

In the above file of [plugins/gatsby-transformer-authors-yaml](https://github.com/reactjs/reactjs.org/tree/master/plugins/gatsby-transformer-authors-yaml), we saw that they have created custom node type of `AuthorYaml` with the `MarkdownRemark` nodetype. But the author field of `MarkdownRemark` field is an array.

Gatsby allows mapping array to an id, wherein you will get the details of the each of the item in the array from the mapped node type with the same query.

For example, we have array of `country` inside the `people` node type, 
```json
people.json
[{
  "id": "Adam",
  "country": ["United Kingdom", "United State"]
}]
```
and if we have data for both countries inside the `country`,
```json
// country.json
[{
  "id": "United Kingdom",
  "description": "United Kingdom is madeup of 3 islands"
},{
  "id": "United States",
  "description": "United States consists of 50 countries"
}]
```
Then we add mapping the same way

*gatsby-config.js*
```js
mapping:{
  "people.country": "country",
},
```

and query it same way

```js
query {
  people {
    id
    country {
      desc
    }
  }
}
```

We will get the data for both the country inside the country field. 

# Conclusion

So we learnt how the `author` from the markdown is mapped to the `id` field of custom node type `AuthorYml` using the mapping feature of gatsby.