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

Styling rules in **theme function**, in `app/theme/rounded.js` file, are resolved using [@shoutem/theme](https://github.com/shoutem/theme) package of the same name. In the package's [docs](http://shoutem.github.io/docs/ui-toolkit/theme/introduction), check the [Theme style rules](http://shoutem.github.io/docs/ui-toolkit/theme/introduction#theme-style-rules) section, which describe how to write a theme. Each component is connected to the theme by the name, by which it can be targeted in theme. It's important to notice one thing: in `@shoutem/theme` docs, styling rules are written in theme object. However, when we're creating theme as extension part, we're writing theme **function**, which accepts variables and returns theme object.

Open now `app/theme/rounded.js` and check the styling rules used in `Rubicon` theme. Let's now create a customizable component.

## Customizable component

Suppose we want to create a theme which will make a title bigger in restaurant row and will change the background color of subtitle to white, while changing text color to black.

Since restaurant row is defined in `app/screens/RestaurantsList.js` we can make that component customizable or encapsulate the restaurant row as separate component. Let's go with the first, simpler solution.

From the docs on how to use `@shoutem/theme` pacakge, in order to support the theme, we need to:

- Replace the occurrences of styles with this.props.style
- Connect the component to the theme

We're not using the `style`, but now we're going use it from `this.props.style` in `renderRow` method. Also, import `connectStyle` from `@shoutem/theme` to connect the component to the theme and assign it a name.

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

As you can see, `connectStyle` takes the same format as `connect` method from Redux. Notice that we added extension prefix to the component name. It's a good practise to do so to prevent namespace collision.

Ok, we've added style from theme to the component, but we haven't implement those styling rules in the theme. Let's modify our theme.

## Modifying theme

We created a theme file (`app/themes/rounded.js`) with Rubicon template. Since Shoutem app can have only 1 theme applied at certain point, it's a good thing to include styling rules for the components which might be used by apps using this theme. Since we're doing this theme for ourselves and we want to keep Rubicon look of components in `@shoutem/ui`, that was the reason to create theme with Rubicon template.

Theme file is huge and it won't be pasted here fully. Just search for `export default` statement which exports theme function. Into object that's returned by theme function, we want to add the styling rules that we defined in the beginning: _make a title bigger in restaurant row and change the background color of subtitle to white, while changing text color to black_.

Add the following styling rules to the beginning of exported object:

```JavaScript{1,6-15}
#file: app/themes/rounded.js
import { ext } from '../const';

// constants ...

export default (vars) => ({
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

Check [React Native documentation](https://facebook.github.io/react-native/docs/text.html) on how to style the text.

Great! Push the theme now.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Check now the app in the builder preview. It looks how we wanted!

[Picture]

This is good, but we got a request from admins using our theme that they want to be able to modify subtitle text color. We can do that with variables.

## Customizing theme with variables

To enable customization of theme, we need to create variables schema for that theme. Schema has already been created when we added theme to the project and it's in the `server/theme-variables/rounded.js` file. Variables schema is used to give the information to Shoutem which variables and their format is being used for the theme. It's Shoutem's flavored JSON Schema, just how data schema is as well. Full reference of variables schema can be found [here](/docs/extensions/reference/extension).

Open `Style` tab and choose `Customize theme`. Theme variables are divided into sections, so it's easier for admins to navigate through variables. Under `properties`, add new variable with `shoutem.styles.color` format with `black` color as default value. After, reference that variable in `layout` `sections` so it's included to the interface. We'll create new section for that.

```JSON{3-8,13-15}
#file: server/themes/rounded.js
{
  "properties": {
    "subtitleColor": {
      "type": "string",
      "format": "shoutem.styles.color",
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
#file: app/themes/rounded.js
import { ext } from '../const';

// constants ...

export default (vars) => ({
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

We're done! Push theme to Shoutem server.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Check the `Customize theme` under `Style` tab. You can see `Restaurants` section with color picker for subtitle text color. Well done!

[Picture]