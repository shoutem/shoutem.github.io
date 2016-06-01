---
layout: doc
permalink: /docs/getting-started/introduction
---

# Getting Started
<hr />

This tutorial shows how to write custom Extensions for Shoutem platform. It introduces the most important Shoutem extensions concepts. After completing this tutorial, you will have a running mobile app that retrieves content from the Shoutem CMS.

Here's a preview how completed app will look like.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-preview.png'/>
</p>

## So what are extensions?
As shown on the following picture, every Shoutem application is made of extensions.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/apps-are-made-of-extensions.png'/>
</p>

Extensions represent small features that are connected to application through [shortcuts](/docs/coming-soon). Application admins just connect wanted extensions to application's [Home Screen](/docs/coming-soon) and fill out the content! Shoutem prepared a bunch of **open sourced** extensions which you can easily checkout and customize to your needs.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/shoutem-extensions.png'/>
</p>

## About technology

<hr />

Shoutem uses [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/) as frameworks for building cross-platform apps. React is an open source JavaScript library providing a **View** from M**V**C framework, while React Native exposes iOS and Android *native* components to React environment. We're also using [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) as a simpler way to define UI components. It looks like this:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/jsx-component-example.png'/>
</p>

On top of React and React Native, we're using [Redux](http://redux.js.org/), one-way data flow pattern for predictive application behavior. There are several constructs in Redux shown on next picture:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/redux.png'/>
</p>

Each application has a [Redux store](http://redux.js.org/docs/basics/Store.html) which holds the `application state`. When the state changes, React automatically updates the UI component. Application can dispatch [Redux actions](http://redux.js.org/docs/basics/Actions.html) on events, e.g. tapping on button, which will hold information about that event. Dispatched actions will be handled by [Redux reducers](http://redux.js.org/docs/basics/Reducers.html) which specify what is the next state given the action. Once reducers handle action, application is in the new state and UI component automatically adopts to the new state.

## Create extension
Best way to understand the power of the extensions, is to get your hands dirty. We'll start with [setting your development environment](http://shoutem.github.io/docs/getting-started/development-environment).
