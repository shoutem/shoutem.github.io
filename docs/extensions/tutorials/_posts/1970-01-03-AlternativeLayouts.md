---
layout: doc
permalink: /docs/extensions/tutorials/alternative-layouts
title: Alternative layouts
section: Tutorials
---

# Alternative layouts
<hr />

Creating alternative layouts is a way to let app owners choose which screen layout they want to use in their app (e.g. for news from politics they might want to use layout with smaller images, and for fashion large images). As alternative layouts are just plain screens, they can contain different logic than the screen they are altering (called **original screen**) and can be easily used for A/B testing.

We’ll create an alternative layout in the **Restaurants** extension from [Getting started]({{ site.baseurl }}/docs/extensions/getting-started/introduction) tutorial, which you can [get here](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started). Restaurants extension has the `List` screen (for listing all the restaurants) and `Details` screen (for details of one particular restaurant).

Let’s add one additional screen that will represent an alternative layout for `List` screen with smaller images as shown on the image:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/alternative-layouts/list-small.png'/>
</p>

Download the open sourced extension and locate to it:

```ShellSession
$ cd restaurants-getting-started
```

Create an additional screen:

```ShellSession
$ shoutem screen add SmallList
Screen `SmallList` is created in file `app/screens/SmallList.js`!
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Extend `List` screen and override its `renderRow` method. We're going to use the `Row` component from [UI toolkit]({{ site.baseurl }}/docs/ui-toolkit/components/rows). This is the complete code for `SmallList.js` file with the main parts being highlighted.

```javascript
#file: app/screens/SmallList.js
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
	List
} from './List';

class RestaurantsSmallList extends List {

  //only overriding the renderRow function
  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
          screen: ext('Details'),
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

Restaurants extension uses `CMS settings page`, so app owners can manage data in the app. Now we need to give them option to chose which layout they want to use. For that, we're going to use `layout settings page` from [shoutem-layouts](https://github.com/shoutem/extensions/tree/master/shoutem-layouts) extension.

Layout settings page resolves which **original screens** have multiple layouts and shows the `layout selectors` for them. Multiple original screens can have different layouts. Example of 2 layout selectors for News RSS extension is shown in the image below.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/alternative-layouts/news-rss-layouts.png'/>
</p>

Since we built this extension, we can immediately add additional layouts to it directly. However

navigatesTo

Now we need to add layout settings page

/docs/extensions/tutorials/modifying-extensions

<br/>
From the `List.js` we need to export class `List`.

```javascript{2}
#file: app/screens/List.js
...
export class List extends Component {
    componentDidMount() {...
```

<br/>
Last thing we need to do is export the `RestaurantsSmallList` in index.js. 


<br/>
In order for Shoutem Builder to know that there is an alternative screen to List we need to extend that screen in Extensions.json as well. It behaves the same way as extend in javascript does, inherits all properties from origin and overrides ones that we explicitly define. 
One more thing we’re missing are images that will represent these screens. You can download them [here]({{ site.baseurl }}/img/tutorials/alternative-layouts/images.zip) and add them to your server/assets/screens folder.

```json{4-5,15-17}
#file: extension.json
...  
"screens": [{
    "name": "List",
    "title":"List",
    "image":"./server/assets/screens/restaurants-list.png",
    "navigatesTo": [
      "{{ site.example.devName }}.restaurants.Details"
    ]
  }, 
  {
    "name":"Details"
  },
    {
    "name":"RestaurantsSmallList",
    "title":"Small list",
    "extends":"{{ site.example.devName }}.restaurants.List",
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
      "name": "openList",
      "screen": "{{ site.example.devName }}.restaurants.openList",
      "adminPages": [{
        "page": "shoutem.admin.CmsPage",
        "title": "Content",
        "parameters": {
          "schema": "{{ site.example.devName }}.restaurants.Restaurants"
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
<img src='{{ site.baseurl }}/img/tutorials/alternative-layouts/builder-layout.png'/>
</p>


## What's next?

Apart from extensions, Shoutem has other products ready for boosting your mobile development. Check them out:

- [Build gorgeous apps with UI Toolkit]({{ site.baseurl }}/docs/ui-toolkit/introduction)
- [Use scalable Cloud Storage optimized for React Native apps]({{ site.baseurl }}/docs/coming-soon)

Good coding!
