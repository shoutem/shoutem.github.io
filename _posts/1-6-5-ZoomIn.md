---
layout: doc
permalink: /docs/ui-toolkit/animation/zoom-in
title: ZoomIn
section: Animation
---

# ZoomIn

Zooms in components warped by it.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`
- `maxFactor`: Number, factor to which `children` will be zoomed in

***Usage:***

```javascript
const driver = new ScrollDriver();

return (
  <ScrollView
    {...driver.scrollViewProps}
  >
    <ZoomIn
      driver={driver}
      inputRange={[100,150]}
      maxFactor={1.5}
    >
      <Image />
    </ZoomIn>
  </ScrollView>
);
```

Above code will create scroll dependent zoom in animation over `Image` component from scroll 100, to scroll 150 where `Image` has original size at scroll 100, and is scaled by maxFactor at scroll 150.