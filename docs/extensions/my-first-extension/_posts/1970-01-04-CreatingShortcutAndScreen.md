---
layout: doc
permalink: /docs/extensions/my-first-extension/shortcut-and-screen
title: Creating screen and shortcut
section: My first extension
---

# Creating screen and shortcut
<hr />

Extension can have multiple screens in the app. Screens are [React components](https://facebook.github.io/react/docs/react-component.html) that represent a mobile screen. We want our extension to have 2 screens: one for the list of the restaurants and another for the details of one particular restaurant.

Since app needs to know which screen to open the first for some extension, we need to create a ***shortcut*** alongside with creating a screen. Shortcut is the link to the starting screen of an extension. It's the item in the app navigation which opens the starting screen when user taps on it.

List of the restaurants is going to be the first screen, so let's create it with shortcut:

```ShellSession
$ shoutem screen add List --shortcut Restaurants
Enter shortcut information:
Title: Restaurants

Screen `List` is created in file `app/screens/List.js`!
Shortcut `Restaurants` is created.
Shortcut `Restaurants` opens `List` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Your `extension.json` was just modified:

```json{7-14}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants",
  "screens": [{
    "name": "List"
  }],
  "shortcuts": [{
    "name": "Restaurants",
    "title": "Restaurants"
    "screen": "@.List"
  }]
}
```

Screen and shortcut were added to `extension.json` inside arrays. Property `name` uniquely identifies these extension parts. Shortcut's `title` is what will be shown in the app navigation.

Property `screen` inside of `shortcuts` array references the screen to be opened when user taps on that shortcut inside navigation. When referencing any extension part, we need to say which extension it came from. Full name of extension part follows this structure: `<developer-name>.<extension-name>.<extension-part-name>` (e.g. `{{ site.example.devName }}.restaurants.List)`. For extension parts within the same extension, use `@.<extension-part-name>` instead (e.g. `@.List`). Characters `@.` stands for `<developer-name>.<extension-name>.` of the current extension.

Shoutem CLI also created `app/screens/` folder with `List.js` file:

```javascript
#file: app/screens/List.js
import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class List extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
      </View>
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
    fontSize: 20,
  },
});
```

In React, `Component` specifies its UI in the `render` method.

## Extension in the app

The `app` folder from your extension will be bundled with the rest of extensions into the app. If your extension uses some `npm` package, install it inside the `app` folder. Below is an example of installing [React Native swiper](https://github.com/leecade/react-native-swiper) (just an example, no need to execute following 2 commands).

Locate to the `app` folder and install the package with saving the dependency in the `package.json`:

```ShellSession
$ cd app/
$ npm install --save react-native-swiper
```

This package would be installed upon bundling your extension into the app. You would be able to access it in any file in the `app` folder.

## Exporting extension parts

App expects extensions to export their parts (e.g. screens) in `app/index.js` file (standard JS practice). Extensions are like libraries and other extensions can reuse what they export from `app/index.js`. The convention is that `app/index.js` is public API of an extension and shouldn't be changed quite often.

Current `index.js` looks as follows:

```JSX
#file: app/index.js
// Reference for app/index.js can be found here:
// http://shoutem.github.io/docs/extensions/reference/extension-exports

import * as extension from './extension.js';

export const screens = extension.screens;
```

On the other hand, `app/extension.js` file is managed by CLI and you should not change it. When creating screens, CLI writes their location in the `app/extension.js` which are exported in `app/index.js`.

Upload your extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Custom` under `Add Screen` modal in Shoutem builder. You can finally see your `Restaurants` starting screen (shortcut) there. 

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/add-modal-shortcut.png'/>
</p>

> #### Note
> In case you don't see it, refresh the page in browser. 

Click on the `Restaurants`, which will get that shortcut inserted into the navigation.

Let's preview our app now. We can preview it in the Builder, but it might take some time while the app preview shows. Every time you change an extension, we need to rebundle the whole app to the new extension. It's much faster to use [Shoutem Preview app]({{ site.shoutem.previewApp }}) and Shoutem CLI, which can bundle only the changes in the extension.

Since the app is managed through the Builder, we needed to `push` the extension to Shoutem after creating screen and shortcut to add them to app navigation. However, when we're only changing the app code, we don't need to the `push`ing. Instead, use `shoutem link` to tell Shoutem CLI to bundle local code of your extension.

```ShellSession
$ shoutem link
Extension successfully linked. Please, kill the packager before running the app.
```

Once extension is linked, run the app which will start the [React Native packager](https://github.com/facebook/react-native/tree/master/packager):

```ShellSession
$ shoutem run
Select your app: Restaurants ({{ site.example.appId }})
Creating the bundle for your app...
...
```

This will output the QR code which you should scan with the Shoutem Preview app.

> #### Note
> In the documentation the preview in the Builder will be screenshot, instead of screenshot from the Preview app. This way you'll see the state of the web interface as well. If you only change your app code, just shake your phone with the Shoutem Preview app on and tap the "Reload" button. If you `link` your extension, you won't need to do `shoutem push` everytime you change the app code.

This is the result:

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/extension-hello-world.png'/>
</p>

Our app only has a simple  _Hello World_ screen. Let's put some UI components on the screen.
