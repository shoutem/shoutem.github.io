---
layout: doc
permalink: /docs/ui-toolkit/components/spinner
title: Spinner
section: UI toolkit
---

# Spinner
There are two flavours of Spinner components in Shoutem UI toolkit

* `PlatformSpinner` 
* `FullScreenSpinner`  

---

## Spinner
`Spinner` is wrapper for `ProgressBarAndroid` and `ActivityIndicatorIOS` React Native components for Android and iOS, respectively, with special Shoutem scent.  

![alt text]({{ site.baseurl }}/img/ui-toolkit/spinner@2x.png "Spinner"){:.docs-component-image}

#### JSX Declaration
```JSX
<Spinner 
    style={...}
/>
```

#### Props

* None

#### Style
* **android**
  - Component is passing content from this Style Prop to Style prop of `ProgressBarAndroid` component
* **ios** 
  - Component is passing content from this Style Prop to Style prop of `ActivityIndicatorIOS` component 
 
---  
  
## FullScreenSpinner
FullScreenSpinner is a full screen variation of Spinner.   

![alt text]({{ site.baseurl }}/img/ui-toolkit/spinner@2x.png "Spinner"){:.docs-component-image}

#### JSX Declaration
```JSX
<FullScreenSpinner 
    style={...} 
/>
```

#### Props

* None

#### Style

* **container**
  - Style prop for `View` that is Parent container of `View` with `spinnerFrame`  

* **spinnerFrame**
  - Style prop for `View` container for `Spinner` component
