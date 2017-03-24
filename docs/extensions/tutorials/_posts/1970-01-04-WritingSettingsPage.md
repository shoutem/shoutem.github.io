---
layout: doc
permalink: /docs/extensions/tutorials/writing-settings-page
title: Settings page
section: Tutorials
---

# Writing a settings page
<hr />

From [Getting started tutorial]({{ site.baseurl }}/docs/extensions/getting-started/introduction) you might remember a mention of _settings pages_. Settings pages are web pages that appear in Shoutem builder which extension developers can write.

![Shortcut settings page example]({{ site.baseurl }}/img/tutorials/writting-settings-page/shortcut-settings-page.png "Shortcut settings page"){:.docs-component-image}

Settings pages are used to enable app owners to customize the extension through the builder. You can use any web technology to write settings pages (pure HTML with jQuery, React, AngularJS, etc...).

## Types of settings pages and default settings

Pages are defined in `pages` root field in `extension.json` and can be referenced in 3 different places (3 types of settings pages):

- `settingsPages` in the root of `extension.json`: array of pages for adjusting global extension settings
- `adminPages` in `shortcuts` field: array of pages for adjusting settings for shortcuts
- `settingsPage` in `screens` field: single page for adjusting layout settings

On each of these places, adjacent property `settings` can be present which represents default settings for either extension, shortcut or screen. Read more in the [reference for settings types]({{ site.baseurl }}/docs/extensions/reference/settings-types).

## Creating your first settings page

The possibilities that you can do with settings pages are endless. In this tutorial, we'll show you an example of how to allow app owners to enter simple text in the settings page and get it in the app. Final extension code can be found [here](https://github.com/shoutem/extension-examples/tree/master/hello-world-page).

Initialize new extension project:

```ShellSession
$ shoutem init hello-world-page
Enter information about your extension. Press `return` to accept (defualt) values.

Title: Hello!
Version: 0.0.1
Description: Writing my first settings page!

...
```

Locate to extension folder:

```ShellSession
cd hello-world-page
```

### Creating plain settings page

Create a plain (HTML and jQuery) settings `HelloWorldPage` page. Writing `React` and `AngularJS` settings page is covered in the end of this document, but you can use any technology when creating HTML settings page as well.

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
  "platform": "1.0.*",
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

File `index.html` includes the boilerplate HTML to get you going with development of settings pages with `Hello World` paragraph.

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

It's using:

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

File `index.js` comes with ready lifecycle methods for your settings page:

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

// Put your settings page logic here, executes when sandbox and DOM are initalized
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

Shortcut and screen were created and connected in `extension.json`. Reference the `HelloWorldPage` page in the `ShowGreeting` shortcut.

```JSON{11-17}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "platform": "1.0.*",
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

We also added default settings in `settings` property. These settings will be saved into the shortcut instance, once shortcut instance is added through the dashboard (shortcut is actually what we see in the `Add Screen` modal). Read more about the settings and default settings in the [Settings types](/docs/extensions/reference/settings-types) reference.

Let's see how this settings page looks like now. Push it to Shoutem and install it onto new app:

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

Open the link from the terminal. Click to `Add Screen` and add shortcut (exposed starting screen) to your app. This is what you should see:

![Hello World settings page]({{ site.baseurl }}/img/tutorials/writting-settings-page/hello-world-settings-page.png "Hello World settings page"){:.docs-component-image}

### Managing the shortcut settings

Our admin page is plain right now - it just shows _Hello World_. We want to enable app owners to set the person name who we're greeting to in the application. For that, add a `form` and a save `button` in `index.html`.

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

When the user clicks `Save`, we want to save the settings entered in the `<input>` field. Once settings page is loaded, access the shortcut settings (default ones when user has not set anything).

We'll do this in 2 functions in `server/index.js`: `handleSubmit` and `initForm`. For simplified communication with Shoutem API, such as updating and getting shortcut settings, use `api-sdk`. It puts `shoutem` object to the global environment.

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

![Page with default settings]({{ site.baseurl }}/img/tutorials/writting-settings-page/page-with-default-settings.png "Page with default settings"){:.docs-component-image}

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

Try changing the settings and see the change in the preview.

![Page with default settings]({{ site.baseurl }}/img/tutorials/writting-settings-page/hello-tom.png "Page with default settings"){:.docs-component-image}

## Creating React settings page

Shoutem extensions already use React for settings pages, but we're currently working on more developer friendly way to do so. This part is coming soon, so stay tuned!
