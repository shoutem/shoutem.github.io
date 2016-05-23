---
layout: doc
permalink: /docs/getting-started/loading-data
---

# Loading Data
<hr />

Now that we have data on Shoutem server, let's load that data on our `RestaurantsList` screen. First, we need to define `reducer` which will define how the state of application should be changed on action. It also defines the initial state of the application. Create new folder `app/reducers` with `index.js` file.

We can have one big reducer which will manage whole application state, or more little reducers which will take care of different properties in the state. 

Shoutem framework has [reducers](/docs/coming-soon) for `data schemas` which will change the state when you use `actions` from Shoutem framework. Import these reducers.

```
import { storage, collection } from 'shoutem/reducers';
```

Reducer [storage](/docs/coming-soon) retrieves resources in dictionary while [collection](/docs/coming-soon) stores resources ID's in array so the order is maintained.

Make use of Redux's [combineReducers](http://redux.js.org/docs/api/combineReducers.html) to create one `Root reducer` from more Shoutem reducers. Remember how we're identifying extension parts: `developerName`.`extensionName`.`extensionPartName`. In this case, extension part we're talking about is data schema, specifically `Restaurants` schema.

```
import { combineReducers } from 'redux';

export default combineReducers({
  restaurants: storage('dev-name.restaurant-extension.Restaurants'),
  allRestaurants: collection('dev-name.restaurant-extension.Restaurants')
})
```

As usual, change `dev-name` to your change (do so on other places as well, we won't put mention it any more). Also, don't forget to update `index.js` file:

```
<span class="newCode">import reducer from './reducer';</span>
import RestaurantsList from './screens/RestaurantsList';
import * as actions from './actions';

export const screens = {
  RestaurantsList,
};

export actions;

<span class="newCode">export reducer;</span>
```

Use these reducers in _Restaurants_ `screen` to load data from server. Import `find` from `Shoutem actions` which will load restaurants data. Meanwhile data is fetched, we want to show `Spinner`.


<pre>
import { find } from 'shoutem/cms'; 
import { Spinner } from 'shoutem/views';
</pre>

Add `componentDidMount` React [component lifecycle method](https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount) as a place to fetch data. When fetching data, you need to specify which `data schema` should be filled.

<pre>
componentDidMount() {
  let { dispatch, restaurants } = this.props;
  if (!restaurants) {
    dispatch(find('dev-name.restaurant-extension.Restaurants'));
  }
}
</pre>

Now is the time to change how the `screen` is rendered.

<pre>
render() {
<span class="newCode">  const { restaurants } = this.props;
  return restaurants ?
    &lt;ListView
      dataSource={this.getDataSource(restaurants)}
      renderRow={restaurant => this.renderRow(restaurant)}
    /> :
    &lt;Spinner/>
}</span>
</pre>

Once restaurants are loaded, they will be present in application state. From application state, we want to take only restaurants data to this screen. Next time this screen gets active, there will be no need to fetch restaurants, because they will be already in state. 

<pre>
<span class="newCode">export default connect((state, ownProps) => ({
  restaurants: state['dev-name.restaurant-extension'].allRestaurants.map(key => 
    state['dev-name.restaurant-extension'].restaurants[key]); 
})(RestaurantsList)</span>
</pre>


<hr />

This is complete code that you should end up with:

<pre>
import React, {
  StyleSheet,
  Component,
  ListView,
} from 'react-native';

<span class="newCode">import { find } from 'shoutem/cms'; 
import { Spinner } from 'shoutem-ui';</span>

class RestaurantsList extends Component {
  getDataSource(restaurants) {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return dataSource.cloneWithRows(restaurants);
  }

  renderRow(restaurant) {
    return (
      &lt;Text>
        {restarant.name}
      &lt;/Text>
    )
  }

<span class="newCode">  componentDidMount() {
    let { dispatch, restaurants } = this.props;
    if (!restaurants) {
      dispatch(find('dev-name.restaurant-extension.Restaurants'));
    }
  }</span>

<span class="newCode">  render() {
    const { restaurants } = this.props;
    return restaurants ?
      &lt;ListView
        dataSource={this.getDataSource(restaurants)}
        renderRow={restaurant => this.renderRow(restaurant)}
      /> :
      &lt;Spinner/>
  }</span>
}

<span class="newCode">export default connect((state, ownProps) => ({
  restaurants: state['dev-name.restaurant-extension'].allRestaurants.map(key =>
    state['dev-name.restaurant-extension'].restaurants[key]); 
})(RestaurantsList)</span>
</pre>

See this in work:
```
shoutem upload
```

Data that you entered through `Content page` on builder is now visible in the application preview. 

However, we don't want only title to be visible in list, but also to show image of restaurants along the title. In addition to that we want row to be clickable and to lead to new Screen. We could do this in `renderRow` restaurant, but it's better practise to extract list row as compact and reusable component.

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/data-schemas"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/component">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>

