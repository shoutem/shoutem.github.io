---
layout: doc
permalink: /docs/getting-started/initializing-extension
---

# Initializing extension
<hr />

Here's the mockup of the Restaurants extension, slightly different from the picture we showed in [Introduction]({{ site.baseurl }}/docs/getting-started/introduction), for the clarity of it's components.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-preview-lightweight.png'/>
</p>
 
Left application screen lists the restaurants and the right one shows details of one specific screen. 

Let's start building! Locate to folder where you want to keep extension files:

```ShellSession
mkdir Restaurants && cd Restaurants
```

Initialize the project:

```ShellSession
$ shoutem init
Enter information about your extension. Press `return` to accept (default) value.
Title: (Restaurants)
Version: (0.0.1)
Description: Show the cool restaurants!
```

This information will be stored in `extension.json` file.

> #### Note
> In case you can't remember the structure of some command, type: `shoutem help` or `shoutem help [command]` where you should replace '[command]' with one of the [CLI commands]({{ site.baseurl }}/docs/cli/reference)

## Folder structure
Initialization process already filled your folder with additional files and folders. Your structure looks like this:

```
Restaurants/
  ├ app/
  |  ├ node_modules/
  |  ├ const.js
  |  ├ index.js
  |  └ package.json
  ├ server/
  └ extension.json
```

Let's describe the structure:

- `app/`: Application code
- `server/`: Server code
- `extension.json`: Extension general information

In `extension.json` you can see:

```JSON
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",

  "title": "Restaurants",
  "description": "Show the cool restaurants!"
}
```

Property `name`, combined with your developer name, uniquely identifies the extension. We'll use property `name` to define extensions parts too.

Extension is now only locally available on your computer. We need to upload it to Shoutem so you can install it on the application.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

To test our extension, we need to install it on the Shoutem application. You can create new application on [Shoutem builder](/docs/coming-soon) or just pass flag `--new` to installation command:

```ShellSession
$ shoutem install --new
Extension is installed on the new `Restaurants` extension.
See it in browser: `http://www.shoutem.com/builder?id=141231234123`
```

Go to `Extensions` tab in [Shoutem builder](/docs/coming-soon). You'll see that extensions is installed on your application.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-tab-extension.png'/>
</p>

However, when you go to `Screens` tab now and click `Add`, this extension won't be shown.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/add-content-no-extension.png'/>
</p>

That's because `Add` modal shows _shortcuts_ which extensions export. We need to add shortcut to our extensions.
