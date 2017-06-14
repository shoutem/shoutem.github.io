---
layout: doc
permalink: /docs/extensions/tutorials/writing-a-theme
title: Writing a Theme
section: Tutorials
---

# Writing a Theme

Shoutem comes with a dozen of available themes, but if you want a custom one, you can write your own. To start, it's important that you understand two concepts (extension parts):

- Theme: file containing all the style for your app
- Theme variables: schema for the Builder that describes what app owners can customize in your theme through the Builder itself

> #### Note
> This tutorial continues on [My First Extension]({{ site.url }}/docs/extensions/my-first-extension/introduction). If you don't have an app which is the result from the My First Extension section, you can find the `Restaurants` extension on [Github](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started), install it onto a new app and fill it with some restaurants.

## Creating a Theme

To create a theme within the existing Restaurants extension, switch over to the `Restaurants` extension folder:

```ShellSession
$ cd restaurants
```

Create a theme and fill it with basic data:

```ShellSession
$ shoutem theme add restaurant
Enter information about your theme. Press `return` to accept (default) values.
Title: (Restaurants)
Description: Awesome restaurant theme!

File `app/themes/restaurant.js` is created.
File `server/themes/restaurantVariables.json` is created.
```

The `extension.json` file was modified to include the newly created theme:

```JSON{9-19}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{ ... }],
  "screens": [{ ... }],
  "dataSchemas": [{ ... }],
  "themes": [{
    "name": "restaurant",
    "title": "Restaurant",
    "variables": "@.restaurant"
    "description": "Awesome restaurant theme!",
    "showcase": ""
  }],
  "themeVariables": [{
    "name": "restaurantVariables",
    "path": "server/themes/restaurantVariables.json"
  }]
}
```

The CLI also made sure that `app/extension.js` handles the newly created theme:

```JavaScript{9-10,17-19}
#file: app/extension.js
// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';

// screens imports
import List from './screens/List';
import Details from './screens/Details';

// themes imports
import restaurant from './themes/restaurant';

export const screens = {
  List,
  Details
};

export const themes = {
  restaurant
};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}
```

The CLI also made sure that our public API, `app/index.js`, exports the newly created theme:

```JavaScript{9}
#file: app/index.js
// Reference for app/index.js can be found here:
// http://shoutem.github.io/docs/extensions/reference/extension-exports

import reducer from './reducer';
import * as extension from './extension.js';

export const screens = extension.screens;

export const themes = extension.themes;

export { reducer };

}
```

Check `app/themes/restaurant.js` file. It's a copy of Shoutem's default theme - Rubicon.

The `showcase` property, which is empty, is an array of images and videos that will show off your theme. Download this prepared [showcase]({{ site.url }}/docs/coming-soon) and copy it to the `server/assets` folder. Change the `showcase` property to:

```JavaScript
#file: extension.json
"showcase": ["video.mp4", "list.png", "details.png"]
```

Push this theme to the Shoutem server. This might take a while, since you need to upload the showcase video and pictures too:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Since the Restaurants extension is already installed, so is your theme. However, it's not applied yet. Navigate to the `Styles` tab. Currently, the selected theme is `Rubicon`, clearly no match for your gorgeous new theme, so lets fix that. Click on the `Change theme` button. Here you can find every installed theme. Yours is also there! Select it and you'll see the showcase you set up for it earlier.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/style-tab-themes-theme-change_theme-theme_showcase.png'/>
</p>

Select `Apply theme`.

Now check the `Customize theme` tab.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/style-tab-themes-customise_theme-no_picker.png'/>
</p>

Here the app owner can customize your theme through theme variables. These variables can be found in `server/themes/restaurantVariables.json` and they're a copy of the [Rubicon theme variables]({{ site.url }}/docs/coming-soon).

## How Themes Work

A theme is a set of styling rules that customize components in the app connected to the theme, called `customizable components`. All the components in [@shoutem/ui](https://github.com/shoutem/ui) package are connected to the theme so they all share the same style.

The theme file, `app/theme/restaurant.js` exports the **theme function** that resolves theme variables and returns **theme objects**. Theme objects consist of [styling rules]({{ site.url }}/docs/ui-toolkit/theme/introduction#theme-style-rules) defined by the [@shoutem/theme](https://github.com/shoutem/theme) package. Each component is connected to the theme by the `name`, by which it can be targeted in theme.

Open `app/theme/restaurant.js` and check the styling rules used in `Rubicon` theme. Let's create a customizable component now.

## Customizable Components

Suppose we want to create a theme which will make the title in restaurant rows bigger and change the background color of subtitles to white, while changing the text color to black. Since restaurant rows are defined in `app/screens/List.js` we can make that component customizable or encapsulate a separate restaurant row component. Let's go with the first, simpler solution.

From the docs on how to use `@shoutem/theme`, in order to support the theme, we need to:

- Replace the occurrences of styles with this.props.style
- Connect the component to the theme

We didn't use `style`, but now we're going to use it from `this.props.style` in the `renderRow` method. Also, import `connectStyle` from `@shoutem/theme` to connect the component to the theme and assign a `name` to it.

```JavaScript{18,48,57-58,90-92}
#file: app/screens/List.js
import React, {
  Component
} from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Image,
  ListView,
  Text,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Divider
} from '@shoutem/ui';

import { connectStyle } from '@shoutem/theme';

import {
  find,
  isBusy,
  shouldRefresh,
  getCollection
} from '@shoutem/redux-io';

import { connect } from 'react-redux';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../const';

class List extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    const { find, restaurants } = this.props;
    if (shouldRefresh(restaurants)) {
      find(ext('Restaurants'), 'all', {
          include: 'image',
      });
    }
  }

  renderRow(restaurant) {
    const { navigateTo, style } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
        screen: ext('Details'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={% raw %}{{{% endraw %} uri: restaurant.image && restaurant.image.url  }}>
          <Tile>
            <Title style={style.title}>{restaurant.name}</Title>
            <Subtitle style={style.subtitle}>{restaurant.address}</Subtitle>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }

  render() {
    //set the title in the Navigation bar
    this.props.setNavBarProps({
      title: 'RESTAURANTS',
    });

    //get list of restaurants from props
    const { restaurants } = this.props;


    return (
      <ListView
        data={restaurants}
        status={isBusy(restaurants)}
        renderRow={restaurant => this.renderRow(restaurant, navigateTo)}
      />
    );
  }
}

export default connect(
  (state) => ({
    restaurants: getCollection(state[ext()].allRestaurants, state)
  }),
  { navigateTo, find }
)(
  connectStyle(ext('List'))(List)
);
```

As you can see, `connectStyle` takes the same format as the `connect` method from Redux. Notice that we added the extension prefix to the component name. While not necessary, it's a good practice to prevent namespace collisions.

Ok, we've added style from theme to the component, but we haven't implemented those styling rules in the theme, so lets modify our theme.

## Modifying Themes

We created a theme file (`app/themes/restaurant.js`) with a Rubicon template. Since a Shoutem app can only have 1 theme applied at a time, it's a good practice to include styling rules for the components usually used in Shoutem extensions, such as the ones from `@shoutem/ui`.

The theme file is huge and it won't be pasted here fully. Just search for the `export default` statement which exports theme functions. In _theme object_ (which is returned by _theme function_), add the agreed styling rules: _make titles bigger in restaurant rows and change the background color of subtitles to white, while changing the text color to black_.

Add the following styling rules to the beginning of the exported object:

```JavaScript{1,6-14}
#file: app/themes/restaurant.js
import { ext } from '../extension';

// constants ...

export default (variables = {}) => ({
  [ext('List')]: {
    title: {
      fontSize: 15,
    },
    subtitle: {
      color: 'black',
      backgroundColor: 'white'
    }
  },

  // the rest of the styling rules...
})
```

Styling props for `Text` components are documented in [React Native documentation](https://facebook.github.io/react-native/docs/text.html).

Great! Push the extension now.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Now open the app in the Builder preview.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/style-tab-themes-customize_theme-font.png'/>
</p>

This is good, but what if we got a request from people using our theme that they want to be able to modify subtitle text color? We can do that with variables, so they don't have to even leave the Builder.

## Customizing Themes with Variables

Exposes variables and defines UI editor types to edit these variables.

To enable customization of themes, we use the theme variables schema. The schema was already created when we added the theme to the project. It's the `server/themes/restaurantVariables.json` file. We use it to define the UI editor for adjusting theme variables used in styling rules, which gives Shoutem the information about which variables and their formats are being used for the theme. The full schema reference can be found [here]({{ site.url }}/docs/extensions/reference/theme-variables).

Open the `Style` tab and choose `Customize theme`. You can see that theme variables are grouped into sections. Under `properties`, add a new variable with a `color` format, where `black` is the default value. Afterwards, reference that variable in `layout.sections` so it's included in the interface. We'll create a new section for that.

```JSON{3-7,13-15}
#file: server/themes/restaurantVariables.json
{
  "properties": {
    "subtitleColor": {
      "type": "string",
      "format": "color",
      "title": "Subtitle color",
      "default": "black"
    },
    // other variables
  },
  "layout": {
    "sections": [{
      "title": "Restaurants",
      "properties": ["subtitleColor"]
    }, {
      // other sections
    }]
  }
}
```

The only thing left to do is to use this variable in the theme file. Again, search for the `export default` statement:

```JavaScript{11}
#file: app/themes/restaurant.js
import { ext } from '../const';

// constants ...

export default (variables = {}) => ({
  [ext('List')]: {
    title: {
      fontSize: 15,
    },
    subtitle: {
      color: variables.subtitleColor,
      backgroundColor: 'white'
    }
  },

  // the rest of the styling rules...
})
```

You're done! Push the extension that contains your theme to Shoutem.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Check `Customize theme` under the `Style` tab. You can see the `Restaurants` section with a color picker for subtitle text color. Well done!

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/style-tab-themes-customise_theme-color_picker_preview.png'/>
</p>

## Adding a Custom Font

In order to add a custom font to a theme, you'll have to add a `fonts` folder to your extension's `app` folder and add your custom fonts to it in `.TTF` format. You can see this structure in our [Rubicon theme]("https://github.com/shoutem/extensions/tree/master/shoutem-rubicon-theme/app/fonts") extension. For the purpose of this tutorial, use a custom [Roboto font](https://www.fontsquirrel.com/fonts/roboto) for you to use.

These fonts also have to be linked into the app's binary as [assets](https://github.com/rnpm/rnpm#advanced-usage) using [`rnmp`](https://github.com/rnpm/rnpm). You do this by adding the following to your extension's `app/package.json` file:

```JSON{5-9}
#file: app/package.json
{
  "name": "{{site.example.devName}}.restaurants",
  "version": "0.0.1",
  "description": "My first extension.",
  "rnpm": {
    "assets": [
      "fonts"
    ]
  }
}
```

> #### Note
> In the above code snippet, `fonts` is the name of the folder: `app/fonts`.

In order to be able to choose the font you've added through the Builder, it has to also be added to your theme's variables in the `server/themes/restaurantVariables.json` file. The custom font we've provided you with is called `Roboto` and we'll be using the `Roboto-Regular` version if it.

```JSON{7}
#file: server/themes/restaurantVariables.json
"fontFamily": {
  "enum": [
    "Rubik-Regular",
    "NotoSans",
    "NotoSerif",
    "MuktaVaani-Regular",
    "Roboto-Regular"
  ]
},
```

After that, you can _push_ your extension to update the changes you've made on the Builder. After choosing your newly created theme you will be able to use the custom font you added:

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/custom-font.png'/>
</p>

However, you won't be able to preview these changes in the Builder or using the **Shoutem Preview** app. This is because fonts are linked into the binary of the app, while the Builder and Shoutem Preview app previews have their own, unchangeable binary and only preview JavaScript bundle changes. So to be able to preview this you'll have to set up your local development environment so the custom font is linked into the local binary. You can find out how to do that [here]({{ site.url }}/docs/extensions/tutorials/setting-local-environment).

Here you can see the difference between `Noto Serif` (left), a font included in our default theme, and our example custom font `Roboto Regular` (right):

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/custom-font-difference.png'/>
</p>
