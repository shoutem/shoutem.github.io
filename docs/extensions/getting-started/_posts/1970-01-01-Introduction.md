---
layout: doc
permalink: /docs/extensions/my-first-extension/introduction
title: Introduction
section: My first extension
---

# Getting Started
<hr />

This tutorial shows how to write custom **Shoutem extensions** on Shoutem platform. It introduces the most important concepts. After completing it, you will have a running **mobile app** that uses the created **custom extension** with components from [Shoutem UI Toolkit]({{ site.baseurl }}/docs/ui-toolkit/introduction) and retrieves content from the [Shoutem Cloud]({{ site.baseurl }}/docs/cloud/introduction). Final result of extension is [open sourced](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started).

Here's a preview how completed app will look like.

<p class="image">
<img src='{{ site.baseurl }}/img/my-first-extension/extension-preview.jpg'/>
</p>

## What are extensions?

Extensions represent features in the app. Application owner picks extensions which he wants to use in the app through the Shoutem builder. Shoutem prepared a bunch of [open sourced](https://github.com/shoutem/extensions) extensions which you can easily customize to your needs.

<p class="image">
<img src='{{ site.baseurl }}/img/my-first-extension/shoutem-extensions.png'/>
</p>

## About technology

<hr />

Shoutem uses [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/) as frameworks for building cross-platform apps. React is an open source JavaScript library providing a way to build user interfaces (UIs), while React Native exposes iOS and Android **native** components so they can be used in React environment. If you never used these technologies, our [React Native school](http://school.shoutem.com/) can help you!

We use [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) as a simpler way to write UI components with tags. Building an app screen with JSX is as easy as:

<p class="image">
<img src='{{ site.baseurl }}/img/my-first-extension/jsx-component-example.png'/>
</p>

On top of React and React Native, we're using [Redux](http://redux.js.org/), a library which simplifies the state management. 

<p class="image">
<img src='{{ site.baseurl }}/img/my-first-extension/redux.png'/>
</p>

Even though we use Redux, you don't need to use anything or you can use any other state management library such as [MobX](https://github.com/mobxjs/mobx).

## Create extension
Best way to understand the power of extensions, is to get your hands dirty. We'll start with setting up your development environment.