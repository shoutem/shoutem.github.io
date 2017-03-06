---
layout: doc
permalink: /docs/extensions/getting-started/development-environment
title: Setting up the environment
section: Getting Started
---

# Setting up the environment
<hr />

Before building an extension, set the development environment. Download Shoutem [Command Line Interface](https://www.npmjs.com/package/@shoutem/cli) (CLI), tool available through `npm`, the package management system for `Node.js`:

```ShellSession
$ npm install -g @shoutem/cli
``` 

> #### Note
> If previous command fails because of _permission_ issues, you need to run it with `sudo` permission.

> #### Note
> If you don't have `npm`, install `Node.js` which includes `npm` by itself. We recommend installing `Node.js` with [nvm](https://github.com/creationix/nvm).

The ```-g``` flag is to install CLI globally, so you can use `shoutem` command from any folder.

<hr />

Each Shoutem user can become Shoutem developer. If you haven't already, go to [Shoutem]({{ site.shoutem.builderURL }}) and create a new account. Now you can register as a developer with:

```ShellSession
$ shoutem login
Enter your Shoutem credentials (obtained at https://builder.beta.shoutem.com):
Email: michael@developer.com
Password:
```

Once you entered correct Shoutem credentials, you will be asked to specify your developer name (`michael` is used in this example).

```ShellSession
...
Logged in as `michael@developer.com`.
Enter developer name.
Developer name: michael

Registered as `michael`.
```

## Editor
For writing extensions, you only need an editor. Use **editor of your choice**. We recommend getting [Nuclide](https://nuclide.io/), developed by Facebook.
