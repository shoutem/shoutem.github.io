---
layout: doc
permalink: /docs/ui-toolkit/components/inline-gallery
title: InlineGallery
section: UI toolkit
---

# InlineGallery

Renders a stylized horizontal pager.

## API

#### Props

* **data**: array  
  - Prop containing items that will be rendered by the InlineGallery component
* **onPress**: function
  - Callback function called when user swipes between images
* **onIndexSelected**: function
  - Currently selected image is passed to this callback
* **selectedIndex**: number
  - Sets the initially selected image in the gallery

#### Style names

* **large-banner**: width: `window.width` height: `(200 / 375) * window.width`
* **large-square**: width: `window.width` height: `window.width`
* **large-wide**: width: `window.width` height: `(238 / 375) * window.width`
* **large-ultra-wide**: width: `window.width` height: `(130 / 375) * window.width`

## Examples

<p class="image">
<img src='{{ site.url }}/img/ui-toolkit/inline-gallery/inline-gallery.png'/>
</p>

#### JSX declaration

```JSX
constructor(props) {
  super(props);

  this.state = {
    photos:
    [
      { "source": { "uri": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" } },
      { "source": { "uri": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" } },
      { "source": { "uri": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" } }
    ]
  }
}

render() {
  return (
    <InlineGallery
      styleName="large-wide"
      data={this.state.photos}
    />
  );
}
```
