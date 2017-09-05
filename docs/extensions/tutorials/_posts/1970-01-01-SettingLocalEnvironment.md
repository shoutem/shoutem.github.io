---
layout: doc
permalink: /docs/extensions/tutorials/setting-local-environment
title: Setting up your Local Environment
section: Tutorials
---

# Setting up your Local Environment

In this tutorial we will explain how to set up a local environment that allows you to preview changes to your app in real time. In other words, once you're set up, you won't have to _push_ your extension to Shoutem every time you want to see the changes you made to it. You can do this using your own physical device or an emulator.

To be able to follow this tutorial, you should go through our [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started) tutorial so you have an extension to easily test your local environment with.

## Local Development

If you've gone through [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started), you already have a cloned app.

```ShellSession
$ shoutem clone
Select your app: Restaurants ({{ site.example.appId }})
Cloning `Restaurants` to `Restaurants`
...
```

All you need to run a Shoutem app locally is a smartphone and `Node.js` version 6 or higher!

You can use `shoutem run` in a cloned app's directory to preview the app on your own device using the Shoutem Preview app. Like we mentioned earlier, it lets you develop and test your React Native apps on any platform (Windows, Mac, Linux). It will make the CLI execute the React packager in another terminal window and generate a QR code for you to scan with the Shoutem Preview app in order to open it on your device:

```ShellSession
$ shoutem run

Scanning 706 folders for symlinks in /path/to/Restaurants/node_modules (5ms)
...
```

You can of course preview your app through the Shoutem Builder where you can manage your app as well. It works similarly to the Shoutem Preview app, having the same advantages, but also the same native code limitations. The main difference being that you have to _push_ your extension every time you make a change to it, as well as wait for the Builder to bundle all the JavaScript changes.

## Real Time Code Changes

We will now explain how to preview code changes in your extensions in real-time. If you've gone through the [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started) tutorial, you should have a Restaurants app on the Builder. To be able to see changes in your extension as you make them **without** having to push your extension to Shoutem every time you make a change.

In [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started), we already cloned the app we made, so you can just navigate to it's directory and run it locally:

```ShellSession
$ cd Restaurants
$ shoutem run

Scanning 706 folders for symlinks in /path/to/Restaurants/node_modules (5ms)
...
```

This will print a QR code for you to scan with the Shoutem Preview app.

Changes made to JavaScript code can be seen instantly now, all you have to do is reload the app by shaking your device to open up the **Developer Menu** and selecting **Reload**.

Now you can develop your extension much faster because you can see the changes you make to your extension in real time, exactly like a regular React Native app. Let's see how this works. Change something inside your extension, for example you could add another line of `<Text>` to the List screen:

```javascript{5}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Let's eat!</Text>
        <Text style={styles.text}>This is my first extension!</Text>
      </View>
    );
  }
```

Save the changes, reload the device as previously described and you should see your new line of text right there.

## Local Development with Native Code

There are limitations to what the Shoutem Preview app can preview. Namely, it can only preview apps that have no native code linked into them. This is because the Shoutem Preview app has it's own binary, so it can only preview changes made to the JavaScript bundle of the app.

To work on apps with native code changes, you can use `react-native run-ios` and `react-native run-android` inside your cloned app's directory, the same way you'd use them with any other React Native app! You can find out how to set up your local environment for React Native development using [Facebook's official documentation](https://facebook.github.io/react-native/docs/getting-started.html). Make sure you strictly pass through all the steps described there.

<p class="image">
<img src='{{ site.url }}/img/tutorials/setting-local-environment/rn-getting-started.png'/>
</p>

Once you have that set up, you can continue your work like it was a regular React Native app.

```ShellSession
$ react-native run-ios
Scanning 706 folders for symlinks in /path/to/Restaurants/node_modules (18ms)
...
```

### Managing your app's Configuration

This section will cover the uses of the configuration script and associated commands.

#### shoutem configure

```ShellSession
$ shoutem configure

> @shoutem/mobile-app@1.1.2 configure /path/to/Restaurants
> node scripts/configure
...
```

The command should be called when:
 - an extension is installed, updated or uninstalled
 - changing native code of any of the extensions from the `extensions` directory
 - changing cocoapods or gradle dependencies of any of the extensions from the `extensions` directory
 - switching between published (`shoutem configure --release`) and development (`shoutem configure`) configuration

<br/>
#### shoutem configure --release

```ShellSession
$ shoutem configure --release

> @shoutem/mobile-app@1.1.2 configure /path/to/Restaurants
> node scripts/configure "--release"
...
```

This command should be called when:
- bundling assets into the app

<br/>
#### shoutem configure --production

```ShellSession
$ shoutem configure --production

> @shoutem/mobile-app@1.1.2 configure /path/to/Restaurants
> node scripts/configure "--production"
...
```

This command should be called when:
- switching between development (`shoutem configure`) and last published (`shoutem configure --production`) configuration
- bundling assets into the app
- preparing app for [Apple App Store and Google Play Store Submission]({{ site.url }}/docs/extensions/tutorials/publish-your-app)
- activating Shoutem features like CodePush, Push Notifications and Analytics

## Best Practises

So, you've passed **Setting up your Local Environment** which means that you're ready for some serious development. But, before you start, read about the [best practises]({{ site.url }}/docs/extensions/reference/overview) when doing that.
