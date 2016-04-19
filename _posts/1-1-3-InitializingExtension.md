---
layout: doc
permalink: /docs/getting-started/initializing-extension
---

# Initializing extension
<hr />

For the purpose of demonstration, let's imagine we're building extension for listing restaurants. Application admin can add restaurants through Shoutem builder. Here's the design of 2 application screens which help us visualize how to build our extension.

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/restaurant-preview.png'/>
</p>
 
Left application screen lists the restaurants and the right one shows details of one specific screen. 

Let's start building! Locate to folder where you want to keep extension files:

```
mkdir RestaurantsExtension && cd RestaurantsExtension
```

Initialize the project:

```
shoutem init
```

General information about extension which you just entered is contained in `extension.json`. You can read [more](TODO) about initializing process with additional features, like creating _extension_ from template.

> ### Note
> In case you can't remember the structure of some command, type: `shoutem help [command]` where you should replace '[command]' with one of the [CLI commands](#list-of-commands)

<br />
#### Folder structure 
Initialization process already filled your folder with additional files and folders. Your structure looks like this:

```
RestaurantsExtension/
  ├ app/
  |  ├ node_modules/
  |  ├ index.js
  |  └ package.json
  ├ server/
  └ extension.json
```

Let's describe the structure:

- `app/`: Holds extension files for client side
- `server/`: Holds extension files for Shoutem server and builder like data-schemas, admin pages, etc.
- `extension.json`: Extension general information

In `extension.json` you can see:

```
{
  "name": "restaurant-extension",
  "version": "0.0.1",

  "title": "RestaurantsExtension",
  "description": "List restaurants!"
}
```

Extension is now only locally available on your computer. We need to upload it to Shoutem server so you can install it on the application.

```
shoutem upload
```

Create new application in Shoutem builder. That application we'll use to test our extension. Install it on the application. Write

```
shoutem install
```

where you should select which application you want to install it on.

Find the application in [Shoutem Builder](todo) and try to `Add content` now to application, as shown on picture.

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/no-custom-extensions.png'/>
</p>

You see that your ```RestaurantsExtension``` extension is installed there, but when you click on it, empty "Shortcuts" modal is opened. That's because we still didn't make any shortcut for the extension. 

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/development-environment"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/shortcut">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>