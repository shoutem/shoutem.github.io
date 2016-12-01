---
layout: doc
permalink: /docs/ui-toolkit/components/inline-gallery
title: Inline Gallery
section: UI toolkit
---

# InlineGallery

InlineGallery component renders a collection of `Image` components within `HorizontalPager`. Each preview component is rendered on a separate page.

## InlineGallery
![Inline Gallery example (left image)]({{ site.baseurl }}/img/ui-toolkit/image-gallery/image_gallery@2x.png "InlineGallery"){:.docs-component-image}

#### JSX Declaration
```JSX
<InlineGallery
    data={...}
    onPress={...}
    onIndexSelected={...}
    renderOverlay={...}
    renderPlaceholder={...}
    selectedIndex={...}
    showNextPage={...}
    style={...}
    styleName={...}
/>
```

#### Props

* **data** : array of objects 
  - Prop that defines source array of Images that will be rendered 
  - Shape of single object in array ``` { source: { uri: string } ```

* **onPress** : function  
  - Callback function called when user taps on single item (image) in gallery

* **onIndexSelected(index: number)** : function  
  - Callback function called when user swipes between pages (images)

* **selectedIndex**: number
  - Initially selected page in Gallery

* **renderOverlay(selectedIndex: number, data: object)**: function
 - Callback function that can be used to render overlay over pages (such as page indicators using `PageIndicators` component)

* **renderPlaceholder** function
 - Callback function that can be used to define placeholder that appears when content is loading

* **showNextPage**: bool
  - Prop that reduces page width by `nextPageInsetSize` and `pageMargin` (defined in theme/style), allowing 'sneak peak' of next page
  - Defaults to `false`
  
#### StyleNames

Very similar to `Image` `styleNames`, with difference that `Image` width is not explicitly set, only height, depending on `Window` dimensions.  

* **large-wide** 
* **large-ultra-wide**

#### Style

* You can pass Style props to underlying `Image` component. 
