---
layout: doc
permalink: /docs/ui-toolkit/components/image-preview
title: ImagePreview
section: UI toolkit
---

# ImagePreview

You can use `ImagePreview` to open a full screen modal with a zoomable image.

## API

#### Props

* **source**: string: Defines source image URL
* **width**: number: Defines image width
* **height**: number: Defines image height

> #### Note
> Width and Height must be defined, otherwise `ImagePreview` will not render.

#### Style names

`ImagePreview` has no specific style names.

## Examples

<p class="image">
<img src='{{ site.url }}/img/ui-toolkit/image-preview/image_preview@2x.png'/>
</p>

#### JSX declaration
```JSX
<Screen>
  <NavigationBar
    title="Preview"
    styleName="inline"
  />
  <ImagePreview
    source={% raw %}{{{% endraw %} uri: 'https://shoutem.github.io/static/getting-started/restaurant-1.jpg' }}
    width={375}
    height={375}
  />
</Screen>
```
