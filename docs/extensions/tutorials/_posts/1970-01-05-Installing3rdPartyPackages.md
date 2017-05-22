---
layout: doc
permalink: /docs/extensions/tutorials/installing-3rd-party-packages
title: Installing 3rd Party Packages
section: Tutorials
---

# Installing 3rd Party Packages
<hr />

This tutorial will show you how to install a 3rd party package into an extension and through that into the entire app. For an example we're going to use [react-native-swiper](https://github.com/leecade/react-native-swiper) as a non-native package and [react-native-camera](https://github.com/lwansbrough/react-native-camera) as a native package.

## 1) Installing a non-native Package

### Making an Extension

To begin, we'll need an extension, so let's just make one. If this is something you don't know how to do yet, you should really go through [My First Extension]({{ site.url }}/docs/extensions/my-first-extension/introduction) to make sure you understand the fundamentals.

We begin by initializing an extension and writing in the basic information about it.

```ShellSession
$ shoutem init swiper-extension
Enter information about your extension. Press `return` to accept (default) values.
Title: Swiper Extension
Version: 0.0.1
Description: Extension that uses react-native-swiper.

Initializing extension:
...

Extension initialized!
```

Let's switch over to the extension directory and add a screen with a shortcut that will show the Swiper.

```ShellSession
$ cd swiper-extension
$ shoutem screen add SwiperScreen --shortcut Swiper
Enter shortcut information:
Title: Swiper

Screen `SwiperScreen` is created in file `app/screens/SwiperScreen.js`!
Shortcut `Swiper` is created.
Shortcut `Swiper` opens `SwiperScreen` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

### Installing the Package

There's two different ways you can do this. One is to manually install the package into the extension using `npm install react-native-swiper --save` in the `app` directory:

```ShellSession
$ cd app
$ npm install react-native-swiper --save
{{ site.example.devName }}.swiper-extension@0.0.1 /absolute/path/swiper-extension/app
└── react-native-swiper@1.5.4
```

> #### Note
> The reason we have to install it into the `app` directory is because the the `app` directory is bundled into the full app along with all the other extensions the app uses.

Doing this will automatically add `react-native-swiper` as a dependency in our `app/package.json` file:

```json{5-7}
#file: app/package.json
{
  "name": "{{ site.example.devName }}.not-swiper",
  "version": "0.0.1",
  "description": "Extension that uses react-native-swiper.",
  "dependencies": {
    "react-native-swiper": "^1.5.4"
  }
}
```

The other, more preferred way of doing this is to simply add that dependency we see in the `app/package.json` file, which results with `react-native-swiper` being installed when the app is bundled. The reason this is the preferred way of doing it is because the `node_modules` folder generated with our NPM installation is ignored since we utilize the `$ npm pack` command.

### Using the Package

Our extension now has full access to everything `react-native-swiper` has to offer and we can use it just like we would in a normal React Native app, so let's make use of it's simplest example to show how it works. We'll have to edit our `app/screens/SwiperScreen.js` file to use the Swiper by importing the Swiper component, changing the `render();` method to use the Swiper component and making some changes to the `styles` constant so our Swiper component can function properly.

```javascript{12,17-27,38-62}
#file app/screens/SwiperScreen.js
import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class SwiperScreen extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  }
});
```

And there we go, we implemented `react-native-swiper` into our extension. Now we need to push our extension to the Shoutem server and install it onto an app so we can actually test it out. Continuing where we stopped in our terminal:

```ShellSession
$ cd ..
$ shoutem push
Uploading `Swiper Extension` extension to Shoutem...
Success!
$ shoutem install --new SwiperApp
Extension installed
See it in browser: `{{ site.shoutem.builderURL }}/app/{{ site.example.appId }}`
```

Opening the SwiperApp in the Builder will show us an app with no Screens, but since we just installed our Swiper Extension onto the app, we can just add the Swiper Screen to it by clicking on the + button next to Screens, going to the Custom category and selecting the Swiper Extension. As soon as it's loaded into the Main Navigation we can preview the app:

<p class="image">
<img src='{{ site.url }}/img/tutorials/installing-3rd-party-and-native-packages/swiper-in-preview.png'/>
</p>

## 2) Installing a Native Package

When installing a 3rd party package that uses native functionalities we have to make sure we link the native dependencies it has. This is done using postlink scripts. As an example, we'll be making a QR Code reader that's going to display what the scanned QR code says. To scan a QR code we'll need to use the devices camera, which we'll get access to using react-native-camera, a 3rd party package for utilizing device cameras.

### Making an Extension

To begin, we'll need an extension, so let's just make one. If this is something you don't know how to do yet, you should really go through [My First Extension]({{ site.url }}/docs/extensions/my-first-extension/introduction) to make sure you understand the fundamentals.

We begin by initializing an extension and writing in the basic information about it.

```ShellSession
$ shoutem init qr-reader-extension
Enter information about your extension. Press `return` to accept (default) values.
Title: QR Reader
Version: 0.0.1
Description: An extension that scans QR codes and displays the encoded information to the user.
Initializing extension:
Installing packages for server...
...

Extension initialized.
```

Let's switch over to the extension directory and add a screen with a shortcut that will be the user interface for our QR Reader.

```ShellSession
$ cd qr-reader-extension
$ shoutem screen add QRReaderScreen --shortcut QRReader
Enter shortcut information:
Title: QR Reader

Screen `QRReaderScreen` created in file `app/screens/QRReaderScreen.js`!
Shortcut `QRReader` created.
Shortcut `QRReader` opens `QRReaderScreen` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

### Installing the Package

To make sure the native dependencies are linked, we'll have to make sure our postlink script is run by putting it in our `app/package.json` file.

```json
#file: app/package.json
{
  "name": "{{ site.example.devName }}.qr-reader-extension",
  "version": "0.0.1",
  "description": "An extension that scans QR codes and displays the encoded information to the user.",
  "dependencies": {
    "react-native-camera": "^0.4.1"
  },
  "rnpm": {
    "commands": {
      "postlink": "node node_modules/{{ site.example.devName }}.qr-reader-extension/scripts/run.js"
    }
  }
}
```

We have to make a `scripts` directory and make the postlink script in it: `app/scripts/run.js`

```ShellSession
$ cd app
$ mkdir scripts
$ cd scripts
$ touch run.js
```

It's going to edit the `Info.plist` file and link the react-native-camera dependency for our app.

```javascript{1-21}
#file: app/scripts/run.js
const fs = require('fs-extra');
const plist = require('plist');

const infoPlistPath = './ios/ShoutemApp/Info.plist';
const infoPlistFile = fs.readFileSync(infoPlistPath, 'utf8');
const infoPlist = plist.parse(infoPlistFile);

console.log('Adding camera and microphone permissions to Info.plist');
infoPlist['NSCameraUsageDescription'] = 'App needs your camera to be able to scan QR codes';
infoPlist['NSMicrophoneUsageDescription'] = 'App needs your microphone to be able to scan QR codes';
fs.writeFileSync(infoPlistPath, plist.build(infoPlist));

const exec = require('child_process').execSync;

const dependenciesToLink = ['react-native-camera'];

const command = 'node node_modules/react-native/local-cli/cli.js link';

dependenciesToLink.forEach((dependency) => {
  exec(`${command} ${dependency}`);
});
```

Now let's explain the details regarding native dependency linking in `app/scripts/run.js`
  - everything regarding `Info.plist` is added to notify the user that the app is using his camera
  - `dependenciesToLink` is an array that stores all of our native dependencies
  - `command` represents the react-native-cli, used to link native dependencies
  - the final three lines of code make sure each dependency in our array is linked

The reason we create an array is because sometimes our extension will have multiple native dependencies, so instead of making a separate linking command for each, we simply run one `forEach` loop and hand it an array of dependencies.

### Using the Package

Our extension will now have access to everything react-native-camera has to offer. For this example we'll edit `app/screens/QRReaderScreen.js` so that it displays an alert when the camera reads a QR code and the alert message will contain the QR code data.

```javascript{2-4,6-10,12-21,25-28}
#file: app/screens/QRReaderScreen.js
import React, { Component } from 'react';
import { Alert } from 'react-native';
import Camera from 'react-native-camera';
import _ from 'lodash';

export default class QRReaderScreen extends Component {
    constructor(props) {
      super(props);
      this.onBarCodeRead = this.onBarCodeRead.bind(this);
    }

  onBarCodeRead(code) {
      Alert.alert(
        'QR Code Detected',
        code.data,
        [
          {text: 'OK, read it.', onPress: () => console.log('User saw QR Code contents.')},
        ],
        { cancelable: false }
      )
  }

  render() {
    return (
      <Camera
        onBarCodeRead={_.debounce(this.onBarCodeRead, 1000, { leading: true, trailing: false })}
        style={% raw %}{{{% endraw %} flex: 1 }}
      />
    );
  }
}
```

After making these changes, we can push the extension to Shoutem and install it in a new app. Continuing from where we stopped in our terminal:

```ShellSession
$ cd ../..
$ shoutem push
Uploading `QR Reader` extension to Shoutem...
Success!
$ shoutem install --new QRReader
Extension installed
See it in browser: `{{ site.shoutem.builderURL }}/app/{{ site.example.appId }}`
```

Opening the QRReader app in the Builder will show us an app with no Screens, but since we just installed our QR Reader Extension onto the app, we can just add the QRReader screen to it by clicking on the + button next to Screens, going to the Custom category and selecting the QR Reader Extension. Now to test out how it works we'll click "Preview on Device" and use the Shoutem Preview app to scan the QR code.

Once the app is built and begins previewing, we can use it to scan that same QR code and we'll see what it contains. Our QRReader app should tell us it contains a link, similar to this: `https://shoutem.app.link/XuqhO6LfkD?code=XQXxKIl`.
