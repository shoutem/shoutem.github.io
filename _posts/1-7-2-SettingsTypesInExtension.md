---
layout: doc
permalink: /docs/extensions/reference/settings-types
title: Settings types in extension
section: Reference
---

# Settings types in extension

Each extension has 3 different types of settings. For writing powerful extension, developers need to leverage the options that these types offer. All the types of the settings in extensions discussed here are meant for admins. Admins set these settings over `Settings pages` to customize some functionality of the extension.

##### Extension concepts

Before we start to dig into types of settings, let's remind ourselves a bit how extensions work. Each extension, defined by `developerName.extensionName` can be installed once on the app, which is called `extension installation`. There could be more versions of this extension, but only one can be installed at one point on the app. Each extension can expose multiple shortcuts. Each of those shortcuts can be added more than once to the app. Each shortcut added in the app is called `shortcut instance`. Shortcut instances, actually the `screen` referenced in `shortcut` object, are the beginning of navigation tree. That screen can open another screen and so on, and that will happen in the same navigation tree until you exit the first first screen. Each screen can have multiple representations, called layouts. Admins decide which layout they want to use in Shoutem builder.

##### Extension types

Now that we passed through extension concepts, we can enlist 3 types of settings with short descriptions:

- `Extension settings` - global settings shared through all screens within extension installation.
- `Shortcut settings` - shared through all the screens in the navigation tree of that shortcut instance.
- `Screen settings` - layout settings of the screen

Place of `settingsPages` (or `settingsPage` for screen settings) field in [extension.json](shoutem.github.io/docs/extensions/reference/extension) determine the type of the settings. These fields come along with `settings` field which can be of arbitrary format and represents default settings for that type.

##### Settings pages

Settings pages are web pages that appear in Shoutem builder which developers of the extensions write. They are used by admins to adjust the certain type of settings. Defining settings page is done in `extension.json` in the `pages` field. To adjust the settings, package `@shoutem/builder-sdk` is used.

Check [Writing settings page](shoutem.github.io/docs/extensions/tutorials/writing-settings-page) tutorial on how to create a settings page.

## Extension settings

Extension settings are global settings shared through all extension parts within extension installation.

##### Place

```JSON{5-15}
#file: extension.json
{
  "shoutem": "1.0",
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "settingsPages": [{
    "page": "@.General",
    "title": "General information",
  }, {
    "page": "@.Sounds",
    "title": "Sounds"
  }],
  "settings": {
    "website": "www.example.com",
    "onRowTapSound": false
  },
  "pages": [{
    "name": "General"
  }, {
    "name": "Sounds"
  }]
}
```

Settings pages meant for manipulating extension settings can be found in `Extensions` tab for that extension. We call them `extension settings pages`.

[PICTURE]

##### Server side

Properties received to root extension settings page component are:

- `extension`: Extension object with fields:
  - `name`: Name of extension
  - `version`: Version of extension
  - `title`: Title of extension
  - `settings`: Extension global settings

To set extension settings, use `setExtensionSettings` from `@shoutem/builder-sdk`. Although extension settings can be manipulated from any settings page, for maximum user experience, do it only in extension settings pages.

##### Client side

Each screen that is connected to the state can access extension settings. They can be found in `props`, specifically in `props.extension.settings`.


## Shortcut settings

Shortcut settings are settings shared through all the screens in the navigation tree of that shortcut instance.

##### Place

```JSON{10-18}
#file: extension.json
{
  "shoutem": "1.0",
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "shortcuts": [{
    "name": "RestaurantsList",
    "title": "Restaurants",
    "screen": "@.list",
    "settingsPages": [{
      "page": "shoutem.cms.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "@.Restaurants"
      },
    }, {
      "page": "@.RestaurantsPage",
      "title": "Settings"
    }],
    "settings": {
      "headerTitle": "RESTAURANTS"
    }
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/schemas/Restaurants.json"
  }],
  "pages": [{
    "name": "RestaurantsPage"
  }],
}
```

Settings pages meant for manipulating shortcut settings can be found next to app structure in `Screens` tab.  We call them `shortcut settings pages`. You can find navigation item for each settings page plus layout page which is always added by Shoutem. Namily, for this example, there should be `Content`, `Settings` and `Layout`. `Layout` is also special layout settings page for changing layouts of the screens.

[PICTURE]

##### Server side

Properties received to root shortcut settings page component are:

- `extension`: Extension object with fields:
  - `name`: Extension's name
  - `version`: Extension's version
  - `title`: Extension's title
  - `settings`: Extension global settings
- `shortcut`: Shortcut instance object with fields:
  - `name`: Shortcut's name
  - `title`: Shortcut's title
  - `settings`: Shortcut instance settings

To set extension settings, use `setShortcutSettings` from `@shoutem/builder-sdk`. Although shortcut settings can be manipulated from any both shortcut and screen settings page, for maximum user experience, do it only in shortcut settings pages.

##### Client side

Each screen that is connected to the state can access shortcut settings. They can be found in `props`, specifically in `props.shortcut.settings`.


## Screen settings

Screen settings are layouts settings that determine how 

##### Place

```JSON{10-18}
#file: extension.json
{
  "shoutem": "1.0",
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "shortcuts": [{
    "name": "RestaurantsList",
    "title": "Restaurants",
    "screen": "@.list"
  }],
  "screens": [{
    "name": "list",
    "title": "List of restaurants",
    "settingsPage": {
      "page": "@.ListSettings"
    },
    "settings": {
      "groupByStartingLetter": false,
    }
  }, {
    "name": "grid",
    "extends": "@.list",
    "title": "Grid of restaurants",
    "settingsPage": {
      "page": "@.GridSettings"
    },
    "settings": {
      "gridCellsOfSameHeight": true,
    }
  }]
  "pages": [{
    "name": "ListSettings"
  }, {
    "name": "GridSettings"
  }],
}
```

There's only 1 settings page per screen for manipulating screen settings. It's located in `Layout` shortcut settings page, under the layout selector, when that screen is selected as desired layout.

[PICTURE]

##### Server side

Properties received to root shortcut settings page component are:

- `extension`: Extension object with fields:
  - `name`: Extension's name
  - `version`: Extension's version
  - `title`: Extension's title
  - `settings`: Extension global settings
- `shortcut`: Shortcut instance object with fields:
  - `name`: Shortcut's name
  - `title`: Shortcut's title
  - `settings`: Shortcut instance settings
- `screen`: Screen object with fields:
  - `name`: Screen's name (which is also currently active layout screen)
  - `title`: Screen's title
  - `settings`: Shared namespace of settings for layouts that replace same screen

To set screen settings in settings page, use `setScreenSettings` from `@shoutem/builder-sdk`. Screen settings can be only manipulated in screen settings page and using these functions elsewhere will fail. Notice that `settings` inside of `screen` are in shared namespace, which means that multiple screens which act as different layouts share these settings. If keeping separate namespace per screen is important for you, you can save the settings under key of screen `name`.

##### Client side

Each screen connected to the state can access shortcut layouts settings. They can be found in `props`, specifically in `props.screen.settings`.