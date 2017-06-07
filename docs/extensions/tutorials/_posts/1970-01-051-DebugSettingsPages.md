---
layout: doc
permalink: /docs/extensions/tutorials/debug-settings-pages
title: Debug and local development of settings pages
section: Tutorials
---

# Debug and local development of settings pages
<hr />

Settings pages are part of extensions that are rendered in Shoutem Builder and used for configuring app, adding content or other useful functionality that app owner could use for managing his/her app. During development of settings pages it is not very efficient to use `shoutem push` command in CLI on every change in code you implement. Also, if you notice or app owner report you issue it would be useful to quickly debug extension's settings page to find and fix error.

## Settings page development flow

If you try to develop [settings pages]({{ site.url }}/docs/extensions/tutorials/writing-settings-page) you will know how to create extension, add settings page, reference it, push it so it's visible in Shoutem Builder. After that every change in code is only visible in Builder if you push changes with `shoutem push` and Builder reload in browser.

To make your development experience efficient and comfortable as much as possible we introduced `Debug` button on each settings page in Builder that you own as developer.

![Developer settings page with Debug button]({{ site.url }}/img/tutorials/writting-settings-page/hello-world-settings-page.png "Developer settings page with Debug button"){:.docs-component-image}

Now, when you develop settings pages all you need to do is few short steps:

1. Push, and install your extension in Shoutem Builder application (Only once)
2. In terminal in extension directory, execute `shoutem run server-dev` to bundle your extension and run webpack dev server (Until you kill server there is no need to run it again)
3. In your browser go to Shoutem Builder and open settings page you are developing
4. Click on Debug button

Once you click Debug, settings page will reload from `https://localhost:4790` and there is possibility that browser will define `localhost` as insecure. Open `https://localhost:4790/index.html` in browser and add exception for insecure page or in Chrome open `chrome://flags/#allow-insecure-localhost.` and enable it.

As we use React and Webpack dev server we have hot module reload feature enabled. What's cool about it is that every time you change your code in editor and save it, server will rebundle code and reload it browser, so basicallz you have a live preview while you develop your settings page. There are some exceptions when it cannot work, like adding new npm module, file, but in such case just re-run dev server with `shoutem run server-dev` and reload Builder in browser.

## Debugging settings page

Debugging of settings pages should be done using Debug feature explained in above section. Once you enter debug mode open developer console (in Chrome keboard shortcut is F12) and use Console, Sources, Elements and Network tab to debug your code. You can put breakpoint on code lines on original files in your `/src` directory just by opening `Source` tab and with keyboard shortcut `Ctrl + P` open search bar.

|                | Normal | Debug |
|----------------|:------:|:-----:|
| Transpiled ES5 |   Yes  |   No  |
| Bundled        |   Yes  |   No  |
| Breakpoints    |   No   |  Yes  |
| Stack Trace    |   No   |  Yes  |

Debugging of settings page in Builder that are not in debug mode is a bit problematic. Why it is so? Settings page code is bundled in `extension.{hash}.js` and it's dependencies in `vendor.{hash}.js` that iframe loads. Webpack2 is bundling and transpiling your code and we don't pass source maps. You cannot easily put breakpoint or investigate stack trace in such code. That is not a ces when your are in debug mode.
