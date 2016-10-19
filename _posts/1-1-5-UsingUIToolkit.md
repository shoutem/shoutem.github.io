---
layout: doc
permalink: /docs/extensions/getting-started/using-ui-toolkit
title: Using UI toolkit
section: Getting Started
---

# Using UI toolkit
<hr />

React Native exposes plain components that you can use, but there's usually much work left to do to make them look professional. Use [Shoutem UI toolki](https://shoutem.github.io/ui), a set of 3 packages for building professional UI/UX in React Native: [@shoutem/ui](https://github.com/shoutem/ui), [@shoutem/theme](https://github.com/shoutem/theme) and [@shoutem/animation](https://github.com/shoutem/animation). We'll use `@shoutem/ui`, consisting of styleable UI components that you can use in any React Native application. It basically turns any ordinary app into an amazing app. There are plenty of components that you can use out of the box. Documentation for all the components can be found on the [portal]({{ site.baseurl }}/docs/ui-toolkit/introduction).

## Adding static data

Let's add static restaurants and show them in list. Start by importing UI components from the toolkit.

```javascript{4-12}
#file: app/screens/RestaurantsList.js
import React, {
  Component
} from 'react';
import {
  Image,
  ListView,
  Text,
  Tile,
  Title,
  Subtitle,
  Overlay,
} from '@shoutem/ui';
```

We prepared some data for you. Create `app/assets` folder, which will keep the assets for application part of your extension, and extract [this content](/restaurants/restaurants.zip) inside, which contains restaurants data.

Define a method in `RestaurantsList` class that returns an array of restaurants.

```javascript{3-5}
#file: app/screens/RestaurantsList.js
export default class RestaurantsList extends Component {

  getRestaurants() {
    return require('../assets/data/restaurants.json');
  }
```

Implement `render` method that will use `ListView`. `ListView` accepts data in the form of `Array` to show in the list and `renderRow` method which defines how list row should look like.

Add `renderRow` method and replace implementation of `render` method:

```JSX{3-12,15-25}
#file: app/screens/RestaurantsList.js
  getRestaurants() {...}

  renderRow(restaurant) {
    return (
      <Image styleName="large-banner" source={% raw %}{{ uri: restaurant.image && restaurant.image.url ? restaurant.image.url : undefined  }}{% endraw %}>
        <Tile>
          <Title>{restaurant.name}</Title>
          <Subtitle>{restaurant.address}</Subtitle>
        </Tile>
      </Image>
    );
  }

  render() {
    this.props.setNavBarProps({
      title: 'RESTAURANTS'
    });

    return (
      <ListView
        data={this.getRestaurants()}
        renderRow={restaurant => this.renderRow(restaurant)}
      />
    );
  }
```

In render we used `setNavBarProps` method provided in `props` to screens to set the NavBar title.

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

`RestaurantsList` is now showing list of restaurants. 

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-list.png'/>
</p>

This looks exactly how we wanted.

Try clicking on a row. Nothing happens! We want to open up a details screen when list row item is clicked.

## Creating details screen

First, create details screen:

```ShellSession
$ shoutem screen add RestaurantDetails
File `app/screens/RestaurantDetails.js` is created.
```

Screen is defined in extension.json. Don't forget to export it in `index.js`.

```JSX{2,6}
#file: app/index.js
import RestaurantsList from './screens/RestaurantsList';
import RestaurantDetails from './screens/RestaurantDetails';

export const screens = {
  RestaurantsList,
  RestaurantDetails
};

export const reducer = {};
```

When listem is touched, we want to open details screen. For that we need `TouchableOpacity` component from React Native and Shoutem's `navigateTo` Redux action creator. It accepts Shoutem `route object` (with `screen` and `props` properties) as the only argument. To reference our `RestaurantDetails` screen exported in `app/index.js`, we're using `ext` helper function that was created in `app/const.js` file. This function returns an **absolute name**, e.g. `developer.restaurants.RestaurantsList`, for the extension part which is passed as its first argument, or extension `name` if no argument is passed.

Let's import these things:

```javascript{2,4-5}
#file: app/screens/RestaurantsList.js
import {
  TouchableOpacity
} from 'react-native';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../const';
```

To open a screen on touch, we need to dispatch `navigateTo`. We can use it directly in the screen through dispatch, but Redux standard way is to bind together `dispatch` and action creator inside `mapDispatchToProps` function, the second argument of [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function. Bound actions are accessed through the `props` which is why we need to bind `renderRow` action to the right `this` context.

```javascript{1-8,12-15}
#file: app/screens/RestaurantsList.js
import { connect } from 'react-redux';

class RestaurantsList extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }
  ...
}

export default connect(
  undefined,
  { navigateTo }
)(RestaurantsList);
```

Implement `renderRow` function.

```JSX{2,5-8,15}
#file: app/screens/RestaurantsList.js
  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
        screen: ext('RestaurantDetails'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={% raw %}{{ uri: restaurant.image &&
          restaurant.image.url  }}{% endraw %}>
          <Tile>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }
```

This is what you should have end up with in `app/screens/RestaurantsList.js`:

```JSX
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
} from '@shoutem/ui';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../const';
import { connect } from 'react-redux';

class RestaurantsList extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  getRestaurants() {
    return require('../assets/data/restaurants.json');
  }

  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
        screen: ext('RestaurantDetails'),
        props: { restaurant }
      })}>
        <Image styleName="large-banner" source={% raw %}{{ uri: restaurant.image &&
          restaurant.image.url  }}{% endraw %}>
          <Tile>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }

  render() {
    this.props.setNavBarProps({
      title: 'RESTAURANTS'
    });

    return (
      <ListView
        data={this.getRestaurants()}
        renderRow={restaurant => this.renderRow(restaurant)}
      />
    );
  }
}

export default connect(
  undefined,
  { navigateTo }
)(RestaurantsList)
```

To `RestaurantDetails` screen, just copy the following code. We're not introducing anything new, just using some new components.

```JSX
#file: app/screens/RestaurantDetails.js
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

export default class RestaurantDetails extends Component {
  render() {
    const { restaurant, setNavBarProps } = this.props;
    
    // make NavigationBar transparent
    setNavBarProps({ styleName: 'clear' });

    return (
      <ScrollView style = {% raw %}{{marginTop:-70}}{% endraw %}>
        <Image styleName="large-portrait" source={% raw %}{{ uri: restaurant.image &&
          restaurant.image.url  }}{% endraw %}>
          <Overlay styleName="dark">
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Overlay>
        </Image>

        <Text styleName="inset">{restaurant.description}</Text>

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

