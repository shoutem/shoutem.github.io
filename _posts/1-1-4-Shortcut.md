---
layout: doc
permalink: /docs/getting-started/shortcut
---

# Creating Shortcut
<hr />

Entry points of extensions are defined by shortcuts, which usually specify which screen will be opened first. Extensions can expose more shortcuts. You can see it as a starting point of some extension unit, e.g. feature - functional unit of your extension. Let's now create a shortcut.

```ShellSession
$ shoutem create shortcut OpenRestaurantsList
Enter shortcut's informations.
Title: List of restaurants
Description: Allow users to browse through list of restaurants
`OpenRestaurantsList` shortcut is created.
```

Your `extension.json` was just modified:

```json
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",

  "title": "Restaurants",
  "description": "Show the cool restaurants!",
  "shortcuts": [{
    "name": "OpenRestaurantsList",
    "action": "dev-name.restaurants.openRestaurantsList",
    "title": "List of restaurants",
    "description": "Allow users to browse through list of restaurants"
  }]
}
```

Notice that object in `shortcuts` has property `name`, which identifies the class of that Shortcut and `action`, which represents the action that will be triggered when shortcut is tapped. In the `name` property, use **relative name** to define an extension part. In properties like `action`, where extension part is referenced, use **absolute name**. That's why under `action` property, we're having `dev-name.restaurant-extension.openRestaurantsList` value instead of only `openRestaurantsList`. Absolute name of extension part follows this structure: `{developerName}.{extensionName}.{extensionPartName}`.

In your `extension.json`, CLI already put your developer name to `dev-name` in this snippet, so you don't need to change anything.

## Exporting extension parts

Application needs to know where it can find extension parts. To give you freedom to use any folder structure for your extension, we expect your `app` folder to contain file named `index.js` which exports all the extension parts, such as:

- actions,
- reducer,
- screens,
- middleware and
- application lifecycle methods.

The two latter we won't use in this tutorial, but you can find more information on these [here](/docs/coming-soon). Current `index.js` looks as follows:

```JSX
#file: app/index.js
// Constants `screens`, `actions` and `reducer` are exported via named export
// It is important to use those exact names

export const screens = {};

export const actions = {};

export const reducer = {};
```

We'll store our actions in `actions.js` file, but as already mentioned, you can have any folder structure. Create `actions.js` file in `app` folder with this content:

```JSX
#file: app/actions.js
export function openRestaurantsList(shortcut) {
  // implement an action that will open up a screen
}
```

Actions are nothing else than JavaScript functions. Some actions are used to open `Screen` and some are used as `Redux actions`, to change the store. Export that action inside of `app/index.js` file:

```javascript{1,4}
#file: app/index.js
import * as actions from './actions';
export const screens = {};

export actions;

export const reducer = {};
```

Finally:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Shoutem Builder` and click on `Screens`. Try checking `Add` modal now. You can finally see your `extension` there. Moreover, you can see it's shortcut that it's exposing:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-modal-shortcut.png'/>
</p>

Try clicking now on `List of restaurants` in `Add` modal. Shotcut is inserted into app navigation, but nothing else happens! That's exactly what `openRestaurantsList` action does - nothing. Let's change that so it opens `Screen`.
