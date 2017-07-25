---
layout: doc
permalink: /docs/extensions/my-first-extension/introduction
title: Introduction
section: My First Extension
---

# My First Extension
<hr />

This tutorial will show you how to write custom **Shoutem extensions** on the Shoutem platform. It introduces the most important concepts. After completing it, you will have a running **mobile app** that uses the your brand new **custom extension** with components from the [Shoutem UI Toolkit]({{ site.url }}/docs/ui-toolkit/introduction) and retrieves content from the [Shoutem Cloud]({{ site.url }}/docs/cloud/introduction). The final result of this tutorial-made extension is [open sourced](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started).

Before you start the My First Extension tutorial series, you should go through [Getting Started]({{ site.url }}/docs/extensions/tutorials/getting-started), because this tutorial series builds on top of the simple extension you created there.

Here's a preview of what the completed app will look like.

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/extension-preview.jpg'/>
</p>

## What are Extensions?

Extensions represent features in the app. The app owner picks extensions that he wants to use in his app through the Shoutem Builder. Shoutem prepared a bunch of [open sourced](https://github.com/shoutem/extensions) extensions which you can easily customize to fit your needs.

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/shoutem-extensions.png'/>
</p>

You can develop extensions both within apps made by `shoutem clone` and as stand-alone extensions that you plan on using within multiple apps. In this tutorial, we'll be working on the Restaurants extension we made in Getting Started, so it'll be treated as one within a _cloned_ app.

## About the Technology

<hr />

Shoutem uses [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/) as frameworks for building cross-platform apps. React is an open source JavaScript library that provides a way to build user interfaces (UIs), while React Native exposes iOS and Android **native** components so they can be used in React environment. If you haven't used these technologies before, our [React Native school](http://school.shoutem.com/) can help you get started!

We use [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) as a simple way to write UI components with tags. Building an app screen with JSX is as easy as:

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/jsx-component-example.png'/>
</p>

On top of React and React Native, we're using [Redux](http://redux.js.org/), a library which simplifies state management.

<p class="image">
<img src='{{ site.url }}/img/my-first-extension/redux.png'/>
</p>

Even though _we_ use Redux, _you_ can use any other state management library (like [MobX](https://github.com/mobxjs/mobx), or just don't use any at all! Again, we don't want to restrict you on how you use React Native.

## Create an Extension
The best way to understand the power of extensions is to get your hands dirty. Let's write some code!
