---
layout: doc
permalink: /docs/extensions/tutorials/settings-pages-introduction
title: Settings Pages
section: Tutorials
---

# Settings pages

Settings pages are used to allow the app owner to control the behavior of an extension.

You define all of your settings pages in the `pages` root field in `extension.json`. However, it's important to differentiate different types of settings pages. You can define three different types of settings pages.
<br/>

### Extension settings pages

They're defined as `settingsPages` in the root of the `extension.json` file and are defined as an array of pages used for adjusting settings on the level of the entire extension, meaning they're accessible throughout the entire extension.

An example of this type of settings page was mentioned above, the User Authentication extension:

```JSON
#file: shoutem.auth/extension.json
"settingsPages": [{
  "page": "@.SettingsPage",
  "title": "Settings"
}, {
  "page": "@.ProvidersPage",
  "title": "Authentication providers"
}],
"pages": [{
  "name": "SettingsPage",
  "type": "native-component",
  "path": "dummy.js"
}, {
  "name": "ProvidersPage",
  "type": "native-component",
  "path": "dummy.js"
}],
```

<p class="image">
<img src='{{ site.url }}/img/tutorials/writting-settings-page/extension-settings-page.png'/>
</p>

### Shortcut settings pages

They're defined as `adminPages` in the `shortcuts` field of the `extension.json` file as an array of pages used for adjusting settings on the level of a specific shortcut, meaning they're accessible only to those shortcuts and not on the level of an entire extension.

An example of this type of settings page can be found in the News RSS extension:

```JSON{6-11}
#file: shoutem.rss-news/extension.json
"shortcuts": [{
  "name": "news-shortcut",
  "title": "News RSS",
  "icon": "theme://news.png",
  "screen": "@.ArticlesGridScreen",
  "adminPages": [{
    "page": "shoutem.rss.RssPage",
    "title": "Content",
    "parameters": {
      "schema": "shoutem.proxy.news"
    }
  }, {
    "page":"shoutem.layouts.LayoutPage",
    "title": "Layout"
  }]
}],
```

<p class="image">
<img src='{{ site.url }}/img/tutorials/writting-settings-page/shortcut-settings-page.png'/>
</p>

### Screen settings page

It's defined as `settingsPage` in the `screens`field as a single page for adjusting a specific layout's settings. This is what you see in the `shoutem.navigation` (Main Navigation) extension.

```JSON{}
#file: shoutem.navigation/
{
  "name": "Drawer",
  "title": "Drawer",
  "image": "./server/assets/screens/drawer.png",
  "extends": "@.TabBar",
  "settingsPage": {
    "page": "@.Drawer"
  },
  "settings": {
    "startingScreen": null,
    "showIcon": true,
    "showText": true
  }
}
```

<p class="image">
<img src='{{ site.url }}/img/tutorials/writting-settings-page/screen-settings-page.png'/>
</p>

Now that we understand the differences between settings pages, let's see [how to make them]({{ site.url }}/docs/extensions/tutorials/writing-react-settings-page).
