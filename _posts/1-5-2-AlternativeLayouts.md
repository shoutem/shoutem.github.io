---
layout: doc
permalink: /docs/extensions/tutorials/alternativelayouts
title: Alternative layouts
section: Tutorials
---

# Alternative layouts
<hr />

Alternative layouts are very useful if you want let application owners to choose which layout they want to use in their app (e.g. for Political news they want to use layout with smaller images, but for Fashion they want to show large images). Additionally, by adding a little bit more logic, you can easily set A/B test where you test performance of one layout against another.

We’ll continue making an alternative layout on the Restaurants extension that is covered in [Getting started]({{ site.baseurl }}/docs/getting-started/introduction) tutorial. Int that tutorial we’ve created the app with onle list screen and one details screen and connected it to Shoutem CMS.

Now let’s add one additional screen that will represent an alternative layout that will feature a list with smaller images as shown on the image below:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/alternativelayouts/list-small.jpg'/>
</p>


Let’s create a new screen: 

```ShellSession
$ shoutem screen add RestaurantsSmallList
Enter screen information:
Title: Small list of restaurants

File `app/screens/RestaurantsSmallList.js` is successfully created.
```

<br/>
Check your extension.json now. New screen is added.

```json{20-22}
#file: extension.json
{
  "name": "restaurants",
  "title": "Restaurants",
  "version": "0.0.1",
  "description": "Show the cool restaurants!",
  "shortcuts": [
     {...}
  ],
  "screens": [{
    "name": "RestaurantsList",
    "Title":"List",
    "navigatesTo": [
      "DEVELOPER.restaurants.RestaurantsDetails"
    ]
  }, 
  {
    "name":"RestaurantsDetails",
    "title":"Detauls"
  },
  {
    "name":"RestaurantsSmallList"
  }
  ],
  "dataSchemas": [
    {
      "name": "Restaurants",
      "path": "server/data-schemas/Restaurants.json"
    }
  ]
}
```

<br/>
In order to get a list item with the small image we can extend `RestaurantsList` and override only the `renderRow` method. 
You can c&p code below to `RestaurantsSmallList`.


```javascript
#file: app/screens/RestaurantSmallList.js
import React, {
  Component
} from 'react';
import {
  TouchableOpacity
} from 'react-native';
import {
  Image,
  Row,
  View,
  Subtitle,
  Caption,
  Divider,
  Icon
} from '@shoutem/ui';
import {
  find,
  getCollection
} from '@shoutem/redux-io';
import { connect } from 'react-redux';
import { navigateTo } from '@shoutem/core/navigation';
import { bindActionCreators } from 'redux';
import { ext } from '../const';

import {
	RestaurantsList
} from './RestaurantsList';

class RestaurantsSmallList extends RestaurantsList {

  //only overriding the renderRow function
  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
          screen: ext('RestaurantDetails'),
          props: { restaurant }
        })}>
        <Row>
          <Image style={%raw%}{{width:90, height:70}}{%endraw%} source={%raw%}{{ uri: restaurant.image && restaurant.image.url }}{%endraw%} />
          <View styleName="vertical">
              <Subtitle>{restaurant.name}</Subtitle>
              <Caption>{restaurant.address}</Caption>
          </View>
          <Icon name="right-arrow" styleName="disclosure"/>
        </Row>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}

export default connect(
    (state) => ({
    restaurants: getCollection(state[ext()].allRestaurants, state)
  }),
     (dispatch) => bindActionCreators({ navigateTo, find }, dispatch)
)(RestaurantsSmallList);
```


<br/>
From the `RestaurantsList.js` we need to export class `RestaurantsList`.

```javascript{2}
#file: app/screens/RestaurantsList.js
...
export class RestaurantsList extends Component {
    componentDidMount() {...
```

<br/>
Last thing we need to do is export the `RestaurantsSmallList` in index.js. 

```javascript{7,12}
#file: app/index.js
// Constants `screens`, `actions` and `reducer` are exported via named export
// It is important to use those exact names

import reducer from './reducers';
import RestaurantsList from './screens/RestaurantsList.js';
import RestaurantDetails from './screens/RestaurantDetails';
import RestaurantsSmallList from './screens/RestaurantsSmallList';

export const screens = {
  RestaurantsList,
  RestaurantDetails,
  RestaurantsSmallList
};

export {reducer};
```

<br/>
In order for Shoutem Builder to know that there is an alternative screen to RestaurantsList we need to extend that screen in Extensions.json as well. It behaves the same way as extend in javascript does, inherits all properties from origin and overrides ones that we explicitly define. 
One more thing we’re missing are images that will represent these screens. You can download them [here]({{ site.baseurl }}/img/tutorials/alternativelayouts/images.zip) and add them to your server/assets/screens folder.

```json{4-5,15-17}
#file: extension.json
...  
"screens": [{
    "name": "RestaurantsList",
    "title":"List",
    "image":"./server/assets/screens/restaurants-list.png",
    "navigatesTo": [
      "DEVELOPER.restaurants.RestaurantsDetails"
    ]
  }, 
  {
    "name":"RestaurantsDetails"
  },
    {
    "name":"RestaurantsSmallList",
    "title":"Small list",
    "extends":"DEVELOPER.restaurants.RestaurantsList",
    "image":"./server/assets/screens/restaurants-smalllist.png"
  }
],
...
```

<br />
Once we have this set up, we need to add layout admin page to the list of admin pages. Add it to extension.json. 

```json{12-15}
#file: extension.json
  "shortcuts": [{
      "title": "Restaurants",
      "description": "Allow users to browse through list of restaurants",
      "name": "openRestaurantsList",
      "screen": "DEVELOPER.restaurants.openRestaurantsList",
      "adminPages": [{
        "page": "shoutem.admin.CmsPage",
        "title": "Content",
        "parameters": {
          "schema": "DEVELOPER.restaurants.Restaurants"
        }
      }, {
          "page":"shoutem.admin.LayoutPage",
          "title": "Layout"
      }]
  }],
```

<br />
Now, push the changes and reload page in Shoutem builder to see the Layout tab.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

<br />
Layout tab has appeared any by selecting Small ist and hitting on preview you should be able to see the new screen.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/alternativelayouts/builder-layout.png'/>
</p>


## What's next?

Apart from extensions, Shoutem has other products ready for boosting your mobile development. Check them out:

- [Build gorgeous apps with UI Toolkit]({{ site.baseurl }}/docs/ui-toolkit/introduction)
- [Use scalable Cloud Storage optimized for React Native apps]({{ site.baseurl }}/docs/coming-soon)

Good coding!
