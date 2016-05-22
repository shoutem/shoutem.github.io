---
layout: doc
permalink: /docs/user-data/adapt-ui
---

# Adapt UI

Before we start doing anything, let's update UI on restaurants details page. We need to add form to our page. We got introduced to some of the [Shoutem UI](TODO) components already in [Getting started](TODO). This time, we'll use [RatingStars](TODO) form.

<pre>
import React, {
  StyleSheet,
  Component,
  Image,
  Linking,
} from 'react-native';
<span class="newCode">import { RatingStars } from 'shoutem-ui';</span>

class RestaurantsDetails extends Component {
<span class="newCode">  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(points) {
    // We'll implement later
  }</span>

  render() {
    const { restaurant } = this.props;
    return (
      <View>
        <Image
          soure:{{uri: restaurant.image}} />
        <Text>
          {restaurant.description}
        </Text>
<span class="newCode">        <RatingStars
          points={[1, 2, 3, 4, 5]}
          description="Rate this restaurant!"
          submitText="Submit"
          onSubmit={this.handleSubmit}
          /></span>
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
</pre>

Check the [props section](TODO) for [RatingStars] component which explains which properties we can pass it to customize the component. Method `handleSubmit` we'll implement later.

`shoutem upload` it, add some Restaurant through the CMS and navigate into the details. It looks as follows:

TODO - add picture showing only rating form

Let's now adjust schemas by adding average points to `Restaurants` schema and implementing schema for restaurants ratings.
