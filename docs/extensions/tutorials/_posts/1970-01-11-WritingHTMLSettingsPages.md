---
layout: doc
permalink: /docs/extensions/tutorials/writing-html-settings-page
title: Writing HTML settings pages
section: Tutorials
---

# Writing a React settings page

In this tutorial, we'll show you how to create HTML Settings pages for both shortcut settings and extension settings pages. HTML settings pages are useful to developers who have an existing dashboard they want to implement into the Builder without having to re-write it into React. For example if they have an existing AngularJS based dashboard.

## Shortcut settings pages

First, let's make an extension to work with. We'll make a simple `Hello World!` example so we can easily cover the basic concepts.

```ShellSession
$ shoutem init html-hello-world
Enter information about your extension. Press `return` to accept (default) values.
? Title React Hello World
? Version 0.0.1
? Description Learning HTML settings pages.
...
Extension initialized.
```

We need to add a screen with a shortcut, so we have a shortcut to add settings pages to. Locate to the extension folder:

```ShellSession
cd {{ site.example.devName }}.html-hello-world
```

And add the screen:

```ShellSession
$ shoutem screen add Hello --shortcut Hello
Screen `Hello` created in file `app/screens/Hello.js`!
Shortcut Hello created.
Shortcut Hello opens Hello screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Now let's create the actual settings page:

```ShellSession
$ shoutem page add HelloWorldShortcutPage
? Page type: html
? Page title: Hello World Shortcut Page
? Select whether the page should be connected as a shortcut settings page or an
extension settings page: shortcut
? Shortcut this page should be used for: Hello
...
React settings page added to pages/hello-world-shortcut-page
```

`HelloWorldShortcutPage` was also added to `extension.json` as an `adminPage` of the `Hello` shortcut and as one of the `pages` of the extension:

```JSON
#file: extension.json
"shortcuts": [
  {
    "name": "Hello",
    "screen": "@.Hello",
    "adminPages": [
      {
        "page": "@.HelloWorldShortcutPage",
        "title": "Hello World Shortcut Page"
      }
    ]
  }
],
"pages": [
  {
    "name": "HelloWorldShortcutPage",
    "path": "server/pages/hello-world-shortcut-page/index.html",
    "type": "html"
  }
]
```

 This is the new structure of `server` folder:

```
server/
├ pages/
|  └ HelloWorldShortcutPage
|    ├ index.html
|    ├ index.js
|    └ style.css
└ package.json
```

It now contains a `pages` folder which hosts all your HTML settings pages. The `index.html` file includes the boilerplate HTML to get you started with the development of a settings page, including a `Hello World!` paragraph.

```HTML
#file: server/pages/HelloWorldShortcutPage/index.html
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
<script src="https://static.shoutem.com/libs/api-sdk/1.0.0/api-sdk.min.js"></script>
<script src="https://static.shoutem.com/libs/extension-sandbox/0.1.4/extension-sandbox.min.js"></script>
<script src="index.js"></script>
</html>
```

It uses:

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
#file: server/pages/hello-world-shortcut-page/index.js
// listen for Shoutem initialization complete
document.addEventListener('shoutemready', onShoutemReady, false);

// handler for Shoutem initialization finished
function onShoutemReady(event) {
  // config object containing builder extension configuration, can be accessed via event
  // or by shoutem.sandbox.config
  const config = event.detail.config;

  // Waiting for DOM to be ready to initialize shoutem.api and call app start function
  $(document).ready(function() {
    shoutem.api.init(config.context);
    onPageReady(config);
  });
};

// Put your settings page logic here, executes when sandbox and DOM are initalized
function onPageReady(config) {
}
```

Sandbox is a container where your settings page is loaded. Once it's ready, `onShoutemReady` is triggered. By default, logic for extracting the configuration for your extension and initializing jQuery is inside of that function. Write your own code after `onShoutemReady`.

Finally, we have a simple CSS file `style.css` where you can store your custom CSS:

```CSS
#file: server/pages/hello-world-shortcut-page/style.css
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

A shortcut and screen were created and connected in `extension.json`. You have to reference your `HelloWorldShortcutPage` page in the `ShowGreeting` shortcut:

```JSON{16-31}
#file: extension.json
{
  "name": "html-hello-world",
  "title": "HTML Hello World",
  "version": "0.0.1",
  "description": "Learning HTML settings pages.",
  "platform": "1.2.*",
  "screens": [
    {
      "name": "Hello"
    }
  ],
  "shortcuts": [
    {
      "name": "Hello",
      "screen": "@.Hello",
      "adminPages": [
        {
          "page": "@.HelloWorldShortcutPage",
          "title": "Hello World Shortcut Page"
        }
      ],
      "settings": {
        "greeting": "Tom"
      }
    }
  ],
  "pages": [
    {
      "name": "HelloWorldShortcutPage",
      "path": "server/pages/hello-world-shortcut-page/index.html",
      "type": "html"
    }
  ]
}
```

We also added default settings in the `settings` property inside `adminPages`. These settings will be saved into the shortcut instance, once shortcut instance is added through the dashboard (a shortcut is actually what we see in the `Add Screen` modal). Read more about settings and default settings in the [Settings types]({{ site.url }}/docs/extensions/reference/settings-types) reference.

These settings will be added to the input form we'll add to our settings page. For that, add an input `form` and a save `button` in `index.html`.

```HTML{12-21}
#file: server/pages/HelloWorldShortcutPage/index.html
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
```

When the app owner clicks `Save`, we want to save the settings entered into the `<input>` field. Once the settings page is loaded, access the shortcut settings (default ones when the app owner hasn't set anything).

We'll do this using two functions in `server/index.js`: `handleSubmit` and `initForm`. For simplified communication with the Shoutem API, such as updating and getting shortcut settings, use `api-sdk`. It puts the `shoutem` object to the global environment.

Here's the complete `server/index.js` code:

```JS{17-49}
#file: server/pages/HelloWorldShortcutPage/index.js
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

All that is left to do is to access the shortcut settings in the `Hello` screen.

```JS{13-14,18}
#file: app/screens/Hello.js
import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Hello extends Component {
  render() {
    const { shortcut } = this.props;
    const { greeting } = shortcut.settings;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello {greeting}!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
```

Now let's upload and install the extension.

```ShellSession
$ shoutem push
Uploading `Hello!` extension to Shoutem...
Success!
```
```ShellSession
$ shoutem install --new "HTML Hello World"
Extension installed
See it in browser: {{ site.shoutem.builderURL }}/{{ site.example.appId }}
```

Our default setting applies and the app owner has an input form to change the `greeting` value.

<p class="image">
<img src='{{ site.url }}/img/tutorials/writting-settings-page/hello-tom.png'/>
</p>
