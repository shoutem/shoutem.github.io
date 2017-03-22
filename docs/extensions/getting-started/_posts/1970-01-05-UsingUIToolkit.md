---
layout: doc
permalink: /docs/extensions/getting-started/using-ui-toolkit
title: Using UI toolkit
section: Getting Started
---

# Using UI toolkit
<hr />

React Native exposes plain iOS and Android native components that you can use, but there's usually much work left to do just to make them look beautiful. Instead, you can use [@shoutem/ui](https://github.com/shoutem/ui), a set of customizable UI components. There are [plenty of components]({{ site.baseurl }}/docs/ui-toolkit/components/typography) that you can use out of the box.

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

We prepared mockup restaurants data for you. Download [this compressed file](/restaurants/restaurants.zip), extract it and copy the extracted `assets` folder inside of the `app` folder. The `assets` folder contain static restaurants data in `restaurants.json` file.

Define a method in `List` class that returns an array of restaurants.

```javascript{3-5}
#file: app/screens/List.js
export default class List extends Component {

  getRestaurants() {
    return require('../assets/restaurants.json');
  }
```

Implement `render` method that will use `ListView` component. [ListView]({{ site.baseurl }}/docs/ui-toolkit/components/list-view) accepts `data` in the form of an `array` to show in the list and `renderRow` callback function which defines how row in the list should look like.

Add `renderRow` method and replace implementation of `render` method:

```JSX{3-14,17-25}
#file: app/screens/List.js
  getRestaurants() {...}

  // defines the UI of each row in the list
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

Since we changed the extension, the app preview will be shown after Shoutem builds the new app. `List` is now showing the list of restaurants. 

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-list.png'/>
</p>

This looks exactly how we wanted.

Try clicking on a row. Nothing happens! We want to open up the screen with restaurant's details when user touches a row in the list.

## Creating details screen

When restaurant in the list is touched, we will open details screen for that restaurant. To make components respond to touches, use [TouchableOpacity](https://facebook.github.io/react-native/docs/touchableopacity.html) component from React Native. We'll also import Shoutem's `navigateTo` action creator to navigate to another screen and `ext` function for the name of screen we're navigating to.

Let's import these things:

```javascript{1-5}
#file: app/screens/List.js
import {
  TouchableOpacity
} from 'react-native';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../extension';
```

[Connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) `navigateTo` action creator to redux store.

```javascript{1,3-9,14-18}
#file: app/screens/List.js
import { connect } from 'react-redux';

export class List extends Component {
  constructor(props) {
    super(props);

    // bind renderRow function to get the correct props
    this.renderRow = this.renderRow.bind(this);
  }

  getRestaurants() ...
}

// connect screen to redux store
export default connect(
  undefined,
  { navigateTo }
)(List);
```

Now, create details screen:

```ShellSession
$ shoutem screen add Details
File `app/screens/Details.js` is created.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

We didn't create `shortcut` as this screen is not going to be the first screen of an extension.

Open restaurants details screen in the `renderRow` function. Action `navigateTo` accepts Shoutem `route object` as the only argument with `screen` (full name of screen to navigate to) and `props` (passed to screen) properties. To get the full name of the screen, we'll use `ext` function, which returns the full name for the extension part passed as its first argument (e.g. returns `tom.restaurants.Details` for `Details`) or full extension name (e.g. `tom.restaurants`) if no argument is passed.


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

This is what you should end up with in `app/screens/List.js`:

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

export class List extends Component {
  constructor(props) {
    super(props);

    // bind renderRow function to get the correct props
    this.renderRow = this.renderRow.bind(this);
  }

  getRestaurants() {
    return require('../assets/restaurants.json');
  }

  // defines the UI of each row in the list
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

// connect screen to redux store
export default connect(
  undefined,
  { navigateTo }
)(List)
```

For `Details` screen just copy the following code. We're not introducing any new concept here, just using some additional components.

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

That's exactly what we wanted to get! However, our app is using static data. Let's connect it to the **Shoutem Cloud**. 
