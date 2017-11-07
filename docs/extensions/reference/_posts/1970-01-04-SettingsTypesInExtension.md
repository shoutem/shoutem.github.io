---
layout: doc
permalink: /docs/extensions/reference/settings-types
title: Settings types in extension
section: Reference
---

# Settings types in extension

Each extension has 3 different types of settings. App owners manage these settings in _Settings pages_ to customize the functionality of the behaviour of an extension in the app.

##### Extension concepts

Before we dive into settings types, let’s refresh our memory on extension concepts:

- Each extension can have multiple versions, but only one can be installed at a time - that's what we refer to as an `extension installation`.
- An extension can expose multiple shortcuts, and each of them can be added more than once to the app, called `shortcut instances`.
- Each shortcut instance opens a starting screen, which can then open the next screen, and so on.
- Each screen can have multiple representations, called `screen layouts`.

##### Settings pages

Settings pages are web pages written by extension developers, and they appear in Shoutem builder. Their purpose is to enable app owners extension customizations through settings. Check the [tutorial on how to create a settings page]({{ site.url }}/docs/extensions/tutorials/settings-pages-introduction) for more info. Settings pages are exported via the `pages` field in `extension.json` and can be used on 3 different places which determine settings type.

##### Settings types

- `Extension settings` - Single global settings for the extension installation, placed in `settingsPages` in the root of `extension.json`
- `Shortcut settings` - Shortcut instance settings, placed in `adminPages` in the shortcut object
- `Screen settings` - Settings of the layout presented by the screen, placed in `settingsPage` in the screen object.

##### Default settings

Each settings can have its default value. The default value is defined in `settings` field, which is adjacent to `settingsPage(s)` or `adminPages` fields, for every settings type.

Applying default settings is determined by settings type:
- default `extension settings` are applied when installing extension into the app
- default `shortcut settings` are defined when adding a shortcut (screen) into the app structure
- default `screen settings` are defined when adding a shortcut (screen) into the app structure

Updating the default settings in `extension.json` **will not** update the default settings in that extension part if those were aready applied. For instance, if you already added shortcut instance (created from some shortcut), default settings of that shortcut won't be updated if you update them in `extension.json` and push the new version to Shoutem. However, if you add another shortcut instance, that instance will have the latest default settings from `extension.json`.

##### Manipulation of settings

Settings can be manipulated using the [@shoutem/api-sdk]({{ site.url }}/docs/coming-soon) package. See [Writting settings pages]({{ site.url }}/docs/extensions/tutorials/settings-pages-introduction) tutorial on how to do that.

> #### Note
> The below documentation is outdated and will be updated once `api-sdk` tool is finished. This is in progress.

## Extension settings

Extension settings are global settings shared throughout all extension parts within an extension installation.

##### Place

```JSON{6-21}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "platform": "1.0.*",
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

Settings pages meant for manipulating extension settings can be found in the `Extensions` tab for that extension. We call them `extension settings pages`.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/extension-tab-extension-restaurants-settings.png'/>
</p>

##### Server side

Properties received to the root extension settings page component are:

- `extension`: Extension object with fields:
  - `name`: Extension name
  - `version`: Extension version
  - `title`: Extension title
  - `settings`: Extension global settings

To set extension settings, use `setExtensionSettings` from `@shoutem/builder-sdk`. Although extension settings can be manipulated from any settings page, for maximum user experience, do it only in extension settings pages.

##### Client side

Each screen that is connected to the state can access extension settings. They can be found in `props`, specifically in `props.extension.settings`.

## Shortcut settings

Shortcut settings are settings shared throughout all the screens that were navigated to from the starting screen of the shortcut instance.

##### Place

```JSON{10-22,28-30}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "platform": "1.0.*",
  "shortcuts": [{
    "name": "List",
    "title": "Restaurants",
    "screen": "@.list",
    "adminPages": [{
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

Settings pages meant for manipulating shortcut settings can be found next to app structure in the `Screens` tab.  We call them `shortcut settings pages`. Namely, for this example, there should be `Content` and `Settings`.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/screens-tab-extension-restaurants-settings.png'/>
</p>

##### Server side

Properties received to root shortcut settings page component are:

- `extension`: Extension object with fields:
  - `name`: Extension name
  - `version`: Extension version
  - `title`: Extension title
  - `settings`: Extension global settings
- `shortcut`: Shortcut instance object with fields:
  - `name`: A shortcut's name
  - `title`: A shortcut's title
  - `settings`: A shortcut instance settings
  - `screens`: Array of screen objects, each containing:
    - `type`: Type of screen that has layouts (that's original screen's name)
    - `name`: Name of the layout that will be shown
    - `settings`: Screen settings (shared among all layouts)

To set extension settings, use `setShortcutSettings` from `@shoutem/builder-sdk`. Although shortcut settings can be manipulated from both the shortcut and the screen settings page, for maximum user experience, do it only from the shortcut settings pages.

##### Client side

Each screen that is connected to the state can access shortcut settings. They can be found in `props`, specifically in `props.shortcut.settings`.


## Screen settings

Screen settings are layouts settings that hold information specific for that layout. Check the [tutorial for screen layouts]({{ site.url }}/docs/extensions/tutorials/screen-layouts) to get a better understanding on difference between screen and layouts.

##### Place

```JSON{14-20,25-31,33-37}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "platform": "1.0.*",
  "shortcuts": [{
    "name": "List",
    "title": "Restaurants",
    "screen": "@.list"
  }],
  "screens": [{
    "name": "list",
    "title": "List of restaurants",
    "settingsPage": {
      "title": "Settings",
      "page": "@.ListSettings"
    },
    "settings": {
      "groupByStartingLetter": false
    }
  }, {
    "name": "grid",
    "extends": "@.list",
    "title": "Grid of restaurants",
    "settingsPage": {
      "title": "Settings",
      "page": "@.GridSettings"
    },
    "settings": {
      "gridCellsOfSameHeight": true
    }
  }]
  "pages": [{
    "name": "ListSettings"
  }, {
    "name": "GridSettings"
  }],
}
```

There's only 1 settings page per screen for manipulating screen settings. It's located in the `Layout` shortcut settings page, under the layout selector, when that screen is selected as the desired layout.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/screens-tab-extension-restaurants-layout-settings.png'/>
</p>

##### Server side

Properties received to root shortcut settings page component are:

- `extension`: Extension object with fields:
  - `name`: Extension name
  - `version`: Extension version
  - `title`: Extension title
  - `settings`: Extension global settings
- `shortcut`: Shortcut instance object with fields:
  - `name`: A shortcut's name
  - `title`: A shortcut's title
  - `settings`: Shortcut instance settings
  - `screens`: Array of screen objects, each containing:
    - `type`: Type of screen that has layouts (that's original screen's name)
    - `name`: Name of the layout that will be shown
    - `settings`: Screen settings (shared among all layouts)
- `screen`: Screen object with fields:
  - `name`: Screen's name (which is also currently active layout screen)
  - `title`: Screen's title
  - `settings`: Screen settings (shared among all layouts)

To set screen settings in settings page, use `setScreenSettings` from `@shoutem/builder-sdk`. Screen settings can only be manipulated in screen settings page and using these functions elsewhere will fail. Notice that `settings` inside of `screen` are in shared namespace, which means that multiple screens which act as different layouts share these settings. If keeping separate namespace per screen is important for you, you can save the settings under key of screen `name`.

##### Client side

Each screen connected to the state can access shortcut layouts settings. They can be found in `props`, specifically in `props.screen.settings`.
