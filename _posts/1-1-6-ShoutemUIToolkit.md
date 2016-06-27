---
layout: doc
permalink: /docs/getting-started/shoutem-ui-toolkit
title: Using UI Toolkit
---

# Using UI Toolkit
<hr />

Shoutem UI Toolkit is a set of styleable UI components that you can use in any React Native application. It basically turns any ordinary app into an amazing app. There are plenty of components that you can use out of the box. In this tutorial we'll use `ListView`, `Tile`, `Image`, `Title`, `Subtitle`, `Row`, `View` and `Icon` from the UI Toolkit. Documentation for all the components can be found in the [reference]({{ site.baseurl }}/docs/ui-toolkit/introduction).

Up until now, we only used React Native components. Some of them, like `ListView`, have correspondent views in Shoutem UI Toolkit. Specifically, Shoutem `ListView` already implements `rowHasChanged` function on React Native `ListView`, so we no longer need `getDataSource` helper method. Also, we no longer need `styles` definition because all styles for Shoute UI components are already implemented in [Shoutem UI theme]({{ site.baseurl }}/docs/ui-toolkit/theme).
Update `RestaurantsList` screen code so that it uses Shoutem UI components.

```JSX{5-8,10-18,38-44,57}
#file: app/screens/RestaurantsList.js
import React, {
  Component
} from 'react';

import {
  StyleSheet,
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

import { connect } from 'react-redux'
import { navigateTo } from '@shoutem/core/navigation';
import { bindActionCreators } from 'redux';
import { ext } from '../const';

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
          <Overlay styleName="dark">
            <Image source={% raw %}{{ uri: restaurant.image }}{% endraw %}>
              <Title>{restaurant.name}</Title>
              <Subtitle>{restaurant.address}</Subtitle>
            </Image>
          </Overlay>
        </Tile>
      </TouchableOpacity>
    );
  }

  render() {
    this.props.setNavBarProps({
      centerComponent: <Text>RESTAURANTS</Text>
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

Upload your extension.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

This is how our `RestaurantsList` looks like now:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-list.png'/>
</p>

The result is stunning! With such a little change, we got an amazing app! Notice also that we didn't need to add any style, but that default styling is included in the components. That's done with [@shoutem/theme](/docs/coming-soon) package.

Let's change our `RestaurantDetails` screen also.

```JSX{9-20,26-27,31-72}
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
    
    //we're making NavigationBar transparent
    setNavBarProps({ styleName: 'clear' });

    return (
      <ScrollView>
        <Image styleName="large-portrait" source={{ uri: restaurant.image }}>
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

Upload it.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

And this is our `RestaurantDetails` screen:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-details.png'/>
</p>

That's exactly what we wanted to get! Our app reached final look! However, our app is using static data. Every time we want a change, we need to update the version of extension. That would be a very long process. **Shoutem Cloud Storage** to the rescue!
