---
layout: doc
permalink: /docs/ui-toolkit/components/touchable-opacity
title: Touchable Opacity
section: UI toolkit
---

# TouchableOpacity

TouchableOpacity is a React Native's `TouchableOpacity` with additional styling applied through Theme.  
Basically, `TouchableOpacity` is React-Native's [component](https://facebook.github.io/react-native/docs/touchableopacity.html "React Native TouchableOpacity component documentation") that responds to touches. Once the component is pressed, the opacity of the component within `TouchableOpacity` is decreased, dimming it.

## API

#### Props

* Supports every `Style` prop that the standard React Native `TouchableOpacity` component supports

### Style names

`TouchableOpacity` has no specific style names.

#### Style

* `TouchableOpacity` has the same Style props like React Native's `TouchableOpacity` component has (`activeOpacity`)
* _Note that `activeOpacity` can also be set through Theme, and it defaults to 0.8._

## Examples

### TouchableOpacity
<br />

#### JSX Declaration
```JSX
<TouchableOpacity style="...">
    {...}
</TouchableOpacity>
```
