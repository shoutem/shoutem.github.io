---
layout: doc
permalink: /docs/extensions/reference/extension-exports
title: Extension exports
section: Reference
---

# Extension exports

Each extension can export multiple values in:

- app/index.js - used by an app and other extensions
- server/index.js - used by Shoutem Builder

## _app/index.js_

The `app` folder is npm package that represents segment of extension bundled in the app. The `app/index.js` file is what is accessible from the current extension to the app and other extensions. Since `app` expects some exported parts (e.g.) there are some predefined extension exports. Here only those will be listed, but you can read more about the whole architecture in [Technical overview]({{ site.url }}/docs/extensions/reference/overview).

These are the predefined extension exports:

- **lifecycle methods** - methods that extensions can implement to be notified when the entire app is mounted or unmounted. This can be useful to initialize the extension or clean up when the app is closing. Each of those methods receives an `app` parameter that represents the current **app instance**. Each of those methods may also return a promise. If a promise is returned, the next lifecycle method of any extension will not be called until that (any every other) promise is resolved. This is the list of lifecycle methods in order of their invocation:
    - **appWillMount** - invoked immediately before the mounting of the root app component occurs.
    - **appDidMount** - invoked after the root app component is mounted and after all promises from a previous lifecycle method are resolved.
    - **appDidFinishLaunching** - invoked after the app is mounted and after all promises from `appDidMount` have finished. This is the place to perform any final work before the first screen is rendered.
    - **appWillUnmount** - invoked immediately before the root app component is unmounted and destroyed. Perform any necessary cleanup in this method.
- **screens** - the screens that will be available for navigation. Must have the same name as in `extension.json`
- **themes** - themes available for app customization. Must have the same name as in `extension.json`
- **actions** - actions that can be attached to shortcuts (see [shoutem.auth](https://github.com/shoutem/extensions/tree/master/shoutem-auth) extension). Must have the same name as in `extension.json`
- **reducer** - the extension reducer that will be mounted under the extension namespace in the state
- **middleware** - Redux `middleware` to register in the Redux `store`
- **enhancers** - Redux `enhancers` to register in the Redux `store`

<br />

## _server/index.js_

Same as for `app` the `server` folder is npm package that represents segment of extension in Shoutem Builder. The `server/index.js` file is what is accessible from the current extension to the Shoutem Builder.

These are the predefined extension exports:

- **lifecycle methods** - methods that extensions can implement to be notified when the entire extension is mounted in Shoutem Builder. This can be useful to initialize the extension. Each of those methods receives an `page` parameter that represents the current **page instance**. Page instance contains methods `getPageContext` and `getPageParameters`. This is the list of lifecycle methods in order of their invocation (we plan to support more methods):
    - **pageWillMount** - invoked immediately before the mounting of the root page component occurs.   
- **pages** - the settings pages that will be available for Shoutem Builder. Must have the same name as in `extension.json`
- **reducer** - the extension reducer that will be mounted under the extension namespace in the state
