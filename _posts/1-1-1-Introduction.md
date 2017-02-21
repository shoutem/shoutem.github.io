---
layout: doc
permalink: /docs/extensions/getting-started/introduction
title: Introduction
section: Getting Started
---

# Getting Started
<hr />

This tutorial shows how to write custom **Shoutem extensions** on Shoutem platform. It introduces the most important concepts. After completing it, you will have a running **mobile app** that uses the created **custom extension** with components from [Shoutem UI Toolkit]({{ site.baseurl }}/docs/ui-toolkit/introduction) and retrieves content from the [Shoutem Cloud]({{ site.baseurl }}/docs/cloud/introduction). Final result of extension is [open sourced](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started).

Here's a preview how completed app will look like.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-preview.jpg'/>
</p>

## What are extensions?
As shown in the following picture, every Shoutem app is made of smaller modules, which we call **extensions**.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/apps-are-made-of-extensions.png'/>
</p>

Extensions represent features that are connected to the app. Application owner connects extensions to application's main navigation through Shoutem builder. Shoutem prepared a bunch of [open sourced](https://github.com/shoutem/extensions) extensions which you can easily customize to your needs.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/shoutem-extensions.png'/>
</p>

## About technology

<hr />

Shoutem uses [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/) as frameworks for building cross-platform apps. React is an open source JavaScript library providing a way to build UI (**View** from M**V**C pattern), while React Native exposes iOS and Android **native** components so they can be used in React environment. If you never used these technologies, check out our [React Native school](http://school.shoutem.com/)!

We use [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) as a simpler way to write UI components. Making a screen with JSX looks like this:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/jsx-component-example.png'/>
</p>

On top of React and React Native, we're using [Redux](http://redux.js.org/), a library for simpler state management. There are several constructs in Redux explained on the next picture.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/redux.png'/>
</p>

Each application has a [Redux store](http://redux.js.org/docs/basics/Store.html) which holds the **application state** (i.e. its data). When the state changes, React automatically updates the UI components. An application can dispatch [Redux actions](http://redux.js.org/docs/basics/Actions.html) on events (such as tapping on the button) which hold information about the triggered event. Dispatched actions will be handled by [Redux reducers](http://redux.js.org/docs/basics/Reducers.html) which specify what is the next state given the action. Once reducers handle the action, an application goes to the new state and React automatically updates the UI component to reflect the new state.

## Create extension
Best way to understand the power of extensions, is to get your hands dirty. We'll start with [setting up your development environment]({{ site.baseurl }}/docs/extensions/getting-started/development-environment).
