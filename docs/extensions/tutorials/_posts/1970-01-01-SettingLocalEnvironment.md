---
layout: doc
permalink: /docs/extensions/tutorials/setting-local-environment
title: Setting up your Local Environment
section: Tutorials
---

# Setting up your Local Environment

In this tutorial we will explain how to set up a local environment that allows you to preview changes to your app in real time. In other words, once you're set up, you won't have to upload your extension to Shoutem every time you want to see the changes you made to it. You can do this using your own physical device or an emulator.

To be able to follow this tutorial, you should go through our [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started) tutorial so you have a `Hello World` extension to test your local environment with.

## React Native Environment

Before setting up a local environment for building Shoutem extensions, set up React Native environment as described in their [Getting started tutorial](https://facebook.github.io/react-native/docs/getting-started.html). Make sure you strictly pass through all the steps described there.

<p class="image">
<img src='{{ site.url }}/img/tutorials/setting-local-environment/rn-getting-started.png'/>
</p>

In that tutorial, previewing changes in iOS apps locally is only available on Mac. That's not the case when you're using Shoutem. You can test your React Native apps on iOS platform by using the **Shoutem Preview app** (available for [iOS]({{ site.shoutem.previewAppiOS }}) and [Android]({{ site.shoutem.previewAppAndroid }})) for testing your app on a physical iOS device or just using the [Shoutem Builder]({{ site.shoutem.builderURL }}) for testing it on an iOS simulator.

## Previewing apps

There are three different ways you can preview your app using Shoutem, we'll explain each of them in this section. Do note, here we're only talking about previewing your app, for previewing _changes_ in real time, check the **Local Development** section.

#### Shoutem Run

`shoutem run` is used to preview the app on your device using the the **Shoutem Preview app**. The great thing about the Shoutem Preview app is that it will let you see what the app looks like on iOS even if you're using Windows.

However, there are limitations to what the Shoutem Preview app can preview. Namely, it can only preview code that has no native code linked into it. This is because the Shoutem Preview app has it's own binary, so it can only preview changes made to the JavaScript bundle of the app.

#### Shoutem Run-OS

`shoutem run-ios` and `shoutem run-android` are used for previewing the app locally on an emulator. They work analogously to `react-native run-ios` and `react-native run-android`, so they require you to set up your React Native environment as stated earlier in the tutorial.

#### Shoutem Builder

You can of course preview your app through the Shoutem Builder where you can manage your app as well. It works identically to the Shoutem Preview app, having the same advantages and limitations.

## Local Development

We will now explain how to preview code changes in your extensions in real-time. If you've gone through the **Getting Started** tutorial, you should have an app on the Builder. To be able to see changes in your extension as you make them **without** having to push your extension to Shoutem every time you make a change, you'll have to _link_ your local extension code to the local environment (similar to [react-native link](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)).

Navigate to your extension directory and link it to your local environment:

```ShellSession
$ cd hello-world
$ shoutem link
Directory successfully linked. Please, kill the packager before running the app.
```

Run the app that uses the extension you just linked:

```ShellSession
$ shoutem run-ios
Select a device: iPhone 6
Select your app: News app ({{ site.example.appId }})
Running `News app` app on `iPhone 6` simulator...
...
```

> #### Note
> The name of your app may be different if you decided to rename it in the Builder, simply make sure to select the app you installed your Hello World extension into.

When the app was run, the code from your linked extension was taken locally and other extensions were fetched from Shoutem server. Running the app will take some time (around 3-4mins), but now you can develop your extension much faster because you can see the changes you make to your extension in real time, exactly like a regular React Native app.

Lets see how this works. Change something inside your extension, for example you could add another line of `<Text>`:

```javascript{5}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
        <Text style={styles.text}>This is my first extension!</Text>
      </View>
    );
  }
```

Save the changes. Now you don't need to do `shoutem push` anymore since you linked this extension to your local environment. You can just reload the app:

- On simulator:
  - iOS: press `Command ⌘` + `R`
  - Android: press `R` twice
- On physical device: shake your device to open up **Developer Menu** and select **Reload**

If you enable automatic reloading, the previous step is unnecessary. Having local environment set, you can also debug your extension. Follow the React Native guide on [debugging](https://facebook.github.io/react-native/docs/debugging.html) where you can find out how automatic reloading works as well.

To see which extensions are linked, as well as which developer is signed in, run:

```ShellSession
$ shoutem show
Linked directories:
  /Path/to/hello-world
Registered as `{{ site.example.devName }}`.
```

To unlink an extension, locate to that folder and do:

```ShellSession
$ shoutem unlink
Unlink successful. Please, kill the packager before running the app.
```

... or just delete the extension.

You can also do `shoutem unlink --all`, but make sure you don't mind unlinking all the extensions you have linked.

## Getting the Full App Code

When you push your extension to Shoutem, we build the app with that extension for you. However, sometimes you might want to see the full picture - what the complete app project looks like. To get your Shoutem-built app's code, you can use:

```ShellSession
$ shoutem pull-app
Select the app you want to pull: News app ({{ site.example.appId }})
Pulling the app `News app`...
Pulling extensions...
Success!
Change your working directory to `News_app`.
```

Locate to `News_app` directory and open it:

```ShellSession
$ cd News_app
$ open .
```

Check what the project structure looks like. It should look familiar, because this is what regular React Native projects look like. The `index.js` file is the starting point. The `extensions` folder contains all the extensions installed in the app (all of the ones in the **Extensions** tab of your app in the Builder, not just the ones whose Screens you've added).

## Best Practises

So, you've passed **My First Extension** and **Setting up your Local Environment** which means that you're ready for some serious development. But, before you start, read about the [best practises]({{ site.url }}/docs/extensions/reference/overview) when doing that.
