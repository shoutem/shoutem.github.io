---
layout: doc
permalink: /docs/getting-started/introduction
---

# Getting Started!
<hr />
This tutorial shows how to write the custom Extensions for Shoutem mobile platform. It introduces the most important concepts of Shoutem extensions. After completing this tutorial, you will have a running mobile app that retrieves content from the Shoutem CMS.

Here you can find a preview how completed app will look like.

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/restaurant-preview.png'/>
</p>

## So what are extensions?

As shown on the following picture, every Shoutem application is made of extensions.

<p class="image">
<img src='{{ site.baseUrl }}/img/getting-started/apps-are-made-of-extensions.png'/>
</p>

Extensions represent small features that are connected to application through [shortcuts](TODO). Application admins just connect wanted extensions to their HomeScreen [HomeScreen](TODO) through extensions' shortcuts and fill out the content! Everything in the application is represented via extensions - even HomeScreen is extension!

Extension contains of the following parts:

- [data](TODO): Data used in extension
- [component](TODO): Component will be shown on screen (e.g. button, list, image, text area)
- [screen](TODO): Defines how to render components on mobile screen and send data to them

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/extensions-consist-of.png'/>
</p>

<br />

## Technology

<hr />

Shoutem uses [React](TODO) and [React Native](TODO) as frameworks for building cross-platform apps. React is an open-source JavaScript library providing a *View* from M**V**C framework, while React Native exposes iOS and Android *native* components to React environment. It is important to mention that these 2 technologies represent only prerequisites for using Shoutem. You can use [JSX](TODO) as a simpler way to define how your UI component should look like. This is how  `Text` UI component is written in JSX:

```
<Text>Hello World!</Text>
```

On top of React and React Native, we're using [Redux](http://redux.js.org/) as a pattern to write extensions. Redux envolves from Flux introducing simpler, one-way data flow for predictive application behavior. Although Shoutem is using Redux for it's architecture within the application, you're free to use any other application architecture. However, tutorials will use Redux constructs when writing extension. There are several constructs in Redux shown on next picture:

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/redux.png'/>
</p>

Each application has a [Redux store](http://redux.js.org/docs/basics/Store.html) which holds the `application state`. When the state changes, React automatically updates the UI component. Application can dispatch [Redux actions](TODO) on events, e.g. tapping on button, which will hold information about that event. Dispatched actions will be handled by [Redux reducers](TODO) which specify what is the next state given the action. Once reducers handle action, application is in the new state and UI component automatically adopts to the new state.

<br />

Let's start making first extension. We'll start with [setting your development environment](http://shoutem.github.io/docs/getting-started/development-environment).

<nav>
  <ul class="pager">
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/development-environment">Let's roll! <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>