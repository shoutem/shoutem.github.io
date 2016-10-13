---
layout: doc
permalink: /docs/extensions/tutorials/setting-local-environment
title: Setting local environment
section: Tutorials
---

# Setting up environment for local development

This tutorial explains how to build extensions locally, so you can [debug React Native](https://facebook.github.io/react-native/docs/debugging.html) code.

> #### Note
> This tutorial continues on concepts that were introduced in [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction) tutorial.

## React Native environment

Before setting up local environment for writing Shoutem extensions, set up React Native environment as described in their [Getting started tutorial](https://facebook.github.io/react-native/docs/getting-started.html). As it's written in that document, local building of iOS applications is only available through Mac.

## Shoutem environment

Once React Native environment is set, use [Shoutem CLI](https://www.npmjs.com/package/@shoutem/cli). It's as easy as:

```bash
$ shotuem env install
Setting up Shoutem environment:
Downloading environment for mobile app...
Downloaded!
Downloading environment for settings pages...
Downloaded!
Local environment 1.0.1 is successfully installed!
```

Setting up Shoutem environment is only needed once. However, Shoutem is constantly working on improving its platform and occasional updates will be needed. Check environment version with:

```bash
$ shoutem env --version
```

and update it with:

```bash
$ shoutem env update
```

## Running applications

Now you can run applications locally. Go to Shoutem builder and copy _App ID_ from the Settings tab.

To run in iOS (for which you need to use Mac), do:

```bash
$ shoutem run-ios --app-id={appID}
```

... where you should replace `{appID}` with _App ID_ from _Settings_ tab. On subsequent attempts, you can omit `--app-id` if you wish to run the same app.

To run in Android, set up Android Emulator with [Android Virtual Device](https://developer.android.com/studio/run/managing-avds.html): `android avd`. Once set, run:

```bash
$ shoutem run-android
```

## Linking extensions

To start locally develop our extension, we need to tell where is local extension code. This is done by `link` command. Locate to extension's folder and do:

```bash
$ shoutem link
```

Every time you run an app with that extension installed, it will use the extension code that you linked to the app. To `unlink` the extension code, simply do:

```bash
$ shoutem unlink
```

from extension's folder. To unlink all extensions, pass `--all` flag.

Use `show` command to see which extensions are linked to for local development:

```bash
$ shoutem show
```

## Debugging and automatic reloading

With the extensions linked, we can start with local development! Once you have your app (with installed extension) running on simulator, debugging is fairly easy. Just follow the [React Native guideline for debugging](https://facebook.github.io/react-native/docs/debugging.html). Automatic reloading, which will refresh your app with the new extension, is also described there.

For **debugging** on Mac: Debugging is enabled through ***In-App Developer Menu***. _You can access the developer menu by shaking your device or by selecting "Shake Gesture" inside the Hardware menu in the iOS Simulator. You can also use the Command ⌘ + D keyboard shortcut when your app is running in the iPhone Simulator, or Command ⌘ + M when running in an Android emulator._

For **automatic reloading** on Mac: _Instead of recompiling your app every time you make a change, you can reload your app's JavaScript code instantly. To do so, select "Reload" from the Developer Menu. You can also press Command ⌘ + R in the iOS Simulator, or press R twice on Android emulators._

Happy coding!