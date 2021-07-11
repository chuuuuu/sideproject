# FullStack Tutorial
This is a practice followed by the tutorial released by Ben Awad [link](https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=9814s)

## NPM
- `dependencies`: Packages required by your application in production.
- `devDependencies`: Packages that are only needed for local development and testing.

To save packages into `dependencies`, you can run
```
npm install --save ${package}
```

To save packages into `devDependencies`, you can run
```
npm install --save-dev ${package}
```

To save packages globally, you can run
```
npm install -g ${package}
```

## Node/Typescript Setup
### packages
- `typescript`: This is a language for application-scale JavaScript.
- `ts-node`: This is a TypeScript execution engine and REPL for Node.js
- `@types/node`: This contains type definitions for Node.js
- `nodemon`: This is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected

You can simply run the following script to install all of them
```
npm install --save-dev typescript ts-node @types/node nodemon
```


### scripts
To initialize `tsconfig.json`, you can run
```
npx tsconfig.json
```

To run the typescript program, you can run
```
ts-node src/index.ts
```

To re-compile the typescript files into javascript files automatically after files change, you can run
```
tsc -w
```

to re-run the javascript program automatically after files change, you can run
```
nodemon dist/index.js
```

With the two scripts above, you can run the typescript program automatically.

Or you can simply run
```
nodemon --exec ts-node src/index.ts
```
