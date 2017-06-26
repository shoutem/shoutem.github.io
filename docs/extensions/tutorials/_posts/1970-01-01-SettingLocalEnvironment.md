---
layout: doc
permalink: /docs/extensions/tutorials/setting-local-environment
title: Setting up your Local Environment
section: Tutorials
---

# Setting up your Local Environment

In this tutorial we will explain how to set up a local environment that allows you to preview changes to your app in real time. In other words, once you're set up, you won't have to _push_ your extension to Shoutem every time you want to see the changes you made to it. You can do this using your own physical device or an emulator.

To be able to follow this tutorial, you should go through our [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started) tutorial so you have a an extension to easily test your local environment with.

## React Native Environment

Before setting up a local environment for building Shoutem extensions, set up React Native environment as described in their [Getting started tutorial](https://facebook.github.io/react-native/docs/getting-started.html). Make sure you strictly pass through all the steps described there.

<p class="image">
<img src='{{ site.url }}/img/tutorials/setting-local-environment/rn-getting-started.png'/>
</p>

In that tutorial, previewing changes in iOS apps locally is only available on Mac. That's not the case when you're using Shoutem. You can test your React Native apps on iOS platform by using the **Shoutem Preview app** (available for [iOS]({{ site.shoutem.previewAppiOS }}) and [Android]({{ site.shoutem.previewAppAndroid }})) for testing your app on a physical iOS device or just using the [Shoutem Builder]({{ site.shoutem.builderURL }}) for testing it on an iOS simulator.

## Previewing Options

There are three different ways you can preview your app using Shoutem, all of them require you to have an app downloaded using `shoutem clone`. If you've gone through [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started), you already have a cloned app, so just use that directory.

```ShellSession
$ shoutem clone
Select your app: Restaurants ({{ site.example.appId}})
Pulling the app `Restaurants`...
Pulling extensions...
Change your working directory to `Restaurants`
$ cd Restaurants
```

#### Shoutem Run

`shoutem run` is used inside an app directory made using `shoutem clone`. It previews the app on your device using the **Shoutem Preview app**. The great thing about the Shoutem Preview app is that it will let you work with your app on an iOS device even if you're using Windows!

There are limitations to what the Shoutem Preview app can preview. Namely, it can only preview apps that have no native code linked into them. This is because the Shoutem Preview app has it's own binary, so it can only preview changes made to the JavaScript bundle of the app.

#### React Native Preview

 You can use `react-native run-ios` and `react-native run-android` inside your cloned app's directory, the same way you'd use them with any other React Native app!

#### Shoutem Builder

You can of course preview your app through the Shoutem Builder where you can manage your app as well. It works identically to the Shoutem Preview app, having the same advantages and limitations.

Do note that you have to _push_ your extension every time you make a change to it, as well as wait for the Builder to bundle all the JavaScript changes.

## Local Development

We will now explain how to preview code changes in your extensions in real-time. If you've gone through the **Getting Started** tutorial, you should have a Restaurants app on the Builder. To be able to see changes in your extension as you make them **without** having to push your extension to Shoutem every time you make a change, you'll have to use either `shoutem run` or `react-native run-OS`, as mentioned above in the Preview Options section.

### Using an Emulator

For the purposes of this tutorial, we'll assume you're running your app with `react-native run-ios`. Again, make sure you go through [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started), so you have an app and extension ready. In Getting Started, we already cloned the app we made, so you can just navigate to it's directory and run it locally:

```ShellSession
$ cd Restaurants
$ react-native run-ios
```

Now you can develop your extension much faster because you can see the changes you make to your extension in real time, exactly like a regular React Native app.

Lets see how this works. Change something inside your extension, for example you could add another line of `<Text>` to the List screen:

```javascript{5}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Lets eat!</Text>
        <Text style={styles.text}>This is my first extension!</Text>
      </View>
    );
  }
```

Save the changes. Now you don't need to do `shoutem push` and wait for the Builder to load the changes, you can just reload the app:
- On simulator:
  - iOS: press `Command ⌘` + `R`
  - Android: press `R` twice
- Using `shoutem run`: shake your device to open up **Developer Menu** and select **Reload**

If you enable automatic reloading, the previous step is unnecessary. Having local environment set, you can also debug your extension. Follow the React Native guide on [debugging](https://facebook.github.io/react-native/docs/debugging.html) where you can find out how automatic reloading works as well.

### Synchronizing your local app with the Builder

When installing, uninstalling or updating extensions or changing the platform version, you will have to _pull_ these changes from the builder using `shoutem pull`. You don't even have to close your React Packager or emulator:

```ShellSession
$ shoutem pull

> @shoutem/mobile-app@1.1.0 configure /path/to/Restaurants
...
```

This will sync up your app with the newly installed extensions or other changes done through the Builder.

## Best Practises

So, you've passed **My First Extension** and **Setting up your Local Environment** which means that you're ready for some serious development. But, before you start, read about the [best practises]({{ site.url }}/docs/extensions/reference/overview) when doing that.
