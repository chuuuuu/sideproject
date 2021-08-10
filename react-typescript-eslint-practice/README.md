# React with Typescript with eslint

First, you have to initialize the folder with `create-react-app`
```
npx create-react-app react_ts_eslint_example --template typescript
```

After the initialization, you enter the folder and intall the following packages
```
npm install eslint --save-dev
npm install @typescript-eslint/parser --save-dev
npm install @typescript-eslint/eslint-plugin --save-dev
npm install eslint-plugin-react --save-dev
```

Finally create a `.eslintrc.json` with following content
```
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2]
  },
  "ignorePatterns": ["*.js", "node_modules/*"],
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

## check your code
you can check the code through vscode directly, or use the command below
```
npx eslint src
```