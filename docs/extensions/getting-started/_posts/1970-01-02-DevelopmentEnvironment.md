---
layout: doc
permalink: /docs/extensions/my-first-extension/development-environment
title: Setting up the environment
section: My first extension
---

# Setting up the environment
<hr />

Before building an extension, download Shoutem [Command Line Interface](https://www.npmjs.com/package/@shoutem/cli) (CLI), tool available through `npm`, the package management system for `Node.js`:

```ShellSession
$ npm install -g @shoutem/cli
``` 

The ```-g``` flag is to install CLI globally, so you can use `shoutem` command from any folder.

> #### Note
> If previous command fails because of _permission_ issues, you need to run it with `sudo` permission: :`sudo npm install -g @shoutem/cli`. If you don't have `npm`, install `Node.js` which includes `npm` by itself. We recommend installing `Node.js` with [nvm](https://github.com/creationix/nvm).


<br />

Each Shoutem user can become Shoutem developer. If you haven't already, go to [Shoutem]({{ site.shoutem.builderURL }}) and create a new account. Now you can register as a developer with:

```ShellSession
$ shoutem login
Enter your Shoutem credentials (obtained at {{ site.shoutem.builderURL }}):
Email: {{ site.example.devEmail }}
Password:
```

Once you entered correct Shoutem credentials, you will be asked to specify your developer name (`{{ site.example.devName }}` is used in this example).

```ShellSession
...
Logged in as {{ site.example.devEmail }}.
Enter developer name.
Developer name: {{ site.example.devName }}

Registered as `{{ site.example.devName }}`.
```

## Editor
For writing extensions, you only need an editor. Use **editor of your choice**. We recommend getting [Nuclide](https://nuclide.io/), developed by Facebook.