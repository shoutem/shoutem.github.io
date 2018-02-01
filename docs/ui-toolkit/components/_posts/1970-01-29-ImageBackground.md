---
layout: doc
permalink: /docs/ui-toolkit/components/image-background
title: ImageBackground
section: UI toolkit
---

# ImageBackground

This component is used when you need to nest other components within an `Image`.

## API

#### Props

`ImageBackground` has no specific (custom) Props, however, it supports every prop that the standard React Native `ImageBackground` component supports.

#### Style names

For all intents and purposes, the `ImageBackground` component behaves identically to the `Image` component as far as styling goes, with the exception of it not providing a way to set a `borderRadius` style prop, meaning that the `avatar` `styleName`s have no affect on it.

For most of the available `ImageBackground` style names, image dimensions are scaled depending on screen dimensions. For example, an `Image` with the `featured` style name applied will have dimensions of `365x345px (width, height respectively)` on a device with a screen width of `375px`. If the device's screen width is larger, then the image dimensions will be larger than 365x345px. The same rule applies with smaller screen widths.

* **featured**: width: `(365 / 375) * window.width` height: `(345 / 375) * window.width`
* **large**: width: `window.width` height: `(280 / 375) * window.width`
* **large-portrait**: width: `window.width` height: `(280 / 375) * window.width`
* **large-banner**: width: `window.width` height: `(200 / 375) * window.width`
* **large-square**: width: `window.width` height: `window.width`
* **large-wide**: width: `window.width` height: `(238 / 375) * window.width`
* **large-ultra-wide**: width: `window.width` height: `(130 / 375) * window.width`
* **medium**: width: `145px` x height: `92px`
* **medium-wide**: width: `(180/375)` height: `85px`
* **medium-square**: width: `145px` height: `145px`
* **medium-portrait**: width: `(209/375)` height: `139px`
* **small**: width: `65px` height: `65px`

## Examples

<p class="image">
<img src='{{ site.url }}/img/ui-toolkit/image-background/image-background.png'>
</p>

#### JSX declaration

```JSX
<Screen>
  <NavigationBar
    title="Restaurants"
    styleName="inline"
  />
  <ScrollView>
    <ImageBackground
      styleName="large"
      source={% raw %}{{{% endraw %} uri: 'https://shoutem.github.io/static/getting-started/restaurant-1.jpg' }}
    >
      <Tile>
        <Overlay>
          <Title styleName="md-gutter-bottom">Gaspar Brasserie</Title>
          <Caption>185 Sutter St, San Francisco, CA 94109</Caption>
        </Overlay>
      </Tile>
    </ImageBackground>
    <ImageBackground
      styleName="large"
      source={% raw %}{{{% endraw %} uri: 'https://shoutem.github.io/static/getting-started/restaurant-2.jpg' }}
    >
      <Tile>
        <Overlay>
          <Title styleName="md-gutter-bottom">Chalk Point Kitchen</Title>
          <Caption>527 Broome St, New York, NY 10013</Caption>
        </Overlay>
      </Tile>
    </ImageBackground>
    <ImageBackground
      styleName="large"
      source={% raw %}{{{% endraw %} uri: 'https://shoutem.github.io/static/getting-started/restaurant-3.jpg' }}
    >
      <Tile>
        <Overlay>
          <Title styleName="md-gutter-bottom">Kyoto Amber Upper East</Title>
          <Caption>225 Mulberry St, New York, NY 10012</Caption>
        </Overlay>
      </Tile>
    </ImageBackground>
  </ScrollView>
</Screen>
```
