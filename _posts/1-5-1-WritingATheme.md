---
layout: doc
permalink: /docs/extensions/tutorials/writing-a-theme
title: Writing a theme
section: Tutorials
---

# Writing a theme

When creating an app, admins will want to have the same unique look across the whole app. For such purpose, developers can create a **theme** with styling rules for the components in their extension. However, admins will sometimes want to adjust some style of the app, like text color or font throughout the whole application. To achieve that, they can change or customize a theme through **theme variables**. Let's write a theme, which is basically an extension part exported in `extension.json`.

> #### Note
> This tutorial continues on [Getting started](http://shoutem.github.io/docs/extensions/getting-started/introduction). If you don't have an app which is result from Getting started chapter, find the `Restaurants` extension on [Github](/docs/coming-soon), install it onto new app and fill with some restaurants.

## Creating a theme

To create a theme within the existing Restaurants extension, locate to `Restaurants` extension:

```ShellSession
$ cd Restaurants
```

Create a theme and fill it with basic data:

```ShellSession
$ shoutem theme add rounded
Enter information about your theme. Press `return` to accept (default) values.
Title: (Rounded)
Description: Making pictures rounded

File `app/themes/rounded.js` is created.
File `server/theme-variables/rounded.js` is created.
```

Extension file was just modified:

```JSON{28-38}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "title": "Restaurants",
  "description": "List of restaurants",
  "shortcuts": [{
    "name": "openRestaurantsList",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants"
    "screen": "@.RestaurantsList",
    "adminPages": [{
      "page": "shoutem.admin.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "@.Restaurants"
      }
    }]
  }],
  "screens": [{
    "name": "RestaurantsList"
  }, {
    "name": "RestaurantDetails"
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/schemas/Restaurants.json"
  }],
  "themes": [{
    "name": "rounded",
    "title": "Rounded",
    "variables": "@.rounded"
    "description": "Making pictures rounded",
    "showcase": ""
  }],
  "themeVariables": [{
    "name": "rubicon",
    "path": "server/variables-schema/rubicon.json"
  }]
}
```

Check `app/themes/rounded.js` file. It's a copy of a [Rubicon theme](/docs/coming-soon) so you can start fast.

Property `showcase`, which is empty, is an array of images and videos that will showcase your theme. Download prepared [showcase](/docs/coming-soon) and copy it to `server/assets` folder. Change `showcase` to:

```js
    ...
    "showcase": ["video.mp4", "list.png", "details.png"]
    ...
```

Push this theme to Shoutem server. This might take a while, as you need to upload showcase too:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Extensions` tab now. Find your theme under `My extensions`, once you click on `+`.

[Picture]

Install it.

Navigate now to `Styles` tab. Selected theme is `Rubicon`, but click the `Change theme` button. Here you can find out all the installed themes. Yours is also there! Select it and you'll see it's showcase.

[Picture]

Select `Apply theme`.

Check now the `Customize theme` tab.

[Picture]

Here admin can customize your theme through theme variables. These variables are contained in `server/variables/schema/rubicon.json` and are the copy from the [ones of Rubicon theme](/docs/coming-soon).

## How theme works

Now that we went through the basics, let's explain how theme works. Theme is a set of styling rules that customize the components in the app connected to the theme, no matter in which extension. We call these components `customizable components`. All the components in [@shoutem/ui](https://github.com/shoutem/ui) are connected to the theme and [Rubicon](/docs/coming-soon) theme, default theme for apps, customizes them through styling rules. Since all of the extensions developed by Shoutem use `@shoutem/ui`, all the components will be customized through theme.

Styling rules in theme object, in `app/theme/rounded.js` file, are resolved using [@shoutem/theme](https://github.com/shoutem/theme) package of the same name. In the package's [docs](http://shoutem.github.io/docs/ui-toolkit/theme/introduction), check the [Theme style rules](http://shoutem.github.io/docs/ui-toolkit/theme/introduction#theme-style-rules) section, which describe how to write a theme. Each component is connected to the theme by the name, by which it can be targeted in theme.

Open now `app/theme/rounded.js` and check the styling rules used in `Rubicon` theme. Let's now create a customizable component.

## Customizable component

Suppose we want to create a theme which will make a title bigger in restaurant row and will change the background of subtitle to white, while changing subtitle color to black.

Since restaurant row is defined in `app/screens/RestaurantsList.js` we can make that component customizable or encapsulate the restaurant row as separate component. Let's go with the first, simpler solution:

```JavaScript
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
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
        screen: ext('RestaurantDetails'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={{ uri: restaurant.image && restaurant.image.url  }}>
          <Tile>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
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
)(RestaurantsList);
```

## Modifying theme

## Customizing theme with variables


