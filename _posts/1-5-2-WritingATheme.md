---
layout: doc
permalink: /docs/extensions/tutorials/writing-a-theme
title: Writing a theme
section: Tutorials
---

# Writing a theme

Shoutem comes with a dozen of available themes, but if you want a custom one, you can write your own. To start, it's important that you understand two concepts (extension parts):

- Theme: file containing all the style for your app
- Theme variables: schema for Shoutem builder describing what application owners can customize in your theme

> #### Note
> This tutorial continues on [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction). If you don't have an app which is result from Getting started chapter, find the `Restaurants` extension on [Github](/docs/coming-soon), install it onto new app and fill with some restaurants.

## Creating a theme

To create a theme within the existing Restaurants extension, locate to `Restaurants` extension:

```ShellSession
$ cd Restaurants
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

Extension file was just modified:

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
    "name": "restaurant",
    "path": "server/themes/restaurantVariables.json"
  }]
}
```

Check `app/themes/restaurant.js` file. It's a copy of [Rubicon theme](/docs/coming-soon), Shoutem's default theme.

Property `showcase`, which is empty, is an array of images and videos that will showcase your theme. Download prepared [showcase](/docs/coming-soon) and copy it to `server/assets` folder. Change `showcase` to:

```JavaScript
#file: extension.json
"showcase": ["video.mp4", "list.png", "details.png"]
```

Push this theme to Shoutem server. This might take a while, as you need to upload showcase too:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Since Restaurants extension is already installed, so is your theme. However, it's not applied yet. Navigate now to `Styles` tab. Selected theme is `Rubicon`, but click the `Change theme` button. Here you can find all the installed themes. Yours is also there! Select it and you'll see its showcase.

[Picture]

Select `Apply theme`.

Now check the `Customize theme` tab.

[Picture]

Here owner can customize your theme through theme variables. These variables are contained in `server/themes/restaurantVariables.json` and are the copy from the [ones of Rubicon theme](/docs/coming-soon).

## How theme works

Theme is a set of styling rules that customize components in the app connected to the theme, called `customizable components`. All the components in [@shoutem/ui](https://github.com/shoutem/ui) package are connected to the theme so they all share the same style.

Theme file, `app/theme/restaurant.js` exports **theme function** that resolves theme variables and returns **theme object**. Theme object consists of [styling rules](http://shoutem.github.io/docs/ui-toolkit/theme/introduction#theme-style-rules) defined by [@shoutem/theme](https://github.com/shoutem/theme) package. Each component is connected to the theme by the `name`, by which it can be targeted in theme.

Open `app/theme/restaurant.js` and check the styling rules used in `Rubicon` theme. Let's create a customizable component now.

## Customizable component

Suppose we want to create a theme which will make a title in restaurant row bigger and will change the background color of subtitle to white, while changing text color to black. Since restaurant row is defined in `app/screens/RestaurantsList.js` we can make that component customizable or encapsulate a separate restaurant row component. Let's go with the first, simpler solution.

From the docs on how to use `@shoutem/theme` package, in order to support the theme, we need to:

- Replace the occurrences of styles with this.props.style
- Connect the component to the theme

We didn't use `style`, but now we're going to use it from `this.props.style` in `renderRow` method. Also, import `connectStyle` from `@shoutem/theme` to connect the component to the theme and assign it a `name`.

```JavaScript{18,48,57-58,90-92}
#file: app/screens/RestaurantsList.js
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

class RestaurantsList extends Component {
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
        screen: ext('RestaurantDetails'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={{ uri: restaurant.image && restaurant.image.url  }}>
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
  connectStyle(ext('RestaurantsList'))(RestaurantsList)
);
```

As you can see, `connectStyle` takes the same format as `connect` method from Redux. Notice that we added extension prefix to the component name. It's a good practice to do so to prevent namespace collision.

Ok, we've added style from theme to the component, but we haven't implemented those styling rules in the theme. Let's modify our theme.

## Modifying theme

We created a theme file (`app/themes/restaurant.js`) with Rubicon template. Since Shoutem app can only have 1 theme applied at certain point, it's a good practice to include styling rules for the components usually used in Shoutem extensions, such as the ones from `@shoutem/ui`.

Theme file is huge and it won't be pasted here fully. Just search for `export default` statement which exports theme function. Into _theme object_ returned by _theme function_, add the agreed styling rules: _make a title bigger in restaurant row and change the background color of subtitle to white, while changing text color to black_.

Add the following styling rules to the beginning of exported object:

```JavaScript{1,6-14}
#file: app/themes/restaurant.js
import { ext } from '../const';

// constants ...

export default (variables = {}) => ({
  [ext('RestaurantsList')]: {
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

Now, now the app in the builder preview. It looks how we wanted!

[Picture]

This is good, but we got a request from owners using our theme that they want to be able to modify subtitle text color. We can do that with variables.

## Customizing theme with variables

Exposes variables and defines UI editor types to edit these variables.

To enable customization of theme, use theme variables schema. Schema has already been created when we added theme to the project and it's in the `server/themes/restaurantVariables.json` file. It is used to define UI editor for adjusting theme variables used in styling rules. give the information to Shoutem which variables and their format is being used for the theme. Full schema reference can be found [here](/docs/extensions/reference/theme-variables).

Open `Style` tab and choose `Customize theme`. Theme variables are grouped into sections. Under `properties`, add new variable with `color` format with `black` color as default value. Afterwards, reference that variable in `layout.sections` so it's included to the interface. We'll create a new section for that.

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
      "title": "Restaurants"
      "properties": ["subtitleColor"]
    }, {
      // other sections
    }]
  }
}
```

The only thing left to do is to use this variable in theme file:

```JavaScript{11}
#file: app/themes/restaurant.js
import { ext } from '../const';

// constants ...

export default (variables = {}) => ({
  [ext('RestaurantsList')]: {
    title: {
      fontSize: 15,
    },
    subtitle: {
      color: vars.subtitleColor
      backgroundColor: 'white'
    }
  },

  // the rest of the styling rules...
})
```

We're done! Push extension containing theme to Shoutem.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Check the `Customize theme` under `Style` tab. You can see `Restaurants` section with color picker for subtitle text color. Well done!

[Picture]
