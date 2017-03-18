---
layout: doc
permalink: /docs/extensions/getting-started/initializing-extension
title: Initializing extension
section: Getting Started
---

# Initializing extension
<hr />

Here's the mockup of the Restaurants extension that we've showed in the [Introduction]({{ site.baseurl }}/docs/getting-started/introduction). We're building **Restaurants** extension.


<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-preview.jpg'/>
</p>
 
Left app screen lists the restaurants and the right one shows the details of one specific restaurant. 

## Initialize

Let's start building! Initialize the extension with basic information. Following command, `shoutem init`, will create a folder and bootstrap the extension files.

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

We passed `restaurants` extension name to `shoutem init` command. Extension information is stored in `extension.json` file.

> #### Note
> In case you can't remember the structure of some command, type: `shoutem -h` or `shoutem <command> -h` where you should replace '<command>' with one of the [CLI commands]({{ site.baseurl }}/docs/extensions/reference/cli).

Locate to extension folder:

```ShellSession
$ cd restaurants
```

## Folder structure
Initialization process will generate the skeleton with folders and files. Extension structure looks as follows:

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

- `app/`: Folder where you will keep your client side code
- `server/`: Folder where you will keep your server side code
- `extension.json`: File that describes your extension

Specific parts will be described soon.

In `extension.json` you can see:

```JSON
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "platform": "1.0.*"
}
```

Brief property explanations:

- `name` uniquely identifies the extension when combined with your developer name (e.g. `{{ site.example.devName }}.restaurants`)
- `version` is the extension version
- `platform` indicates the version of the [plaform]({{ site.baseurl }}/docs/extensions/reference/platform) (versions of React, React Native and other packages available to all extensions by default)
- `title` and `description` are extension descriptors

<br />

Extension is now only locally available on your machine. Upload it to Shoutem so you can install it in the app.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

To test extension, install it in the Shoutem app. You can create new app in the [Shoutem builder]({{ site.shoutem.builderURL }}) or just pass the flag `--new`  with the name for new application to installation command:

```ShellSession
$ shoutem install --new Restaurants
Extension is installed onto newly created `Restaurants` application.
See it in browser: `{{ site.shoutem.builderURL }}/app/{{ site.example.appId }}`
```

Follow the link printed by the CLI. Go to `Extensions` tab in Shoutem builder. where you can see that your extension is installed on the application under **Custom** category.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-tab-extension.png'/>
</p>

However, when you go to `Screen` tab and click on `+` to add new screen, under `Custom` category we won't see our extension.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-content-no-extension.png'/>
</p>

That's because `Add screen` modal shows only extensions which exposed starting screen.