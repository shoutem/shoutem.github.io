---
layout: doc
permalink: /docs/ui-toolkit/components/touchable-opacity
title: Touchable Opacity
section: UI toolkit
---

# TouchableOpacity

TouchableOpacity is a React Native's `TouchableOpacity` with additional styling through Theme.  
Basically, it is a wrapper for making components respond properly to touches. On press down, the opacity of the wrapped component is decreased, dimming it. 
  
## TouchableOpacity
<br />

#### JSX Declaration
```JSX
<TouchableOpacity style="...">
    {...}
</TouchableOpacity>
```  
  
#### Props

* `TouchableOpacity` has the same props like React Native's `TouchableOpacity` component has (`onPress` etc)

#### Style

* `TouchableOpacity` has the same Style props like React Native's `TouchableOpacity` component has (`activeOpacity`)
* _Note that `activeOpacity` can also be set through Theme, and it defaults to 0.8._
