---
layout: doc
permalink: /docs/ui-toolkit/components/image-gallery
title: ImageGallery
section: UI toolkit
---

# ImageGallery

`ImageGallery` displays a set of zoomable, transformable images, as well as their titles and descriptions in horizontal pager.

## API

#### Props

* **data**: array
  - Array containing source URLs of the images that will be rendered by the component
* **selectedIndex**: number
  - Defines which index the horizontal pager starts at
* **renderImageOverlay**: function
  - Prop that renders the image overlay
* **onIndexSelected**: function
  - Callback function triggered when user swipes between images, returns index of newly selected image
* **renderPlaceholder**: function
  - Callback function that can be used to define a placeholder image

#### Style names

`ImageGallery` has no specific style names.

## Examples

<p class="image">
<img src='{{ site.url }}/img/ui-toolkit/image-gallery/image_gallery@2x.png' />
</p>

#### JSX declaration

```JSX
constructor(props) {
  super(props);

  this.state = {
    photos:
    [
      {
        "source": {
          "uri": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"
        },
        "title": "Gaspar Brasserie",
        "description": "Expect an intimate venue with the ambience of a private "
                       + "club. The mood is casual, the guests sublime."
      },
      {
        "source": {
          "uri": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg"
        },
        "title": "Chalk Point Kitchen",
        "description": "Stylish restaurant serving market-to-table American fare "
                       + "in modern farmhouse digs with cellar bar."
      },
      {
        "source": {
          "uri": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg"
        },
        "title": "Kyoto Amber Upper East",
        "description": "Amber Upper East is located on the corner of 80th and 3rd "
                       + "Avenue. We serve Japanese and Asian cuisines."
      }
    ]
  }
}

renderImageOverlay(photos) {

  return (
    <ImageGalleryOverlay
      styleName="full-screen"
      title={photos.title}
      description={photos.description}
    />
  );
}

render() {
  return (
    <Screen>
      <NavigationBar
        title="Image Gallery"
        styleName="inline"
      />
      <ImageGallery
        data={this.state.photos}
        selectedIndex={1}
        renderImageOverlay={this.renderImageOverlay}
      />
    </Screen>
  );
}
```
