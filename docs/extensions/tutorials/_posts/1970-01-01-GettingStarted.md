---
layout: doc
permalink: /docs/extensions/tutorials/getting-started
title: Getting started
section: Tutorials
---

# Getting started

Shoutem is a platform that enables you to build, publish and manage high quality native iOS and Android apps. It's built on top of React Native and open sourced for developers. The philosophy behind Shoutem is to let you build apps efficiently without restricting you how to use React Native.

## Apps and extensions

Efficiency of building apps is achieved with a simple architecture: apps are built using smaller modules called `extensions`. Extension is a self-contained and complete functionality that can be reused. Everything in the app is an extension: navigation, places (list and details), push notifications, analytics, ads, etc...

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/getting-started/apps-are-made-of-extensions.png'/>
</p>

Shoutem prepared and [open sourced](https://github.com/shoutem/extensions){:target="_blank"} a lot of extensions that you can use in your apps. **Don't reinvent the wheel**: reuse extensions which are suitable for you, customize them or create new ones. It's the word-first WordPress-like solution for mobile apps.

## Builder

Shoutem apps are managed on the beautiful web interface called the **Builder**. This allows people of any technical level to create apps from extensions built by Shoutem and the community. If you haven't already, go to the [Builder]({{ site.shoutem.builderURL }}){:target="_blank"} and create an account. When you sign in, you can start by creating an app from some template or a blank app. Start with `News app` template.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/getting-started/builder-news-app.png'/>
</p>

## Run your app

Your app can be previewed on your device or inside the Builder. Click the _Preview on device_ button and scan the QR code. This will lead you to download the [Shoutem Preview app]({{ site.shoutem.previewApp }}){:target="_blank"} which you can use to get your app on the device fast. After the installation, **Shoutem Preview** will automatically open the app.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/getting-started/shoutem-preview-app.png'/>
</p>

## Manage your app

You can manage your app inside of the Builder. App structure can be seen under **Screens**. It starts with **Main navigation** which has multiple screens nested inside. Those are the starting screens of extensions which you can delete or add new ones by clicking on `+`. Delete **About** screen by selecting it, clicking on the three dots (`...`) on the top right corner and selecting **Delete**.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/getting-started/delete-starting-screen.png'/>
</p>

Let's create new extension with `Hello World` screen and add it to the app.

## Create new extension

Start by installing [Shoutem CLI]({{ site.shoutem.cli }}){:target="_blank"} - tool that speeds up the development of an extension.

```ShellSession
$ npm install -g @shoutem/cli
```

> #### Note
> If previous command fails because of _permission_ issues, you need to run it with `sudo` permission: :`sudo npm install -g @shoutem/cli`.

Register your developer name. Use `shoutem login` command with Shoutem credentials ("{{ site.example.devName }}" is used for developer name in this example).

```ShellSession
$ shoutem login
Enter your Shoutem credentials (obtained at {{ site.shoutem.builderURL }}):
Email: {{ site.example.devEmail }}
Password:

Logged in as {{ site.example.devEmail }}.
Enter developer name.
Developer name: {{ site.example.devName }}

Registered as `{{ site.example.devName }}`.
```

Create new extension:

```ShellSession
$ shoutem init hello-world
Enter information about your extension. Press `return` to accept (default) values.
Title: Hello World!
Version: 0.0.1
Description: My first extension

Initializing extension:
...

Extension initialized!
```

Locate to the extension folder:

```ShellSession
$ cd hello-world
```

Create a screen with a shortcut (pointer to the starting screen of an extension):

```ShellSession
$ shoutem screen add Hello --shortcut Hello
Enter shortcut information:
Title: Hello
Screen `List` is created in file `app/screens/List.js`!
Shortcut `List` is created!
Shortcut `List` opens `List` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Let's push what we've built until now to Shoutem.

```ShellSession
$ shoutem push
Uploading `Hello World` extension to Shoutem...
Success!
```

Install the extension to the app. Command `shoutem install` lists all the available apps on which you can install the extension. Select the created app.

```ShellSession
$ shoutem install
Select app to install extension (Use arrow keys)
> News app
  -------------
  Create a new app
```

Open the app in the builder. Click on the `+` next to **Screens** and select `Custom` category. You can see your starting screen there.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/getting-started/custom-starting-screen.png'/>
</p>

Click on it to add it to the app structure. Finally, preview it (either in the browser or Shoutem Preview app). As there's new extension available, Shoutem will bundle all your extensions which can take up to 5 minutes.

This is the result:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/getting-started/hello-world.png'/>
</p>

**Well done!** You've just built your first app using your custom built extension!

## What's next?

To leverage the full power of Shoutem, we'd suggest you to go through [My first extension]() tutorial, which explains the underlying concepts in more detail. Before you do that, you might want to read how to [setup your local environment](). This will help you work on your extensions much faster locally, without needing to wait app to be built 5 minutes every time you change something.