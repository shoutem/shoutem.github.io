---
layout: doc
permalink: /docs/ui-toolkit/components/page-indicators
title: Page Indicators
section: UI toolkit
---

# PageIndicators

Renders a horizontally aligned list of dots (page indicators), which can be useful in `HorizontalPager`, `ImageGallery` or `InlineGallery` components

## PageIndicators
![PageIndicators example]({{ site.baseurl }}/img/ui-toolkit/horizontal-pager/horizontal_pager@2x.png "PageIndicators"){:.docs-component-image}

#### JSX Declaration
```JSX
<PageIndicators
    activeIndex={...}
    count={...}
    maxCount={...}
    style={...}
/>
```

#### Props

* **activeIndex** : bool
  - Number defining which page indicator will be rendered as active (selected)

* **count** : number
  - Number defining how many page indicators will be rendered

* **maxCount** : number
  - maxCount is defining highest number of page indicators that can be rendered
  - If `count` is higher than `maxCount` then `maxCount` number of indicators will be rendered
  - Defaults to 10

* **style** : object
  
