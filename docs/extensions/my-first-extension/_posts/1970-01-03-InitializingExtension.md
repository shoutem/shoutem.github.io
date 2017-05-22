---
layout: doc
permalink: /docs/extensions/my-first-extension/initializing-extension
title: Creating an Extension
section: My first extension
---

# Creating an Extension
<hr />

Here's the mockup of the Restaurants extension that we saw in the [Introduction]({{ site.url }}/docs/extensions/my-first-extension/introduction). Through the course of this tutorial, we'll make the **Restaurants** extension.


<p class="image">
<img src='{{ site.url }}/img/my-first-extension/extension-preview.jpg'/>
</p>

The left app screen lists the restaurants and the right one shows the details of each specific restaurant when you tap on it.

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

We passed `restaurants` as an extension name to the `shoutem init` command. Extension information is stored in `extension.json` file.

> #### Note
> In case you can't remember the structure of some command, type `shoutem -h` or `shoutem <command> -h` where you should replace `<command>` with one of the [CLI commands]({{ site.url }}/docs/extensions/reference/cli).

Now lets switch to the extension folder:

```ShellSession
$ cd restaurants
```

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
  "description": "List of restaurants",
  "platform": "1.0.*"
}
```

Brief property explanations:

- `name` uniquely identifies the extension when combined with your developer name (e.g. `{{ site.example.devName }}.restaurants`)
- `version` is the extension version
- `platform` indicates the version of the [plaform]({{ site.url }}/docs/extensions/reference/platform) (versions of React, React Native and other packages available to all extensions by default)
- `title` and `description` are extension descriptors

<br />

The extension is now only available on your machine, not to an app on the Builder so lets upload it to Shoutem so you can install it in an app.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

To test an extension, install it in a Shoutem app. You can create a new app in the [Shoutem builder]({{ site.shoutem.builderURL }}) or just pass the flag `--new`  with the name of a new blank app to the installation command:

```ShellSession
$ shoutem install --new Restaurants
Extension is installed onto newly created `Restaurants` application.
See it in browser: `{{ site.shoutem.builderURL }}/app/{{ site.example.appId }}`
```

Follow the link printed by the CLI. Go to the `Extensions` tab in Shoutem Builder where you'll see that your extension is installed on the application under the **Custom** category.

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/extension-tab-extension.png'/>
</p>

However, when you go to the `Screen` tab and click on `+` to add new screen, under `Custom` category you won't see your extension.

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/add-content-no-extension.png'/>
</p>

What's wrong? Oh right, we should actually [add a screen]({{ site.url }}/docs/extensions/my-first-extension/shortcut-and-screen) and expose it to the Builder first.
