---
layout: doc
permalink: /docs/ui-toolkit/components/image-gallery
title: Image Gallery
section: UI toolkit
---

# ImageGallery

ImageGallery component renders a collection of `ImagePreview` components within `HorizontalPager`. Each preview component is rendered on a separate page.

## ImageGallery
![ImageGallery example]({{ site.baseurl }}/img/ui-toolkit/image-gallery/image_gallery@2x.png "ImageGallery"){:.docs-component-image}

#### JSX Declaration
```JSX
<ImageGallery
    data={...}
    height={...}
    width={...}
/>
```

#### Props

* **sources** : array  
  - Prop that defines source (array of URIs) of Images that will be rendered 

* **height** : number  
  - Prop that defines height of rendered Images 

* **width** : number  
  - Prop that defines width of rendered Image 
  
#### Style

* None
