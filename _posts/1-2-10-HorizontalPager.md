---
layout: doc
permalink: /docs/ui-toolkit/components/horizontal-pager
title: Horizontal Pager
section: UI toolkit
---

# HorizontalPager

Renders a horizontally swipable list of items (Pages) by using the provided renderPage function with data from provided dataSource (e.g. horizontal list of inline images)

## HorizontalPager
![HorizontalPager example]({{ site.baseurl }}/img/ui-toolkit/horizontal-pager/horizontal_pager@2x.png "HorizontalPager"){:.docs-component-image}

#### JSX Declaration
```JSX
<HorizontalPager
    bounces={...}
    data={...}
    onIndexSelected={...}
    onFullPageSelected={...}
    pageMargin={...}
    renderPage={...}
    selectedIndex={...}
    showNextPage={...}
    scrollEnabled={...}
/>
```

#### Props

* **bounces** : bool
  - Prop defining whether the Pager will bounce back when user tries to swipe beyond end of content (iOS only)

* **data** : array
  - Array of objects that will be passed to renderPage callback function

* **onIndexSelected(index: number)** : function  
  - Callback function called when user swipes between pages (images)

* **pageMargin** : number
  - Margin between pages (visible only when swiping)
  - Defaults to `0`

* **renderOverlay(selectedIndex: number, data: object)**: function
 - Callback function that can be used to render overlay over pages (such as page indicators using `PageIndicators` component)

* **renderPlaceholder** function
 - Callback function that can be used to define placeholder that appears when content is loading

* **renderPage(data: object)** : function  
  - Function that renders one Page

* **selectedIndex** : number
  - Initially selected page in Gallery

* **showNextPage** : bool
  - Prop that reduces page width by `pageMargin`, allowing 'sneak peak' of next page
  - Defaults to `false`

* **scrollEnabled**: bool
  - Prop that enables or disables swiping
  
* _Note that current page (Dot) indicators aren't implemented, yet_
