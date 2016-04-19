---
layout: doc
permalink: /docs/getting-started/component
---

# Component
<hr />

Components are UI parts of which screen consists of. You can make your custom component with:

```
shoutem component RestaurantRow
```

New file `RestaurantsRow.js` is created in the new folder `/app/components`, default folder for components. Components is not something we want to export, so no need to modify `app/index.js`.

As we said, we want this component to be clickable. Import [TouchableOpacity](TODO) from React Native which will listen to touch on wrapped component.

```
import React, {
  Component,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
```

RestaurantsRow component is passed `restaurant` and `onPress` handler as `props`. To implement image in the view, we need to add image asset. Create `app/assets` folder which will hold `assets` used on application side for the extension. Save this picture as `restaurants.png` to `app/assets/img` folder: 

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/restaurant-photo.png'/>
</p>

[Download](http://shoutem.github.io/img/getting-started/restaurant-photo.png)

To get assets URL in application code, use `getAssset` function:

```
import { getAsset } from 'shoutem';
```

Let's now implement our how the component should be rendered:

```
render() {
  let { restaurant, onPress } = this.props;

  return (
    <TouchableOpacity onPress{onPress}>
      <View>
        <Image
          source:{{uri: getAsset('img/restaurants.png')}}
        />
        <Text>{restaurant.title}</Text>
      </View>
    </TouchableOpacity>
  )
}
```

Before we add this component to RestaurnatsList, create new screen that should be opened when restaurants row is clicked:

```
shoutem create screen --name RestaurantDetails
```

Add this component in `renderRow` method to _RestaurantsList_. When invoking _RestaurantsRow_ component, we will need to pass `restaurant` and `onPress` method. Method `onPress` needs to open new screen. That is done with React Native [navigator](https://facebook.github.io/react-native/docs/navigator.html#content) construct which is passed to every `screen` via `props`. Just call `navigator.push()` method with Shoutem [Route object](TODO) which accepts: screen property as constant and `props` that should be passed to new screen. We've already used Shoutem route object in shortcut `action` which we passed to `navigateTo` action.

Add this to _RestaurantsList_ screen:

<pre>
<span class="newCode">import RestaurantsRow from '../components/RestaurantsRow'; </span>

// Class declaration ...

renderRow(restaurant) {
<span class="newCode">  let { navigator } = this.props;
  return (
    &lt;RestaurantsRow
      restaurant
      onPress={() => navigator.push({
        screen: 'developer.restaurant-extension.RestaurantDetails',
        props: {
          restaurant, dispatch
        }
      })}
    /></span>
  )
}
</pre>

Check it with:

``` 
shoutem upload
```

Picture and title are be there. Clicking on row also opens new screen. 

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/restaurant-row-1.png'/>
</p>

However, list row doesn't look as we planned. We need to make use out of [Flexbox](https://facebook.github.io/react-native/docs/flexbox.html) and [style](TODO) from React Native. This is complete code what you should end up with:


<pre>
import React, {
  Component,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { getAsset } from 'shoutem';

export default class RestaurantsRow extends Component {
  render() {
    let { restaurant, onPress } = this.props;

    return (
<span class="newCode">      &lt;TouchableOpacity onPress{onPress}>
        &lt;View style={styles.container}>
          &lt;Image
            source:{{uri: getAsset('img/restaurants.png')}}
            style={style.picture}
          />
          &lt;View style={styles.rightContainer}>
            &lt;Text style={styles.title}>{restaurant.title}&lt;/Text>
          &lt;/View>
        &lt;/View>
      &lt;/TouchableOpacity></span>
    )
  }
}

<span class="newCode">var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  picture: {
    width: 53,
    height: 81,
  }
});</span>
</pre>

Do:
```
shoutem upload
```

That looks decent. 

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/restaurant-row-2.png'/>
</p>

Let's enrich our application a bit and implement RestaurantDetails screen.

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/loading-data"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/richer-app">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>
