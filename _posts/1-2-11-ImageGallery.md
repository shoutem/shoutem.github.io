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
    onModeChanged={...}
    selectedIndex={...}
    renderOverlay={...}
    renderPlaceholder={...}
/>
```

#### Props

* **data** : array of objects 
  - Prop that defines source (array of objects) of Images that will be rendered 
  - Shape of single object in array ``` { source: { uri: string }, description: string, title: string } ```

* **onIndexSelected(index: number)** : function  
  - Callback function called when user swipes between pages (images)
 
* **selectedIndex**: number
  - Initially selected page in Gallery

* **onModeChanged(mode: string)**: function
  - Triggered when user taps on single photo, or when user transforms (zooms etc.) image
  - Useful for hiding external controls (i.e. navigation bar)
  - Mode can be `gallery` or `imagePreview` 

* **renderOverlay(selectedIndex: number, data: object)**: function
 - Callback function that can be used to render overlay over pages (such as page indicators using `PageIndicators` component)

* **renderPlaceholder** function
 - Callback function that can be used to define placeholder that appears when content is loading