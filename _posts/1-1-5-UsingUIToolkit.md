---
layout: doc
permalink: /docs/getting-started/using-ui-toolkit
title: Using UI toolkit
---

# Using UI toolkit
<hr />

Shoutem UI Toolkit is a set of styleable UI components that you can use in any React Native application. It basically turns any ordinary app into an amazing app. There are plenty of components that you can use out of the box. In this tutorial we'll use some of them. Documentation for all the components can be found in the [reference]({{ site.baseurl }}/docs/ui-toolkit/introduction).

React Native itself exposes plain components that you can use, but there's usually much work still left to do to make them look as you wanted. Shoutem UI Toolkit brings the experience of building web pages to React Native and solves the problem of not being able to use CSS classes with [Shoutem UI theme]({{ site.baseurl }}/docs/ui-toolkit/theme).

## Adding static data

Let's add static restaurants and show them in list. Start by UI components from the toolkit.

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

Define a method in `RestaurantsList` class that returns an array of restaurants.

```javascript{3-5}
#file: app/screens/RestaurantsList.js
export default class RestaurantsList extends Component {

  getRestaurants() {
    return require('../assets/data/restaurants.json');
  }
```

We prepared some data for you. Create `app/assets` folder, which will keep the assets for application part of your extension. Download [this `zip`](/restaurants/restaurants.zip), extract it and copy its content to `app/assets`. It contains `data/restaurants.json` file with restaurants data.

Implement `render` method that will use `ListView`. `ListView` accepts data in the form of `Array` to show in the list and `renderRow` method which defines how list row should look like.

Remove old `render` method and add these methods:

```JSX{3-14,17-27}
#file: app/screens/RestaurantsList.js
  getRestaurants() {...}

  renderRow(restaurant) {
    return (
      <Tile>
        <Image source={% raw %}{{ uri: restaurant.image }}{% endraw %}>
          <Overlay styleName="dark">
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
           </Overlay>
        </Image>
      </Tile>
    );
  }

  render() {
    this.props.setNavBarProps({
      title: RESTAURANTS
    });

    return (
      <ListView
        data={this.getRestaurants()}
        renderRow={restaurant => this.renderRow(restaurant)}
      />
    );
  }
```

In render we used `setNavBarProps` method provided by Shoutem to set the NavBar title.

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

First, create that screen:

```ShellSession
$ shoutem screen RestaurantDetails
File `app/screens/RestaurantDetails.js` is created.
```

Screen was defined in extension.json. This creates the details screen in the `RestaurantDetails.js` file. Don't forget to export it in `index.js`.

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

We want to open this screen when the list item is touched. For that we will use `TouchableOpacity` component from React Native. Let's import it in `RestaurantsList.js`:

```javascript{2}
#file: app/screens/RestaurantsList.js
import {
  TouchableOpacity
} from 'react-native';
```

To open screen, we'll use Redux action creator `navigateTo` opens new screen in application. It accepts [Shoutem route object](/docs/coming-soon) as the only argument with `screen` property. To reference our `RestaurantsDetails` screen exported in `app/index.js`, we're using `ext` helper function that was created in `app/const.js` file. This function returns an **absolute name**, e.g. `developer.restaurants.RestaurantsList`, for the extension part which is passed as its first argument, or `extension name` if no argument is passed.

```javascript{1-2}
#file: app/screens/RestaurantsList.js
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../const';
```

To open a screen on touch, we need to dispatch `navigateTo` Redux action creator. We can use it directly in the screen through dispatch, but Redux standard way is to bind together `dispatch` and action creator inside `mapDispatchToProps` function, the second argument of [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function.

Import `connect` function which defined how component will connect to Redux store and also import `bindActionCreators` from Redux which will do the binding.

```javascript{3-6}
#file: app/screens/RestaurantsList.js
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../const';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RestaurantsList extends Component {...}
```

Note that we've also changed that the class `RestaurnatsList` is no longer exported. Instead we will export the `connect` function in which binding is defined. Place following code at the end of file:

```javascript{4-7}
#file: app/screens/RestaurantsList.js
import {...}
class RestaurantsList extends Component {...}

export default connect(
  undefined,
  (dispatch) => bindActionCreators({ navigateTo }, dispatch)
)(RestaurantsList);
```

We can access bound actions through the `props` and pass it to `renderRow` function. Let's add `TouchableOpacity` and connect it to `navigateTo` function.

```JSX{2,5-8,13}
#file: app/screens/RestaurantsList.js
  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
          screen: ext('RestaurantDetails'),
          props: { restaurant }
        })}>
        <Tile>
          <Image source={% raw %}{{ uri: restaurant.image }}{% endraw %}>
            <Overlay styleName="dark">
              <Title>{restaurant.name}</Title>
              <Subtitle>{restaurant.address}</Subtitle>
             </Overlay>
          </Image>
        </Tile>
      </TouchableOpacity>
    );
  }
```

This is what you should have end up with in `app/screens/RestaurantsList.js`:

```JSX{4-7,8-16,35-42,54}
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
import { bindActionCreators } from 'redux';

class RestaurantsList extends Component {
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
        <Tile>
          <Image source={% raw %}{{ uri: restaurant.image }}{% endraw %}>
              <Overlay styleName="dark">
                <Title>{restaurant.name}</Title>
                <Subtitle>{restaurant.address}</Subtitle>
               </Overlay>
          </Image>
        </Tile>
      </TouchableOpacity>
    );
  }

  render() {
    this.props.setNavBarProps({
      title: RESTAURANTS
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
  (dispatch) => bindActionCreators({ navigateTo }, dispatch)
)(RestaurantsList)
```

To `RestaurantDetails` screen, just copy the following code. We're not introducing anything new, just using some new components.

```JSX{4-6,7-18,24-25,28-70}
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
      <ScrollView>
        <Image styleName="large-portrait" source={% raw %}{{ uri: restaurant.image }}{% endraw %}>
          <Overlay styleName="dark">
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Overlay>
        </Image>

        <Text styleName="inset">{restaurant.description}</Text>

        <Divider styleName="line" />

        <Row>
          <Icon name="web" />
          <View styleName="vertical">
            <Subtitle>Visit webpage</Subtitle>
            <Text>{restaurant.url}</Text>
          </View>
          <Icon name="close" />
        </Row>

        <Divider styleName="line" />

        <Row>
          <Icon name="tweets" />
          <View styleName="vertical">
            <Subtitle>Address</Subtitle>
            <Text>{restaurant.address}</Text>
          </View>
          <Icon name="close" />
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

That's exactly what we wanted to get! Our app reached final look! However, our app is using static data. Every time we want a change, we need to update the version of extension. That would be a very long process. **Shoutem Cloud Storage** to the rescue!

