---
layout: doc
permalink: /docs/ui-toolkit/components/horizontal-pager
title: Horizontal Pager
section: UI toolkit
---

# HorizontalPager

Renders a horizontally swipable list of items (Pages) by using the provided renderPage function with data from provided dataSource (e.g. horizontal list of inline images)

## HorizontalPager
![alt text]({{ site.baseurl }}/img/ui-toolkit/horizontal-pager/horizontal_pager@2x.png "HorizontalPager"){:.docs-component-image}

#### JSX Declaration
```JSX
<HorizontalPager
    data={...}
    height={...}
    renderPage={...}
/>
```

#### Props

* **data** : array
  -  Array that will be passed to renderPage callback function

* **height** : number  
  - Prop defines height of items (Android only)

* **renderPage** : function  
  - Callback function that renders one Page
  
#### Style

* None
