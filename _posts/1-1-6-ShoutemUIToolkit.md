---
layout: doc
permalink: /docs/getting-started/shoutem-ui-toolkit
---

# Using UI Toolkit
<hr />

Shoutem UI toolkit is a set of styleable UI components that you can use in any React Native application. It basically turns any ordinary app into an amazing app. There are plenty of components that you can use out of the box. In this tutorial we'll use `ListView`, `Tile`, `Image`, `Title`, `Subtitle`, `Row`, `View` and `Icon`. Documentation for all the components can be found in the [reference]({{ site.baseurl }}/docs/ui-toolkit/introduction).

Up until now, we only used React Native components. Some of them, like `ListView`, have correspondent views in Shoutem UI toolkit. Update `RestaurantsList` screen code so that it uses Shoutem UI components.

```JSX{4-10,24-29,38}
#file: app/screens/RestaurantsList.js
import React, {
  Component,
} from 'react-native';
import {
  ListView,
  Tile,
  Title,
  Subtitle,
  Image
} from 'shoutem-ui';</span>

  getRestaurants() {
    return getAsset('data/restaurants');
  }

renderRow(restaurant, navigator) {
  return (
  <TouchableOpacity onPress={() => navigator.push({
    screen: 'dev-name.restaurans.RestaurantDetails',
    props: {
      restaurant, dispatch
    }
  })}>
    <Tile>
      <Image styleName="banner" source={restaurant.image}>
        <Title>{restaurant.title}</Title>
        <Subtitle>{restaurant.address}</Subtitle>
      </Image>
    </Tile>
  <TouchableOpacity />
  )
}

render() {
  const { navigator } = this.props;
  return (
    <ListView
      dataSource={this.getRestaurants()}
      renderRow={restaurant => this.renderRow(restaurant, navigator)}
    />
  )
}
```

Upload your extension.

```
shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

This is how our `RestaurantsList` looks like now:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-list.png'/>
</p>

The result is stunning! With such a little change, we got an amazing app! Let's change our `RestaurantDetails` screen also.

```JSX{7-13,19-51}
#file: app/screens/RestaurantDetails.js
import React, {
  Component,
  View,
  Text,
  Linking,
} from 'react-native';
import {
  Row,
  Icon,
  View,
  Title,
  Subtitle
} from 'shoutem-ui';

class RestaurantsDetails extends Component {
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
          <<con iconName="pin" />
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
          <Icon iconName="disclosure" />
        </Row>
      </View>
    )
  }
}

export default connect((state, ownProps) => state)(RestaurantsDetails)
```

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

And this is our `RestaurantDetails` screen:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-rich-details.png'/>
</p>

That's exactly what we wanted to get! Our app reached final look! However, our app is using static data. Every time we want a change, we need to update the version of extension. That would be very long process. It would be better to use some CMS.