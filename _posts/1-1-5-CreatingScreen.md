---
layout: doc
permalink: /docs/getting-started/creating-screen
---

# Creating Screen
<hr />

Screens are React components which are connected to Redux store, i.e. they have access to complete application's state. Let's create new screen:

```ShellSession
$ shoutem create screen RestaurantsList
`RestaurantsList` screen is created.
```

Shoutem CLI created `app/screens/` folder with `RestaurantList.js` file:

```javascript{2}
#file: app/screens/RestaurantList.js
import React, {
  Component,
  Text,
} from 'react-native';

class RestaurantsList extends Component {
  render() {
    return <Text>Hello World!</Text>
}

export default connect((state, ownProps) => state)(RestaurantsList)
```

In React, `Components` specify their UI in `render` method. On the other hand, [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) call connects component to application's state.

Screen needs to be exported in `app/screens/index.js` and it's a good practice to do so immediately:

```javascript{1,4-6}
#file: app/screens/index.js
import RestaurantsList from './screens/RestaurantsList';
import * as actions from './actions';

export const screens = {
  RestaurantsList,
};

export actions;

export const reducer = {};
```

Open `app/actions.js` and add the highlighted:

```javascript{1-7}
#file: app/actions.js
import { navigateTo } from 'shoutem/navigation';

export function openRestaurantsList() {
  return navigateTo({
    screen: 'developer.restaurants.RestaurantsList'
  })
}
```

Redux action `navigateTo`, provided by Shoutem, opens new screen in application. It accepts [Shoutem route object](/docs/coming-soon) as the only argument. Property `screen` holds an absolute reference for the screen that should be opened once shortcut is clicked. Since we exported name `RestaurnatList` inside `screens` exported object in `app/index.js`, our screen has `developer.restaurants.RestaurantsList` name. In this example, you need to replace `developer` with your developer name.

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Try now tapping to shortcut on the preview in [Shoutem Builder](/docs/coming-soon). 

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-hello-world.png'/>
</p>

Great! New screen is opened. Add static restaurants and ListView in screen. Start by importing [View](/docs/coming-soon), [ListView](/docs/coming-soon) and [Image](/docs/coming-soon) from React Native and [getAsset](/docs/coming-soon) helper function from `shoutem`, to allow us to retrieve image.

```javascript{4-6,8}
#file: app/screens/RestaurantsList.js
import React, {
  Component,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import { getAsset } from 'shoutem';
```

Define a method in `RestaurantsList` class that returns an array of restaurants. We prepared some data for you. Create `app/assets` folder, which will keep the assets for the application. Download [this](/docs/coming-soon) `JSON` and put it to `app/assets/data`. Data in the `JSON` represents restaurants that should be used in the app with the reference to images. Download [those](/docs/coming-soon) images and put them to `assets/img` folder. Now, back to defining a method in `RestaurantsList` that will get this data. We'll use the same `getAsset` function.


We filled out here some data for you, so you can actually see something inside.

```javascript{1-3}
#file: app/screens/RestaurantsList.js
getRestaurants() {
  return getAsset('data/restaurants');
}
```

Implement `render` method that will use `ListView`. `ListView` accepts 2 properties: `dataSource` and `renderRow` which defines function rendering each row in the `ListView` component.

Remove old `render` method and add these methods:

```JSX{1-13,16-22}
#file: app/screens/RestaurantsList.js
getDataSource(restaurants) {
  const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return dataSource.cloneWithRows(restaurants);
}

renderRow(restaurant, navigator) {
  return (
    <View>
      <Image source:{{ uri: getAsset(restaurant.image) }} />
      <Text>{restarant.name}</Text>
    </View>
  )
}

render() {
  const { navigator } = this.props;
  return (
    <ListView
      dataSource={this.getDataSource(this.getRestaurants())}
      renderRow={restaurant => this.renderRow(restaurant, navigator)}
    />
  )
}
```

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

`RestaurantsList` is now showing list of restaurants, just how we wanted.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-plain-list.png'/>
</p>

Try clicking on a row. Nothing happens! We want to open up a details screen when list row item is clicked. That's why we passed `navigator` to `renderRow` method. Add that screen:

```ShellSession
$ shoutem create screen RestaurantDetails
`RestaurantDetails` screen is created.
```

Open that screen when list item is touched. That's done via `TouchableOpacity`. Import it:

```javascript{7-8}
#file: app/screens/RestaurantsList.js
import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
```

And use it in `renderRow` method:

```JSX{3-14}
#file: app/screens/RestaurantsList.js
renderRow(restaurant, navigator) {
  return (
    <TouchableOpacity onPress={() => navigator.push({
        screen: 'developer.restaurans.RestaurantDetails',
        props: {
          restaurant, dispatch
        }
      })}>
      <View>
        <Image source:{{ uri: getAsset('img/restaurants.png') }} />
        <Text>{restaurant.title}</Text>
      </View>
    </TouchableOpacity>
  )
}
```

To `RestaurantDetails` screen, just copy the following code. There's nothing new in it, just using already shown React Native components with `Linking` to open browser.

```JSX
#file: app/screens/RestaurantDetails.js
import React, {
  Component,
  View,
  Image,
  Text,
} from 'react-native';
import { getAsset } from 'shoutem';

class RestaurantDetails extends Component {
  render() {
    const { restaurant } = this.props;
    return (
      <View>
        <Image source={getAsset(restaurant.image)} />
        <Text>{restaurant.description}</Text>
        <Text>LOCATION</Text>
        <Text>{restaurant.address}</Text>
        <Text>WEB</Text>
        <Text>{restaurant.url}</Text>
        <Text>E-MAIL</Text>
        <Text>{restaurant.email}</Text>
      </View>
    )
  }
}

export default connect((state, ownProps) => state)(RestaurantsDetails)
```

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

When you click on a row in list, this is what you get:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-plain-details.png'/>
</p>

We finished UI skeleton for our extension. But, it doesn't look as nice as we planned at the beginning. That's because we're using plain React Native components. `Shoutem UI toolkit to the rescue!`.
