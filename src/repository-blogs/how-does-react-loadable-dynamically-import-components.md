---
title: 'How does react loadable dynamically import components?'
date: "2019-05-31"
excerpt: 'Learn how react loadable uses import to dynamically import the react components in the application and the additional features.'
versionControl: GitHub
repositoryUrl: https://github.com/jamiebuilds/react-loadable
repoOrganization: jamiebuilds
repoName: react-loadable
author: sant0shg
---

# Introduction

React Loadable is a higher order component on top of the [import](https://github.com/tc39/proposal-dynamic-import). import allows you to dynamically import the modules, and it is at the stage 3 proposal at tc39. You can check the status [here](https://github.com/tc39/proposals). You can use babel and enable the polyfill to use the import statement right away in your code.

Actually, react-loadable is not required to import the React components dynamically. Here is an example of importing React components in the codebase without React Loadable.

```jsx
class App extends Component{
  state = {
    loaded: false
  }
  elem = {};
  init = ()=>{
    import('./Test').then(component=>{
      this.elem = React.createElement(component.default)
      this.setState({
        loaded: true
      })
    })
  }
  
  componentDidMount(){
    this.init();
  }

  render(){
    return (
      <div>
      {
        this.state.loaded? this.elem: 'Loading...'
      }
      </div>
    );
  }
}

export default App;
```

As shown above, we are importing the Test component using import. import returns a promise, which can be assigned to a variable and rendered. 

One point to note is that because "import" is at stage 3 proposal, you will require babel polyfill to make it run in your codebase. If you are using create-react-app babel preset, then you will get the polyfill for import by default. Else, you need to install the following polyfill.

[@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)

# Why use react loadable?
React loadable provides features like showing loading state, delaying the load of the component, timeout and error handling, server-side rendering, etc. Although it relies on the import statement of the babel to do the core heavy lifting, it makes it up by providing additional features as mentioned above. If you write your own higher-order component on top of "import", then it will end up similar to react loadable, give and take some features. 