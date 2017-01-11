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

Our admin page is plain right now - it just shows `HelloWorld`. We want to enable application owners to set the person name who we're greeting to in the application. For that, we need to add a `form` and a save `button` in `index.html`.

```HTML{12-21}
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

<form id="hello-form" action="#">
  <h3>Choose your greeting</h3>
  <div class="form-group">
    <label class="control-label" for="greeting">Name:</label>
    <input id="greeting" name="greeting" type="text" class="form-control required">
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

When the user clicks `Save`, we want to save the settings entered in the `<input` field. Once settings page is loaded, we want to access this shortcut settings. These 2 actions we'll do in the 2 functions (`handleSubmit` and `initForm`) in `index.js`. We'll use `builder-sdk` which simplifies the communication with Shoutem API, such as updating and getting shortcut settings.

```JS{3-21}
#file: server/pages/HelloWorld/index.js
function appReady(config) {

  function handleSubmit(e) {
    // prevent default action and bubbling
    e.preventDefault();
    e.stopPropagation();

    const greeting = $('#greeting').val();

    // updates current shortcut settings by patching with current settings
    shoutem.api.updateShortcutSettings({ greeting });
  }

  function initForm(settings) {
    $('#greeting').val(settings.greeting);
  }

  $('button[type="submit"]').click(handleSubmit);

  // shoutem.api knows current shortcut and returns promise with fetched settings
  shoutem.api.getShortcutSettings().then(initForm);
}
```

The reference for the `builder-sdk` is [here](/coming-soon).

Finally, let's add default setting in `extension.json`, so there's some value on the first load of the shortcut settings page:

```JSON
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
    }],
    "settings": {
      "greeting": "World"
    }
  }],
  "pages": [{
    "name": "HelloWorld",
    "type": "plain",
    "path": "server/pages/HelloWorld/index.html"
  }]
}
```

Let's see the changes we've made:

$ shoutem push
Uploading `Hello!` extension to Shoutem...
Success!
```

This should be shown in the Shoutem Builder:

// Image coming soon

### Accessing shortcut settings in the application

All that is left to do is to access these settings in the `GreetingsScreen`. Check setting types reference to see how to get it. Update screen file:

```JS{6,11-16}
#file app/screens/GreetingsScreen.js
import React, {
  Component,
} from 'react';

import {
  Title,
} from '@shoutem/ui';

export default class GreetingsScreen extends Component {
  render() {
    const { shortcut } = this.props;
    const { greeting } = shortcut.settings;

    return (
      <Title>Hello, {greeting}</Title>
    );
  }
}
```

Update the extension:

$ shoutem push
Uploading `Hello!` extension to Shoutem...
Success!
```

Run the preview to see the greetings.

// Image coming soon

Try changing the settings and see the change in the preview.

## Creating React settings page

This part is coming soon, so stay tuned!