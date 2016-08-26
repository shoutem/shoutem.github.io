---
layout: doc
permalink: /docs/ui-toolkit/components/touchable-opacity
title: Touchable Opacity
section: UI toolkit
---

# TouchableOpacity

TouchableOpacity is a React Native `TouchableOpacity`, with additional styling through Theme.  
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

* `TouchableOpacity` can receive same props like React Native `TouchableOpacity` component is receiving (`onPress` etc).  

#### Style

* `TouchableOpacity` can receive same Style props like React Native `TouchableOpacity` component is receiving (`activeOpacity`).
* _Note that `activeOpacity` can also be set through Theme, and it defaults to 0.8._
