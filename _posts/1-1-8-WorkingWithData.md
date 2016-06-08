---
layout: doc
permalink: /docs/getting-started/working-with-data
---

# Working with data
<hr />

Data on the Shoutem Cloud Storage needs to be fetched in the application. First, remove all static files from the extension, so we're sure that we're actually fetching data from the Shoutem Cloud Storage. Define `reducer` which will define how the state of the application should be changed on action. It also defines the initial state of the application. Create new folder `app/reducers` with `index.js` file.

We can have one big reducer which will manage whole application state, or more little reducers which will take care of different properties in the state. 

`shoutem-cloud` package has [reducers](/docs/coming-soon) for `data schemas` which will change the state when you use `actions` from Shoutem framework. Import these reducers.

```javascript
#file: app/reducers/index.js
import { storage, collection } from 'shoutem-cloud';
```

Reducer [storage](/docs/coming-soon) retrieves resources in dictionary while [collection](/docs/coming-soon) stores resources ID's in array so the order is maintained. Make use of Redux's [combineReducers](http://redux.js.org/docs/api/combineReducers.html) to create one `Root reducer` from more Shoutem reducers. 

```javascript{2-7}
#file: app/reducers/index.js
import { storage, collection } from 'shoutem-cloud';
import { combineReducers } from 'redux';

export default combineReducers({
  restaurants: storage('developer.restaurants.Restaurants'),
  allRestaurants: collection('developer.restaurants.Restaurants')
})
```

As usual, change `developer` to yours. This root reducer needs to be exported in `app/index.js` file:

```javascript{1,11}
import reducer from './reducer';
import RestaurantsList from './screens/RestaurantsList';
import * as actions from './actions';

export const screens = {
  RestaurantsList,
};

export actions;

export reducer;
```

The only thing left to do is to fetch data from `Shoutem Cloud` on `RestaurantsList` screen and to retrieve those data, in form of restaurants, from application's state. Meanwhile data is fetched, we'll show `Spinner` view from `shoutem-ui`.

```JSX{10,12,14-19,40-47,49-52}
#file: app/screens/RestaurantsList.js
import React, {
  Component,
} from 'react-native';
import {
  ListView,
  Tile,
  Title,
  Subtitle,
  Image,
  Spinner
} from 'shoutem-ui';
import { find } from 'shoutem-cloud';

  componentDidMount() {
    let { dispatch, restaurants } = this.props;
    if (!restaurants) {
      dispatch(find('developer.restaurants.Restaurants'));
    }
  }

renderRow(restaurant, navigator) {
  return (
  <TouchableOpacity onPress={() => navigator.push({
    screen: 'developer.restaurants.RestaurantDetails',
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
  const { restaurants, navigator } = this.props;
  return restaurants ? 
    <ListView
      dataSource={restaurants}
      renderRow={restaurant => this.renderRow(restaurant, navigator)}
    /> :
    <Spinner/>
}

export default connect((state, ownProps) => ({
  restaurants: state['developer.restaurants'].allRestaurants.map(key =>
    state['developer.restaurants'].restaurants[key]); 
})(RestaurantsList)
```

Each screen can modify how it retrieve application's state in the `connect` method. If there are no restaurants, React Native lifecycle method `componentDidMount` will fetch the data from Shoutem Cloud by dispatching `find` method from `shoutem-cloud` package.

Let's check how it works:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Everything should work as charm!

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/working-with-data.png'/>
</p>

This is it! You've done it. You've just made your first extension using powerful services as `Shoutem UI toolkit` and `Shoutem Cloud Storage`. Well Done!
