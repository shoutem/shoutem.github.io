---
layout: doc
permalink: /docs/getting-started/development-environment
---

# Setting Environment
<hr />

Before making extension, set the development environment. Download Shoutem [Command Line Interface](https://www.npmjs.com/package/shoutem-cli) (CLI), tool available through `npm`, the package management system for `Node.js`.

> #### Note
> In case you don't have `npm` installed, the best way to install it is with [installing](https://nodejs.org/en/download/) `Node.js`, which includes `npm`.

Once you have `npm` installed, write:

```ShellSession
$ npm install -g @shoutem/cli
``` 

Flag ```-g``` is to install command line tool globally, so you can use `shoutem` command from any folder.

<hr />

Each Shoutem user can become Shoutem developer. Register as developer with:

```ShellSession
$ shoutem register
Enter your Shoutem credentials.
Email: developer@example.com
Password:
```

Once you entered correct Shoutem credentials, you will be asked to specify unique developer name.

```ShellSession
Correct credentials. Enter unique developer name.
Developer name: developer
```

## Editor
For writing extensions, you need an editor. Use **editor of your choice**.
