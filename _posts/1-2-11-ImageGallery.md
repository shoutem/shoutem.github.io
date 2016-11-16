---
layout: doc
permalink: /docs/ui-toolkit/components/image-gallery
title: Image Gallery
section: UI toolkit
---

# ImageGallery

ImageGallery component renders a collection of transformable `Image` components within `HorizontalPager`, together with additional image info, such as image title and description (optional).
Transform options include pan, pinch to zoom, double tap to zoom-in or zoom-out. 

## ImageGallery
![ImageGallery example (right image)]({{ site.baseurl }}/img/ui-toolkit/image-gallery/image_gallery@2x.png "ImageGallery"){:.docs-component-image}

#### JSX Declaration
```JSX
<ImageGallery
    data={...}
    onIndexSelected={...}
    pageMargin={...}
    selectedIndex={...}
/>
```

#### Props

* **data** : array of objects 
  - Prop that defines source (array of objects) of Images that will be rendered 
  - Shape of single object in array ``` { source: { uri: string }, description: string, title: string } ```

* **onIndexSelected(index: number)** : function  
  - Callback function called when user swipes between pages (images)

* **pageMargin**: number
  - Margin between pages (visible only when swiping). Defaults to `0`
 
* **selectedIndex**: number
  - Initially selected page in Gallery

