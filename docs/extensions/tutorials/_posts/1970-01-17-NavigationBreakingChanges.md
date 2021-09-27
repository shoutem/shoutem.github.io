---
layout: doc
permalink: /docs/extensions/tutorials/navigation-breaking-changes
title: Breaking changes
section: Tutorials
---

# Breaking changes

In this section, we'll cover most fundamental changes implemented with the rework of our navigation flows. Consequently, most of these changes are in fact breaking changes as they modify how things work under the hood

## React navigation as the underlying architecture

We wanted to design our navigation mechanisms to closely follow the [most commonly used navigation library](https://reactnavigation.org/docs/5.x/getting-started/) across react native apps. So if you’re familiar with creating apps for react native, this interface should be familiar, and allow for easier transition.

Every screen in Shoutem apps will pass down the standard react navigation props, such as [route](https://reactnavigation.org/docs/5.x/route-prop/), or [navigation](https://reactnavigation.org/docs/5.x/navigation-prop/). So from this point of view, nothing really changes in comparison to standard react navigation apps. In addition to that, you will receive the shortcut route props, that were previously passed directly to the shoutem screen. So where you were reading the shortcut prop inside the screen directly, you will now need to destructure it first, from the shortcut route prop.

This by itself, makes it possible to use the react-navigation library just like you would outside Shoutem apps. We’ve also created a few helper methods for extracting the Shoutem relevant props, from the navigation route object. For full reference, you can check out the shoutem.navigation extension in our [public extensions repository](https://github.com/shoutem/extensions).

## Removing redux based navigation

Prior to the new platform update, our navigation implementation relied heavily on redux actions / redux middleware. While this allowed us more control over navigation in the past, it also introduced a significant drawback in terms of performance and overall resource usage. This was the main motivation behind walking away from this approach in place of more performant architecture. As mentioned earlier, we now make use of react-navigation “native” actions which are wrapped under shoutem.navigation methods.

This interface went through minimal changes, looking at it from the top level. This means that most of the actions are still named the same, and are imported from the same extension / path. However, under the hood, they now use more performant mechanisms. This is another `breaking change` you will need to consider.

The change however, is minimal. You will simply need to remove the dispatch layer around the navigation actions (seeing as they are no longer run through redux mechanisms).

For example, if you used the `navigateTo` action from shoutem.navigation, you will simply remove it from `mapDispatchToProps`, or just stop dispatching the action if you’re not mapping it through redux `connect`. Similar goes for `openInModal`, or any other navigation action you used before.

In the snippet below, you have a standard way of navigating in previous platforms.

```JavaScript
import { navigateTo } from 'shoutem.navigation';

...
navigateToScreen() {
 const { navigateTo } = this.props;

 navigateTo('ScreenName');
}

...
const mapDispatchToProps = { ...otherMappedActions, navigateTo };
```

To make this code compatible with the new platform, you would simply use the navigateTo action directly, without having to map it to dispatcher.

```JavaScript
import { navigateTo } from 'shoutem.navigation';

...
navigateToScreen() {
 navigateTo('ScreenName');
}

...
const mapDispatchToProps = { ...otherMappedActions };
```

You can apply this for every other navigational action, using the same formula. In case you have more complex behaviours and need some advice, feel free to check how other [shoutem extensions](https://github.com/shoutem/extensions) are handling their navigation flows, or contact us directly.

## Removing NavigationBar component from screens

Previously, this component was something you would need to implement in every screen you create. The main purpose of this was to provide you with ways of styling the navbar, specifically to this one screen. You would do this through the `styleName` prop, very similar to any other component styled with the Shoutem theme. 

While this worked well, the implementation was very abstract and customizing certain behaviours was complex and difficult to understand. React-navigation allows us to do this in an easier way, without introducing an abstracted component in your JSX code. Additionally, it will provide us with ways to change the navbar styling dynamically, and overall, provide more control over how the navbar is drawn.

Styling your navbar now is done the same way you would do it outside Shoutem apps, if you’re using react-navigation library. Navigation prop that is passed to the screen will allow you to call it’s [setOptions](https://reactnavigation.org/docs/5.x/navigation-prop/#setoptions) method, which amongst other things, allows you to set specific navbar / header styling. So now, you can style your navbar code outside the render method.

To allow for easier transition, we’ve introduced a helper method that will apply the same navbar styling you would achieve by setting the `styleName` prop on the old `NavigationBar` component. Please find the example below.

Previously, you would add the NavigationBar component to your render method like this : 

```JavaScript
render() {
 return (
   <Screen>
     <NavigationBar styleName="clear fade" />
     {this.renderData()}
   </Screen>
 );
}
```

This code/logic is now moved outside the render method, resulting in cleaner JSX syntax, as well as options of changing the styling dynamically in any lifecycle method, or other cases you may require.

```JavaScript
import { composeNavigationStyles } from 'shoutem.navigation';

componentDidMount() {
 const { navigation } = this.props;

 navigation.setOptions({
   ...composeNavigationStyles(['clear', 'fade']),
   ...otherOptions,
 });
}

render() {
 return (
   <Screen>
     {this.renderData()}
   </Screen>
 );
}
```

We make use of the `composeNavigationStyles` helper here, to apply the same styling you would receive through the `styleName` props on `NavigationBar`. Simply pass on the `styleName`'s used before, into this method, and you will receive the same styling you’ve had before.

Alongside other benefits, you can now apply your own custom navbar styling in a more transparent and easier way if necessary. This is also true for general navbar behaviour, such as hiding the navbar in specific cases or similar. For the list of options on specific navigators, please check the [react-navigation documentation.](https://reactnavigation.org/docs/5.x/screen-options/)
