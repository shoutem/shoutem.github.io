---
layout: doc
permalink: /docs/getting-started/ui-toolkit
---

# UI toolkit
<hr />

As we concluded in the previous chapter, our finished extension could look better, as we agreed on the beginning. Shoutem [UI toolkit](/docs/coming-soon), `shoutem-ui`, to the rescue! Let's remember what we want our final result to be:

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/restaurant-preview.png'/>
</p>

From the UI toolkit, we'll use `ListView`. Check it's [API reference](/docs/coming-soon).

<pre>
import React, {
  StyleSheet,
  Component
} from 'react-native';

import { find } from 'shoutem/cms';
<span class="newCode">import { Spinner, ListView } from 'shoutem-ui';</span>

class RestaurantsList extends Component {
  componentDidMount() {
    let { dispatch, restaurants } = this.props;
    if (!restaurants) {
      dispatch(find('dev-name.restaurant-extension.Restaurants'));
    }
  }

  render() {
<span class="newCode">    const { restaurants, navigator } = this.props;
    return restaurants ?
      &lt;ListView
        items={restaurants}
        titleProperty="name"
        description="address"
        image="image"
        onPress={() => navigator.push({
          screen: 'dev-name.restaurant-extension.RestaurantDetails',
          props: {
            restaurant, dispatch
          }
      /> :</span>
      &lt;Spinner />
  }
}

export default connect((state, ownProps) => ({
  restaurants: state['dev-name.restaurant-extension'].allRestaurants.map(key =>
    state['dev-name.restaurant-extension'].restaurants[key]); 
})(RestaurantsList)
</pre>

The code is much smaller, more understandable and the result is outstanding.

What we deleted:

- importing `ListView` from react-native
- `getDataSource` method
- `renderRow` metoda
- and `RestaurantRow.js` complete document

There are more than 30 components in `shoutem-ui` ready to be used. Use them to create beautiful apps!

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/missing-fields"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/publish">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>