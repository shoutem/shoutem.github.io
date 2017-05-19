---
layout: doc
permalink: /docs/extensions/tutorials/installing-3rd-party-native-packages
title: Installing 3rd Party Package
section: Tutorials
---

# Installing a 3rd Party Package
<hr />

This tutorial will show you how to install a 3rd party package into an extension and through that into the entire app. For an example we're going to use [react-native-swiper](https://github.com/leecade/react-native-swiper).

## Making an extension

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

## Installing the Package

There's two different ways you can do this. One is to manually install the package into the extension using `npm install react-native-swiper --save` in the `app` directory:

```ShellSession
$ cd app
$ npm install react-native-swiper --save
{{ site.example.devName }}.swiper-extension@0.0.1 /absolute/path/swiper-extension/app
└── react-native-swiper@1.5.4
```

Doing this will automatically add react-native-swiper as a dependency in our `app/package.json` file:

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

The other way of doing this is to simply add that dependency we see in the `app/package.json` file, which result with react-native-swiper being installed without us manually doing it.

## Using the Package

Our extension now has full access to everything react-native-swiper has to offer, so let's make use of it's simplest example to show how it works. We'll have to edit our `app/screens/SwiperScreen.js` file to use the Swiper by importing the Swiper component, changing the `render();` method to use the Swiper component and making some changes to the `styles` constant so our Swiper component can function properly.

```javascript{11,16-26,37-61}
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

And there we go, we implemented react-native-swiper, a 3rd party package, into our extension and through the extension, into the entire app! Now we need to push our extension to the Shoutem server and install it onto an app so we can actually test it out. Continuing where we stopped in our terminal:

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
