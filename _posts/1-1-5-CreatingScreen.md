---
layout: doc
permalink: /docs/getting-started/creating-screen
title: Creating screen
---

# Creating screens
<hr />

Screens are React components which are connected to Redux store, i.e. they have access to complete application's state.

## Creating list screen

Let's create new screen.

```ShellSession
$ shoutem screen create RestaurantsList
File `app/screens/RestaurantsList.js` is created.
```

Shoutem CLI created `app/screens/` folder with `RestaurantsList.js` file:

```javascript
#file: app/screens/RestaurantList.js
import React, {
  Component
} from 'react';

import {
  Text,
} from 'react-native';

export default class RestaurantsList extends Component {
  render() {
    return (
      <Text>Hello World!</Text>
    );
  }
}
```

In React, `Components` specify their UI in `render` method.

Screen needs to be exported in `app/index.js` and it's a good practice to do so immediately:

```javascript{1,4-6}
#file: app/index.js
import RestaurantsList from './screens/RestaurantsList';
import * as actions from './action';

export const screens = {
  RestaurantsList,
};

export actions;

export const reducer = {};
```

Open that screen when `openRestaurantsList` action is triggered in `app/action.js`:

```javascript{2,9}
#file: app/action.js
import { navigateTo } from '@shoutem/core/navigation';
import { ext } from './const';

// Define your actions

// Shoutem specified actions
export function openRestaurantsList(shortcut) {
  return navigateTo({
    screen: ext('RestaurantsList')
  })
}
```

Redux action creator `navigateTo` opens new screen in application. It accepts [Shoutem route object](/docs/coming-soon) as the only argument. Property `screen` holds a reference for the screen that should be opened once shortcut is touched. To reference our `RestaurantsList` screen exported in `app/index.js`, we're using `ext` helper function that was created in `app/const.js` file. This function returns an **absolute name**, e.g. `developer.restaurants.RestaurantsList`, for the extension part which is passed as its first argument, or `extension name` if no argument is passed.

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Try now tapping to shortcut on the preview in [Shoutem Builder](/docs/coming-soon). 

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-hello-world.png'/>
</p>

Great! New screen is opened.

## Adding static data

Let's add static restaurants and `ListView` in screen. Start by importing [View](/docs/coming-soon), [ListView](/docs/coming-soon) and [Image](/docs/coming-soon) from React Native.

```javascript{4-9}
#file: app/screens/RestaurantsList.js
import React, {
  Component
} from 'react';
import {
  Text,
  View,
  ListView,
  Image
} from 'react-native';
```

Define a method in `RestaurantsList` class that returns an array of restaurants.

```javascript{1-3}
#file: app/screens/RestaurantsList.js
getRestaurants() {
  return require('../assets/data/restaurants.json');
}
```

We prepared some data for you. Create `app/assets` folder, which will keep the assets for application part of your extension. Download [this `zip`](/restaurants/restaurants.zip), extract it and copy its content to `app/assets`. It contains `data/restaurants.json` file with restaurants data.

Implement `render` method that will use `ListView`. `ListView` accepts 2 properties: `dataSource` and `renderRow` which defines function rendering each row in the `ListView` component.

Remove old `render` method and add these methods:

```JSX{1-13,16-27}
#file: app/screens/RestaurantsList.js
getDataSource(restaurants) {
  const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return dataSource.cloneWithRows(restaurants);
}

renderRow(restaurant) {
  return (
    <View>
      <Image style= {% raw %}{{ width: 70, height: 70 }}{% endraw %} source= {% raw %}{{ uri: restaurant.image }}{% endraw %} />
      <Text>{restaurant.name}</Text>
    </View>
  )
}

render() {
  
  //set the title in the Navigation bar
  this.props.setNavBarProps({
      centerComponent: <Text>RESTAURANTS</Text>,
  });

  return (
    <ListView
      dataSource={this.getDataSource(this.getRestaurants())}
      renderRow={restaurant => this.renderRow(restaurant)}
    />
  )
}
```

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

`RestaurantsList` is now showing list of restaurants. 

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-plain-list-without-jss.png'/>
</p>

It's not quite how we wanted it to look like - image and text are not aligned.

## Styling the screen

We need to add some styling with React Native. Import `StyleSheet` from React Native.

```javascript{2}
#file: app/screen/RestaurantsList.js
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
```

Define a `style` constant outside of the class definition.

```javascript{4-22}
#file: app/screen/RestaurantsList.js
import {...}
class RestaurantsList extends Component {...}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgb(242, 242, 242)'
  },
  title: {
    flex: 1,
  },
  thumbnail: {
    marginVertical: 10,
    marginHorizontal: 15,
    width: 50,
    height: 50
  }
});

```

And use this style in `renderRow` function:

```JSX{3-5}
#file: app/screen/RestaurantsList.js
renderRow(restaurant) {
  return (
    <View style={style.container}>
      <Image style={style.thumbnail} source={% raw %}{{ uri: restaurant.image }}{% endraw %} />
      <Text style={style.title}>{restaurant.name}</Text>
    </View>
  )
}
```

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

It looks how we wanted!

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-plain-list.png'/>
</p>

Try clicking on a row. Nothing happens! We want to open up a details screen when list row item is clicked.

## Creating details screen

First, create that screen:

```ShellSession
$ shoutem screen create RestaurantDetails
File `app/screens/RestaurantDetails.js` is created.
```

This creates the details screen in the `RestaurantDetails.js` file. Don't forget to export it in `index.js`.

``````JSX{2,7}
#file: app/index.js
import RestaurantsList from './screens/RestaurantsList';
import RestaurantDetails from './screens/RestaurantDetails';
import * as actions from './action';

export const screens = {
  RestaurantsList,
  RestaurantDetails
};

export { actions };

export const reducer = {};
```

We want to open this screen when the list item is touched. For that we will use another component called `TouchableOpacity`. Let's import it in `RestaurantsList.js`:

```javascript{7}
#file: app/screens/RestaurantsList.js
import {
  StyleSheet
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
```

To catch a tap on list row, we will use `TouchableOpacity` component. To open a screen on touch, we need to dispatch already introduced `navigateTo` Redux action creator. We can use it directly in the screen through dispatch, but Redux standard way is to bind together `dispatch` and action creator inside `mapDispatchToProps` function, the second argument of [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function.

Import `navigateTo` function from `@shoutem/core/navigation` along with `bindActionCreators` from Redux which will do the binding. We also need to specify which screens needs to be opened, so import `ext` function as well. This function resolves paths so you don't need to write full names of your screens. 

```javascript{1-4, 6}
#file: app/screens/RestaurantsList.js
import { connect } from 'react-redux';
import { navigateTo } from '@shoutem/core/navigation';
import { bindActionCreators } from 'redux';
import { ext } from '../const';

class RestaurantsList extends Component {...}

```

Note that we've also changed that the class `RestaurnatsList` is no longer exported. Instead we will export the `connect` function. Let's do the binding of this screen. Place following code at the end of file:

```javascript{2-5}
#file: app/screens/RestaurantsList.js

export default connect(
  undefined,
  (dispatch) => bindActionCreators({ navigation }, dispatch)
)(RestaurantsList)
```

We can access bound actions through the `props` and pass it to `renderRow` function. Let's add `TouchableOpacity` and connect it to `navigateTo` function.

```JSX{2,5-8,11,13}
#file: app/screens/RestaurantsList.js
  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
          screen: ext('RestaurantDetails'),
          props: { restaurant }
        })}>
        <View style={style.container}>
          <Image style={style.thumbnail} source={{ uri: restaurant.image }} />
          <Text style={style.title}>{restaurant.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    this.props.setNavBarProps({
      centerComponent: <Text>RESTAURANTS</Text>
    });

    return (
      <ListView
        dataSource={this.getDataSource(this.getRestaurants())}
        renderRow={restaurant => this.renderRow(restaurant)}
      />
    );
  }
```

This is what you should have end up with in `app/screens/RestaurantsList.js`:

```JSX
#file: app/screens/RestaurantsList.js
import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'
import { navigateTo } from '@shoutem/core/navigation';
import { bindActionCreators } from 'redux';
import { ext } from '../const';

class RestaurantsList extends Component {
  getRestaurants() {
    return require('../assets/data/restaurants.json');
  }

  getDataSource(restaurants) {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return dataSource.cloneWithRows(restaurants);
  }

  renderRow(restaurant) {
    const { navigateTo } = this.props;

    return (
      <TouchableOpacity onPress={() => navigateTo({
          screen: ext('RestaurantDetails'),
          props: { restaurant }
        })}>
        <View style={style.container}>
          <Image style={style.thumbnail} source={% raw %}{{ uri: restaurant.image }}{% endraw %} />
          <Text style={style.title}>{restaurant.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    this.props.setNavBarProps({
      centerComponent: <Text>RESTAURANTS</Text>
    });

    return (
      <ListView
        dataSource={this.getDataSource(this.getRestaurants())}
        renderRow={restaurant => this.renderRow(restaurant)}
      />
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
  },
  thumbnail: {
    marginVertical: 10,
    marginHorizontal: 15,
    width: 50,
    height: 50
  }
});

export default connect(
  undefined,
  (dispatch) => bindActionCreators({ navigation }, dispatch)
)(RestaurantsList)

```

To `RestaurantDetails` screen, just copy the following code. We're not introducing anything new, just using already shown React Native components. 

```JSX{6,9,10,13-61}
#file: app/screens/RestaurantDetails.js
import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

export default class RestaurantDetails extends Component {
  render() {
    const { restaurant, setNavBarProps } = this.props;

    //set the title in the NavigationBar
    setNavBarProps({
      centerComponent: <Text>{restaurant.name.toUpperCase()}</Text>
    });

    return (

      //use ScrollView to make entire view scrollable
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Image style={styles.image} source={% raw %}{{ uri: restaurant.image }}{% endraw %} />

          <Text style={styles.section}>{restaurant.description}</Text>

          <Text style={styles.section}>LOCATION</Text>
          <Text>{restaurant.address}</Text>

          <Text style={styles.section}>WEB</Text>
          <Text>{restaurant.url}</Text>

          <Text style={styles.section}>E-MAIL</Text>
          <Text>{restaurant.mail}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  image: {
    flex: 1,
    height: 340,
    resizeMode: 'cover',
  },
  section: {
    marginTop: 15,
  },
});

```

We'll skip implementing the handling of web and e-mail properties and just render them.

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

When you click on a row in the list, this is what you get:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/extension-plain-details.png'/>
</p>

We finished UI skeleton for our extension. But, it doesn't look as nice as we planned at the beginning. That's because we're using plain React Native components. **Shoutem UI Toolkit** to the rescue!.
