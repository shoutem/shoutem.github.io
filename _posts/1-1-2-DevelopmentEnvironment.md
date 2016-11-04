---
layout: doc
permalink: /docs/extensions/getting-started/development-environment
title: Setting up the environment
section: Getting Started
---

# Setting up the environment
<hr />

Before making an extension, set the development environment. Download Shoutem [Command Line Interface](https://www.npmjs.com/package/@shoutem/cli) (CLI), tool available through `npm`, the package management system for `Node.js`:

```ShellSession
$ npm install -g @shoutem/cli
``` 

> #### Note
> In case you don't have `npm` installed, the best way to install it is by [installing](https://nodejs.org/en/download/) `Node.js`, which includes `npm`. If previous command fails because of _permission_ issues, you need to run it with `sudo` permission.

Flag ```-g``` is to install CLI globally, so you can use `shoutem` command from any folder.

<hr />

Each Shoutem user can become Shoutem developer. If you haven't already, go to [Shoutem](http://www.shoutem.com) and create new account. Now you can register as a developer with:

```ShellSession
$ shoutem login
Enter your Shoutem credentials.
Email: developer@example.com
Password:
```

Once you entered correct Shoutem credentials, you will be asked to specify your developer name.

```ShellSession

Logged in as `developer@example.com`.
Enter developer name.
Developer name: developer

Registered as `developer`.
```

## Editor
For writing extensions, you only need an editor. Use **editor of your choice**.
