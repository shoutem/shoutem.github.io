---
layout: doc
permalink: /docs/extensions/reference/settings-types
title: Settings types in extension
section: Reference
---

# Settings types in extension

Each extension has 3 different types of settings that can be used by application owners. Application owners set these settings in _Settings pages_ to customize functionality of the extension.

##### Extension concepts

Before we dive into settings types, let’s refresh our memory extension concepts. Each extension can have multiple versions, but only one can be installed at one point on the app, called `extension installation`. Extension can expose multiple shortcuts and each of them can be added more than once to the app, called `shortcut instances`. These shortcut instances open a starting screen, which can then open the next screen and so on. Each screen can have multiple representations, called `layouts`.

##### Settings pages

Settings pages are web pages that extension developers write and appear in Shoutem builder. Their purpose is to enable application owners to customize extension through settings. Check [tutorial on how to create a settings page](shoutem.github.io/docs/extensions/tutorials/writing-settings-page). Settings pages are exported in `pages` field in `extension.json` and can be used on 3 different places which determine settings type.

##### Settings types

- `Extension settings` - Single global settings for the extension installation, placed in settingsPages in the root of extension.json
- `Shortcut settings` - Shortcut instance settings, placed in settingsPages in the shortcut object
- `Screen settings` - Settings of the layout presented by the screen, placed in settingsPages in the screen object.

##### Default settings

Each settings can have its default value, so you don’t need to check whether setting is undefined. This value is defined in `settings` fields, which is adjacent to `settingsPage(s)` fields, for every settings type.

##### Manipulation of settings

Settings can be manipulated with the functions inside of `@shoutem/builder-sdk` package.

## Extension settings

Extension settings are global settings shared through all extension parts within extension installation.

##### Place

```JSON{6-21}
#file: extension.json
{
  "shoutem": "1.0",
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "settingsPages": [{
    "page": "@.General",
    "title": "General settings",
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

Properties received to the root extension settings page component are:

- `extension`: Extension object with fields:
  - `name`: Name of extension
  - `version`: Version of extension
  - `title`: Title of extension
  - `settings`: Extension global settings

To set extension settings, use `setExtensionSettings` from `@shoutem/builder-sdk`. Although extension settings can be manipulated from any settings page, for maximum user experience, do it only in extension settings pages.

##### Client side

Each screen that is connected to the state can access extension settings. They can be found in `props`, specifically in `props.extension.settings`.

## Shortcut settings

Shortcut settings are settings shared through all the screens navigated from the starting screen of the shortcut instance.

##### Place

```JSON{10-22,28-30}
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

Settings pages meant for manipulating shortcut settings can be found next to app structure in `Screens` tab.  We call them `shortcut settings pages`. Namely, for this example, there should be `Content` and `Settings`.

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