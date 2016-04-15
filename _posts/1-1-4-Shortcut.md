---
layout: doc
permalink: /docs/getting-started/shortcut
---

# Shortcut
<hr />

Shortcuts are a way to define entrance into the extension, usually a way to open the first screen of your extension. You can see it as starting point of some feature, e.g. related functionality of your extension. Let's now create a shortcut.

```
shoutem shortcut OpenRestaurantsList
```

Your `extension.json` was just modified:

<pre>
{
  "name": "restaurant-extension",
  "version": "0.0.1",

  "title": "RestaurantExtension",
<span class="newCode">  "description": "List restaurants",
  "shortcuts": [{
    "name": "OpenRestaurantsList",
    "action": "openRestaurantsList",
    "title": "List of restaurants",
    "description": "Allow users to check the restaurants.",
    "icon": "",
    "adminPages": []
  }]</span>
}
</pre>

Notice that `shortcut` object has properties `name`, which identifies the class of that Shortcut and `action`, which represents the action that will be triggered when shortcut is tapped.

Application needs to know where can it find extension parts. To support arbitrary folder structure in your extension, your `app` folder contains `index.js` file which exports all the extension parts, such as:

- actions,
- reducer,
- screens,
- middleware and
- application lifecycle methods.



The 2 latter we won't use in this tutorial, but you can find more information on these [here](TODO). Current `index.js` looks as follows:

```
export const screens = {};

export const actions = {};

export const reducer = {};
```

Constants `screens`, `actions` and `reducer` are exported via named export and that's why it's important not to change their names.

We'll store our actions in `actions.js` file, but as already mentioned, you can have any folder structure. Create `actions.js` file in `app` folder with such content:

```
export function openRestaurantsList() {
}
```

Actions are nothing else than javascript functions. Export that action inside of `app/index.js` file:

```
<span class="newCode">import * as actions from './actions';</span>
export const screens = {};

<span class="newCode">export actions;</span>

export const reducer = {};
```

Finally:

```
shoutem upload
```

This is what you get:

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/with-custom-extensions.png'/>
</p>

Try clicking now on `RestaurantsExtensions` on [Shoutem builder](TODO). You see your shortcut defined there! Click on it. Nothing happens. That's exactly what `openRestaurantsList` action does - nothing. Let's change that so it opens screen.

<nav>
  <ul class="pager">
    <li class="previous">
      [<span aria-hidden="true">&larr;</span> Previous](http://shoutem.github.io/docs/getting-started/initializing-extension)
    </li>
    <li class="next">
      [Next <span aria-hidden="true">&rarr;</span>](http://shoutem.github.io/docs/getting-started/screen)
    </li>
  </ul>
</nav>