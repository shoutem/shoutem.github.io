---
layout: doc
permalink: /docs/extensions/tutorials/setting-local-environment
title: Setting local environment
section: Tutorials
---

# Setting up environment for local development

Up until now, we didn't try running our extension on simulator or even a device. When passing through _Getting started_, everything that we implemented, we pushed to Shoutem server where the application with pushed extension was built and ready to preview. Since we were only following tutorial, there were no mistakes and there was no need to debug. This is not the usual case. When you'll be building your unique extensions, chances are you'll need to have a way to [debug with React Native](https://facebook.github.io/react-native/docs/debugging.html). For that, we need to set the local development environment.

> #### Note
> This tutorial continues on concepts that were introduced in [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction) tutorial.

## React Native environment

Before setting up local environment for writing Shoutem extensions, set up React Native environment as described in their [Getting started tutorial](https://facebook.github.io/react-native/docs/getting-started.html). As it's written in that document, local building of iOS applications is only available through Mac.

## Shoutem environment

Once React Native environment is set, you can install Shoutem's. It's easy as:

```bash
$ shotuem env install
Setting up Shoutem environment...
Success!
```

Setting up Shoutem environment is only needed once. However, Shoutem is constantly working on improving it's platform and occasional updates will be needed. Check environment version with:

```bash
$ shoutem env --version
```

and update it with:

```bash
$ shoutem env update
```

## Local development

Now we can start with local development! If you want to see how your app runs on iOS (for which you need to use Mac), do:

```bash
$ shoutem env 
