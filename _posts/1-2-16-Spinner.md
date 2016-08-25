---
layout: doc
permalink: /docs/ui-toolkit/components/spinner
title: Spinner
section: UI toolkit
---

# Spinner
`Spinner` is styled wrapper for `ActivityIndicator` React Native component, with special Shoutem scent.  

## Spinner
![alt text]({{ site.baseurl }}/img/ui-toolkit/spinner/spinner@2x.png "Spinner"){:.docs-component-image}

#### JSX Declaration
```JSX
<Spinner 
    style={...}
/>
```

#### Props

* None

#### Style
* Component is passing content from this Style Prop to Style prop of `ActivityIndicator` component, with exception for
* **size** : string, `small` or `large` 
  - you can set size of the indicator.