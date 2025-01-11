# Social Media Share
Social media share using React Native with javascript.

## 1. Expo-Sharing First Steps
### 1.1 Create the project
Create the project:
```
npx create-expo-app@latest --template blank
```
Move inside the project folder:
```
cd [your-project-name]
```

### 1.2 Configure the app for running in ios or android device
For better testing, run the app in your android or ios device.   
Install the cli commands:
```
npx expo install @react-native-community/cli
```
Make sure in your `package.json` file is included the code:
```json
"devDependencies": {
    "@react-native-community/cli": "latest",
}
```

### 1.3 Install the library
A library that provides implementing sharing files.
`expo-sharing` allows you to share files directly with other compatible applications.
```
npx expo install expo-sharing
```
Also there is needed the `expo-asset` library. A universal library that allows downloading assets and using them with other libraries. Expo's asset system integrates with React Native's, so that you can refer to files with `require('path/to/file')`.
```
npx expo install expo-asset
```

Generate the builds for ios and android:
```
npx expo prebuild
```
**Expo sharing is not compatible with simulators**. 

### 1.4 iOS issue
It is **very important**, if you try to run the code on an ios device you will get the error `Error: Cannot find native module 'ExpoSharing'`. To **solve** this run:
```
cd ios
pod install
cd ..
```
You will see the `expo-sharing` dependencies installed natively on ios.
Then run `npx react-native run-ios` or `npx expo run:ios` for testing on **ios**.

### 1.5 The coding
In the `App.js` file import the library and add the button for sharing.
```js
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';

export default function App() {
  
  const share = async () => {
    const asset = Asset.fromModule(require('./assets/my-image.png'));
    await asset.downloadAsync(); // Ensure the file is available locally
    const fileUri = asset.localUri;
  
    try {
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Sharing between apps</Text>
      <Button title="Share" onPress={share} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

With this code you can share the image in multiple platforms and ways.

### 1.6 Run the App
iOS:
```
npx react-native run-ios
```

Android:
```
npx react-native run-android
```

## 2. Customize the Share Sheet
If you need full control over the share pop-up (e.g., prioritize specific apps), you can build a custom share sheet UI in React Native. Here's how:

### 2.1 Create a List of Preferred Apps
Define a list of apps (Instagram, Facebook, etc.) with their package names (Android) or URL schemes (iOS).
```js
const preferredApps = [
  { name: 'Instagram', package: 'com.instagram.android', scheme: 'instagram://' },
  { name: 'Facebook', package: 'com.facebook.katana', scheme: 'fb://' },
  { name: 'LinkedIn', package: 'com.linkedin.android', scheme: 'linkedin://' },
  { name: 'X', package: 'com.twitter.android', scheme: 'x://' },
];
```

### 2.2 Display a Custom Modal
Create a modal with buttons for each app.


## References
Library [expo-sharing](https://docs.expo.dev/versions/latest/sdk/sharing/).
