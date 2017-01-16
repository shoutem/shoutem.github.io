---
layout: doc
permalink: /docs/extensions/tutorials/writing-settings-page
title: Settings page
section: Tutorials
---

# Writing a settings page
<hr />

From [Getting started tutorial]({{ site.baseurl }}/docs/extensions/getting-started/introduction) you might remember a mention of _settings pages_. Settings pages are web pages that appear in Shoutem builder which you as a developer can write.

![Shortcut settings page example]({{ site.baseurl }}/img/tutorials/writting-settings-page/shortcut-settings-page.png "Shortcut settings page"){:.docs-component-image}

Settings pages are used to enable application owners to customize the extension behaviour through the builder. You can use any web technology to write settings pages (pure HTML with jQuery, React or even AngularJS).

## Types of settings pages and default settings

Pages are defined in `pages` root field in `extension.json` and can be referenced in 3 different places:

- `settingsPages` in the root of `extension.json`: array of pages for adjusting global extension settings
- `adminPages` in `shortcuts` field: array of pages for adjusting settings for shortcuts
- `settingsPage` in `screens` field: single page for adjusting layout settings

These are the 3 types of settings pages. On each of these places, adjacent property `settings` can be present which represents default settings these pages will receive. Read more in the [reference for settings types]({{ site.baseurl }}/docs/extensions/reference/settings-types).

## Creating your first settings page

The possibilities that you can do with settings pages are countless. In this tutorial, we'll show you an example of how to allow application owners to customize the simple text in the settings page and get that text in the extension. Final extension code can be found [here](https://github.com/shoutem/extension-examples/tree/master/hello-world-page).

Initialize new extension project:

```ShellSession
$ mkdir hello-world-page && cd hello-world-page
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

Create a plain (HTML and jQuery) settings `HelloWorldPage` page. Writing `React` and `AngularJS` settings page is covered in the end of this document.

```ShellSession
$ shoutem page add HelloWorldPage
Page `HelloWorldPage` is created in `server/pages/HelloWorldPage` folder!
```

Page was added to `extension.json`:

```JSON{6-9}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "pages": [{
    "name": "HelloWorldPage",
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
  - [Bootstrap v3](http://getbootstrap.com/)
  - Web UI - adding Shoutem design on top of Bootstrap design
  - style.css - a place where you write your own CSS
- JavaScript
  - [Bootstrap v3](http://getbootstrap.com/)
  - builder-sdk - exposing `shoutem` variable globally for easier access of Shoutem API
  - extension-sandbox - enabling the communication between your page and Shoutem builder
  - index.js - a place where you write your own JS code with lifecycle methods already prepared

File `index.js` comes with ready lifecycle methods for your settings page:

```JS
#file: server/pages/HelloWorldPage/index.js
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

Sandbox is a container where your settings page is loaded. Once it's ready, `onSandboxReady` function is triggered. By default, logic for extracting the configuration for your extension and initializing jQuery is inside of that function. You can customize everything that comes after `onSandboxReady`.

Finally, we have a simple CSS file `style.css` where you can store your custom CSS:

```CSS
#file: server/pages/HelloWorldPage/style.css
.footer {
  margin-top: 15px;
}
```

This page is now created, but it's not referenced anywhere.

### Referencing settings page in the shortcut

Remember that there are 3 places where we can show settings pages. We're going to use this page as a `shortcut settings page`.

Create a shortcut with a screen which we'll use later in the app:

```ShellSession
$ shoutem shortcut add ShowGreeting --screen=GreetingsScreen
Enter shortcut information:

Title: Show Greeting

Shortcut `ShowGreeting` is created!
Screen `GreetingsScreen` is created in file `app/screens/GreetingsScreen.js`!
Shortcut and screen are connected.
File `extension.json` was modified.
File `app/extension.js` was modified.
```

Shortcut and screen were created and connected in `extension.json`. Reference the `HelloWorldPage` page in the `ShowGreeting` shortcut.

```JSON{10-13}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "shortcuts": [{
    "name": "ShowGreeting",
    "title": "Show Greeting",
    "screen": "@.GreetingsScreen",
    "adminPages": [{
      "page": "@.HelloWorldPage",
      "title": "Greetings"
    }]
  }],
  "screens": [{
    "name": "GreetingsScreen"
  }],
  "pages": [{
    "name": "HelloWorldPage",
    "type": "plain",
    "path": "server/pages/HelloWorldPage/index.html"
  }]
}
```

Let's see how this settings page looks like now. Push it to Shoutem and install it onto new app:

```ShellSession
$ shoutem push
Uploading `Hello!` extension to Shoutem...
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

### Managing the shortcut settings

Our admin page is plain right now - it just shows _Hello World_. We want to enable application owners to set the person name who we're greeting to in the application. For that, add a `form` and a save `button` in `index.html`.

```HTML{12-21}
#file: server/pages/HelloWorldPage/index.html
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
<script src="https://s3.amazonaws.com/extension-resources/styles/0.1.0/bootstrap.min.js"></script>
<script src="https://s3.amazonaws.com/extension-resources/builder-sdk/0.1.0/lib.js"></script>
<script src="https://s3.amazonaws.com/extension-resources/extension-sandbox/0.1.0/lib.js"></script>
<script src="index.js"></script>
</html>
```

When the user clicks `Save`, we want to save the settings entered in the `<input>` field. Once settings page is loaded, access the shortcut settings. This is present in the 2 functions (`handleSubmit` and `initForm`) in `index.js`. For simplified communication with Shoutem API, such as updating and getting shortcut settings, we'll use `builder-sdk`. It puts `shoutem` object to the global environment.

```JS{3-21}
#file: server/pages/HelloWorldPage/index.js
function appReady(config) {

  function handleSubmit(e) {
    // prevent default action and bubbling
    e.preventDefault();
    e.stopPropagation();

    const greetingName = $('#greetingName').val();

    // updates current shortcut settings by patching with current settings
    shoutem.api.updateShortcutSettings({ greetingName });
  }

  function initForm(settings) {
    $('#greetingName').val(settings.greetingName);
  }

  $('button[type="submit"]').click(handleSubmit);

  // shoutem.api knows current shortcut and returns promise with fetched settings
  shoutem.api.getShortcutSettings().then(initForm);
}
```

The reference for the `builder-sdk` (`shoutem` object) is [here](/coming-soon).

Finally, let's add default setting in `extension.json`, so there's some value on the first load of the shortcut settings page:

```JSON{14-16}
#file: extension.json
{
  "name": "hello-world-page",
  "version": "0.0.1",
  "title": "Hello!",
  "description": "Writing my first settings page!",
  "shortcuts": [{
    "name": "ShowGreeting",
    "title": "Show Greeting",
    "screen": "@.GreetingsScreen",
    "adminPages": [{
      "page": "@.HelloWorldPage",
      "title": "Greetings"
    }],
    "settings": {
      "greetingName": "World"
    }
  }],
  "screens": [{
    "name": "GreetingsScreen"
  }],
  "pages": [{
    "name": "HelloWorldPage",
    "path": "server/pages/HelloWorldPage/index.html"
  }]
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

All that is left to do is to access the shortcut in the `GreetingsScreen`. Check setting types reference to see how to get it. Update screen file:

```JS{6,11-16}
#file: app/screens/GreetingsScreen.js
import React, {
  Component,
} from 'react';

import {
  Title,
} from '@shoutem/ui';

export default class GreetingsScreen extends Component {
  render() {
    const { shortcut } = this.props;
    const { greetingName } = shortcut.settings;

    return (
      <Title>Hello {greetingName}!</Title>
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

This part is coming soon, so stay tuned!
