---
layout: doc
permalink: /docs/extensions/getting-started/shortcut-and-screen
title: Creating shortcut and screen
section: Getting Started
---

# Creating shortcut and screen
<hr />

The easiest way to understand what shortcuts are, is to think of them as **links** to the starting screen of your extension. These links will be used to navigate to your extension from any part of the application. Extensions can expose multiple shortcuts. Let's create one now.

```ShellSession
$ shoutem shortcut add openRestaurantsList
Enter shortcut information.
Title: Restaurants
Description: Enable users to browse through list of restaurants

`openRestaurantsList` shortcut is created.
```

Your `extension.json` was just modified:

```json{7-11}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{
    "name": "openRestaurantsList",
    "title": "Restaurants",
    "description": "Enable users to browse through list of restaurants"
  }]
}
```

Let's add a screen now. Screens are React components that represent a mobile screen.

### Creating list screen

Create a new screen:

```ShellSession
$ shoutem screen add RestaurantsList
File `app/screens/RestaurantsList.js` is created.
```

Screen definition was appended to extension.json.

```json{12-14}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{
    "name": "openRestaurantsList",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants"
  }],
  "screens": [{
    "name": "RestaurantsList"
  }]
}
```

Shoutem CLI also created `app/screens/` folder with `RestaurantsList.js` file:

```javascript
#file: app/screens/RestaurantList.js
import React, {
  Component
} from 'react';
import {
  Text
} from 'react-native';

export default class RestaurantsList extends Component {
  render() {
    return (
      <Text>Hello World!</Text>
    );
  }
}
```

In React, `Component` specifies its UI in `render` method. Now when the screen is created, we need to manually connect it to shortcut in extension.json.

```json{11}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{
    "name": "openRestaurantsList",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants",
    "screen": "@.RestaurantsList"
  }],
  "screens": [{
    "name": "RestaurantsList"
  }]
}
```

Notice that object in `shortcuts` has property `name`, which identifies it and `screen`, which represents the screen to be opened when shortcut is tapped. In the `name` property, use **relative name** to define an extension part. In properties like `screen`, where some extension part is referenced, use **absolute name**. Absolute name of extension part follows this structure: `{developerName}.{extensionName}.{extensionPartName}`. However, for parts of the current extension, you can simply use `@.{extensionPartName}` instead. Characters `@.` replace your `{developerName}.{extensionName}.`.

## Exporting extension parts

Application needs to know where it can find extension parts. To give you freedom to use any folder structure for your extension, we expect your `app` folder to contain file named `index.js` which exports all the extension parts, such as:

- screens,
- reducer,
- actions,
- middleware and
- application lifecycle methods.

We won't use the last three in this tutorial, but you can find more information [here](/docs/coming-soon). Current `index.js` looks as follows:

```JSX
#file: app/index.js
// Constants `screens` and `reducer` are exported via named export
// It is important to use those exact names

export const screens = {};

export const reducer = {};
```

Manually export created screen in `app/index.js`.

```javascript{1,4}
#file: app/index.js
import RestaurantsList from './screens/RestaurantsList.js'

export const screens = {
  RestaurantsList
};

export const reducer = {};
```

Upload your extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Screens` in [Shoutem builder](/docs/coming-soon) and click on `+`. You can finally see your `Restaurants` extension there. If extension has more shortcuts, you can see them when you hover over the extension.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-modal-shortcut.png'/>
</p>

Click on the `Restaurants` extension. Shortcut is inserted into app navigation.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-hello-world.png'/>
</p>

In the preview, you can see the _Hello World_ screen. Let's put some UI components on the screen.
