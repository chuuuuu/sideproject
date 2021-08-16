# NPM Workspace

You can setup your repo as monorepo which means that you have server, web, app, etc... All in one! To do this, npm workspace might be a helpful tool for you.

with npm workspace, you can:

- easily to share code
- manage all the packages in your workspace

## folder struture

```bash
+-- package.json # workspaces setup
+-- packages # put all workspaces folder here
    +-- app # expo app
    +-- common # util function (shared by web, app and server)
    +-- controller # api functions, useful hooks (shared by web and app)
    +-- server # express server
    +-- web # react web
```

## scripts

to install package, run

```bash
npm install $package --workspace=$workspace
```

to run script set in `packages.json` of workspace

```bash
npm run $script --workspace=$workspace
```

## expo

you need to postinstall before expo start. see more [here](https://stackoverflow.com/questions/59920012/monorepo-expo-with-yarn-workspace-and-using-expo-install)

```bash
expo-yarn-workspaces postinstall
```