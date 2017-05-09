---
layout: doc
permalink: /docs/extensions/tutorials/setting-local-environment
title: Setting up your Local Environment
section: Tutorials
---

# Setting up your Local Environment

This tutorial explains how to build extensions without the need to _push_ them to Shoutem. Setting up local development will help you develop your extensions much faster with the ability to debug and test it on your own physical device or emulator.

Make sure you understand concepts introduced in [Getting started]({{ site.url }}/docs/extensions/tutorials/getting-started) before reading this tutorial, it'll make it a lot easier to follow.

> #### Note
> To test this out, you need an app that uses your own, custom extension. If you don't have an app like that set up, [download](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started) the extension from My First Extension and install it with `shoutem install --new` to a new app. Now, add the screen to app navigation and add some content. If this all sounds confusing, just head over to [My First Extension]({{ site.url }}/docs/extensions/my-first-extension/introduction).

## React Native Environment

Before setting up a local environment for building Shoutem extensions, set up React Native environment as described in their [Getting started tutorial](https://facebook.github.io/react-native/docs/getting-started.html). Make sure you strictly pass through all the steps described there.

<p class="image">
<img src='{{ site.url }}/img/tutorials/setting-local-environment/rn-getting-started.png'/>
</p>

In that tutorial, building iOS apps locally is only available on Mac. Lies and slander! Using Shoutem, you can test your React Native apps on iOS platform by using the **Shoutem Preview App** (available for [iOS]({{ site.shoutem.previewAppiOS }}) and [Android]({{ site.shoutem.previewAppAndroid }})) for testing your app on a physical iOS device or just using the [Shoutem Builder]({{ site.shoutem.builderURL }}) for testing it on an iOS simulator.

## Local Preview

Once you create an app on Shoutem, preview it on a local simulator by running:

```ShellSession
$ shoutem run-ios
Select a device: iPhone 6
Select your app: Restaurants ({{ site.example.appId }})
Running `Restaurants` app on `iPhone 6` simulator...
...
```

This command takes the code from Shoutem Builder. For Android, use `shoutem run-android`.

## Local Development

_Pushing_ your extension to Shoutem and waiting for Shoutem to build the new app is time consuming. Just running your app locally doesn't solve this problem since it still takes the code from Shoutem.

However, you can _link_ your local extension code to the local environment (similar to [react-native link](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)). Next time you run the app, Shoutem will take the local extension code instead of taking it from the Builder, so you don't have to wait through the `push` and download.

Navigate to your extension directory:

```ShellSession
$ cd restaurants
```

... and link the extension:

```ShellSession
$ shoutem link
Extension successfully linked. Please, kill the packager before running the app.
```

Run the app that uses the extension you just linked:

```ShellSession
$ shoutem run-ios
Select a device: iPhone 6
Select your app: Restaurants ({{ site.example.appId }})
Running `Restaurants` app on `iPhone 6` simulator...
...
```

When the app was run, code from linked extensions was taken locally and other extensions were fetched from Shoutem server. Running the app will take some time (around 3-4mins), but now you can develop your extension much faster.

Change something inside your extension. For instance, change `RESTAURANTS` to `PLACES WITH NOM-NOMS` in `app/screens/List.js`:

```javascript{6}
  render() {
    const { restaurants } = this.props;

    return (
      <Screen>
        <NavigationBar title="PLACES WITH NOM-NOMS" />
        <ListView
          data={restaurants}
          loading={isBusy(restaurants)}
          renderRow={restaurant => this.renderRow(restaurant, navigateTo)}
        />
      </Screen>
    );
  }
```

Save your changed nom-noms file.

Now to see the changes, you don't need to do `shoutem push` anymore you can just reload the app:

- On simulator:
  - iOS: press `Command ⌘` + `R`
  - Android: press `R` twice
- On physical device: shake your device to open up **Developer Menu** and select **Reload**

If you enable automatic reloading, the previous step is unnecessary. Having local environment set, you can also debug your extension. Follow the React Native guide on [debugging](https://facebook.github.io/react-native/docs/debugging.html) where you can find out how automatic reloading works as well.

To see which extensions are linked (as well as which developer is signed in), run:

```ShellSession
$ shoutem show
Signed in as `{{ site.example.devName }}`.
Linked extensions:
  `restaurants` -> ~/{{ site.example.devName }}/extensions/restaurants
```

To unlink extension, locate to that folder and do:

```ShellSession
$ shoutem unlink
Unlink successful. Please, kill the packager before running the app.
```

... or just delete the extension.

You can also do `shoutem unlink --all`, but be careful with it, don't want to end up re-linking all those awesome extensions you'll be working on.

## App Project

When you push your extension to Shoutem, we build the app with that extension for you. However, sometimes you might want to see the full picture - what the complete app project looks like.

Get the complete app code:

```ShellSession
$ shoutem pull-app
Select the app you want to pull: Restaurants ({{ site.example.appId }})
Pulling the app `Restaurants`...
Pulling extensions...
Success!
Change your working directory to `Restaurants`.
```

Locate to `Restaurants` directory:

```ShellSession
$ cd Restaurants
```

Check how the project structure looks like. It should look familiar - because this is how usual React Native project looks like. The `index.js` file is the starting point.

Notice the `extensions` folder. It contains all the extensions installed in the app (you can see them in **Extensions** tab for your app). Run the app from that folder:

```ShellSession
$ shoutem run-ios
...
```

This will run the app that has been fetched locally. It will use all the extensions from `extensions` folder, so you can change something locally and see the change when you reload the app.

> #### Note
> Extensions inside the app project folder are only linked to the local app, so when you run the `shoutem run-ios` outside of that folder, you won't get them linked. If you want them linked, go inside of the specific folder in `extensions` and run `shoutem link`.

Once you're satisfied with your extension, just push it to the Shoutem as your own extension with `shoutem push`.

## Best Practises

So, you've passed **My First Extension** and **Setting up your Local Environment** which means that you're ready for some serious development. But, before you start, read about the [best practises]({{ site.url }}/docs/extensions/reference/overview) when doing that.
