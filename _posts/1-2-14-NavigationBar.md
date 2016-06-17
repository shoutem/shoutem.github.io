---
layout: doc
permalink: /docs/ui-toolkit/navigation-bar
title: Navigation Bar
---

# NavigationBar

NavigationBar component is `Node` for `Navigator` React Native component. 
It provides a simpler way to use 3-column Navigation bar without reinventing the wheel.

## NavigationBar with the back arrow and action icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/navbar_sublevel_+_icon@2x.png "NavigationBar Sublevel + Icon"){:.docs-component-image}


#### JSX Declaration
```JSX
<NavigationBar
      backgroundImageURL={...}
      leftComponent={...}
      centerComponent={...}
      rightComponent={...}
      hasHistory={...}
      style={...}
/>
```

#### Props

* **backgroundImageURL** : Image source (uri:string)
  - Prop for setting the background image in NavigationBar
  
* **leftComponent** : object  
  - Prop that presents left component in `NavigationBar` (back button for example)

* **centerComponent** : object  
  - Prop that presents center component in `NavigationBar` (for example screen title)

* **rightComponent** : object
  - Prop that presents right component in `NavigationBar` (for example dropdown menu button)

* **hasHistory** : bool
  - If this Prop is set to `true`, leftComponent will become a back arrow and will trigger the `navigateBack` callback

* **navigateBack** : callback function
  - This callback is triggered after tapping the Back button if `hasHistory` Prop is set to `true`  

#### Style

* **backgroundImage**
  - Style prop for `Image` component that holds the background image. 
  
* **container**
  - Style prop for `View` that holds all components within `NavigationBar`
  
* **componentsContainer**
  - Style prop for `View` container that holds `leftComponent`, `centerComponent`, `rightComponent` objects
  
* **component**
  - Style applied to each Navigation component (left/right/center)
  
* **defaultBackButton**
  - Style applied to `Text` that holds `Back` string which is rendered if `hasHistory` Prop is set to true  
