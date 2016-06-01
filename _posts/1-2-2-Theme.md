---
layout: doc
permalink: /docs/ui-toolkit/theme
---

# Theme

The React Native components style is usually defined as a static variable along with the component itself. This makes it easy to build self contained components that always look and behave in the same way. On the other hand, it complicates building themeable (or skinnable) components that could have multiple styles that can be customized without touching the component source code.

![alt text]({{ site.baseurl }}/img/ui-toolkit/theme.jpg "Theme"){:.docs-component-image}

This level of customization may not be necessary for all applications, but if this is something you need, you can read more about how we accomplished it in the rest of this chapter.

One of our main goals was to add support for themes to components with as little changes as possible to the components themselves. To add support for themes to your component, you only need to make two minor changes to it.

## Building themeable components
The main difference that you need to change is to start getting your style rules from the `props.style` property, instead of using the static variable defined alongside the component. You can define the default style of the component statically, in the same way as before, but you shouldn't use that property to get the actual style in runtime. This allows us to merge the default style with any theme style that may be active in the app, and provide the final style to components.

We will now demonstrate how simple it is to make an existing component themeable on an example. Let's start by implementing a simple component that has a static style:

```JavaScript
import React, { Component, Text, View } from 'react';
import { StyleSheet } from 'react-native';

export default class AvatarItem extends Component {
  render() {
    <View style={styles.container}>
      <Image style={styles.avatarImage} source="..." />
      <Text style={styles.title}>John Doe</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  title: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
  },
});
```

In order to support themes, we need to:

1. Replace the occurrences of `styles` with `this.props.style`
2. Connect the component to the theme

```JavaScript
import React, { Component, Text, View } from 'react';
import { connectStyle } from 'shoutem-theme';

class AvatarItem extends Component {
  render() {
    // connect styles to props.style defined by the theme
    const styles = this.props.style;
    <View style={styles.container}>
      <Image style={styles.avatarImage} source="..." />
      <Text style={styles.title}>John Doe</Text>
    </View>
  }
}

const styles = {
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  title: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
  },
};

// connect the component to the theme
export default connectStyle('AvatarItem', styles)(AvatarItem);
```

The `connectStyle` function receives two arguments, the first one represents the name that this component will be referenced by in the theme, and the second one is the default component style.

Any styles defined in the theme will be merged with the default style, and theme rules will override the rules from the default style. The style that is sent to `connectStyle` shouldn't be created using the `StyleSheet.create`. Style sheet will be created by the `connectStyle` function at appropriate time.

## Initialize the style provider 
With those simple changes, we have a component that can receive styles from the outside. The only other thing that we need to do is initialize the style provider in the app, so that theme styles are correctly distributed to components. To do this, we need to initialize the `StyleProvider` component, and render any themeable components within it:

```JavaScript
import React, { Component } from 'react';
import { StyleProvider } from 'shoutem-theme';

class App extends Component {
  render() {
    <StyleProvider theme={theme}>
      // any app components
    </StyleProvider>
  }
}

const theme = {
  AvatarItem: {
    // overrides AvatarItem component style...
  },
};
```


## Theme style rules 
All styles defined as part of the theme may be regular React Native styles, but there are several new types of style rules that are supported in themes as well. We will explain all those rules on the Card component from the UI toolkit:

![alt text]({{ site.baseurl }}/img/ui-toolkit/card@2x.png "Card grid item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Card>
  <Image styleName="banner" source="..." />
  <View styleName="card-content">
    <Subtitle lines=4>Lady Gaga Sings National Anthem at Super Bowl 50</Subtitle>
    <Divider styleName="empty" />
    <Caption>21 hours ago</Caption>
  </View>
</Card>
```

#### Style
```JavaScript
{
  // card component variants
  '.dark': {
    backgroundColor: '#000'
  },

  '.light': {
    backgroundColor: '#fff'
  },

  // style variant available to child components of any type
  '*.card-content': {
    padding: 15
  },

  // style that will be applied to all child image components
  'shoutem.ui.Image': {
    flex: 1,
    resizeMode: 'cover',
  },

  // style variant available to child image comoponents
  'shoutem.ui.Image.banner': {
    height: 85
  },

  // default card style, we usually place these rules at the bottom
  backgroundColor: '#fff',
  borderRadius: 2,

  // card shadow style
  shadowColor: 'black',
  shadowRadius: 9,
  shadowOpacity: 0.3,
  shadowOffset: { width: 5, height: 7 }
}
```

## Default component style 
At the bottom of the style object is the default component style. This style will always be applied as a base style to all cards. After that, any theme style will be merged with that style, i.e., the theme style rules will override the base component rules. In the end, any style specified through the `style` prop directly on the component will be merged on top of the styles mentioned above to get the final component style.

Rules above the default component style are the new rule types that are specific to theme styles.

## Component variants 
The `.dark`, and `.light` rules are card variants that can be activated by using the `styleName` prop on the card component. For example, a card with a dark variant would look like this:

```JSX
<Card styleName="dark">
   ...
</Card>
```

## Style exposed to children 
The rest of the rules in the style object are rules that will be applied to child components of a card. Each of those rules has two components, the component type and the optional style name. The rule `*.card-content` will be available to child components of a card of any type. This rule can be applied to a child component by using the `styleName` prop, for example:

```JSX
<Card>
  <View styleName="card-content">
    ...
  </View>
</Card>
```

The remaining two rules will be applied only to images. `shoutem.ui.Image` will be applied to all `Image` components added to a card, and the rule `shoutem.ui.Image.banner` will be applied to all images with a `styleName="banner"` prop.
