---
layout: doc
permalink: /docs/extensions/tutorials/getting-started
title: Getting Started
section: Tutorials
---

# Getting Started

Shoutem is a platform that enables you to build, publish and manage high-quality native iOS and Android apps. It's built on top of React Native and open sourced for developers. The philosophy behind Shoutem is to let you build apps efficiently without restricting you on how to use React Native.

## Apps and Extensions

The efficiency of building apps is achieved with a simple architecture: apps are built using smaller modules called `extensions`. An extension is a self-contained and complete functionality that can be reused. Everything in the app is an extension: navigation, places (list and details), push notifications, analytics, ads, etc...

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/apps-are-made-of-extensions.png'/>
</p>

Shoutem prepared and [open sourced](https://github.com/shoutem/extensions) a lot of extensions that you can use in your apps. **Don't reinvent the wheel**: reuse extensions which are suitable for your app, customize them or create new ones. It's the world-first WordPress-like solution for mobile apps.

## The Builder

Shoutem apps are managed on a beautiful web interface called the **Builder**. It allows you to host your project online and make it customizable for non-technical people, which is perfect for a developer's clients. It also allows developers to save time setting up a part of their app so they can focus on their own unique features.

## Your First App

If you haven't already, go to the [Builder]({{ site.shoutem.builderURL }}) and create an account. Once signed in, create a new `Blank app`. For the purpose of this quick tutorial, we'll make a Restaurants and Food based app, lets call it `Snack Attack App`. To rename your app, click on the `Blank app`, delete the content and type in `Snack Attack App`.

Lets say we want to add an About screen as well as a Video RSS screen that houses a YouTube playlist of short recipe videos. To do that, click on the + button next to Screens and select the About extension then do the same thing and add the Video RSS extension. After adding the screens, you can use Shoutem's CMS to add content to your About screen. Select the About screen in Main Navigation, click on "Create Items" to open the CMS modal. Now click on "Add Item" which will open the "New item" modal. Here you can fill out the form with all the information you might want to display on your About screen. If you don't feel like doing so, you can simply use the CSV import option by clicking on the `...` button and then click Import.

We've prepared a [CSV file]({{ site.url }}/csv/getting-started-about.csv) for you to use for your About extension, and a video RSS feed link for your Video RSS extension:
`https://www.youtube.com/feeds/videos.xml?playlist_id=PLcpoB2VESJme2qPsS1Mx1dVmTUKh8MhJe`

After you add these screens and content to your app, it should look something like this:

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/about-videos-screens.png'/>
</p>

## Creating a New Extension

Start by installing the [Shoutem CLI]({{ site.shoutem.cli }}), a tool for extension development.

```ShellSession
$ npm install -g @shoutem/cli
```

> #### Note
> If the previous command fails because of _permission_ issues, you need to run it with `sudo`: `sudo npm install -g @shoutem/cli`.

Start by using the `shoutem login` command with your Shoutem credentials ("{{ site.example.devName }}" is used as a developer name in this example).

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

Clone the app you made in the Builder to your machine by using `shoutem clone` and selecting your app from the list:

```ShellSession
$ shoutem clone
Select your app: Snack Attack App ({{ site.example.appId}})
Pulling the app `Snack Attack App`...
Pulling extensions...
Change your working directory to `Snack_Attack_App`
```

Now locate to `Snack_Attack/extensions` and create your new extension using `shoutem init`:

```ShellSession
$ cd Snack_Attack/extensions
$ shoutem init snack-attack
Enter information about your extension. Press `return` to accept (default) values.
Title: Snack Attack
Version: 0.0.1
Description: Snack Attack food app.

Initializing extension:
...

Extension initialized!
```

The `shoutem init` command bootstrapped the `snack-attack` folder with extension files. Switch over to the extension folder:

```ShellSession
$ cd snack-attack
```

Create a screen with a shortcut (pointer to the starting screen of the extension):

```ShellSession
$ shoutem screen add List --shortcut Restaurants
Enter shortcut information:
Title: Restaurants

Screen `List` is created in file `app/screens/Hello.js`!
Shortcut `Restaurants` is created!
Shortcut `Restaurants` opens `List` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

This created the `List` screen in `app/screens/List.js` file. The reason we named it List is because in the [My First Extension]({{ site.url }}/docs/extensions/my-first-extension/introduction) tutorial series we'll turn this screen into a list of restaurants, but for now, a template screen will suffice. Any time you create a new screen it'll be a simple `Hello World!` screen.

To fit the app, lets change the `app/screens/List.js` file so it says `Lets eat!` instead of `Hello World!`:

```JavaScript{5}
#file: app/screens/List.js
export default class List extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Lets eat!</Text>
      </View>
    );
  }
}
```

Let's push what we've built to Shoutem.

```ShellSession
$ shoutem push
Uploading `Hello World` extension to Shoutem...
Success!
```

Now install the extension into the app you made on the Builder. `shoutem install` lists all the available apps onto which you can install the extension. Select your `Snack Attack App`.

```ShellSession
$ shoutem install
Select app to install extension: Snack Attack App ({{ site.example.appId }})

Extension installed.
See it in the builder: {{ site.shoutem.builderURL }}/app/{{ site.example.appId }}
```

Open the app in the Builder. Click on the `+` next to **Screens** and select `Custom` category. You can see your `Snack Attack` extension there. Click it to add it to Main Navigation, just like you did with About and Videos RSS.

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/adding-custom-extension.png'/>
</p>

Great! Now let's preview the app. You can use the Builder to preview the app, or you can preview it using the **Shoutem Preview** app (available for [iOS]({{ site.shoutem.previewAppiOS }}) and [Android]({{ site.shoutem.previewAppAndroid }})). Using the Shoutem Preview app, you can even preview iOS apps when developing on Windows.

Simply use `shoutem run`, select your app from the list and scan the generated QR code using the Shoutem Preview app (or any other QR code scanner).

```ShellSession
$ shoutem run
Select your app: Snack Attack App ({{ site.example.appId }})
Creating the bundle for your app...
...
```

> #### Note
> To create the bundle for your app, you need to have [Node.js v7](https://nodejs.org/en/) and [react-native-cli](http://npmjs.com/package/react-native-cli) installed. See [FAQ]({{ site.url }}/docs/extensions/tutorials/faq) if you have problems setting this up.
> Also, make sure you're connected to the same WiFi network on both your computer and smartphone (we'll soon make it possible to do it without being connected to the same WiFi).

This is the result you'll have on your phone:

<p class="image">
<img src='{{ site.url }}/img/tutorials/getting-started/shoutem-run.png'/>
</p>

**Well done!** You just built your first app using your own custom built extension!

## What's next?

To leverage the full power of Shoutem, we'd suggest you go through the [My first extension]({{ site.url }}/docs/extensions/my-first-extension/introduction) tutorial, which explains the underlying concepts in more detail.
