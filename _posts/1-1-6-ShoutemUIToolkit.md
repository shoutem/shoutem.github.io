---
layout: doc
permalink: /docs/getting-started/shoutem-ui-toolkit
title: Using UI Toolkit
---

# Using UI Toolkit
<hr />

Shoutem UI Toolkit is a set of styleable UI components that you can use in any React Native application. It basically turns any ordinary app into an amazing app. There are plenty of components that you can use out of the box. In this tutorial we'll use `ListView`, `Tile`, `Image`, `Title`, `Subtitle`, `Row`, `View` and `Icon` from the UI Toolkit. Documentation for all the components can be found in the [reference]({{ site.baseurl }}/docs/ui-toolkit/introduction).

Up until now, we only used React Native components. Some of them, like `ListView`, have correspondent views in Shoutem UI Toolkit. Update `RestaurantsList` screen code so that it uses Shoutem UI components.

```JSX{4-10,27-32,41}
#file: app/screens/RestaurantsList.js
import React, {
  Component,
} from 'react';
import {
  Image,
  ListView,
  Tile,
  Title,
  Subtitle
} from '@shoutem/ui';
import { connect } from 'react-redux'
import { navigateTo } from '@shoutem/core';
import { bindActionCreators } from 'redux';
import { ext } from '../const';

class RestaurantsList extends Component {
  getRestaurants() {
    return require('../assets/data/restaurants.json');
  }

  renderRow(restaurant, navigateTo) {
    return (
      <TouchableOpacity onPress={() => navigateTo({
          screen: ext('RestaurantDetails'),
          props: { restaurant }
        })}>
        <Tile>
          <Image styleName="banner" source={`../${restaurant.image}`}>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Image>
        </Tile>
      </TouchableOpacity>
    )
  }

  render() {
    const { navigateTo } = this.props.actions;
    return (
      <ListView
        data={this.getRestaurants()}
        renderRow={restaurant => this.renderRow(restaurant, navigateTo)}
      />
    )
  }
}

export default connect(
  (state, ownProps) => state,
  (dispatch, ownProps) => {
    actions: bindActionsCreators([navigateTo], dispatch)
  })(RestaurantsList)
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

```JSX{4-11,17-50}
#file: app/screens/RestaurantDetails.js
import React, {
  Component
} from 'react';
import {
  Icon,
  Row,
  Subtitle,
  Text,
  Title,
  View
} from '@shoutem/ui';

export default class RestaurantDetails extends Component {
  render() {
    const { restaurant } = this.props;
    return (
      <View>
        <Image styleName="banner">
          <Title>{restaurant.name}</Title>
          <Subtitle>{restaurant.address}</Subtitle>
        </Image>
        
        <Row>
          <Icon iconName="laptop" />
          <View styleName="vertical">
            <Subtitle>Visit webpage</Subtitle>
            <Text>{restaurant.url}</Text>
          </View>
          <Icon iconName="disclosure" />
        </Row>

        <Row>
          <Icon iconName="pin" />
          <View styleName="vertical">
            <Subtitle>Address</Subtitle>
            <Text>{restaurant.address}</Text>
          </View>
          <Icon iconName="disclosure" />
        </Row>

        <Row>
          <Icon iconName="message" />
          <View styleName="vertical">
            <Subtitle>Email</Subtitle>
            <Text>{restaurant.email}</Text>
          </View>
        </Row>
      </View>
    )
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