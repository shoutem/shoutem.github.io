---
layout: doc
permalink: /docs/extensions/my-first-extension/shortcut-and-screen
title: Creating a Screen and Shortcut
section: My first extension
---

# Creating a Screen and Shortcut

Extensions can have multiple screens in the app. Screens are [React components](https://facebook.github.io/react/docs/react-component.html) that represent a mobile screen. We want our Restaurants extension to have 2 screens; one for the list of the restaurants (which we already made in [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started)) and another for the details of each particular restaurant the user taps.

Since the app needs to know which screen to open first for some extension, we need to create a ***shortcut*** when creating that screen. A shortcut is a link to the starting screen of an extension. It's the item in the Main Navigation which opens the starting screen when a user taps on it.

When we created the List screen with a shortcut in [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started) using:

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

The CLI modified the `extension.json` to include the screen and it's shortcut:

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

They were added inside arrays. The `name` property uniquely identifies these extension parts. A shortcut's `title` is what will be shown in the Main Navigation (in the Builder and in the app). The `screen` property inside `shortcuts` references the screen that will open when a user taps on that shortcut in navigation.

When referencing any extension part, we need to say which extension it came from. The full name of extension part follows this structure: `<developer-name>.<extension-name>.<extension-part-name>` (e.g. `{{ site.example.devName }}.restaurants.List)`. For extension parts within the same extension, you can just use `@.<extension-part-name>` (e.g. `@.List`). `@.` stands for `<developer-name>.<extension-name>.` of the current extension.

The Shoutem CLI also created `app/screens/` folder with a `List.js` file, which you edited in [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started).

## How do Extensions fit into an App?

The `app` folder from your extension will be bundled (along with the rest of the extensions your app uses) into the full React Native app. For your extension to use an `npm` package, just install it inside the `app` folder.

Below is an example of installing [React Native swiper](https://github.com/leecade/react-native-swiper) (just an example, no need to execute following 2 commands).

Locate to the `app` folder and install the package with saving the dependency in the `package.json`:

```ShellSession
$ cd app/
$ npm install --save react-native-swiper
```

This package would be installed when bundling your extension into the app. You would be able to access it in any file in the `app` folder.

## Exporting Extension Parts

The app expects extensions to export their parts (e.g. screens) in `app/index.js` (that's standard JS practice). Extensions are like libraries and other extensions can reuse what they export from `app/index.js`. The convention is that `app/index.js` is the public API of an extension and shouldn't be changed often.

The current `index.js` looks like this:

```JSX
#file: app/index.js
// Reference for app/index.js can be found here:
// http://shoutem.github.io/docs/extensions/reference/extension-exports

import * as extension from './extension.js';

export const screens = extension.screens;

export const themes = extension.themes;
```

On the other hand, `app/extension.js` is managed by the CLI and you should not change it. When creating screens, the CLI writes their location in `app/extension.js` which are exported in `app/index.js`.

Let's preview your app now. We can preview it in the Builder, but it might take some time while the app preview shows. Every time you change an extension, we need to rebundle the whole app to the new extension. It's much faster to use **Shoutem Preview** app (available for [iOS]({{ site.shoutem.previewAppiOS }}) and [Android]({{ site.shoutem.previewAppAndroid }})) and Shoutem CLI, which can bundle only the changes made in the extension.

Since the app is managed through the Builder, we needed to `push` the extension to Shoutem after creating a screen and shortcut to add them to app navigation. However, when we're only changing the app code, we don't need to `push`. Instead, we can use `shoutem link` to tell Shoutem CLI to bundle the local code of your extension.

```ShellSession
$ shoutem link
Extension successfully linked. Please, kill the packager before running the app.
```

Once extension is linked, run the app to start the [React Native packager](https://github.com/facebook/react-native/tree/master/packager):

```ShellSession
$ shoutem run
Select your app: Restaurants ({{ site.example.appId }})
Creating the bundle for your app...
...
```

The CLI will print a QR code for you to scan using the Shoutem Preview app, if you don't have the app, you can get it using the link printed above the QR code. After it's installed, the Shoutem Preview app will automatically display your app.

In the tutorial, we'll be using screenshots from the Builder preview, but if you're using the Shoutem Preview app, any app code changes you make can be shown immediately by shaking your phone with the Shoutem Preview app open and tapping the Reload button. This even allows **Windows** users to preview their apps on their physical **iOS** devices!

> #### Note
> In the documentation the preview you see is from the Builder, instead of a screenshot from the Shoutem Preview app. This way you'll see the state of the web interface as well. If you only change your app code, just shake your phone with the Shoutem Preview app on and tap the "Reload" button. You don't have to _push_ the extension unless you want to preview it in the Builder!

This is the result:

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/extension-hello-world.png'/>
</p>

Your app only has a simple Hello World screen that we edited to say "_Lets eat!_". Let's add some [UI components]({{ site.url }}/docs/extensions/my-first-extension/using-ui-toolkit).
