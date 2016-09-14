---
layout: doc
permalink: /docs/extensions/tutorials/writing-a-theme
title: Writing a theme
section: Tutorials
---

# Writing a theme

This tutorial continues on [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction). Find the `Restaurants` extension on [Github](/docs/coming-soon) and install it onto new app.

When creating an app, admins will most often want to adjust style of the app, like text color or font throughout the whole application. To achieve that, they can change or customize a theme. Theme is an extension part that is exported in `extension.json`.

## Creating a theme

Theme can be created in the new extension, but also within the existing Restaurants extension too. So, let's do that:

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
```

Extension file was just modified:

```JSON{28-33}
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
    "description": "Making pictures rounded",
    "showcase": ""
  }]
}
```

Showcase is empty, that's the file that will represent your theme in the builder. Download prepared [showcase](/docs/coming-soon) to empty 