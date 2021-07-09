# React hook example
In this practice, I'll create some example for hook.

## Why react and How react works?
first, you need to know the pipeline of browser rendering
- https://medium.com/technogise/dom-manipulation-in-browser-59b793bee559

secondly, you need to know how react work
- https://medium.com/swlh/what-makes-react-so-fast-2f2ed27afb68

in every updating, react will create a new virtual dom tree.
however, it didn't need to render. hence, it cost less.
after the new virtual dom tree is created, react compare it with old virtual dom tree by using bfs
after react find dom node changed, it will ask browser to update every dom subtree whose root is the node.
as the result, react can fast

in fact, developer may write code which is faster than react. however, react is more clean, and more easily to understand and react is also fast enough!

## reference
[site](https://www.youtube.com/watch?v=f687hBjwFcM&t=1767s)