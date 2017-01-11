---
layout: doc
permalink: /docs/extensions/tutorials/writing-settings-page
title: Settings page
section: Tutorials
---

# Writing a settings page
<hr />

From [Getting started tutorial]({{ site.baseurl }}/docs/extensions/getting-started/introduction) you might remember a mention of _settings pages_. Settings pages are web pages that appear in Shoutem builder which you as developer can write.

![Shortcut settings page example]({{ site.baseurl }}/img/tutorials/writting-settings-page/shortcut-settings-page.png "Shortcut settings page"){:.docs-component-image}

Settings pages are used to allow application owners to customize the extension behaviour through builder. You can use any web technology to write settings pages (pure HTML with jQuery, React or even AngularJS).

## Types of settings pages and default settings

There are 3 types of settings pages. They're defined in `pages` root field of `extension.json` and can be referenced on 3 different places:

- `settingsPages` in the root of `extension.json`: array of pages for adjusting global extension settings
- `adminPages` in `shortcuts` field: array of pages for adjusting settings for shortcuts
- `settingsPage` in `screens` field: one page for adjusting layout settings

On each of these places, adjacent property `settings` can be present which represents default settings these pages will receive. Although same in format, each of these 3 places is used for different settings type. Read more in the [reference for settings types]({{ site.baseurl }}/docs/extensions/reference/settings-types).

## Creating your first settings page

The possibilities that you can do with settings pages are countless. In this tutorial, we'll show you an example of how to allow application owners to customize simple text in the settings page and get it in the extension.

Initialize new extension project:

```ShellSession
$ mkdir HelloWorldPage && cd HelloWorldPage
```
```ShellSession
$ shoutem init hello-world-page
Enter information about your extension. Press `return` to accept (defualt) values.

Title: Hello!
Version: 0.0.1
Description: Writing my first settings page!

Extension initialized!
```

### Creating plain settings page

Create a plain (HTML and jQuery) settings `HelloWorld` page. Writing `React` and `AngularJS` settings page is covered in the end of this document.

```ShellSession
$ shoutem page add HelloWorld --plain
Page `HelloWorld` is created in `server/pages/HelloWorld` folder!
```

Page was added to `extension.json`:

```JSON{6-10}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "pages": [{
    "name": "HelloWorld",
    "type": "plain",
    "path": "server/pages/HelloWorld/index.html"
  }]
}
```

Folder `server/pages/HelloWorld` contains three files. This is the structure of `server` folder:

```
server/
├ pages/
|  └ HelloWorld
|    ├ index.html
|    ├ index.js
|    └ style.css
└ package.json
```

File `index.html` includes the boilerplate HTML to get you going with development of settings pages with `Hello World` paragraph.

```HTML
#file: server/pages/HelloWorld/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="https://s3.amazonaws.com/extension-resources/styles/0.1.0/bootstrap.css">
    <link rel="stylesheet" href="https://s3.amazonaws.com/extension-resources/styles/0.1.0/web-ui.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<p>
Hello World!
</p>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="https://s3.amazonaws.com/extension-resources/styles/0.1.0/bootstrap.min.js"></script>
<script src="https://s3.amazonaws.com/extension-resources/builder-sdk/0.1.0/lib.js"></script>
<script src="https://s3.amazonaws.com/extension-resources/extension-sandbox/0.1.0/lib.js"></script>
<script src="index.js"></script>
</html>
```

It's using:

- CSS
  - Bootstrap v3 - with customized flow for Shoutem Web UI
  - Web UI - adding Shoutem design on top of Bootstrap design
  - style.css - where you write your CSS code
- JavaScript
  - Bootstrap v3
  - builder-sdk - exposing `shoutem` variable globally for easier access of Shoutem API
  - extension-sandbox - enabling the communication between your page and Shoutem builder
  - index.js - where you write your own JS code with lifecycle methods already prepared

File `index.js` comes with prepared lifecycle methods for your settings page:

```JS
#file: server/pages/HelloWorld/index.js
// listen for sandbox initialization complete
document.addEventListener('sandboxready', onSandboxReady, false);

// handler for sandbox initialization finished
function onSandboxReady(event) {
  // config object containing buidler extension configuration, can be accessed via event
  // or by shoutem.sandbox.config
  const config = event.detail;

  // Waiting for DOM to be ready to initialize shoutem.api and call app start function
  $(document).ready(function() {
    shoutem.api.init(config);
    appReady(config);
  });
};

// Put your settings page logic here, executes when sandbox and DOm are initalized
function appReady(config) {
}
```

Finally, we have a simple CSS file `style.css` where you can store your custom CSS:

```CSS
#file: server/pages/HelloWorld/style.css
.footer {
  margin-top: 15px;
}
```

This page is now created, but it's not referenced anywhere.

### Referencing settings page in the shortcut

Remember that there are 3 places where we can show them. We're going to use this page as a `shortcut settings page`.

Create a shortcut with a screen which we'll use later in the app:

```ShellSession
$ shoutem shortcut add ShowGreeting --screen=GreetingsScreen
Enter shortcut information:

Title: Show Greeting

Shortcut `ShowGreeting` is created!
Screen `GreetingsScreen` is created in file `app/screens/Greetings/Screen.js`!
Shortcut and screen are connected.
File `extension.json` was modified.
File `app/extension.js` was modified.
```

Shortcut was created in `extension.json`. Reference the `HelloWorld` in the `ShowGreeting` shortcut.

```JSON{9-12}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "shortcuts": [{
    "name": "ShowGreeting",
    "title": "Show Greeting",
    "adminPages": [{
      "page": "@.ShowGreeting",
      "title": "Greetings"
    }]
  }],
  "pages": [{
    "name": "HelloWorld",
    "type": "plain",
    "path": "server/pages/HelloWorld/index.html"
  }]
}
```

Let's see how this settings page looks like now. Push it to Shoutem and install it onto new app:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```
```ShellSession
$ shoutem install --new HelloApp
Installing `Hello!` extension to the new app...
Extension successfully installed to the new app. Check it here:
https://builder.shoutem.com/app/5128
```

Open the link from the terminal. Click to `Add Screen` and add shortcut to your app. This is what you should see:

![Hello World settings page]({{ site.baseurl }}/img/tutorials/writting-settings-page/hello-world-settings-page.png "Hello World settings page"){:.docs-component-image}

### Accessing shortcut settings in the application

All that is left to do is to access these 


## Creating React settings page

This part is coming soon, stay tuned!



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

This code represents the default root settings page component. To see it in the builder, export it in `index.js` with the same `name`, as it has in `extension.json` and reference it on one of the 3 settings pages places. To enable owners to set restaurants' list title per shortcut instance, reference settings page in `shortcuts` field. For more details on settings pages types, check the [reference](shoutem.github.io/docs/extensions/reference/settings-types).

First, export the page:

```JavaScript
#file: server/index.js
import RestaurantsPage from './pages/PageName.js';

export pages = {
  RestaurantsPage
}

export reducer = {};
```

... and then use it in `extension.json`.

```JSON{3,17-23}
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
    }],
    "settings": {
      "headerTitle": "RESTAURANTS"
    }
  }],
  "screens": [{ ... }],
  "dataSchemas": [{ ... }],
  "pages": [{
    "name": "RestaurantsPage"
  }]
}
```

Notice that we've set default setting `headerTitle` to `RESTAURANTS`. We've also increased version to `0.0.2` in case you've already published the extension. Push the new version.

```bash
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Check `Screens` tab under the Shoutem builder. Under `Restaurants` shortcut in app structure, on the right side, there are 2 settings pages with their navigation items: `Content` and `Settings`. Click on `Settings` to see your _Hello World!_

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/settings-theme/screens-restaurants-settings-hello_world.png'/>
</p>

## Managing settings

Let’s now add text input component that will enable owners to customize the header of the list. Use [React Bootstrap](https://react-bootstrap.github.io/) to build UI, which was already installed on extension initialization. Shoutem Builder is styling _React Bootstrap_ components, so using those components will make design of your pages match Shoutem design for maximal user experience.

```JSX{2-7,12-25}
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
          SUBMIT
        </Button>
      </form>
    );
  }
}
```

Push the extension:

```bash
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

This is how the settings page looks now.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/settings-theme/screens-restaurants-settings-form+button.png'/>
</p>

Input is added, but clicking the button still doesn’t set anything. We need to add the logic of setting the header and change it in the application. For communication with the application, settings pages use `@shoutem/builder-sdk`.

## Communication between page and application

Settings pages, as the name says it, set some settings of the app. As we said on the beginning, there are 3 types of settings: `extension settings`, `shortcut settings` and `screen settings`. We agreed to use `shortcut settings` to set the title of list. For that, we’ll use `setShortcutSettings` action creator from `@shoutem/builder-sdk` package. That package was also already installed on the extension initialization.

Use `redux` library which provides a way for updating the application state. Every root settings page component gets `props` object. Root component of a shortcut settings page gets both `extension` and `shortcut` objects in their prop. In this case, we need get settings from `props.shortcut.settings`.

To set shortcut settings, dispatch `setShortcutSettings` action creator bounded in `connect` method.

```JSX{2-4,11-13,15-28,31,42,45,55-57}
#file: server/pages/RestaurantsPage.js
import React from 'react';
import {
  connect
} from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import {
  setShortcutSettings
} from '@shoutem/builder-sdk'

class RestaurantsPage extends React.Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    const { shortcut } = this.props;
    const newSettings = Object.assign({}, shortcut.settings);
    newSettings.headerTitle = this.refs.headerTitle.value;

    setShortcutSettings(newSettings);
  }

  render () {
    const { settings } = this.props.shortcut;

    return (
      <form>
        <FormGroup>
          <ControlLabel>Insert the title of header:</ControlLabel>
        </FormGroup>
        <FormControl
          type="text"
          ref="headerTitle"
          placeholder="Header title"
          value={settings.headerTitle}
        />
        <Button
          onClick={this.onButtonClick}
          type="submit"
        >
          SUBMIT
        </Button>
      </form>
    );
  }
}

export connect(undefined, {
  setShortcutSettings
})(RestaurantsPage);
```

Notice that we've used `headerTitle` as a value for `FormControl`, which will be set to `RESTAURANTS` on the initial settings page load as defined in default settings.

Only thing left to do is to update the client side. Every screen that is being opened by shortcut, will get 4 props:
`children`: screen components of nested shortcuts,
`setNavBarProps`: function for setting NavBar component,
`extension`: extension object and
`shortcut`: shortcut instance object.

Let’s use this shortcut settings in the `RestaurantsList` screen.

```JavaScript{64,68}
#file: app/screens/RestaurantsList.js
import React, {
  Component
} from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Image,
  ListView,
  Text,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Divider
} from '@shoutem/ui';

import {
  find,
  isBusy,
  shouldRefresh,
  getCollection
} from '@shoutem/redux-io';

import { connect } from 'react-redux';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../const';

class RestaurantsList extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    const { find, restaurants } = this.props;
    if (shouldRefresh(restaurants)) {
      find(ext('Restaurants'), 'all', {
          include: 'image',
      });
    }
  }

  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
        screen: ext('RestaurantDetails'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={{ uri: restaurant.image && restaurant.image.url  }}>
          <Tile>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }

  render() {
    const { restaurants, setNavBarProps, shortcut } = this.props;
    
    // set the title in the Navigation bar
    setNavBarProps({
      title: shortcut.settings.headerTitle
    });

    return (
      <ListView
        data={restaurants}
        status={isBusy(restaurants)}
        renderRow={restaurant => this.renderRow(restaurant, navigateTo)}
      />
    );
  }
}

export default connect(
  (state) => ({
    restaurants: getCollection(state[ext()].allRestaurants, state)
  }),
  { navigateTo, find }
)(RestaurantsList);
```

Push the extension:

```bash
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

... and we're done!