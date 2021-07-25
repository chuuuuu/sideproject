# React Native

this is a note taken from [site](https://www.youtube.com/watch?v=0-S5a0eXPoc)

## Expo CLI vs React Native CLI

### Expo CLI

Expo CLI sits on top of React Native and hides lots of complexity from us. it's fast and easier to use. On the other hand, it is limited to what expo gives us. honestly, that's not a problem for most of application. if you have never done any mobile development, Expo is a way to go.

### React Native

In a react native project, you will see android and ios folder, also there's, of course, javascript code. Hence, it is suitable for people who have some experience with mobile development.

## More on Expo

In this course, we assume you dont have prior mobile development experience. hence, we will start using Expo

### Initialzation

to install it, run

```
npm i -g expo-cli
```

then, you can run the script below to initialize your project

```
expo init ${project name}
```

expo will ask you, would you want `managed workflow` or `bare workflow`
in the `bare workflow`, you will see the android and ios folder, hence, we choose `managed workflow`

### Directory

you will see

- assets: to put images, audios, videos, and so on...
- App.tsx: you will write the main function here

### App.tsx

We have to use the build-in component to write our codes. (that means you cannot use `div`...)

And you will see

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

This is not css actually, it is javascript code. after compiling, react native will translate these into ios or android native widgets. also the component will translate into ios or android native widgets.

For example, `<View>` will build into

- `UIView` for ios
- `AndroidView` for android

### `npm run start`

after you run `npm run start`, you will see metro bundler, which will help us compile the react native code into ios or android code. there're few options you can choose

- Run on Android device/emulator
- Run on iOS simulator
- Run in web browser
- Send link with email… : you can send the app to your friend by email
- Publish or republish project… : you can public your app in development mode

### running on iOS Simulator

follow the steps below:

1. install Xcode
2. open it and click on `Xcode` -> `Preferences` -> `Locations`
3. make sure that you have already installed latest Command Line Tools
4. now, you can click on `Xcode` -> `Open Developer Tool` -> `Simulator`
5. go on the `metro bundler`, click on `run on ios simulator` or you can press `i` in the terminal

Now, your simulator will automatically detect if your file are modified. if so, it will refresh.

By pressing `command` + `D`, you can open developemnt menu in the simulator.

### running on Android Emulator

follow the steps below

1. download `android studio`
   - if you are using apple silicon, you can download the specific version [here](https://developer.android.com/studio/archive)
2. add some environment variable in your shell file
   - more details in [site](https://docs.expo.io/workflow/android-studio-emulator/)
3. install it and click on AVD(android virtual device)
4. create a new device, choose a lastest stable version.
    - i choose Pixel4 API30
5. go on the `metro bundler`, click on `run on android emulator` or you can press `a` in the terminal

Now, your simulator will automatically detect if your file are modified. if so, it will refresh.

By pressing `command` + `M`, you can open developemnt menu in the simulator.
