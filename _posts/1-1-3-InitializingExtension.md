---
layout: doc
permalink: /docs/getting-started/initializing-extension
title: Initializing extension
---

# Initializing extension
<hr />

Here's the mockup of the Restaurants extension, slightly different from the picture we showed in [Introduction]({{ site.baseurl }}/docs/getting-started/introduction), because we'll start off with the regular React Native components before switching to Shoutem UI Tookit.


<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-preview-lightweight.png'/>
</p>
 
Left application screen lists the restaurants and the right one shows the details of one specific screen. 

Let's start building! Locate to folder where you want to keep extension files:

```ShellSession
$ mkdir Restaurants && cd Restaurants
```

Initialize the extension with basic extension data.

```ShellSession
$ shoutem init restaurants
Enter information about your extension. Press `return` to accept (default) values.
Title: (Restaurants)
Version: (0.0.1)
Description: Show the cool restaurants!

Extension initialized!
```

These informations will be stored in `extension.json` file.

> #### Note
> In case you can't remember the structure of some command, type: `shoutem help` or `shoutem help [command]` where you should replace '[command]' with one of the [CLI commands]({{ site.baseurl }}/docs/cli/reference)

## Folder structure
Initialization process will generate the skeleton folder and file structure for you. Your structure looks as follows:

```
Restaurants/
  ├ app/
  |  ├ node_modules/
  |  ├ const.js
  |  ├ index.js
  |  └ package.json
  ├ server/
  └ extension.json
```

Let's describe the structure:

- `app/`: Application code
- `server/`: Server code
- `extension.json`: Extension general information

In `extension.json` you can see:

```JSON
#file: extension.json
{
  "name": "restaurants",
  "title": "Restaurants",
  "version": "0.0.1",
  "description": "Show the cool restaurants!"
}
```

Property `name`, combined with your developer name, uniquely identifies the extension: `developer.restaurants`. We'll use property `name` to define extensions parts too.

Extension is now only locally available on your machine. We need to upload it to Shoutem so you can install it on the application.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

To test our extension, we need to install it on the Shoutem application. You can create new application in [Shoutem builder](/docs/coming-soon) or just pass flag `--new`  with the name for new application to installation command:

```ShellSession
$ shoutem install --new RestaurantsApp
Extension is installed onto newly created `RestaurantsApp` application.
See it in browser: `https://builder.shoutem.com/app/141231234123`
```

Go to `Extensions` tab in [Shoutem builder](/docs/coming-soon). You'll see that extension is installed on your application.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-tab-extension.png'/>
</p>

However, when you go to `Screens` tab now and click on `+` next to `Screens`, this extension won't be shown.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-content-no-extension.png'/>
</p>

That's because `Add screen` modal shows _shortcuts_ which extensions export. We need to add shortcut to our extensions.
