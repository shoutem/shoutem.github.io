---
layout: doc
permalink: /docs/getting-started/final-polishing
---

# Final polishing
<hr />

Extension we've built until now is cool, but we want to add extra fields in data and show them on DetailsScreen. We also don't want to show only same photo when rendering row.

First, let's add new fields to our `Restaurants` schema:

<pre>
{
  "name": "Restorants",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Name",
      "type": "string"
    },
<span class="newCode">    "url": {
      "format": "uri",
      "title": "Restorant's website",
      "type": "string"
    },
    "description": {
      "format": "html",
      "title": "Description",
      "type": "string"
    },
    "image": {
      "format": "image",
      "title": "Image",
      "type": "object"
    },
    "mail": {
      "format": "single-line",
      "title": "Restaurant's e-mail",
      "type": "string"
    }</span>
  },
  "title": "Restorant",
  "titleProperty": "name",
  "type": "object"
}
</pre>

You can browse [complete list](TODO) of Shoutem types that you can put in restaurant.

Do 
```
shoutem upload
```

You can see that on `Content page` old data that you entered is still there. That's because we left `name` property. 

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/cms-restaurants-details.png'/>
</p>

Fill other fields now. Once you're done, render restaurant that gets passed to _RestaurantDetails_ screen.

```
import React, {
  StyleSheet,
  Component,
  Image,
  Linking,
} from 'react-native';

class RestaurantsDetails extends Component {
  render() {
    const { restaurant } = this.props;
    return (
      <View>
        <Image
          soure:{{uri: restaurant.image}} />
        <Text>
          {restaurant.description}
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(restaurant.url)}>
          <Text>
            {"Website"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(restaurant.mail)}>
          <Text>
            {"Send mail"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect((state, ownProps) => state)(RestaurantsDetails)
```

The last thing we want to do is to dynamically load image in `RestaurantsRow` component.


<pre>
render() {
  let { restaurant, onPress } = this.props;

  return (
    &lt;TouchableOpacity onPress{onPress}>
      &lt;View style={styles.container}>
<span class="newCode">       &lt;Image
          source:{{uri: getAsset(restaurant.image)}}
          style={style.picture}
        /></span>
        &lt;View style={styles.rightContainer}>
          &lt;Text style={styles.title}>{restaurant.title}&lt;/Text>
        &lt;/View>
      &lt;/View>
    &lt;/TouchableOpacity>
  )
}
</pre>

Do:
```
shoutem upload
```

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/restaurant-list-and-details.png'/>
</p>

You finished your first extension! What's next?

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/component"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/publish">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>