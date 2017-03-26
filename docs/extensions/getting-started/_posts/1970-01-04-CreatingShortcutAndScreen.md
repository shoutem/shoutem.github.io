---
layout: doc
permalink: /docs/extensions/getting-started/shortcut-and-screen
title: Creating screen and shortcut
section: Getting Started
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

Property `screen` inside of `shortcuts` array references the screen to be opened when user taps on that shortcut inside navigation. When referencing any extension part, we need to say which extension it came from. Full name of extension part follows this structure: `<developer-name>.<extension-name>.<extension-part-name>`. For extension parts within the same extension, use `@.<extension-part-name>` instead. Characters `@.` stands for `<developer-name>.<extension-name>.` of the current extension.

Shoutem CLI also created `app/screens/` folder with `List.js` file:

```javascript
#file: app/screens/List.js
import React, {
  Component
} from 'react';

import {
  Text
} from 'react-native';

export default class List extends Component {
  render() {
    return (
      <Text>Hello World!</Text>
    );
  }
}
```

In React, `Component` specifies its UI in the `render` method.

## Exporting extension parts

Application needs to know where it can find extension parts, so it expects your `app` folder to contain file named `index.js`. This file exports all the extension parts, such as `screens`. You can find more information about extension parts [here]({{ site.baseurl }}/docs/extensions/reference/extension-exports). Current `index.js` looks as follows:

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
<img src='{{ site.baseurl }}/img/getting-started/add-modal-shortcut.png'/>
</p>

> #### Note
> In case you don't see it, refresh the page in browser. 

Click on the `Restaurants`, which will get that shortcut inserted into the navigation.

Start the preview now to check out your app.

> #### Note
> It might take some time while the app preview shows. Every time you change an extension, we need to rebuild app using that extension. Development process is much faster with [local development environment]({{ site.baseurl }}/docs/extensions/tutorials/setting-local-environment), but you're fine without it for passing this tutorial.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-hello-world.png'/>
</p>

You can also get your app on the phone using Mobilizer app. The easiest way to get the Mobilizer on your phone is to scan the QR code from the preview when you click on **PREVIEW ON DEVICE**.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/qr.png'/>
</p>

Our app only has a simple  _Hello World_ screen. Let's put some UI components on the screen.
