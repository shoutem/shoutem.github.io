---
layout: doc
permalink: /docs/ui-toolkit/animation/parallax
title: Parallax
section: Animation
---

# Parallax

Adds parallax effect to its children components. By default children will by translated dependent on scroll speed, but you can pass extrapolation options to limit translation.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `extrapolation`: Object, [extrapolation options](https://facebook.github.io/react-native/docs/animations.html#composing-animations) for parallax translation. By default, children will be translated by `scrollVector * (scrollSpeed - 1) * driver.value` where `scrollVector` is defined by scrolling direction
- `scrollSpeed`: Number, how fast passed children should scroll
- `insideScroll` Bool, Is parallax placed inside or outside of the `ScrollView`

***Usage:***

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

Above code will create scroll dependent parallax animation over `Image` component where image will be scrolled 2 times faster than `Title`.