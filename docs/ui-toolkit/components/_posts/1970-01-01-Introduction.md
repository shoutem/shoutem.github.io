---
layout: doc
permalink: /docs/ui-toolkit/introduction
title: Introduction
section: UI toolkit
---

# Introduction

![UI toolkit]({{ site.url }}/img/ui-toolkit/introduction@2x.jpg "UI toolkit"){:.docs-component-image}

Shoutem UI toolkit enables you to build professionally looking React Native apps with ease.  

It consists of three libraries: 

- [@shoutem/ui](https://github.com/shoutem/ui): beautiful and customizable UI [components]({{ site.url }}/docs/ui-toolkit/components/typography)
- [@shoutem/theme](https://github.com/shoutem/theme): “CSS-way” of styling the entire app with [themes]({{ site.url }}/docs/ui-toolkit/theme/introduction)
- [@shoutem/animation](https://github.com/shoutem/animation): declarative way of applying ready-made [animations]({{ site.url }}/docs/ui-toolkit/animation/introduction) 


## Prerequisites
Before starting make sure you have:

- Installed [npm](https://www.npmjs.com/) (installed with [Node.js](https://nodejs.org/en/))
- Installed [React Native](https://facebook.github.io/react-native/docs/getting-started.html)

## Installation

Create new React Native project:

```bash
$ react-native init HelloWorld
$ cd HelloWorld
```

Install and link `@shoutem/ui` in your project:

```bash
$ npm install @shoutem/ui --save
$ react-native link
```

To check components in UI toolkit, simply copy the following to your `index.ios.js` file of React Native project:

```JavaScript
#file: index.ios.js
import React, { Component } from 'react';
import { Examples } from '@shoutem/ui';

export default class App extends Component<{}> {
  render() {
    return (
      <Examples />
    );
  }
}
```

Finally, run the app!

```bash
$ react-native run-ios
```

To see other components, import them from `@shoutem/ui` and render them.

You can also use standard React Native components in your layouts anywhere you want, but they will not inherit either the theme or the parent styles, so you will need to style them manually.

## Styling components

All components have default style defined by theme in [theme.js](https://github.com/shoutem/ui/blob/develop/theme.js) file in the root of `@shoutem/ui` package. Theme uses [styling rules]({{ site.url }}/docs/ui-toolkit/theme/introduction) interpreted by [@shoutem/theme](https://github.com/shoutem/theme) package.

Each component can be customized with React Native inline styles or by using `styleName` properties. Style name is similar to CSS class - it contains a set of styles that is applied to a component, defined in theme

Listed below are common style names that can be used in several UI toolkit components and their variations.

### Gutters

A gutter is an empty space between a component's boundaries and the component's content.

Set the same gutter for each side:

* **sm-gutter**: small size, defaults to 5px
* **md-gutter**: medium size, defaults to 15px
* **lg-gutter**: large size, defaults to 30px
* **xl-gutter**: extra large size, defaults to 45px
  
> On `View`, `Tile` and `Overlay` components, gutter is applied as padding, while on `Text` (Typography) and `Button` components gutter is applied as margin.    
    
Set the gutter for specific side:
 
* **_size_-gutter-left**: applied to the left side of component
* **_size_-gutter-right**: applied to the right side of component
* **_size_-gutter-top**: applied to the top side of component
* **_size_-gutter-bottom**: applied to the bottom side of component
* **_size_-gutter-horizontal**: applied to horizontal sides (left and right) of component
* **_size_-gutter-vertical**: applied only to vertical sides (top and bottom) of component

### Other common style names

* **rounded-corners**: applies border radius (defaults to 2 px) to component
* **flexible**: applies `flexbox` to component so it fills parent container component
* **inflexible**: component is sized according to its width/height properties but completely inflexible
* **collapsible**: causes the component to shrink if it overflows parent container
* **stretch**: causes the component to fully fill parent container


### Example
  
Below is one example where and how common style names can be used:  
<br />  

#### JSX Declaration
```JSX
<Overlay>
  <Overlay styleName="collapsed"><Heading>-20%</Heading></Overlay>
  <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
  <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
  <Heading>$250.00</Heading>
  <Button styleName="md-gutter-top"><Icon name="cart" /><Text>ADD TO BASKET</Text></Button>
</Overlay>
```

Check [Shoutem Theme]({{ site.url }}/docs/ui-toolkit/theme/introduction "Shoutem Theme") to learn more about styling rules, style names and how to define your own style name.
