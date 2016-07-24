---
layout: doc
permalink: /docs/ui-toolkit/image-preview
title: Image Preview
section: UI toolkit
---

# ImagePreview

ImagePreview component renders Image in inline image preview. When clicked, image is displayed in full screen.  

## ImagePreview
![alt text]({{ site.baseurl }}/img/ui-toolkit/image_preview@2x.png "ImagePreview"){:.docs-component-image}

#### JSX Declaration
```JSX
<ImagePreview
    imageURL={...}
    height={...}
    width={...}
/>
```

#### Props

* **imageURL** : Image URL  
  - Prop that defines URL of Image that will be rendered 

* **height** : number  
  - Prop that defines height of rendered Image

* **width** : number  
  - Prop that defines width of rendered Image 
  
#### Style

* **closeIcon**
  - Style prop for `Icon` component that holds Icon for closing the full-screen Image view

* **container** 
  - Style prop for container that holds the image

* **fullscreen**
  - Style prop for `TouchableOpacity` component that holds `View` component with `closeIcon` style applied
  
* **header** 
  - Style prop for `View` component that holds `TouchableOpacity` component 

* **image** 
  - Style prop for `Image` component when the image is rendered in full screen 
