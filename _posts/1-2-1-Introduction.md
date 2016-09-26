---
layout: doc
permalink: /docs/ui-toolkit/introduction
title: Introduction
section: UI toolkit
---

# Introduction

![alt text]({{ site.baseurl }}/img/ui-toolkit/introduction@2x.jpg "UI toolkit"){:.docs-component-image}

Shoutem UI toolkit enables you to build professionally looking React Native apps with ease.  

It consists of three libraries: 

- @shoutem/ui: beautiful and customizable UI [components](http://shoutem.github.io/docs/ui-toolkit/components/typography)
- @shoutem/theme: “CSS-way” of styling the entire app with [themes](http://shoutem.github.io/docs/ui-toolkit/theme/introduction)
- @shoutem/animation: declarative way of applying ready-made [animations](http://shoutem.github.io/docs/ui-toolkit/theme/animation/introduction) 


## Prerequsites
Before starting make sure you have:

- Installed [node](https://nodejs.org/en/)
- Installed [npm](https://www.npmjs.com/)
- Installed [React Native](https://facebook.github.io/react-native/docs/getting-started.html)

## Installation

Create new React Native project:

```bash
$ react-native init HelloWorld
```

Install `@shoutem/ui` in your project:

```bash
$ react-native install @shoutem/ui
```

To check which components we have in UI toolkit, simply copy the following to your `index.ios.js` file of React Native project:

```JavaScript
#file: index.ios.js
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Examples } from '@shoutem/ui';

class HelloWorld extends Component {
  render() {
    return (
      <Examples />
    );
  }
}

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
```

To see other components, just import them from `@shoutem/ui` and render them.

You can also use standard React Native components in your layouts anywhere you want, but they will not inherit either the theme or the parent styles, so you will need to style them manually.

## Style names

Style names are similar to CSS classes. Once you apply specific `styleName`, it will inherit styling rules that are defined in Theme.

This section covers common style names that can be used in several UI toolkit components, and their variations.

### Size-based style name variations
* **sm-gutter** : small size, defaults to 5px.  
* **md-gutter** : medium size, defaults to 15px.  
* **lg-gutter** : large size, defaults to 30px.  
* **xl-gutter** : extra large size, defaults to 45px.  
  
> On `View`, `Tile` and `Overlay` components gutter is applied as padding, while on `Text` (Typography) and `Button` components gutter is applied as margin.    
    
If you want to apply gutter only to specific side of component (i.e. `right`), or to vertical sides, you can specify that by using additional position style name keywords listed below.

### Position based style name variations  
* **_size_-gutter-left** : gutter will be applied only to left side of targeted component.  
* **_size_-gutter-right** : gutter will be applied only to right side of targeted component.  
* **_size_-gutter-top** : gutter will be applied only to top side of targeted component.  
* **_size_-gutter-bottom** : gutter will be applied only to bottom side of targeted component.  
* **_size_-gutter-horizontal** : gutter will be applied only to horizontal sides (left and right) of targeted component.  
* **_size_-gutter-vertical** : gutter will be applied only to vertical sides (top and bottom) of targeted component.  

#### rounded-corners
- This style name applies border radius (defaults to 2 px) to targeted component.  

#### flexible
- This style name applies flexbox to targeted component, so that it fills parent container component.  

#### inflexible
- With this style name, component is sized according to its width/height properties, but makes it fully inflexible.  

#### collapsible
- This style name causes component to shrink if it overflows parent container.  

#### stretch
- This style name causes component to fully fill parent container.  
  
Below is one example where and how common Style names can be used:  
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
