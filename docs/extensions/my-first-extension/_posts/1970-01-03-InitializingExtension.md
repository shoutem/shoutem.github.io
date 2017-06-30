---
layout: doc
permalink: /docs/extensions/my-first-extension/initializing-extension
title: Creating an Extension
section: My first extension
---

# Creating an Extension

Here's the mockup of the Restaurants extension that we saw in the [Introduction]({{ site.url }}/docs/extensions/my-first-extension/introduction). Through the course of this tutorial, we'll turn the **Restaurants** extension from [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started) into this list of restaurants.

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/extension-preview.jpg'/>
</p>

The left app screen lists the restaurants and the right one shows the details of each specific restaurant when you tap on it.

## Initialization

Let's revise what we did in [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started) (which you should go through before starting this tutorial series). We cloned the app we made on the Builder and initialized a new extension in the app with basic information using `shoutem init`, which created a folder and bootstrapped it with extension files.

```ShellSession
$ shoutem init restaurants
Enter information about your extension. Press `return` to accept (default) values.
Title: Restaurants
Version: 0.0.1
Description: A restaurants extension.
```

This information is stored in the `extension.json` file.

> #### Note
> In case you can't remember the structure of some command, type `shoutem -h` or `shoutem <command> -h` where you should replace `<command>` with one of the [CLI commands]({{ site.url }}/docs/extensions/reference/cli).

## Folder Structure

The initialization process will generate the skeleton with folders and files. Our new extension's structure looks like this:

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

Let's explain the structure:

- `app/`: Folder where you keep your mobile app side code (this will be bundled into the app)
- `server/`: Folder where you keep your server side code and assets
- `extension.json`: File that describes your extension

Specific parts will be explained soon.

In `extension.json` you can see:

```JSON
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "A restaurants extension.",
  "platform": "1.0.*"
}
```

Brief property explanations:

- `name` uniquely identifies the extension when combined with your developer name (e.g. `{{ site.example.devName }}.restaurants`)
- `version` is the extension version
- `platform` indicates the version of the [plaform]({{ site.url }}/docs/extensions/reference/platform) (versions of React, React Native and other packages available to all extensions by default)
- `title` and `description` are extension descriptors

We also uploaded our extension to Shoutem:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

And installed it into our app:

```ShellSession
$ shoutem install

Extension installed.
See it in the builder: {{ site.shoutem.builderURL }}/app/{{ site.example.appId }}
```

Uploading the extension is self-explanatory, but let's elaborate on installing and uninstalling extensions. In the Builder, you can go to the `Extensions` tab to see which extensions are installed in your app. If you successfully installed your Restaurants extension from [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started), you should see it there under the `Custom` category.

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/extension-tab-extension.png'/>
</p>

Extensions are installed into specific apps, not all apps on your account.

Now let's elaborate on [screens and shortcuts]({{ site.url }}/docs/extensions/my-first-extension/shortcut-and-screen).
