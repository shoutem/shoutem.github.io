---
layout: doc
permalink: /docs/extensions/getting-started/using-ui-toolkit
title: Using UI toolkit
section: Getting Started
---

# Using UI toolkit
<hr />

React Native exposes plain components that you can use, but there's usually much work left to do just to make them look beautiful. Instead, you can use [@shoutem/ui](https://github.com/shoutem/ui), a set of customizable UI components. There are [plenty of components]({{ site.baseurl }}/docs/ui-toolkit/components/typography) that you can use out of the box.

## Creating restaurants list

Let's create a list of restaurants. Start by importing UI components from the toolkit.

```javascript{5-15}
#file: app/screens/List.js
import React, {
  Component
} from 'react';

import {
  Image,
  ListView,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Screen
} from '@shoutem/ui';

import { NavigationBar } from '@shoutem/ui/navigation';
```

We prepared some data for you. Download [this compressed file](/restaurants/restaurants.zip), extract it and copy the `assets` folder inside of `app` folder. The `assets` folder contain static restaurants data in of `restaurants.json` file.

Define a method in `List` class that returns an array of restaurants.

```javascript{3-5}
#file: app/screens/List.js
export default class List extends Component {

  getRestaurants() {
    return require('../assets/restaurants.json');
  }
```

Implement `render` method that will use `ListView`. `ListView` accepts data in the form of `Array` to show in the list and `renderRow` method which defines how list row should look like.

Add `renderRow` method and replace implementation of `render` method:

```JSX{3-13,16-25}
#file: app/screens/List.js
  getRestaurants() {...}

  renderRow(restaurant) {
    return (
      <Image styleName="large-banner" source={% raw %}{{ uri: restaurant.image &&
        restaurant.image.url ? restaurant.image.url : undefined  }}{% endraw %}>
        <Tile>
          <Title>{restaurant.name}</Title>
          <Subtitle>{restaurant.address}</Subtitle>
        </Tile>
      </Image>
    );
  }

  render() {
    return (
      <Screen>
        <NavigationBar title="RESTAURANTS" />
        <ListView
          data={this.getRestaurants()}
          renderRow={restaurant => this.renderRow(restaurant)}
        />
      </Screen>
    );
  }
```

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

`List` is now showing list of restaurants. 

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-list.png'/>
</p>

This looks exactly how we wanted.

Try clicking on a row. Nothing happens! We want to open up a details screen when list row item is clicked.

## Creating details screen

First, create details screen:

```ShellSession
$ shoutem screen add Details
File `app/screens/Details.js` is created.
```

We didn't need to create `shortcut` with this screen as it's not going to be the first screen of an extension. Screen is defined in `extension.json`.

When list item is touched, we want to open details screen. For that we need `TouchableOpacity` component from React Native and Shoutem's `navigateTo` Redux action creator. It accepts Shoutem `route object` (with `screen` and `props` properties) as the only argument.

To reference our `Details` screen exported in `app/index.js`, we're using `ext` helper function that was created in `app/extension.js` file. This function returns an **absolute name**, e.g. `developer.restaurants.List`, for the extension part which is passed as its first argument, or extension `name` if no argument is passed.

Let's import these things:

```javascript{1-5}
#file: app/screens/List.js
import {
  TouchableOpacity
} from 'react-native';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../extension';
```

To open a screen on touch, we need to dispatch `navigateTo`. We can use it directly in the screen through dispatch, but Redux standard way is to bind together `dispatch` and action creator inside `mapDispatchToProps` function, the second argument of [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function. Bound actions are accessed through the `props` which is why we need to bind `renderRow` action to the right `this` context.

```javascript{1-8,12-15}
#file: app/screens/List.js
import { connect } from 'react-redux';

class List extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }
  ...
}

export default connect(
  undefined,
  { navigateTo }
)(List);
```

Implement `renderRow` function.

```JSX{2,5-8,16}
#file: app/screens/List.js
  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
        screen: ext('Details'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={% raw %}{{ uri: restaurant.image &&
        restaurant.image.url ? restaurant.image.url : undefined }}{% endraw %}>
          <Tile>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }
```

This is what you should have end up with in `app/screens/List.js`:

```JSX
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
  Tile,
  Title,
  Subtitle,
  Overlay,
  Screen
} from '@shoutem/ui';

import { NavigationBar } from '@shoutem/ui/navigation';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../extension';
import { connect } from 'react-redux';

class List extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  getRestaurants() {
    return require('../assets/restaurants.json');
  }

  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
        screen: ext('Details'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={% raw %}{{ uri: restaurant.image &&
        restaurant.image.url ? restaurant.image.url : undefined }}{% endraw %}>
          <Tile>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Screen>
        <NavigationBar title="RESTAURANTS" />
        <ListView
          data={this.getRestaurants()}
          renderRow={restaurant => this.renderRow(restaurant)}
        />
      </Screen>
    );
  }
}

export default connect(
  undefined,
  { navigateTo }
)(List)
```

To `Details` screen, just copy the following code. We're not introducing anything new, just using some new components.

```JSX
#file: app/screens/Details.js
import React, {
  Component
} from 'react';

import {
  ScrollView,
} from 'react-native';

import {
  Icon,
  Row,
  Subtitle,
  Text,
  Title,
  View,
  Image,
  Divider,
  Overlay,
  Tile,
} from '@shoutem/ui';

export default class Details extends Component {
  render() {
    const { restaurant } = this.props;

    return (
      <ScrollView style = {% raw %}{{marginTop:-70}}{% endraw %}>
        <Image styleName="large-portrait" source={% raw %}{{ uri: restaurant.image &&
        restaurant.image.url ? restaurant.image.url : undefined }}{% endraw %}>
          <Overlay styleName="fill-parent">
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Overlay>
        </Image>

        <Row>
          <Text>{restaurant.description}</Text>
        </Row>

        <Divider styleName="line" />

        <Row>
          <Icon name="laptop" />
          <View styleName="vertical">
            <Subtitle>Visit webpage</Subtitle>
            <Text>{restaurant.url}</Text>
          </View>
          <Icon name="right-arrow" />
        </Row>

        <Divider styleName="line" />

        <Row>
          <Icon name="pin" />
          <View styleName="vertical">
            <Subtitle>Address</Subtitle>
            <Text>{restaurant.address}</Text>
          </View>
          <Icon name="right-arrow" />
        </Row>

        <Divider styleName="line" />

        <Row>
          <Icon name="email" />
          <View styleName="vertical">
            <Subtitle>Email</Subtitle>
            <Text>{restaurant.mail}</Text>
          </View>
        </Row>

        <Divider styleName="line" />
      </ScrollView>
    );
  }
}
```

We'll skip implementing the handling of web and e-mail properties and just render them.

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

When you click on a row in the list, this is what you get:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-details.png'/>
</p>

That's exactly what we wanted to get! However, our app is using static data. Let's connect it to **Shoutem Cloud Storage**. 

