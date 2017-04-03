---
layout: doc
permalink: /docs/extensions/tutorials/screen-layouts
title: Screen layouts
section: Tutorials
---

# Screen layouts
<hr />

Each screen can have multiple layouts. App owners can choose which screen layout they want to use in their app (e.g. for news from politics they might want to use layout with smaller images, and for fashion large images). As screen layouts are just plain screens, they can contain different logic than the screen they are altering and can be easily used for A/B testing.

We’ll create a different layout in the **Restaurants** extension from [Getting started]({{ site.url }}/docs/extensions/tutorials/getting-started) tutorial, which you can [get here](https://github.com/shoutem/extension-examples/tree/master/restaurants-getting-started). Restaurants extension has the `List` screen (for listing all the restaurants) and `Details` screen (for details of one particular restaurant).

Let’s add one additional screen that will represent an alternative layout for `List` screen with smaller images as shown on the image:

<p class="image">
<img src='{{ site.url }}/img/tutorials/screen-layouts/list-small.png'/>
</p>

Locate to the extension folder:

```ShellSession
$ cd restaurants
```

Create an additional screen:

```ShellSession
$ shoutem screen add SmallList
Screen `SmallList` is created in file `app/screens/SmallList.js`!
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Extend `List` screen and override its `renderRow` method. We're going to use the `Row` component from [UI toolkit]({{ site.url }}/docs/ui-toolkit/components/rows). This is the complete code for `SmallList.js` file with the main parts being highlighted.

```javascript{15-17,27-50}
#file: app/screens/SmallList.js
import React from 'react';
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
  List
} from './List';

import {
  find,
  getCollection
} from '@shoutem/redux-io';
import { connect } from 'react-redux';
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from '../extension';

export class SmallList extends List {

  // overriding the renderRow function
  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
          screen: ext('Details'),
          props: { restaurant }
        })}>
        <Row>
          <Image style={{width:90, height:70}} source={{ uri: restaurant.image && restaurant.image.url }} />
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
  { navigateTo, find }
)(SmallList);
```

Restaurants extension uses `CMS settings page`, so app owners can manage data in the app. Now we need to give them option to chose which layout they want to use. For that, we're going to use `layout settings page` from [shoutem-layouts](https://github.com/shoutem/extensions/tree/master/shoutem-layouts) extension.

Layout settings page resolves which screens have multiple layouts and shows the `layout selectors` for them. Example of 2 layout selectors for News RSS extension is shown in the image below.

<p class="image">
<img src='{{ site.url }}/img/tutorials/screen-layouts/news-rss-layouts.png'/>
</p>

For layout settings page to be able to resolve for which screens to show layout selectors, we need to add `extends` property to screens which are additional layouts, referencing the "default" layout. Screens layouts inherit all the properties from extending screen and can override them.

Reference layout settings page in shortcut `adminPages` and extend the screens in `extension.json`.

```JSON{9-10,15-17,30-33}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants",
  "screens": [{
    "name": "List",
    "title": "List with large images",
    "image": "./server/assets/large-image-list.png"
  }, {
    "name": "Details"
  }, {
    "name": "SmallList",
    "title": "List with small images",
    "image": "./server/assets/small-image-list.png",
    "extends": "@.List"
  }],
  "shortcuts": [{
    "name": "Restaurants",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants",
    "screen": "@.List",
    "adminPages": [{
      "page": "shoutem.cms.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "@.Restaurants"
      }
    }, {
      "page": "shoutem.layouts.LayoutPage",
      "title": "Layout"
    }]
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/data-schemas/Restaurants.json"
  }]
}
```

We also included additional properties like `title` and `image` to screens which will be shown in the layout selector, so they can look nicer. [Download this file]({{ site.url }}/static/screen-layouts/assets.zip) including screen images, extract the folder and place it in the `server` folder of the extension. Here you can find the [list]({{ site.url }}/docs/extensions/reference/extension) of all the available properties in `extension.json`. 

If we would want to show layout selector for `Details` screen, we would need to add `navigatesTo` property to the `List` screen. That way, layout settings page could calculate the screen hierarchy starting from the screen referenced in the shortcut. An example of this can be found in the [extension.json](https://github.com/shoutem/extensions/blob/master/shoutem-rss-news/extension.json) file of Shoutem News RSS extension.

Ok, now we're done! Let's push the extension.

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

> #### Note
> If you don't have this extension installed on any app, you can install with `shoutem install`. Add the screen through the builder, import the CSV file as described in the bottom of [Using cloud storage](/docs/extensions/my-first-extension/using-cloud-storage) chapter and run the preview.

Default layout will be the `List` screen. Switch to `Layout` and select **List with small images**. This is the result which you should get:

<p class="image">
<img src='{{ site.url }}/img/tutorials/screen-layouts/restaurants-small-list.png'/>
</p>

Great job! Now you know how to create additional layouts for your extension.

Since we built this extension, we can add additional layouts to it directly. However, sometimes we want to add additional layouts for extension from another developer - essentially to modify extensions. This is explained in [Modifying extensions]({{ site.url }}/docs/extensions/tutorials/modifying-extensions) tutorial.