---
layout: doc
permalink: /docs/extensions/tutorials/using-native-modules
title: Using native modules
section: Tutorials
---

# Using native modules

This tutorial will show you how to easily gain access to native APIs in your extension. We designed Shoutem to help you build true native applications with little effort. This means that most of the time you'll reuse existing JavaScript modules. However, you can use any feature of the underlying platform or a 3rd party native module.

As an example, we'll show you how we built a Shopify extension by using their **_Mobile Buy SDK_** for iOS and Android. Although this is an advanced use case, as you follow the tutorial, you'll notice just how easy it was. We assume that you went through our [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction) guide and understand how to create a Shoutem extension. We'll focus only on details specific to extensions using native modules.

> #### Note
> Before we start, you might want to read the excellent official guides on how to write native modules for [iOS](https://facebook.github.io/react-native/docs/native-modules-ios.html) and [Android](https://facebook.github.io/react-native/docs/native-modules-android.html), since this tutorial relies on these concepts.

There are three cases you'll meet when accessing native APIs from your extension:

1. You'll create a native module that will serve as a bridge to expose some native methods to JavaScript. This is a simple case where you just need to follow the official guides mentioned above and everything will work out of the box.

2. You'll want to use a 3rd party SDK such as those from Shopify or Firebase. This is the case we'll describe in more detail.
  To use the SDK, you'll need to find an existing React Native bridge that already exposes its methods to JavaScript, or create one yourself. Whatever you choose, the same principles apply when it comes to integrating the bridge with Shoutem.

3. You'll use code that requires user permissions such as accessing location information, contacts, or push notifications. You can do this, but you'll need to write a script that modifies the Shoutem application's project files. We'll give you general guidance on how to do this but won't go into details since each use case is unique. We're working on being able to do this through extension's configuration to give a smooth development experience.

## Creating a Shopify extension

Shopify lets you create and manage an online store. Merchants all over the world use it to grow their business, and many of them want to have their stores accessible from mobile apps. [Shopify's Mobile Buy SDK](https://help.shopify.com/api/sdks/mobile-buy-sdk) for iOS and Android helps developers integrate a store into an app. You can use it to list products, let customers buy them, and give them a way to track their orders.

Our Shopify extension lets customers browse and buy products through a mobile app built with Shoutem. All that a store owner needs to do is enter his API key in extension settings. The extension handles the entire mobile shopping experience.

This is the result of the tutorial, a Shopify store within an app built with Shoutem:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/native-modules/shop-in-app.png'/>
</p>

Since we open sourced the extension's code, you can use it as a reference as you follow the tutorial. Most of it relates to managing the store's logic, which we won't go into. To learn how to create your own extensions with native modules, you'll just need to understand the infrastructure.

## Creating a React Native bridge for Shopify's SDK

To use Shopify's **_Mobile Buy SDK_** in our JavaScript code, we need to create a React Native bridge. There wasn't one available so we built [our own](https://github.com/shoutem/react-native-shopify) and open sourced it. React Native is still a new technology so although there are many bridges for popular native SDKs, sometimes you'll have to build one yourself. When faced with this kind of a situation, you have two options:

1. Embedding the bridge in your extension
2. Creating the bridge as a separate module and referring to it as a dependency from the extension

We recommend the latter approach, which we used for our Shopify bridge. This keeps your extension focused on consuming the SDK's API, separates responsibilities and lets other people easily use your bridge in their projects if you decide to share it.

> #### Note
> When creating a bridge that you will use as a library module, if you just initialize a new React Native project, things won't work as expected. You have to set up the native code for iOS and Android, and some JavaScript to hold it together, all in a specific format. This process is time-consuming and error-prone, but there is a [great CLI tool](https://github.com/frostney/react-native-create-library) that does all of this for you with a single command.

If you read the instructions for using the bridge, you'll notice that the application is responsible for installing the **_Mobile Buy SDK_**. If you embedded the SDK in the bridge, this would introduce a transitive dependency, which is a bad practice. Imagine that an application has another dependency that uses a different version of the SDK. This would lead to unavoidable clashes between the two. When the application provides the SDK, it's able to properly resolve its dependencies and avoid such situations.

The result of this step is a bridge between JavaScript and native code that you distribute as an `npm` module. It's just a set of wrappers around native methods. In the next step, we'll show you how to use the bridge in your extension.

You'll notice that the bridge's documentation recommends using **_CocoaPods_** to install the **_Mobile Buy SDK_** for iOS as a **_Pod_**.

> #### Note
> In case you're not familiar with **CocoaPods**, the dependency management system for iOS, take some time to read the [official documentation](https://guides.cocoapods.org/using/using-cocoapods.html) before you go ahead. The following sections assume you're comfortable with its basic concepts.

Applications that follow this approach will install the native dependency **_Pod_** in their `ios/Pods` folder. To have your bridge see this native code you have to set its **_Header Search Paths_**. You can find them in **_Build Settings_** of your bridge's `.xcodeproj` file when you open it in XCode. You can assume that applications will install the bridge in their `node_modules` folder. To reference the application's `Pods` folder from the bridge's `ios` folder, you'll first need to reference the current directory with the `$SRCROOT` variable in XCode, and then go back three levels to place yourself in the application's root folder. Then you can refer to the application's `Pods` folder. The result should look like this:

`$(SRCROOT)/../../../ios/Pods`

You can use this path for any bridge that assumes this structure. Don't forget to set this path for both the **_Debug_** and **_Release_** builds, and mark it as recursive. The following picture shows how this setting looks like for the Shopify bridge when viewed in XCode:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/native-modules/header-search-paths.png'/>
</p>

## Including the bridge in our Shopify extension

There are three steps you need to take before you can use the bridge in your extension.

First, add it as a dependency to your extension's `package.json`, in the `app` folder.

Then, link all the bridge's native code to the end application. You can read all about [linking native libraries](https://facebook.github.io/react-native/docs/linking-libraries-ios.html) in the official documentation. You need to invoke the `react-native link` command for every dependency that has native code you want to use in your extension. With Shoutem, you do this by using an `rnpm postlink` command in `package.json`. Shoutem's build process will execute it after it installs all dependencies for all extensions. This is how our Shopify extension's `package.json` looks like after we've applied these two steps:

```JSON{5-12}
#file: app/package.json
{
  "name": "shoutem.shopify",
  "version": "0.0.1",
  "description": "Shopify extension",
  "dependencies": {
    "react-native-shopify": "0.0.1-alpha.0"
  },
  "rnpm": {
    "commands": {
      "postlink": "react-native link react-native-shopify"
    }
  },
}
```
You can only execute a single command with `rnpm postlink`. When you have more than one native library you want to link, use an execution script, as shown below:

```JSON
#file: app/package.json
"postlink": "node node_modules/shoutem.shopify/scripts/run.js"
```

> #### Note
> Shoutem installs extensions as node modules. This is why you need to prepend `node_modules/{extension name}` to the script path.

The Shopify extension uses a React Native library `react-native-search-bar` that wraps the iOS native search bar. Since there are two libraries we need to link, we wrote the following `run` script, which you can change and reuse in your extension:

```JavaScript
const exec = require('child_process').execSync;

const dependenciesToLink = ['react-native-shopify', 'react-native-search-bar'];

const command = 'react-native link';

dependenciesToLink.forEach((dependency) => {
  exec(`${command} ${dependency}`);
});
```
> #### Note
> We used Node's synchronous API because the asynchronous version causes the build to hang forever in some situations.

The last step is to include the SDKs from Shopify, which do the heavy lifting on the native side.

## Referencing a 3rd party SDK

We mentioned before that the best practice when creating wrappers around native libraries is to let the application itself manage the dependencies. If we created a regular React Native application to test our Shopify bridge, it would be responsible for installing the **_Mobile Buy SDK_**. However, a Shoutem extension is a module within a larger Shoutem application. The latter, and not the extension itself, is responsible for dependency management.

With Android, things are straightforward because you specify native dependencies in `build.gradle` and install them as part of the build process. Native modules for iOS need an extra step but Shoutem makes this easy.

Shoutem treats an extension's iOS aspect as a **_Pod_** and lets it specify a `.podspec` file where it can declare its dependencies. A Shoutem application generates a `Podfile` from a template at build time and dynamically includes all native iOS dependencies declared by its extensions.

The example below shows how the Shopify extension declares its **_Mobile Buy SDK_** dependency:

```JSON
#file: ShoutemShopify.podspec
Pod::Spec.new do |s|

  s.name         = "ShoutemShopify"
  s.version      = "1.0"
  s.summary      = "A Shopify extension for Shoutem."

  s.description  = "The Shopify extension enables store owners to make money by selling
                    products in Shoutem applications."

  s.homepage     = "http://www.shoutem.com"
  s.platform     = :ios

  s.license      = { :type => "MIT" }

  s.author       = "Shoutem"

  s.source       = { :path => "" }

  s.exclude_files = "Classes/Exclude"

  # s.public_header_files = "Classes/**/*.h"

  s.dependency  'Mobile-Buy-SDK', '2.2.0'

end
```

This is how the Podfile of a Shoutem application that has this extension installed looks like after the build process:

```JSON
#file: Podfile
target 'ShoutemApp' do
  # Uncomment this line if you're using Swift or would like to use dynamic frameworks
  use_frameworks!

  pod 'ShoutemShopify', :path => '../node_modules/shoutem.shopify/ShoutemShopify.podspec'

  target 'ShoutemAppTests' do
    inherit! :search_paths
    # Pods for testing
  end

end
```

After you build the application, a native dependency will be available to any bridge that wraps it and thus to JavaScript code.

> #### Note
> This is the preferred way of managing native iOS dependencies in extensions. Although it's possible to embed native code directly in an extension, this introduces a transitive dependency and can result in unpredictable behavior.

## Calling the SDK's methods from JavaScript

Once you have your bridge and its native dependencies installed, you can use it as any other JavaScript module. Let's use Shopify's SDK to fetch shop information and use it in our extension:

```JavaScript
import { getExtensionSettings } from 'shoutem.application';
import Shopify from 'react-native-shopify';

import {
  shopLoaded,
  shopErrorLoading,
} from './redux/actionCreators';

import { ext } from './const';

export function appDidMount(app) {
  const store = app.getStore();
  const { dispatch } = store;
  const state = store.getState();

  const { store: shopifyStore, apiKey } = getExtensionSettings(state, ext());

  Shopify.initialize(shopifyStore, apiKey);

  return Shopify.getShop()
  .then(shop) => {
    dispatch(shopLoaded(collections, shop, tags));
  })
  .catch((error) => {
    console.log(error);
    dispatch(shopErrorLoading());
  });
}
```

## Requiring user permissions and other advanced use cases

As mentioned in the introduction, sometimes you'll need to support advanced use cases and change core project files. This can mean changing the application's `xcode.project` or `build.gradle` files, `AndroidManifest.xml`,  or even `AppDelegate` and `MainActivity`. With the help of Node's filesystem modules and 3rd party libraries such as [xcode](https://www.npmjs.com/package/xcode), you can do just about anything.

We're working on a more developer friendly system for common use cases, which we'll describe in detail. For now, with some Node scripting, you can meet any goal in your custom extension, although with some extra effort.
