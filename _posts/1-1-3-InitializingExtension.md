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

Let's start building! Initialize the extension with basic information. Following command will create a folder and bootstrap the extension files.

```ShellSession
$ shoutem init restaurants
Enter information about your extension. Press `return` to accept (default) values.
Title: Restaurants
Version: 0.0.1
Description: List of restaurants

Initializing extension:
...

Extension initialized!
```

These information are stored in `extension.json` file.

> #### Note
> In case you can't remember the structure of some command, type: `shoutem -h` or `shoutem <command> -h` where you should replace '[command]' with one of the [CLI commands]({{ site.baseurl }}/docs/extensions/reference/cli)

Locate to extension folder:

```ShellSession
$ cd restaurants
```

## Folder structure
Initialization process will generate the skeleton folder and file structure for you. Your structure looks as follows:

```
restaurants/
  ├ app/
  |  ├ node_modules/
  |  ├ extension.js
  |  ├ index.js
  |  └ package.json
  ├ server/
  |  ├ node_modules/
  |  └ package.json
  └ extension.json
```

Let's describe the structure:

- `app/`: Files for functionalities in the app
- `server/`: Files for customizing extension over Shoutem builder
- `extension.json`: Extension general information

Specific parts will be described a bit later.

In `extension.json` you can see:

```JSON
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants"
}
```

Brief property explanations:

- `name` uniquely identifies the extension when combined with your developer name (e.g. `michael.restaurants`)
- `version` is the extension version
- `platform` indicates the version of the [plaform]({{ site.baseurl }}/docs/extensions/reference/platform) (version of React, React Native, Redux and some other packages...)
- `title` and `description` are extension descriptors

<br />

Extension is now only locally available on your machine. We need to upload it to Shoutem so you can install it in the application.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

To test our extension, we need to install it in the Shoutem application. You can create new application in [Shoutem builder]({{ site.shoutem.builderURL }}) or just pass flag `--new`  with the name for new application to installation command:

```ShellSession
$ shoutem install --new Restaurants
Extension is installed onto newly created `Restaurants` application.
See it in browser: `https://builder.shoutem.com/apps/52634`
```

Go to `Extensions` tab in Shoutem builder. You'll see that extension is installed on your application under Custom.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-tab-extension.png'/>
</p>

However, when you go to `Screen` tab and click on `+` to add new screen, under `Custom` category we won't see our extension.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-content-no-extension.png'/>
</p>

That's because `Add screen` modal shows only extensions which exposed starting screen.
