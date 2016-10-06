---
layout: doc
permalink: /docs/extensions/getting-started/initializing-extension
title: Initializing extension
section: Getting Started
---

# Initializing extension
<hr />

Here's the mockup of the Restaurants extension that we've showed in [Introduction]({{ site.baseurl }}/docs/getting-started/introduction). We're building _Restaurants_ extension.


<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-preview.jpg'/>
</p>
 
Left application screen lists the restaurants and the right one shows the details of one specific restaurant. 

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
Description: List of restaurants

Extension initialized!
```

These information will be stored in `extension.json` file.

> #### Note
> In case you can't remember the structure of some command, type: `shoutem help` or `shoutem help [command]` where you should replace '[command]' with one of the [CLI commands]({{ site.baseurl }}/docs/extensions/reference/cli)

## Folder structure
Initialization process will generate the skeleton folder and file structure for you. Your structure looks as follows:

```
Restaurants/
  ├ app/
  |  ├ node_modules/
  |  |  └ ...
  |  ├ const.js
  |  ├ index.js
  |  └ package.json
  ├ server/
  |  └ ...
  └ extension.json
```

Let's describe the structure:

- `app/`: Application code
- `server/`: Server code
- `extension.json`: Extension general information

Specific parts will be described a bit later.

In `extension.json` you can see:

```JSON
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants"
}
```

Property `name`, combined with your developer name, uniquely identifies the extension: `developer.restaurants`. We'll use property `name` to define extensions parts too.

Extension is now only locally available on your machine. We need to upload it to Shoutem so you can install it in the application.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

To test our extension, we need to install it in the Shoutem application. You can create new application in [Shoutem builder](/docs/coming-soon) or just pass flag `--new`  with the name for new application to installation command:

```ShellSession
$ shoutem install --new Restaurants
Extension is installed onto newly created `Restaurants` application.
See it in browser: `https://builder.shoutem.com/apps/52634`
```

Go to `Extensions` tab in [Shoutem builder](/docs/coming-soon). You'll see that extension is installed on your application.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-tab-extension.png'/>
</p>

However, when you go to `Screen` tab now and click on `+` next to `Screens`, this extension won't be shown.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-content-no-extension.png'/>
</p>

That's because `Add screen` modal shows _shortcuts_ that extensions export. We need to create shortcut in our extensions.
