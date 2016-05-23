---
layout: doc
permalink: /docs/getting-started/screen
---

# Creating Screen
<hr />

Screens are React components which are connected to Redux store, i.e. they have access to complete application's state. Let's create new screen:

```
shoutem screen RestaurantsList
```

Folder `app/screens/` was created with `RestaurantList.js` file:

```
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

Shoutem CLI, by default saves screens in `app/screens/` folder, but you can [configure it](/docs/coming-soon) to save it elsewhere. 

Notice `render` method. It's usual method which specifies how the `Component` should be rendered. On the other hand, [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) call is how we bind React and Redux and `connect` our component, `RestaurantsList` screen, to application's state.

When creating screen, it's good practice to immediately export it in `app/index.js`. Let's do that:

<pre>
<span class="newCode">import RestaurantsList from './screens/RestaurantsList';</span>
import * as actions from './actions';

<span class="newCode">export const screens = {
  RestaurantsList,
};</span>

export actions;

export const reducer = {};
</pre>

Open `app/actions.js` and add the highlighted:

<pre>
<span class="newCode">import { navigateTo } from 'shoutem/navigation';

export function openRestaurantsList() {
  return navigateTo({
    screen: 'dev-name.restaurant-extension.RestaurantsList'
  })
}</span>
</pre>

Redux action `navigateTo`, provided by Shoutem, opens new screen in application. Its argument is object ([Shoutem route object](/docs/coming-soon)) with property screen. Notice the value of `screen` property. That there is an identification for created screen. Since we're referencing screen here and not creating it, we're using absolute name. More over, some construct within the extension has it's own id defined by name of the property used in exporting object in `index.js`. Since we exported name `RestaurnatList` inside `screens` exporting object in `index.js`, our screen has `dev-name.restaurants-extension.RestaurantsList` name. In this example, you need to replace `dev-name` with your developer name.

Upload the extension:

```
shoutem upload
```

Try now tapping to shortcut on the preview in [Shoutem Builder](/docs/coming-soon). 

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/hello-world.png'/>
</p>

<br />

Great! New screen is opened. Add static restaurants and ListView in screen. Start by importing [ListView](/docs/coming-soon) from React Native.

<pre>
import React, {
  StyleSheet,
  Component,
<span class="newCode">  ListView</span>
} from 'react-native';
</pre>

Define a method in `RestaurantsList` class that returns array of restaurants.

<pre>
<span class="newCode">getRestaurants() {
  return [{
    name: 'Gurman's place'
  }, {
    name: 'Fish and Chips'
  }, {
    name: 'Thaitanic'
  }, { 
    name: 'Lord Of The Fries'
  }, {
    name: 'Vito's Pizza'
  }, {
    name: 'Noodle Bar'
  }];
}</span>
</pre>

Now we need to add rendering of `ListView` to our `render` method. `ListView` accepts 2 properties: `dataSource` for the ListView and `renderRow` which defines function for rendering each row in the `ListView` component.

Remove old `render` method and add these methods:

<pre>
<span class="newCode">getDataSource(restaurants) {
  const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return dataSource.cloneWithRows(restaurants);
}

renderRow(restaurant) {
  return (
    &lt;Text>
      {restarant.name}
    &lt;/Text>
  )
}</span>

render() {
  return (
    &lt;ListView
      dataSource={this.getDataSource(this.getRestaurants())}
      renderRow={restaurant => this.renderRow(restaurant)}
    />
  )
}</span>
</pre>

Method `getDataSource` is boilerplate from ListView that always needs to be defined, so we extracted it to method.

Upload the extension:

```
shoutem upload
```

`RestaurantsList` is now showing list of restaurants, just how we wanted. 

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/plain-list.png'/>
</p>

Now we want to use _Shoutem cloud!_ What about loading some data from Shoutem server that previously admin entered?

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/shortcut"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/data-schemas">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>
