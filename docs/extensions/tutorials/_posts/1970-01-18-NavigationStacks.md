---
layout: doc
permalink: /docs/extensions/tutorials/navigation-stacks
title: Navigation stacks
section: Tutorials
---

# Navigation stacks

Another convenient improvement made possible by integrating react-navigation was the ability to define your own custom navigation flows, or navigation stacks as they are referred to in react-navigation. 

Previously, the navigational structure of Shoutem apps heavily depended on the shortcut tree you have defined inside the app builder. With the introduction of custom navigation stacks, you can now define your own navigation flow that can go outside the bounds of screen structure defined in the app builder.

That means you can design multiple screens and define their navigational behaviour, without having to compose any kind of screen structure inside the app builder. This comes in very handy when you need to implement a set of 3rd party authentication screens, or if you want to create some kind of onboarding set of screens, or any similar scenario that would require the user to step out of the standard screen structure, to complete some kind of app segment.

The interface needed to create something like this is conveniently simple, and it relies mostly on registering the screens that are a part of the new navigation flow.

```JavaScript
import { NavigationStacks } from 'shoutem.navigation';

NavigationStacks.registerNavigationStack(config);
```

Where the config object has the following properties ->

- **name** -> name of the custom stack. You can use the extension canonical name here, or anything else that fits your case. You will use this name to initialize the custom stack flow, and open it’s first screen

- **navigationStack** -> If needed, you can pass on the complete navigation stack that you created previously. By default, we will create a new [Stack type navigator](https://reactnavigation.org/docs/5.x/stack-navigator/), and add the registered screen as it’s children

- **screens** -> array of objects containing `{ name, component }` properties. These are the screens that will be added to your custom navigation stack. 

- **screenOptions** -> Set of global screen options that will be applied to your custom navigator. Check the full reference [here](https://reactnavigation.org/docs/5.x/screen-options/#screenoptions-prop-on-the-navigator).

- **navigatorOptions** -> Any other props you wish to pass on to your custom navigator. Options here depend mostly on the type of navigation stack from react-navigation that you’re using here.

Once you have registered your custom stack, you can navigate to it by simply calling the `openStack` method.

```JavaScript
import { NavigationStacks } from 'shoutem.navigation';

NavigationStacks.openStack(stackName, params = {}, initialRoute = null);
```

Where the `stackName` is the name of the stack you registered beforehand, `params` are the optional set of route params you want to pass to the first route of the stack, and the `initialRoute` as the name of the screen in the stack you want to open first. By default, `initialRoute` will be the first registered screen for the custom stack.

Once you’re done, you can simply call the `closeStack` method and return to the point in the app where you were prior to opening the stack.

```JavaScript
NavigationStacks.closeStack(stackName);
```

A good example of how you can use this new interface is our [shoutem.auth](https://github.com/shoutem/extensions/blob/master/shoutem.auth/app/navigation.js#L11) extension that implements a custom stack for it’s authentication flows.

## Modal stack navigation

Another example of navigation that uses the new navigation stack interface is the modal stack. By default, every shortcut screen from any of the extensions installed in your app, will be added to the modal stack, so it can be opened from any point in your application. If you need to add other screens, you can do so by calling ModalStack `registerModalScreens` method.

If you’re registering a screen that is exported from one of the extensions, you can use the short syntax, for example :

```JavaScript
ModalScreens.registerModalScreens(['shoutem.news.NewsListScreen']);
```

Or, you can use the longer syntax if necessary:

```JavaScript
ModalScreens.registerModalScreens([{
 name: 'shoutem.news.NewsListScreen',
 component: ScreenComponent,
 options: reactNavigationScreenOptions
}]);
```

Where the component represents the Screen component, and the options are the optional screen options object conforming to the react-navigation syntax.

Once you have this setup in place, navigating to a screen inside the modal stack is as easy as calling the `openInModal` from shoutem.navigation. Remember, these actions do not need to be dispatched through redux anymore.

```JavaScript
import { openInModal } from 'shoutem.navigation';

openInModal('shoutem.auth.EditProfileScreen');
```

When you want to close the modal stack, just call closeModal from shoutem.navigation, and you will be returned to the point in app prior to opening the modal stack.

```JavaScript
import { closeModal } from 'shoutem.navigation';

closeModal();
```
