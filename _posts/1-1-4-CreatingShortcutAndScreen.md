---
layout: doc
permalink: /docs/extensions/getting-started/shortcut-and-screen
title: Creating screen and shortcut
section: Getting Started
---

# Creating screen and shortcut
<hr />

Extension can have multiple screens in the app. Screens are [React components](https://facebook.github.io/react/docs/react-component.html) that represent a mobile screen. We want our extension to have 2 screens: one for the list of the restaurants and another for the details of one particular restaurant.

Since app needs to know which screen it needs to open first for some extension, we need to create a ***shortcut*** along with creating a screen. Shortcut is a link to the starting screen of the extension. List of the restaurants is going to be the first screen, so let's create it with shortcut:

```ShellSession
$ shoutem screen add List --shortcut Restaurants
Enter shortcut information:
Title: Restaurants

Screen `List` is created in file `app/screens/List.js`!
Shortcut `Restaurants` is created.
File `extension.json` was modified.
File `app/extension.js` was modified.
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

Screen and shortcut were added to `extension.json` inside arrays. Property `name` uniquely identifies these extension parts. Shortcut's title is what will be shown in the app navigation.

Property `screen` inside of `shortcuts` array references the screen to be opened when shortcut is tapped inside navigation. When referencing any extension part, we need to say from which extension it came from. Full name of extension part follows this structure: `<developer-name>.<extension-name>.<extension-part-name>`. For extension parts within the same extension, use `@.<extension-part-name>` instead. Character `@.` stands for `<developer-name>.<extension-name>.` of the current extension.

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

In React, `Component` specifies its UI in `render` method.

## Exporting extension parts

Application needs to know where it can find extension parts, so it expects your `app` folder to contain file named `index.js`. This file exports all the extension parts, such as `screens` and `reducer`. You can find more information about extension parts [here]({{ site.baseurl }}/docs/extensions/reference/extension-exports). Current `index.js` looks as follows:

```JSX
#file: app/index.js
// Reference for app/index.js can be found here:
// http://shoutem.github.io/docs/extensions/reference/extension-exports

import * as extension from './extension.js';

export const screens = extension.screens;
```

On the other hand, `app/extension.js` file is managed by CLI and you should not change it. CLI locates the screens upon creating them, so you don't need to export them manually in `app/index.js`.

Upload your extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Screens` in [Shoutem builder](/docs/coming-soon) and click on `+`. You can finally see your `Restaurants` screen there.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-modal-shortcut.png'/>
</p>

Click on the `Restaurants`, which will get that screen inserted into navigation.

Start the preview now or check out your app on the phone using Mobilizer app. It might take some time while the app preview shows, since everytime you change extension inside of your app, we need to build a new one.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-hello-world.png'/>
</p>

In the preview, you can see the _Hello World_ screen. Let's put some UI components on the screen.
