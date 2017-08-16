---
layout: doc
permalink: /docs/extensions/tutorials/writing-settings-page
title: Writing Settings Pages
section: Tutorials
---

# Writing an HTML settings page
<hr />

From [Getting started tutorial]({{ site.url }}/docs/extensions/tutorials/getting-started) you might remember a mention of _settings pages_. Settings pages are web pages that appear in the Shoutem Builder, which extension developers can write.

<p class="image">
<img src='{{ site.url }}/img/tutorials/writting-settings-page/shortcut-settings-page.png'/>
</p>

Settings pages are used to enable app owners to customize the extension through the Builder. You can use any web technology to write HTML settings pages (pure HTML with jQuery, React, AngularJS, etc.).

## Types of settings pages and default settings

Pages are defined in `pages` root field in `extension.json` and can be referenced in 3 different places (3 types of settings pages):

- `settingsPages` in the root of `extension.json`: array of pages for adjusting global extension settings
- `adminPages` in `shortcuts` field: array of pages for adjusting settings for shortcuts
- `settingsPage` in `screens` field: single page for adjusting layout settings

In each of these places, adjacent property `settings` can be present, which represents the default settings for either the extension, shortcut or screen. You can read more about that in the [settings type reference]({{ site.url }}/docs/extensions/reference/settings-types).

## Creating your first HTML settings page

The possibilities that you can do with settings pages are endless. In this tutorial, we'll show you an example of how to allow app owners to enter simple text in the settings page and get it in the app. The final extension code can be found [here](https://github.com/shoutem/extension-examples/tree/master/hello-world-page).

Initialize a new extension:

```ShellSession
$ shoutem init hello-world-page
Enter information about your extension. Press `return` to accept (defualt) values.

Title: Hello!
Version: 0.0.1
Description: Writing my first settings page!

Initializing extension:
...

Extension initialized!
```

Locate to the extension folder:

```ShellSession
cd {{ site.example.devName }}.hello-world-page
```

### Creating an HTML settings page

To create a plain (HTML and jQuery) settings `HelloWorldPage` page. Writing `React` and `AngularJS` settings page is covered in the end of this document, but you can use any technology when creating HTML settings page as well.

```ShellSession
$ shoutem page add HelloWorldPage
Page `HelloWorldPage` is created in `server/pages/HelloWorldPage` folder!
File `extension.json` was modified.
```

Page was added to `extension.json`:

```JSON{7-10}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "platform": "1.1.*",
  "pages": [{
    "name": "HelloWorldPage",
    "type": "html",
    "path": "server/pages/HelloWorldPage/index.html"
  }]
}
```

Folder `server/pages/HelloWorldPage` contains three files. This is the structure of `server` folder:

```
server/
├ pages/
|  └ HelloWorldPage
|    ├ index.html
|    ├ index.js
|    └ style.css
└ package.json
```

`index.html` includes the boilerplate HTML to get you started with the development of a settings page, including a `Hello World!` paragraph.

```HTML
#file: server/pages/HelloWorldPage/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="https://static.shoutem.com/libs/web-ui/0.1.17/web-ui.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>

<p>
Hello World!
</p>

</body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="https://static.shoutem.com/libs/web-ui/0.1.17/bootstrap.min.js"></script>
<script src="https://static.shoutem.com/libs/iframe-resizer/3.5.8/iframeResizer.contentWindow.min.js"></script>
<script src="https://static.shoutem.com/libs/api-sdk/0.1.6/api-sdk.js"></script>
<script src="https://static.shoutem.com/libs/extension-sandbox/0.1.2/extension-sandbox.js"></script>
<script src="index.js"></script>
</html>
```

It uses :

- CSS
  - Web UI - Shoutem style defined on top of [Bootstrap v3](http://getbootstrap.com/)
  - **style.css** - a place where you write your own CSS
- JavaScript
  - [jQuery](https://jquery.com/)
  - [Bootstrap v3](http://getbootstrap.com/)
  - iframeResizer - for managing the size of the iFrame in which settings page is set
  - api-sdk - exposing `shoutem` variable globally for easier access of Shoutem API
  - extension-sandbox - enabling the communication between your page and the builder
  - **index.js** - a place where you write your own JS code with lifecycle methods prepared

`index.js` comes with pre-made lifecycle methods for your settings page:

```JS
#file: server/pages/HelloWorldPage/index.js
// listen for Shoutem initialization complete
document.addEventListener('shoutemready', onShoutemReady, false);

// handler for Shoutem initialization finished
function onShoutemReady(event) {
  // config object containing builder extension configuration, can be accessed via event
  // or by shoutem.sandbox.config
  const config = event.detail.config;

  // Waiting for DOM to be ready to initialize shoutem.api and call page start function
  $(document).ready(function() {
    shoutem.api.init(config.context);
    onPageReady(config);
  });
};

// Put your settings page logic here, executes when sandbox and DOM are initialized
function onPageReady(config) {
}
```

Sandbox is a container where your settings page is loaded. Once it's ready, `onShoutemReady` function is triggered. By default, logic for extracting the configuration for your extension and initializing jQuery is inside of that function. Write your own code after `onShoutemReady`.

Finally, we have a simple CSS file `style.css` where you can store your custom CSS:

```CSS
#file: server/pages/HelloWorldPage/style.css
.footer {
  margin-top: 15px;
}
```

This page is now created, but it's not referenced anywhere.

### Referencing settings page in the shortcut

There are 3 places where we can show settings pages. We're going to use this page as a `shortcut settings page`.

Create a screen with a shortcut:

```ShellSession
$ shoutem screen add GreetingScreen --shortcut ShowGreeting
Enter shortcut information:
Title: Show Greeting

Screen `GreetingScreen` is created in file `app/screens/GreetingScreen.js`!
Shortcut `ShowGreeting` is created!
Shortcut `ShowGreeting` opens `GreetingScreen` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

A shortcut and screen were created and connected in `extension.json`. You have to reference your `HelloWorldPage` page in the `ShowGreeting` shortcut:

```JSON{11-17}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "platform": "1.1.*",
  "shortcuts": [{
    "name": "ShowGreeting",
    "title": "Show Greeting",
    "screen": "@.GreetingScreen",
    "adminPages": [{
      "page": "@.HelloWorldPage",
      "title": "Greetings"
    }],
    "settings": {
      "greeting": "World"
    }
  }],
  "screens": [{
    "name": "GreetingScreen"
  }],
  "pages": [{
    "name": "HelloWorldPage",
    "type": "html",
    "path": "server/pages/HelloWorldPage/index.html"
  }]
}
```

We also added default settings in the `settings` property. These settings will be saved into the shortcut instance, once shortcut instance is added through the dashboard (a shortcut is actually what we see in the `Add Screen` modal). Read more about settings and default settings in the [Settings types]({{ site.url }}/docs/extensions/reference/settings-types) reference.

        Let's see what this settings page looks like now. Push it to Shoutem and install it onto a new app:

        ```ShellSession
        $ shoutem push
        Uploading `Hello!` extension to Shoutem...
        Success!
        ```

        ```ShellSession
        $ shoutem install --new Hello
        Extension is installed onto newly created `Hello` application.
        See it in browser: {{ site.shoutem.builderURL }}/app/{{ site.example.appId }}
        ```

        Open the link from the terminal. Click the + button next to Screens and add `Show Greeting` to your app. This is what you should see:

        ![Hello World settings page]({{ site.url }}/img/tutorials/writting-settings-page/hello-world-settings-page.png "Hello World settings page"){:.docs-component-image}

### Managing shortcut settings

The admin page is empty right now - it just shows _Hello World_. We want to enable app owners to set the name of the person we're greeting in the application. For that, add an input `form` and a save `button` in `index.html`.

```HTML{12-21}
#file: server/pages/HelloWorldPage/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="https://static.shoutem.com/libs/web-ui/0.1.17/web-ui.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>

<form id="hello-form" action="#">
  <h3>Choose your greeting:</h3>
  <div class="form-group">
    <label class="control-label" for="greetingName">Name:</label>
    <input id="greetingName" name="greetingName" type="text" class="form-control required">
  </div>
  <div class="footer">
    <button class="btn btn-primary" type="submit">Save</button>
  </div>
</form>

</body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="https://static.shoutem.com/libs/web-ui/0.1.17/bootstrap.min.js"></script>
<script src="https://static.shoutem.com/libs/iframe-resizer/3.5.8/iframeResizer.contentWindow.min.js"></script>
<script src="https://static.shoutem.com/libs/api-sdk/0.1.6/api-sdk.js"></script>
<script src="https://static.shoutem.com/libs/extension-sandbox/0.1.2/extension-sandbox.js"></script>
<script src="index.js"></script>
</html>
```

When the app owner clicks `Save`, we want to save the settings entered into the `<input>` field. Once the settings page is loaded, access the shortcut settings (default ones when the app owner hasn't set anything).

We'll do this using two functions in `server/index.js`: `handleSubmit` and `initForm`. For simplified communication with the Shoutem API, such as updating and getting shortcut settings, use `api-sdk`. It puts the `shoutem` object to the global environment.

Here's complete `server/index.js` code:

```JS{17-49}
#file: server/pages/HelloWorldPage/index.js
// listen for Shoutem initialization complete
document.addEventListener('shoutemready', onShoutemReady, false);

// handler for Shoutem initialization finished
function onShoutemReady(event) {
  // config object containing builder extension configuration, can be accessed via event
  // or by shoutem.sandbox.config
  const config = event.detail.config;

  // Waiting for DOM to be ready to initialize shoutem.api and call page start function
  $(document).ready(function() {
    shoutem.api.init(config.context);
    onPageReady(config);
  });
};

function onPageReady(config) {
  function errorHandler(err) {
    console.log('Something went wrong:', err);
  }

  function handleSubmit(e) {
    // prevent default action and bubbling
    e.preventDefault();
    e.stopPropagation();

    const greeting = $('#greetingName').val();

    // updates current shortcut settings by patching with current settings
    shoutem.api.shortcuts.updateSettings({ greeting })
      .catch(errorHandler);

    return false;
  }

  function initForm(settings) {
    if(!settings) {
      return;
    }

    $('#greetingName').val(settings.greeting);
  }

  $('button[type="submit"]').click(handleSubmit);

  // shoutem.api knows current shortcut and returns promise with fetched settings
  shoutem.api.shortcuts.getSettings()
    .then(initForm, errorHandler);
}
```

Let's see the changes we've made:

```
$ shoutem push
Uploading `Hello!` extension to Shoutem...
Success!
```

![Page with default settings]({{ site.url }}/img/tutorials/writting-settings-page/page-with-default-settings.png "Page with default settings"){:.docs-component-image}

### Accessing the shortcut settings in the application

All that is left to do is to access the shortcut in the `GreetingScreen`. Check setting types reference to see how to get it. Update screen file:

```JS{5-7,11-16}
#file: app/screens/GreetingScreen.js
import React, {
  Component,
} from 'react';

import {
  Title,
} from '@shoutem/ui';

export default class GreetingScreen extends Component {
  render() {
    const { shortcut } = this.props;
    const { greeting } = shortcut.settings;

    return (
      <Title>Hello {greeting}!</Title>
    );
  }
}
```

Update the extension:

```
$ shoutem push
Uploading `Hello!` extension to Shoutem...
Success!
```

Try changing the settings and see it change in the preview.

![Page with default settings]({{ site.url }}/img/tutorials/writting-settings-page/hello-tom.png "Page with default settings"){:.docs-component-image}

# Writing a React settings page

Create a React.js `HelloWorldPage` settings page.

```ShellSession
$ shoutem page add HelloWorldPage
Page `HelloWorldPage` is created in `server/pages/HelloWorldPage` folder!
File `extension.json` was modified.
```

Page was added to `extension.json`:

```JSON{7-10}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "platform": "1.1.*",
  "pages": [{
    "name": "HelloWorldPage",
    "type": "react-page",
  }]
}
```

This is the `server` folder structure:

```
server/
| bin/
├ src
|   ├ pages/
|   |  └ hello-world-page
|   |    ├ HelloWorldPage.jsx
|   |    ├ index.js
|   |    └ style.css
|   ├ index.js
|   ├ const.js
|   └ redux.js
└ package.json
```

It contains `bin` and `src` directories. The `bin` directory holds core react settings page code and webpack config, there shouldn't be need to modify it. The `src` directory holds your extension settings pages code divided in `pages` directory, `index.js` where you export extension functionality, and `redux.js` where you define your custom redux actions, selectors and reducers.

As you can see your `HelloWorldPage` page is added under `pages/hello-world-page` directory. Inside is a React component `HelloWorldPage.js` that implements shortcut settings page. It's a starting template that shows you how to manage shortcut settings.

The template contains ordinary React lib with an addition of Shoutem libraries.

```JS
#file: server/src/pages/hello-world-page/HelloWorldPage.jsx
import React, { Component, PropTypes } from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';
import { LoaderContainer } from '@shoutem/react-web-ui';
import { fetchShortcut, updateShortcutSettings, getShortcut } from '@shoutem/api';
import { shouldRefresh } from '@shoutem/redux-io';
import { connect } from 'react-redux';
import './style.scss';
```

It's uses:

- @shoutem/react-web-ui - customized Bootstrap to Shoutem theme and contains useful React components
- @shoutem/api - official Shoutem API SDK that exports Redux actions, selectors and reducers which enable managing of Shoutem resources with React and Redux
    - `fetchShortcut(shortcutId)` - action for fetching shortcut resource
    - `updateShortcutSettings(shortcut, settingsPatch)` - action for updating shortcut settings resource
    - `getShortcut(state, shortcutId)` - selector for selecting shortcut from state     
- @shoutem/redux-io - library for data management of network data in redux and ease of data use in react
- ./style.scss - style file used for custom styling of the settings page

Before diving into an explanation of the `HelloWorldPage` React component, let's see what it receives in props. It receives `props` passed from the parent core component and from `connect` that binds React component to the Redux store.

```JavaScript
#file: server/pages/hello-world-page/HelloWorldPage.jsx
function mapStateToProps(state, ownProps) {
  const { shortcutId } = ownProps;

  return {
    shortcut: getShortcut(state, shortcutId),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { shortcutId } = ownProps;

  return {
    fetchShortcut: () => dispatch(fetchShortcut(shortcutId)),
    updateShortcutSettings: (shortcut, settings) => (
      dispatch(updateShortcutSettings(shortcut, settings))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorldPage);
```

The parent component passes a scope of information to the settings page depending on the context in which the settings page is rendered. Basically, it passes `extensionName, shortcutId, screenId` and `parameters` from extension definition. In `mapStateToProps` and `mapDispatchToProps` we prepare props for managing `shortcut` resources and you are open to add your props as you would in typical React development.

Now we can focus on the `HelloWorldPage` React component that contains the same concepts as any other React component. Particularly, the component renders an input field and a Save button for managing a greeting in shortcut settings.

```JavaScript
#file: server/pages/hello-world-page/HelloWorldPage.jsx
class HelloShortcutPage extends Component {
  static propTypes = {
    shortcut: PropTypes.object,
    fetchShortcut: PropTypes.func,
    updateShortcutSettings: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    props.fetchShortcut();

    this.state = {
      error: null,
      greeting: _.get(props.shortcut, 'settings.greeting'),
      // flag indicating if value in input field is changed
      hasChanges: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { shortcut } = this.props;
    const { shortcut: nextShortcut } = nextProps;
    const { greeting } = this.state;

    if (_.isEmpty(greeting)) {
      this.setState({
        greeting: _.get(nextShortcut, 'settings.greeting'),
      });
    }

    if (shortcut !== nextShortcut && shouldRefresh(nextShortcut)) {
      this.props.fetchShortcut();
    }
  }

  handleTextChange(event) {
    this.setState({
      greeting: event.target.value,
      hasChanges: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleSave();
  }

  handleSave() {
    const { shortcut } = this.props;
    const { greeting } = this.state;

    this.setState({ error: '', inProgress: true });
    this.props.updateShortcutSettings(shortcut, { greeting })
      .then(() => (
        this.setState({ hasChanges: false, inProgress: false })
      )).catch((err) => {
        this.setState({ error: err, inProgress: false });
      });
  }

  render() {
    const { error, hasChanges, inProgress, greeting } = this.state;

    return (
      <div className="hello-page">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h3>Choose your greeting</h3>
            <ControlLabel>Name:</ControlLabel>
            <FormControl
              type="text"
              className="form-control"
              value={greeting}
              onChange={this.handleTextChange}
            />
          </FormGroup>
          {error &&
            <HelpBlock className="text-error">{error}</HelpBlock>
          }
        </form>
        <ButtonToolbar>
          <Button
            bsStyle="primary"
            disabled={!hasChanges}
            onClick={this.handleSave}
          >
            <LoaderContainer isLoading={inProgress}>
              Save
            </LoaderContainer>
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}
```

You will notice how we trigger shortcut loading, reading of greeting value and updating it on Shoutem API once user clicks on Save button. You are open to customizing it in any way you need, implementing new React components and importing them in this file.

This page is now created, but it's not referenced anywhere.

### Referencing settings page in the shortcut

There are 3 places where we can show settings pages. We're going to use this page as a `shortcut settings page`.

Create a screen with a shortcut:

```ShellSession
$ shoutem screen add GreetingScreen --shortcut ShowGreeting
Enter shortcut information:
Title: Show Greeting

Screen `GreetingScreen` is created in file `app/screens/GreetingScreen.js`!
Shortcut `ShowGreeting` is created!
Shortcut `ShowGreeting` opens `GreetingScreen` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Shortcut and screen were created and connected in `extension.json`. Reference the `HelloWorldPage` page in the `ShowGreeting` shortcut.

```JSON{11-17}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "platform": "1.1.*",
  "shortcuts": [{
    "name": "ShowGreeting",
    "title": "Show Greeting",
    "screen": "@.GreetingScreen",
    "adminPages": [{
      "page": "@.HelloWorldPage",
      "title": "Greetings"
    }],
    "settings": {
      "greeting": "World"
    }
  }],
  "screens": [{
    "name": "GreetingScreen"
  }],
  "pages": [{
    "name": "HelloWorldPage",
    "type": "react-page",
  }]
}
```

We also added default settings in the `settings` property. These settings will be saved into the shortcut instance, once shortcut instance is added through the dashboard (a shortcut is actually what we see in the `Add Screen` modal). Read more about settings and default settings in the [Settings types]({{ site.url }}/docs/extensions/reference/settings-types) reference.

Let's see what this settings page looks like now. Push it to Shoutem and install it onto a new app:

```ShellSession
$ shoutem push
Uploading `Hello!` extension to Shoutem...
Success!
```

```ShellSession
$ shoutem install --new Hello
Extension is installed onto newly created `Hello` application.
See it in browser: {{ site.shoutem.builderURL }}/app/{{ site.example.appId }}
```

Open the link from the terminal. Click the + button next to Screens and add `Show Greeting` to your app. This is what you should see:

![Hello World settings page]({{ site.url }}/img/tutorials/writting-settings-page/hello-world-settings-page.png "Hello World settings page"){:.docs-component-image}

### Accessing the shortcut settings in the application

All that is left to do is to access the settings in the `GreetingScreen`. Check [Settings types]({{ site.url }}/docs/extensions/reference/settings-types) reference to see how to do so. Update the screen file:

```JS{5-7,11-16}
#file: app/screens/GreetingScreen.js
import React, {
  Component,
} from 'react';

import {
  Title,
} from '@shoutem/ui';

export default class GreetingScreen extends Component {
  render() {
    const { shortcut } = this.props;
    const { greeting } = shortcut.settings;

    return (
      <Title>Hello {greeting}!</Title>
    );
  }
}
```

Update the extension:

```
$ shoutem push
Uploading `Hello!` extension to Shoutem...
Success!
```

Try changing the settings and see it change in the preview.

![Page with default settings]({{ site.url }}/img/tutorials/writting-settings-page/hello-tom.png "Page with default settings"){:.docs-component-image}
