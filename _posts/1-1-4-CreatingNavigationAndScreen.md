---
layout: doc
permalink: /docs/getting-started/navigation-and-screen
title: Creating navigation and screen
section: Getting Started
---

# Creating navigation and screen
<hr />

The easiest way to understand what shortcuts are, is to think of them as links to the starting screen in your extension. These links will be used to navigate to your extension from any part of the application. Extensions can expose more navigation items. Let's now create one.

```ShellSession
$ shoutem shourtcut add openRestaurantsList
Enter shortcut information.
Title: Restaurants
Description: Allow users to browse through list of restaurants

`openRestaurantsList` shortcut is created.
```

Your `extension.json` was just modified:

```json{6-10}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{
    "name": "openRestaurantsList",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants"
  }]
}
```

Upload your extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Navigation` in [Shoutem builder](/docs/coming-soon) and click to `+`. You can finally see your `extension` there. You can see its navigation item that it's exposing.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-modal-shortcut.png'/>
</p>

Try clicking now on `Restaurants` in `Add navigation` modal. Navigation item is inserted into app navigation, but nothing else happens! That's exactly what our navigation item does - nothing. Let's change that so it opens `Screen`.


## Creating screen

Screens are React components which are connected to Redux store, i.e. they have access to complete application's state.

### Creating list screen

Let's create new screen.

```ShellSession
$ shoutem screen add RestaurantsList
File `app/screens/RestaurantsList.js` is created.
```

Screen definition was appended to extension.json.

```json{11-13}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
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

In React, `Component` specifies its UI in `render` method. Now that screen is created, we need to connect it to navigation item in extension.json.

```json{10}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{
    "name": "openRestaurantsList",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants"
    "screen": "[PUT_YOUR_DEV_NAME].restaurants.RestaurantsList",
  }],
  "screens": [{
    "name": "RestaurantsList"
  }]
}
```

Notice that object in `navItems` has property `name`, which identifies the navigation item and `screen`, which represents the screen that will be opened navigation item is tapped. In the `name` property, use **relative name** to define an extension part. In properties like `screen`, where some extension part is referenced, use **absolute name**. That's why under `screen` property, we're having `developer.restaurants.RestaurantsList` value instead of only `RestaurantsList`. Absolute name of extension part follows this structure: `{developerName}.{extensionName}.{extensionPartName}`.

Change `[PUT_YOUR_DEV_NAME]` to your developer name.

> #### Note
> If you forgot what is your developer name, write `shoutem whoami`.

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

Export created screen.

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

Try now tapping to navigation item icon on the preview in [Shoutem Builder](/docs/coming-soon). 

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-hello-world.png'/>
</p>

Great! New screen is opened. Let's fill our screen with UI.
