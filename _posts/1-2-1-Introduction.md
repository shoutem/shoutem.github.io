---
layout: doc
permalink: /docs/ui-toolkit/introduction
title: Introduction
section: UI toolkit
---

# Introduction

![alt text]({{ site.baseurl }}/img/ui-toolkit/introduction.jpg "UI toolkit"){:.docs-component-image}

`@shoutem/ui` is a UI toolkit that enables you to build beautiful React Native apps by using our professionally designed UI components and themes. All components are built from the ground up to be both composable and [themeable]({{ site.baseurl }}//docs/ui-toolkit/theme/introduction). Each component has a predefined style within a theme and it's compatible with the rest of the toolkit, this makes it possible to build complex components that look great without the need to manually define complex styles.

## Prerequsites
Before start make sure you have:

- Installed [node](https://nodejs.org/en/)
- Installed [npm](https://www.npmjs.com/)
- Installed [rnpm](https://github.com/rnpm/rnpm)
- Installed [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- You've created a React Native project

## Installation

In your project install `@shoutem/ui`:

```bash
$ npm install @shoutem/ui
```
Then run `rnpm` to link fonts that toolkit is using.

```bash
$ rnpm link
```

To use it, simply import the desired components and start using them in your screens:

```JavaScript
import React, { Component } from 'react';
import { Tile, Subtitle, Caption } from '@shoutem/ui';

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
