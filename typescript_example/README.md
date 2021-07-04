# typescript practice
while you want to use typescript in your project you need to run the scripts below
```
npm install -g typescript
tsc --init --target ES6
```

then, you can start writing your ts code in {filename}.ts

after you finish it, you have to run the script below to compile ts code into js code.
```
tsc --target ES6 {filename}.ts
```

finally, you can run the following script to run your code
```
node {filename}.js
```

## code style
you can install eslint to make your code more cleaner
```
// docs: https://eslint.org/docs
npm install eslint --save-dev

// you must install parser to make eslint understand typescript
npm install @typescript-eslint/parser --save-dev

// it is a dependency library
npm install @typescript-eslint/eslint-plugin --save-dev
```

and you have to create the configuration files `.eslintrc.json` with following content
```
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2]
  },
  "ignorePatterns": ["*.js", "node_modules/*"]
}
```

### vscode
if you are using vscode, you can use `Shift + Cmd + P` and add script below into `Preference Open Setting (JSON)`
```
{
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

then, vscode would check your ts files automatically.

### manually
or you can check your files manually with script below
```
node_modules/eslint/bin/eslint.js .
```

## cheat sheet
https://willh.gitbook.io/typescript-tutorial/advanced