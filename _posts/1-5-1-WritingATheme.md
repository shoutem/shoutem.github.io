---
layout: doc
permalink: /docs/extensions/tutorials/writing-a-theme
title: Writing a theme
section: Tutorials
---

# Writing a theme

When creating an app, admins will want to have the same unique look across the whole app. For such purpose, developers can create a **theme** to create styling rules for components in their extension. However, admins will sometimes want to adjust some style of the app, like text color or font throughout the whole application. To achieve that, they can change or customize a theme through **theme variables**. Let's write a theme, an extension part exported in `extension.json`.

This tutorial continues on [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction). If you don't have an app which is result from Getting started chapter, find the `Restaurants` extension on [Github](/docs/coming-soon), install it onto new app and fill with some restaurants.

## Creating a theme

Theme can be created in the new extension, but also within the existing Restaurants extension too. So, let's do that! Locate to `Restaurants` extension:

```ShellSession
$ cd Restaurants
```

Create a theme and fill it with basic data:

```ShellSession
$ shoutem theme add rounded
Enter information about your theme. Press `return` to accept (default) values.
Title: (Rounded)
Description: Making pictures rounded

File `app/themes/rounded.js` is created.
File `server/theme-variables/rounded.js` is created.
```

Extension file was just modified:

```JSON{28-38}
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
    "screen": "@.RestaurantsList",
    "adminPages": [{
      "page": "shoutem.admin.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "@.Restaurants"
      }
    }]
  }],
  "screens": [{
    "name": "RestaurantsList"
  }, {
    "name": "RestaurantDetails"
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/schemas/Restaurants.json"
  }],
  "themes": [{
    "name": "rounded",
    "title": "Rounded",
    "variables": "@.rounded"
    "description": "Making pictures rounded",
    "showcase": ""
  }],
  "themeVariables": [{
    "name": "rubicon",
    "path": "server/variables-schema/rubicon.json"
  }]
}
```

Check `app/themes/rounded.js` file. This file looks [as follows](#todo). It's basically a copy of Rubicon theme.

Property `showcase`, which is empty, is an array of images and videos that will showcase your theme. Download prepared [showcase](/docs/coming-soon) and copy it to `server/assets` folder. Now change `showcase` to:

```js
    "showcase": ["video.mp4", "list.png", "details.png"]
```

Now, push this theme. This might take a while, as you need to upload showcase too:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to Extensions tab now. Find your theme under My extensions, once you click on `+`.

[Picture]

Install it.

Navigate now to `Theme`. Selected theme is `Rubicon`, but click the `Change theme` button. Finally, you can see your theme here. Once you select it, you'll see it's showcase.

[Picture]

Activate the theme.

Check now the `Customize theme` tab.

[Picture]

Here admin can customize your theme through theme variables. These variables are contained in `server/variables/schema/rubicon.json`.

## How theme works

Now that we went through basics, let's explain how theme works. Theme is a set of styling rules that customize the components connected to the theme. These components we call `customizable components`. 


