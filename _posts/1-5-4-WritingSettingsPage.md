---
layout: doc
permalink: /docs/extensions/tutorials/writing-settings-page
title: Settings page
section: Tutorials
---

# Settings page
<hr />

From [Getting Started tutorial](http://shoutem.github.io/docs/extensions/getting-started/introduction) you might remember a mention of _settings pages_. _Settings pages_ are web pages that appear in Shoutem builder and you as developer can write them. If you check [Extension reference](http://shoutem.github.io/docs/extensions/reference/extension) document, you can see that _settings pages_ are defined in `pages` root field of `extension.json` and can be referenced on 3 places:

- in the root of `extension.json`: array of pages for adjusting global extension settings
- in `shortcuts` field: array of pages for adjusting settings for shortcuts
- in `screens` field: one page for adjusting layout settings (`settingsPage`)

On each of these places, additional property `settings` can come along with `settingsPages` which represent defaults settings that these page(s) will be sent. Object `settings` is of arbitrary format.

## When to use settings pages

For now, we're going to take a case of writing settings page for shortcut. Use cases for other 2 scenarios will be on the end of this tutorial. 

Say we want to create an extension for restaurants, the same one from [Getting Started](http://shoutem.github.io/docs/extensions/getting-started/introduction). However, we want to allow admins (who will use our extension) to customize the header of the list showing restaurants. Until now, it was hardcoded to `RESTAURANTS`, but with admin pages we can enable the customization of that field.

> #### Note
> This tutorial continues on [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction). If you don't have an app which is result from Getting started chapter, find the `Restaurants` extension on [Github](/docs/coming-soon), install it onto new app and fill with some restaurants. If, however, you have this step ready but passed more tutorials, some code examples will have specifics from those tutorials.

## Creating first settings page

Locate to folder where you keep extension code:

```bash
$ cd Restaurants
```

and create a settings page with `RestaurantsPage` name:

```bash
$ shoutem page add RestaurantsPage
File `server/pages/RestaurantsPage.js` was created!
```

Your `extension.json` looks as follows:

```JSON{28-31}
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
    "settingsPages": [{
      "page": "shoutem.cms.CmsPage",
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
  "pages": [{
    "name": "RestaurantsPage",
  }]
}
```

When we initialized extension project, there were some folders, like `server/bin` and `server/build` that we didn't explain in detail. This is the folder structure of `server` folder what you're seeing right now:

```
server/
├ bin/
|  ├ server.js
|  └ webpack.config.js
├ build/
├ node_modules/
├ schemas/
|  └ Restaurants.json
├ pages/
|  └ RestaurantsPage.js
├ index.js
└ package.json
```

So far, you've only used `schemas` folder (for data schemas) and all these other things are used to build settings pages:

- `bin` folder is containing configuration file (`server.js`) to allow you to test admin page locally and a build script (`webpack.config.js`) which builds your settings pages and makes them ready to be pushed to Shoutem server
- `build` folder that will contain built project
- `node_modules` folder containing npm packages for building settings pages
- `pages` folder containing settings pages
- `index.js` file as starting point
- `package.json` file containing usual package information and references to building scripts

This setup lets you use modern JavaScript (ES6) along with JSX, which we already used in React Native. Difference is that when making an app we didn’t need special build environment, because the building process of client extension parts was done to when building app. Now, however, everything that you submit will be directly shown in the builder, hence we need to prepare it first.

Open now `server/pages/RestaurantsPage.js`.

```JSX
#file: server/pages/RestaurantsPage.js
import React from 'react';

export default class RestaurantsPage extends React.Component {
  render () {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
```

This code represents the simplest settings page component. In order to see it in the browser, first we need to export it in `index.js` by the same `name`, as it has in `extension.json` and connect it to some shortcut in `extension.json`.

```JavaScript
#file: server/index.js
import RestaurantsPage from './pages/PageName.js';

export pages = {
  RestaurantsPage
}

export reducer = {};
```

```JSON{3,17-20}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.2",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{
    "name": "openRestaurantsList",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants"
    "screen": "@.RestaurantsList",
    "settingsPages": [{
      "page": "shoutem.cms.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "@.Restaurants"
      }
    }, {
      "page": "@.RestaurantsPage",
      "title": "Settings"
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
  "pages": [{
    "name": "RestaurantsPage"
  }]
}
```

We've also increased version to `0.0.2` in case you've already published the extension. Push now the new version.

```bash
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Check now the Shoutem builder. On the shorcut, there should be 2 tabs: `Content` and `Settings`. Click on `Settings` to see your _Hello World!_

[Picture]

## Manage settings

[TBD] Explain how to use builder UI component

Let’s now add text input component that will allow admin to customize the header of the list. Use [React Bootstrap](https://react-bootstrap.github.io/), which was already installed on extension initialization, to build UI.

```JSX{2-7,12-28}
#file: server/pages/RestaurantsPage.js
import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

export default class RestaurantsPage extends React.Component {
  render () {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Insert the title of header:</ControlLabel>
        </FormGroup>
        
        <FormControl
          type="text"
          placeholder="Header title"
        />
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }
}
```

Push the extension now:

```bash
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Check the builder again.

[Picture]

Input is added, but pressing the button still doesn’t set anything. We need to add the logic of setting the header and change it in the application. For communication with the application, settings pages can use `@shoutem/builder-sdk`.

## Communication between page and application

Settings pages, as the title says it, set some settings of the app. As we said on the beginning, there are 3 places settings pages can occur and that's how we make a difference between those settings. We have `extension settings`, `shortcut settings` and `screen (layout) settings`. For more detailed insight, check the `Settings reference` document on how and where to use settings. In this tutorial, we'll use `shortcut settings`, as we want to allow admin to set different header title per shortcut and it's not something that it's connected to layout information.
