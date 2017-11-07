---
layout: doc
permalink: /docs/extensions/reference/extension
title: Extension file format
section: Reference
---

# Extension file format

The main file that describes every extension is `extension.json`, which is located in the root folder of the extension.

## Structure of extension.json

Following structure shows only `root` fields of the extension.json. Detailed description about each of those fields is below.

```json
{
  // required
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",

  // recommended
  "title": "Restaurants",
  "description": "List restaurants in your app",
  "website": "https://www.shoutem.com/restaurants",
  "icon": "server/assets/extension/icon.png",

  // optional
  "settingsPages": [{...}],
  "settings": {...},

  // optional exports (extension parts)
  "shortcuts": [{...}],
  "screens": [{...}],
  "dataSchemas": [{...}],
  "pages": [{...}],
  "themes": [{...}],
  "themeVariables": [{...}]
}
```

## Defining and referencing extension parts

As you see in _Structure of extension.json_ chapter, extension exports multiple extension parts (shortcuts, screens, dataSchemas, pages, themes, themeVariables). In order to be able to use these extension parts, we need to define them, so we can later reference them in other parts. Defining is done in `name` field which value needs to be unique for that extension part (name `List` can be only used for 1 shortcut, but also for 1 screen, etc.).

On the other hand, when referencing extension parts, fully qualified name needs to be used. Fully qualified name of **extension** is done by prefixing `<developer-name>.` to `name` field (for `restaurants` extension developed by `shoutem`, extension would have unique identifier `shoutem.restaurants`). Fully qualified name of **extension parts** is done by suffixing `<developer-name>.<extension-name>.` with the unique identifier for that extension part, e.g. `shoutem.restaurants.List` for shortcut. If you're referencing the extension part from within the same extension, use `@.` instead of `<developer-name>.<extension-name>.` (e.g. `@.List`).


## Fields

Here you can find field explanations in the same order fields appeared in the upper example:

#### name

Required field. Defines extension's identity. Must be unique among your extensions and not longer than 32 characters.

#### version

Required field. Version of your extension.

#### platform

Required field. Version of [Shoutem platform]({{ site.url }}/docs/extensions/reference/platform), which defines versions of React, React Native, Redux and some other packages.

#### title

Title of your extension.

#### description

Description of your extension.

#### website

Website that promotes your extension.

#### icon

Path to extension's icon that will be present in Shoutem Extension Market. Store the icon in `server` asset's folder, as it will be used on Shoutem's server side.

#### settingsPages

Array of [extension settings pages]({{ site.url }}/docs/extensions/reference/settings-types) used to manage the global settings of the extension.

```json
[{
  // required
  "page": "@.Settings",

  // recommended
  "title": "Settings",

  // optional
  "parameters": {
    "any-parameter": "any-value"  
  }
}]
```

Each object in settings pages array, settings page object, consist of these fields:

- `page`: Required field, references the extension page
- `title`: Title of extension page
- `parameters`: Dictionary of arbitrary key/value pairs that will be passed to extension settings page

#### settings

Dictionary of arbitrary key/value pairs that represent **default** extensions's settings passed to settings pages objects.

```json
{
  "any-parameter": "any-value"  
}
```

#### shortcuts

[Shortcuts]({{ site.url }}/docs/extensions/my-first-extension/shortcut-and-screen) are links to the starting screen of your extension. Format:

```json
[{
  // required
  "name": "List",

  // required (pick one)
  "screen": "@.List",
  "action": "@.visitRestaurants"

  // recommended
  "title": "Restaurants",
  "description": "Allow users...",
  "icon": "server/assets/shortcuts/restaurants-list.png",

  // optional
  "type": "navigation",
  "adminPages": [{
    // required
    "page": "@.CmsPage",

    // recommended
    "title": "Content",

    // optional
    "parameters": {
      "schema": "@.Restaurants"
    },
  }],
  "settings": {
    "any-parameter": "any-value"
  }
}]
```

Each object in shortcuts array, shortcut object, consists of these fields:

- `name`: Required field, defines shortcut's identity
- `screen/action`: Shortcut can either open a `Screen` or call an `Action` (see example in [Shoutem Auth](https://github.com/shoutem/extensions/blob/master/shoutem-auth/extension.json) extension)
- `title`: Shortcut's title
- `description`: Shortcut's description
- `icon`: Path to shortcut's icon that will be shown in builder. Store in `server` asset's folder
- `type`: Indicates the type of shortcut. It can be `navigation` or `undefined`. If `navigation`, it will be possible to nest other shortcuts below the current
- `adminPages`: Array of shortcut's admin pages. Admin page object inside of array consists of:
  - `page`: Required field, references a [settings page]({{ site.url }}/docs/extensions/tutorials/settings-pages-introduction)
  - `title`: Title of admin page
  - `parameters` Dictionary of arbitrary key/value pairs that will be passed to admin page instance
- `settings`: Dictionary of arbitrary key/value pairs that represent default Shortcut's settings passed to admin pages


#### screens

Screens are nothing more than React components which represent full mobile screen. Format:

```json
[{
  // required
  "name": "List",

  // recommended
  "title": "List",
  "image": "server/assets/screens/restaurants-list.png",

  // optional
  "navigatesTo": [{
    "details": "@.Details"
  }],
  "settingsPage": {
    // required
    "page": "@.List",

    // optional
    "parameters": {
      "any-parameter": "any-value"  
    }
  },
  "settings": {
    "any-parameter": "any-value"
  }
}, {
  "name": "Grid",
  "title": "Grid",
  "image": "server/assets/screens/restaurants-grid.png",
  "extends": "@.List",
  "settingsPage": {
    "page": "@.List",
    "parameters": {
      "any-parameter": "any-value"  
    }
  },
}]
```

Each object in screens array, screen object, consists of these fields:

- `name`: Required field, defines screen's identity
- `title`: Screen's title that will be shown in [layout selector]({{ site.url }}/docs/extensions/tutorials/screen-layouts)
- `image`: Path to screen's image that shows it's layout
- `navigatesTo`: Array of key/value pairs that indicates to which screens the current one can navigate to
- `settingsPage`: Screen's settings page. Object consists of:
  - `page`: Required field, references an [settings page]({{ site.url }}/docs/extensions/tutorials/settings-pages-introduction)
  - `parameters`: Dictionary of arbitrary key/value pairs that will be passed to settings page instance
- `settings`: Dictionary of arbitrary key/value pairs that represent default Shortcut's settings passed to admin pages
- `extends`: References screen that the current one is extending

In the example above, we included 2 screen objects inside of the `screens` array. We wanted to show you the usage of `extends` field. Extending makes it possible to [switch between multiple screen layouts]({{ site.url }}/docs/extensions/tutorials/screen-layouts).


#### dataSchemas

[Data Schemas]({{ site.url }}/docs/extensions/my-first-extension/using-cloud-storage) are Shoutem-flavored [JSON Schemas](http://json-schema.org/) which describe data stored on Shoutem's CMS.

```json
[{
  // required
  "name": "Restaurants",
  "path": "server/data-schemas/restaurants.json"
}]
```

Each object in data schemas array, data schema object, consists of these fields:

- `name`: Required field, defines data schema's identity
- `path`: Required field, path to actual schema implementation. Should be stored in `server` folder


#### pages

[Settings pages]({{ site.url }}/docs/extensions/reference/settings-types) are web pages written by extension developers. They can be used to manage 3 different types of settings:

- global settings of the extensions (referenced from `settingsPages` in the root of extension.json)
- settings of the shortcut instance (referenced from `adminPages` in the shortcut object)
- settings of the screen (referenced from `settingsPage` in the screen object)

```json
[{
  // required
  "name": "List",
  "type": "html",
  "path": "server/assets/pages/tab-bar/index.html"
}],
```

Each object in pages array, extensions page object, consists of these fields:

- `name`: Required field, defines extension page's identity
- `type`: Required field, defines type of an extension. Only `html` available for now
- `path`: Required field, path to actual extension page implementation. Should be stored in `server` folder


#### themes

[Themes]({{ site.url }}/docs/extensions/tutorials/writing-a-theme) represent files where you can provide set of styles for your UI components.

```json
[{
  // required
  "name": "Rubicon",

  // recommended
  "title": "Rubicon",
  "description": "Rubicon is a beautiful template built...",
  "showcase": ["server/assets/theme/rubicon.mp4","server/assets/theme/rubicon1.jpg", "server/assets/theme/rubicon2.jpg", "server/assets/theme/rubicon3.jpg"],

  // optional
  "icons": "app/themes/Rubicon/assets/icons/",
  "themeVariables": "@.Rubicon"
}]
```

Each object in themes array, theme object, consists of these fields:

- `name`: Required field, defines theme's identity
- `title`: Theme's title
- `description:` Theme's description
- `showcase`: Array of strings which represent paths to multimedia files in `server` folder, such as videos and images, which present your theme. Dimensions for @2x quality resolution are 750 × 1334.
- `icons`: Path to icons of theme, should be stored in `app` asset's folder
- `variables`: Reference to variables used by theme

#### themeVariables

Theme variables are used to define the structure of the variables used by theme. These variables can be used to customize the theme.

```json
[{
  // required
  "name": "Rubicon",
  "path": "server/themes/rubiconVariables.json"
}]
```

Each object in theme variables array, theme variables object, consists of these fields:

- `name`: Required field, defines theme variables name
- `path`: Required field, path to actual theme variables implementation. Should be stored in `server` folder


## Full example of extension.json

Finally, here's the full example of extension.json:

```json
{
  "shoutem": "1.0",
  "name": "restaurants",
  "version": "0.0.1",

  "title": "Restaurants",
  "website": "https://extensions.shoutem.com/shoutem.navigation",
  "description": "Make your users rate products.",
  "icon": "server/assets/extension/icon.png",
  "defaultLocale": "en",
  "settingsPages": [{
    "page": "@.settings",
    "title": "Settings",
  }],
  "settings": {
    "any-parameter": "any-value"
  },

  "shortcuts": [{
    "name": "List",
    "title": "Restaurants",
    "description": "Allow users...",
    "screen": "@.list",
    "icon": "theme://events.png",
    "adminPages": [{
      "page": "@.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "@.Restaurants"
      },
    }],
    "settings": {
      "any-parameter": "any-value"
    }
  }],

  "screens": [{
    "name": "List",
    "title": "List",
    "image": "server/assets/screens/restaurants-list.png",
    "navigatesTo": [{
      "details": "@.Details"
    }]
  }, {
    "name": "Grid",
    "title": "Grid",
    "image": "server/assets/screens/restaurants-grid.png",
    "extends": "@.List",
  }, {
    "name": "Details",
    "title": "Details",
  }],

  "pages": [{
    "name": "settings",
    "path": "server/assets/settings/settings/index.html",
  }],

  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/data-schemas/restaurants.json"
  }],

  "themes": [{
    "name": "Rubicon",
    "title": "Rubicon",
    "variables": "@.Rubicon",
    "description": "Rubicon is a beautiful template built...",
    "showcase": ["server/assets/theme/rubicon.mp4","server/assets/theme/rubicon1.jpg", "server/assets/theme/rubicon2.jpg", "server/assets/theme/rubicon3.jpg"],
    "icons": "app/themes/Rubicon/assets/icons/"
  }, {
    "name": "Arno",
    "title": "Arno",
    "variables": "@.Rubicon",
    "description": "Arno is a beautiful template built...",
    "showcase": ["server/assets/theme/arno1.jpg", "server/assets/theme/arno2.jpg"],
    "icons": "app/themes/Arno/assets/icons/"
  }],

  "themeVariables": [{
    "name": "Rubicon",
    "path": "server/themes/rubiconVariables.json"
  }]
}
```
