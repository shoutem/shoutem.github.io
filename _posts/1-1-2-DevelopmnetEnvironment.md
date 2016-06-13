---
layout: doc
permalink: /docs/getting-started/development-environment
---

# Setting up the environment
<hr />

Before making an extension, set the development environment. Download Shoutem [Command Line Interface](https://www.npmjs.com/package/@shoutem/cli) (CLI), tool available through `npm`, the package management system for `Node.js`.

> #### Note
> In case you don't have `npm` installed, the best way to install it is by [installing](https://nodejs.org/en/download/) `Node.js`, which includes `npm`.

Once you have `npm` installed, write:

```ShellSession
$ npm install -g @shoutem/cli
``` 

Flag ```-g``` is to install CLI globally, so you can use `shoutem` command from any folder.

<hr />

Each Shoutem user can become Shoutem developer. If you haven't already, go to [Shoutem](www.shoutem.com) and create new account. Now you can register as a developer with:

```ShellSession
$ shoutem register
Enter your Shoutem credentials.
Email: developer@example.com
Password:
```

Once you entered correct Shoutem credentials, you will be asked to specify your developer name.

```ShellSession

Successful login. Logged in as developer@example.com.
Enter developer name.
Developer name: developer
Success! Registered as `developer`.
```

## Editor
For writing extensions, you only need an editor. Use **editor of your choice**.
