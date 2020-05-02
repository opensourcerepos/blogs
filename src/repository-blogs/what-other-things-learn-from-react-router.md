---
title: 'What useful things can be learned from react router repository which you can apply in your project'
date: "2020-05-02"
excerpt: 'Learn about adding life cycle methods conditinally, using react.children api and hoisting static methods from child to parent.'
versionControl: GitHub
repositoryUrl: https://github.com/ReactTraining/react-router/tree/v5.1.2
repoOrganization: ReactTraining
repoName: react-router
author: sant0shg
---

# Introduction

React router is a very popular react library to add the routes. We went through the code base of react router, and there are other things to learn which you can apply in your repository as well.

## Adding lifecycle methods conditionally
In React router, the `componendDidUpdate` lifecycle method is added conditionally based upon the environment variable. If the environment variable is `DEV`, then only the above lifecycle method is added.

```
if  (__DEV__)  {
	React.propTypes = {
		...
	}

	Route.prototype.componentDidMount  =  function()  {
		...
	}
  
	Route.prototype.componentDidUpdate = function(prevProps){
		...
	}
}
```
This is required in react router because you do not want the `componentDidUpdate` and other unnecessary lifecycle method to run when in production. Usually when we face such condition in our codebase, we use it as follows

```
class Route extends React.Component {
	...
	componentDidUpdate{
		if(__DEV__){
			...// code to run in componendDidUpdate
		}	
	}
}
```
But in react router, we learn that you can attach the lifecycle method to the component's prototype. Advantage of doing so is that the `componendDidUpdate` will not be called every time the props are updated.

## Using React.children

React provides an api to get the list of children and other helper methods like `count`, `map`, `forEach` etc..
```
React.Children.count(children)
```
Like for example,

```
function  MySwitch(props)  {
return  <div>
	No of children : {React.Children.count(props.children)}
</div>;
}
```
 
```
function  MyRoute(props)  {
	return  <div>{props.path}</div>;
}
```
So the code

```
<MySwitch>
	<MyRoute path="/" />
	<MyRoute path="/app" />
</MySwitch>
```
would produce the output 
```
No of children: 2
```
React router uses this in [Switch.js](https://github.com/ReactTraining/react-router/blob/v5.1.2/packages/react-router/modules/Switch.js) to loop through the children (i.e. Route component), and get the matched component element, and its path.

We can use React.Children when we are also building our library and there is a need to loop through the child components.

## Hoisting static methods from child to parent
This is an interesting problem. We know that we can define static methods to React class. For example
```
class Wrapper extends React.Component{
static getName = () => { return "abc"} 
}
```
OR
```
class Wrapper extends React.Component{
}
Wrapper.getName = () => { return "abc" }
```
In both the cases, `Wrapper.getName()` will return "abc"
But when we apply an Higher Order Component to Wrapper, this method is not available to it. 
For example
```
const Enhanced = enhance(Wrapper)
```
Here we are getting new component out of Wrapper, by using the `enhance` function. This function will do some logic, and return our enhanced component. But
```
Enhanced.getName()
// undefined
```
will be undefined. So the static method of `Wrapper` is not carry forwaded to `Enhanced`.
This can be overcome by copying the required static methods inside the enhance function. Or we can also use the library [hoise-non-react-statics](https://www.npmjs.com/package/hoist-non-react-statics). It is used to hoist the non-react static methods. Meaning the `Wrapper.propTypes` and other such react specific methods will not be copied to `Enhance`. 