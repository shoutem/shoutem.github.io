---
layout: doc
permalink: /docs/extensions/tutorials/using-patch-package
title: Using patch-package with extensions
section: Tutorials
---

# Using patch-package with extensions

As of platform 2.2.2, Shoutem apps support [patch-package](https://www.npmjs.com/package/patch-package) changes being made to dependencies by extensions during the Shoutem app configuration process. Read on to find out how you can utilize this feature.

## When to use patch-package

When working with third party packages, you'll run into the issue of maintenance, bugs on their end and missing features. Sometimes the answer is to fork, sometimes it's better to just patch it.

## How to make a patch

The following steps are how we created our own `patch-package` changes, for example, in [shoutem.audio](https://github.com/shoutem/extensions/tree/master/shoutem.audio/app/patch). It uses the instructions provided by the `patch-package` package.

#### 1. Add the dependency

To make a patch, you will have to have the dependency you want to edit already installed as you would when running `shoutem configure`. You can [add your dependency]({{ site.url }}/docs/extensions/tutorials/installing-3rd-party-packages) via your extension's `app/package.json` and it will be installed when `shoutem configure` is run.

#### 2. Make the changes in node_modules

After running `shoutem configure`, you will have to make the edits you need in `App-Name/node_modules/your-dependency`, this will allow `patch-package` to generate a _diff_ and you'll be set.

#### 3. Creating the patch file

Following the changes made in step 2, create a `patch` directory in your extension's app segment.

From the `App-Name/` directory, you run the following:

```ShellSession
$ npx patch-package your-dependency@version --patch-dir extensions/your-dev-name.your-ext-name/app/patch
```

This will generate a patch-file and place it into your extension's `app/patch` directory that you just created.

#### 4. Let Shoutem do it's magic

Kick back, relax, Shoutem takes care of it from here. If you wanna know how, read the next section.

## How it works "Under the hood"

Shoutem's platform has a `postinstall` script which will apply all patches provided in every installed extension's `app/patch` directory right after the `shoutem configure` script does it's dependency installation step (since it's the postinstall script being run).

In short, patches will be applied every time the app's dependencies are installed, either manually, or with the `shoutem configure` command.
