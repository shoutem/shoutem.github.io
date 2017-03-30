---
layout: doc
permalink: /docs/extensions/tutorials/setting-local-environment
title: Setting local environment
section: Tutorials
---

# Setting up local environment

This tutorial explains how to build extensions without the need to _push_ them to Shoutem. Setting local development will help you develop your extension much faster with the ability to debug and test it on your device.

Make sure you understand concepts introduced in the [Getting started]({{ site.baseurl }}/docs/extensions/getting-started/introduction) before reading this tutorial.

> #### Note
> To test this out, you need an app using your own extension. If you don't have it set up, [download](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started) the extension from Getting started and install it with `shoutem install --new` to the new app. Now, add the screen to app navigation and add some content.

## React Native environment

Before setting up local environment for building Shoutem extensions, set up React Native environment as described in their [Getting started tutorial](https://facebook.github.io/react-native/docs/getting-started.html). Make sure you stricly pass through all the steps described there.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/setting-local-environment/rn-getting-started.png'/>
</p>

As it's written in that tutorial, building iOS apps locally is only available on Mac. However, using Shoutem on Windows, you can test your React Native apps on iOS platform by: using [Shoutem Preview]({{ site.shoutem.previewApp }}) for testing your app on iOS device or [Shoutem Builder]({{ site.shoutem.builderURL }}) for testing it on iOS simulator.

## Local preview

Once you create an app on Shoutem, preview it on local simulator or your device by running:

```ShellSession
$ shoutem run-ios
Select a device: iPhone 6
Select your app: Restaurants ({{ site.example.appId }})
Running `Restaurants` app on `iPhone 6` simulator...
...
```

This command takes the code from Shoutem server. For Android, use `shoutem run-android` command.

## Local development

_Pushing_ your extension to Shoutem and waiting for Shoutem to build the new app is time consuming. Just running your app locally doesn't solve this problem as it takes the code from the Shoutem.

However, you can _link_ your local extension code to the local environment (similar to [react-native link](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)). Next time you run the app, Shoutem will take local extension code instead of taking it from the Shoutem.

Navigate to your extension directory:

```ShellSession
$ cd restaurants
```

... and link the extension:

```ShellSession
$ shoutem link
Extension successfully linked. Please, kill the packager before running the app.
```

Run the app that uses linked extension:

```ShellSession
$ shoutem run-ios
Select a device: iPhone 6
Select your app: Restaurants ({{ site.example.appId }})
Running `Restaurants` app on `iPhone 6` simulator...
...
```

When the app was run, code from linked extensions was taken locally and other extensions were fetched from Shoutem server. Running the app will take some time (around 3-4mins), but now you can develop your extension much faster.

Change something inside of your extension. For instance, change `RESTAURANTS` to `EATING PLACES` in `app/screens/List.js`:

```javascript{6}
  render() {
    const { restaurants } = this.props;
    
    return (
      <Screen>
        <NavigationBar title="EATING PLACES" />
        <ListView
          data={restaurants}
          loading={isBusy(restaurants)}
          renderRow={restaurant => this.renderRow(restaurant, navigateTo)}
        />
      </Screen>
    );
  }
```

Hit save.

To see the changes, you don't need to do `shoutem push`. Just reload the app:

- On simulator:
  - iOS: press `Command ⌘` + `R`
  - Android: press `R` twice
- On device: shake your device to open up **Developer Menu** and select **Reload**

If you enable automatic reloading, the previous step is unnecessary. Having local environment set, you can also debug your extension. Follow the React Native guide on [debugging](https://facebook.github.io/react-native/docs/debugging.html) where automatic reloading is explained as well.

To see which extensions are linked (alongside with signed in developer), run:

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

... or just delete the extension. You can also do `shoutem unlink --all`.

## App project

When you push your extension to Shoutem, we build the app with that extension for you. However, sometimes you might want to see the full picture - how complete app project looks like.

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

Check how the project structure looks like. It should look familiar - this is how usual React Native project looks like. The `index.js` file is the starting point.

Notice `extensions` folder. This folder contains all the extensions installed in the app (you can see them in **Extensions** tab for your app). Run the app from that folder:

```ShellSession
$ shoutem run-ios
...
```

This will run the app that has been fetched locally. It will use all the extensions from `extensions` folder, so you can change something locally and see the change when you reload the app.

> #### Note
> Extensions inside of the app project folder are only linked to the local app, so when you run the `shoutem run-ios` outside of that folder, you won't get them linked. If you want them linked, go inside of the specific folder in `extensions` and run `shoutem link`.

Once you're satisfied with some extension, just push it to the Shoutem as your own extension with `shoutem push`.

## Best practises

So, you've passed **Getting started** and **Setting local environment** which means that you're ready for some serious development. But, before you start, read what are the [best practises]({{ site.baseurl }}/docs/extensions/tutorials/best-practises) in doing that.

