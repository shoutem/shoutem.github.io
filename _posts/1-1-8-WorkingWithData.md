---
layout: doc
permalink: /docs/getting-started/working-with-data
title: Working with data
---

# Working with data
<hr />

Data on the Shoutem Cloud Storage needs to be fetched in the application. First, remove all static files from the extension, so we're sure that we're actually fetching data from the Shoutem Cloud Storage, i.e. remove assets folder. Define `reducer` which will define how the state of the application should be changed when action is dispatched and how the initial state should look like. Create new folder `app/reducers` with `index.js` file.

We can have one big reducer which will manage whole application state, or more little reducers which will take care of different properties in the state. 

Package `@shoutem/redux-io` has [reducers](/docs/coming-soon) and [actions](/docs/coming-soon) that communicate with Shoutem Cloud Storage. Import these reducers.

```javascript{1}
#file: app/reducers/index.js
import { storage, collection } from '@shoutem/redux-io';
```

Reducer [storage](/docs/coming-soon) retrieves resources in a dictionary while [collection](/docs/coming-soon) stores resources ID's in an array so that the order is maintained. Make use of Redux's [combineReducers](http://redux.js.org/docs/api/combineReducers.html) to create one **root reducer** from more Shoutem reducers. 

```javascript{2-8}
#file: app/reducers/index.js
import { storage, collection } from '@shoutem/redux-io';
import { combineReducers } from 'redux';
import { ext } from '../const';

export default combineReducers({
  restaurants: storage(ext('Restaurants')),
  allRestaurants: collection(ext('Restaurants'), 'all')
});
```

This root reducer needs to be exported in `app/index.js` file:

```javascript{1,10}
#file: app/index.js
import reducer from './reducers';
import RestaurantsList from './screens/RestaurantsList';
import RestaurantDetails from './screens/RestaurantDetails';

export const screens = {
  RestaurantsList,
  RestaurantDetails
};

export { reducer };
```

The only thing left to do is to fetch data from **Shoutem Cloud Storage** on `RestaurantsList` screen and to retrieve that data, in form of restaurants, from application's state. 

First we need to get the list of `restaurants` from `props` and bind it with the `ListView` component. Notice that `ListView` can show spinner while data is being loaded. 

```JSX{7-11,15-16}
#file: app/screens/RestaurantsList.js
  render() {
    // set the title in the Navigation bar
    this.props.setNavBarProps({
      title: 'RESTAURANTS'
    });
    
    // get list of restaurants from props
    const { restaurants } = this.props;
    
    // setup for showing loading indicator while loading data
    const { LOADING, IDLE } = ListView.Status;
    
    return (
      <ListView
        data={restaurants}
        status={isBusy(restaurants) ? LOADING : IDLE}
        renderRow={restaurant => this.renderRow(restaurant, navigateTo)}
      />
    );
  }
```

Notice we're using `isBusy` function. Let's import it as well.

```javascript{1-3}
#file: app/screens/RestaurantsList.js
import { 
  isBusy 
} from '@shoutem/redux-io';
```

Once screen is mounted, if restaurants are not in the Redux store, we'll start fetching data with [find](/docs/coming-soon) action creator from `@shoutem/redux-io` package.

```javascript{3}
#file: app/screens/RestaurantsList.js
import { 
  isBusy,
  find 
} from '@shoutem/redux-io';
```

Since `find` also needs to be dispatched, we'll bind it in the `mapDispatchToProps` function, 2nd argument of `connect` function.

```javascript{3}
#file: app/screens/RestaurantsList.js
export default connect(
  undefined,
    (dispatch) => bindActionCreators({ navigateTo, find }, dispatch)
  })(RestaurantsList);
```

Define a `Component` lifecycle method `componentDidMount` which will start fetching the restaurants.

```javascript{2-9}
#file: app/screens/RestaurantsList.js
class RestaurantsList extends Component {
  componentDidMount() {
    const { find, restaurants } = this.props;
    if (shouldRefresh(restaurants)) {
      find(ext('Restaurants'), 'all', {
          include: 'image',
      });
    }
  }
```

Finally, as we can see in `componentDidMount`, we want to have restaurants collection in the props. In `app/reducers/index.js` we defined that `restaurants` dictionary that will be fetched through `storage` and `allRestaurants` collection that will be fetched through `collection` reducer. We need to combine both to get an array with restaurants objects from dictionary. Do this with with `getCollection` method from `@shoutem/redux-io`. shouldrefresh... TBD

```javascript{4,5}
#file: app/screens/RestaurantsList.js
import {
  isBusy,
  find,
  getCollection,
  shouldRefresh
} from '@shoutem/redux-io';
```

Use that method in `mapStateToProps` function, 1st argument of `connect` function.

```javascript{2-4}
#file: app/screens/RestaurantsList.js
export default connect(
  (state) => ({
    restaurants: getCollection(state[ext()].allRestaurants, state)
  }),
  (dispatch) => bindActionCreators({ navigateTo, find }, dispatch)
)(RestaurantsList);
```

This is the final result of `RestaurantsList` screen that uses both Shoutem UI Toolkit and Shoutem Cloud Storage.

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
  Divider
} from '@shoutem/ui';

import {
  find,
  getCollection,
  shouldRefresh,
  isBusy,
} from '@shoutem/redux-io';

import { connect } from 'react-redux';
import { navigateTo } from '@shoutem/core/navigation';
import { bindActionCreators } from 'redux';
import { ext } from '../const';

class RestaurantsList extends Component {

  componentDidMount() {
    const { find, restaurants } = this.props;
    if (shouldRefresh(restaurants)) {
      find(ext('Restaurants'), 'all', {
          include: 'image',
      });
    }
  }

  renderRow(restaurant) {
 	  const { navigateTo } = this.props;

    return (
    	<TouchableOpacity onPress={() => navigateTo({
          screen: ext('RestaurantDetails'),
          props: { restaurant }
        })}>
  		  <Tile>
          <Image styleName="large-wide" source={% raw %}{{ uri: restaurant.image && restaurant.image.url }}{% endraw %}>
            <Overlay styleName="dark">
              <Title>{restaurant.name}</Title>
              <Subtitle>{restaurant.address}</Subtitle>
            </Overlay>
          </Image>
          <Divider styleName="line" />
        </Tile>
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
    
    //setup for showing loading indicator while loading data
    const { LOADING, IDLE } = ListView.Status;

    return (
      <ListView
        data={restaurants}
        status={isBusy(restaurants) ? LOADING : IDLE}
        renderRow={restaurant => this.renderRow(restaurant, navigateTo)}
      />
    );
  }
}

export default connect(
  (state) => ({
    restaurants: getCollection(state[ext()].allRestaurants, state)
  }),
  (dispatch) => bindActionCreators({ navigateTo, find }, dispatch)
)(RestaurantsList);

```

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

This is it! You've done it. You've just made your first extension using powerful services as **Shoutem UI Toolkit** and **Shoutem Cloud Storage**. Well Done!
