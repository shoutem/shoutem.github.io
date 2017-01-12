---
layout: doc
permalink: /docs/ui-toolkit/animation/parallax
title: Parallax
section: Animation
---

# Parallax

Adds parallax effect to its children components. The children are translated depending on the scroll speed by default, but you can pass extrapolation options to limit the translation.

<div class="video-screen">
  <video width="280" loop autoplay>
    <source src="/video/examples/01 parallax.mp4" type="video/mp4">
    <source src="/video/examples/01 parallax.webm" type="video/webm">
  </video>
</div>

## API

#### Props

- `driver`: Driver that is running the animation
- `children`: Components that will be affected by the animation
- `extrapolation`: Object, [extrapolation options](https://facebook.github.io/react-native/docs/animations.html#composing-animations) for parallax translation. By default, children will be translated by `scrollVector * (scrollSpeed - 1) * driver.value` where `scrollVector` is defined by scrolling direction
- `scrollSpeed`: Number, how fast will the children be translated
- `insideScroll` Bool, defines if the parallax placed is inside or outside of the `ScrollView`


## Example
<br />  
  
#### JSX declaration
```javascript
const driver = new ScrollDriver();

return (
  <ScrollView
    {...driver.scrollViewProps}
  >
    <Parallax
      driver={driver}
      scrollSpeed={2}
    >
      <Image />
    </Parallax>
    <Title>Title</Title>
  </ScrollView>
);
```

The above code will create a scroll dependent parallax animation over `Image` component where `Image` will be scrolled 2 times faster than `Title`.
