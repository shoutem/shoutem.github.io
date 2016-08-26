---
layout: doc
permalink: /docs/ui-toolkit/animation/zoom-in
title: ZoomIn
section: Animation
---

# ZoomIn

Zooms in components wrapped by it.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components that will be affected by the animation
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`
- `maxFactor`: Number, factor to which `children` components will be zoomed in

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

The above code will create a scroll dependent zoom in animation over `Image` component from scroll 100 to scroll 150 where `Image` has its original size at scroll 100, and is scaled by maxFactor at scroll 150.
