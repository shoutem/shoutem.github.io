---
layout: doc
permalink: /docs/ui-toolkit/introduction
title: Introduction
---

# Introduction

![alt text]({{ site.baseurl }}/img/ui-toolkit/introduction.jpg "UI toolkit"){:.docs-component-image}

`shoutem-ui` is a UI toolkit that enables you to build beautiful React Native apps by using our professionally designed UI components. All our components are built from the ground up to be both composable and themeable. Each component has a predefined style that is compatible with the rest of the toolkit, this makes it possible to build complex components that look great without the need to manually define complex styles.

To accomplish all that, we have built support for themes on top of React Native style. Each component has a built in style that will be used by default, but if you decide to add themes to your app, our components will automatically pick up custom styles from the active theme. Themes are completely optional, all UI components can be styled as normal React Native components as well, by passing the custom style rules through the `style` prop.

You can find out more about themes [here]({{ site.baseurl }}/docs/ui-toolkit/theme).

## Installation

`shoutem-ui` is available on npm:

```bash
$ npm install shoutem-ui
```

To use it, simply import the desired components and start using them in your layouts:

```JavaScript
import React, { Component } from 'react';
import { Tile, Subtitle, Caption } from 'shoutem-ui';

class NewsItem extends Component {
  render() {
    return (
      <Tile>
        <Image source="..." />
        <Subtitle lines=2>When The Morning Dawns - DJ Silver Samples</Subtitle>
        <Caption>20 hours ago</Caption>
      </Tile>
    );
  }
}
```

You can also use standard React Native components in your layouts anywhere you wish, but they will not inherit either the theme or parent styles, so you will need to style them manually.
