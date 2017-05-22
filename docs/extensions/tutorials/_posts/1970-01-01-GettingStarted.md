---
layout: doc
permalink: /docs/extensions/tutorials/getting-started
title: Getting Started
section: Tutorials
---

# Getting Started

Shoutem is a platform that enables you to build, publish and manage high-quality native iOS and Android apps. It's built on top of React Native and open sourced for developers. The philosophy behind Shoutem is to let you build apps efficiently without restricting you on how to use React Native.

## Apps and Extensions

The efficiency of building apps is achieved with a simple architecture: apps are built using smaller modules called `extensions`. The extension is a self-contained and complete functionality that can be reused. Everything in the app is an extension: navigation, places (list and details), push notifications, analytics, ads, etc...

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/apps-are-made-of-extensions.png'/>
</p>

Shoutem prepared and [open sourced](https://github.com/shoutem/extensions) a lot of extensions that you can use in your apps. **Don't reinvent the wheel**: reuse extensions which are suitable for your app, customize them or create new ones. It's the world-first WordPress-like solution for mobile apps.

## The Builder

Shoutem apps are managed on a beautiful web interface called the **Builder**. This allows non-technical people to create apps from extensions built by Shoutem and the community, while also allowing developers to save time setting up a part of their app. If you haven't already, go to the [Builder]({{ site.shoutem.builderURL }}) and create an account. Once signed in, you can create an app from some  template or just make blank app. Lets start with a `News app` template.

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/builder-news-app.png'/>
</p>

Your app is prefilled with content so you can see what it'd really look like.

## Running Your App

Your app can be previewed inside the Builder or on your own physical device! Click the _Preview on device_ button and scan the QR code. This will lead you to download the **Shoutem Preview** app (available for [iOS]({{ site.shoutem.previewAppiOS }}) and [Android]({{ site.shoutem.previewAppAndroid }})) which you can use to get the app you're making onto your device. After the installation, **Shoutem Preview** will automatically open the app you just made.

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/shoutem-preview-app.png'/>
</p>

## Managing Your App

You can manage your app inside the Builder. The app structure can be seen under **Screens**. It starts with **Main navigation** which has multiple screens nested inside. Those are the screens from extensions you have installed which you can add by clicking on `+`. For the purpose of the tutorial, delete the **About** screen by selecting it, clicking on the three dots (`...`) on the top right corner and selecting **Delete**.

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/delete-starting-screen.png'/>
</p>

> #### Note
> All Shoutem extensions are pre-installed to your app on the Builder so you can use their screens right away, but any custom extensions you make will have to be installed using `shoutem install`, before you can use them through the Builder.

Let's create a new extension with a `Hello World` screen and add it to the app.

## Creating a New Extension

Start by installing the [Shoutem CLI]({{ site.shoutem.cli }}) - tool that makes developing extensions a breeze.

```ShellSession
$ npm install -g @shoutem/cli
```

> #### Note
> If previous command fails because of _permission_ issues, you need to run it with `sudo` permission: `sudo npm install -g @shoutem/cli`.

Register your developer name. Use the `shoutem login` command with your Shoutem credentials ("{{ site.example.devName }}" is used as a developer name in this example).

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
Title: Hello World
Version: 0.0.1
Description: My first extension

Initializing extension:
...

Extension initialized!
```

The `shoutem init` command bootstrapped the `hello-world` folder with extension files. Switch over to the extension folder:

```ShellSession
$ cd hello-world
```

Create a screen with a shortcut (pointer to the starting screen of the extension):

```ShellSession
$ shoutem screen add Hello --shortcut Hello
Enter shortcut information:
Title: Hello
Screen `Hello` is created in file `app/screens/Hello.js`!
Shortcut `Hello` is created!
Shortcut `Hello` opens `Hello` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

This created `Hello` screen in `app/screens/List.js` file. Any time you create a new screen it'll be a simple "Hello World!" screen.

Let's push what we've built to Shoutem.

```ShellSession
$ shoutem push
Uploading `Hello World` extension to Shoutem...
Success!
```

Install the extension to the app you made on the builder. Command `shoutem install` lists all the available apps on which you can install the extension. Select the created app.

```ShellSession
$ shoutem install
Select app to install extension (Use arrow keys)
> News app
  -------------
  Create a new app

Extension installed.
See it in the builder: {{ site.shoutem.builderURL }}/app/{{ site.example.appId }}
```

Open the app in the builder. Click on the `+` next to **Screens** and select `Custom` category. You can see your starting screen there.

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/custom-starting-screen.png'/>
</p>

Click on it to add it to the app structure.

> #### Note
> Currently, you use the [Builder]({{ site.shoutem.builderURL }}) to manage Navigation in the app as explained above.

Great! Let's preview the app on our own physical device. Shoutem lets you develop React Native apps without even having Xcode or Android Studio installed. Moreover, you can preview iOS apps even if you use Windows. Just do `shoutem run` to bundle your extensions into the app and use our Shoutem Preview app to see what it looks like and see changes in real time!

```ShellSession
$ shoutem run
Select your app: News app ({{ site.example.appId }})
Creating the bundle for your app...
...
```

> #### Note
> To create bundle for the app, you need to have [Node.js v7](https://nodejs.org/en/) and [react-native-cli](http://npmjs.com/package/react-native-cli) installed. See [FAQ]({{ site.url }}/docs/extensions/tutorials/faq) if you have problems setting this up.

Once the app is bundled, the CLI will print the QR code to the terminal. Scan it with the Shoutem Preview app if you have it, if not, scanning it will download the Shoutem Preview app and open your app. Make sure you're connected to the same WiFi network on both your computer and smartphone (we'll soon make it possible to do it without being connected to the same WiFi).

This is the result you'll have on your phone:

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/hello-world.png'/>
</p>

**Well done!** You just built your first app using your own custom built extension!

> #### Note
> The Shoutem Preview app currently has issues running on Android 4 devices.

## What's next?

To leverage the full power of Shoutem, we'd suggest you go through the [My first extension]({{ site.url }}/docs/extensions/my-first-extension/introduction) tutorial, which explains the underlying concepts in more detail.
