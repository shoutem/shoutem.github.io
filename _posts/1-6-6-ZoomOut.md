---
layout: doc
permalink: /docs/ui-toolkit/animation/zoom-out
title: ZoomOut
section: Animation
---

# ZoomOut

Zooms out components wrapped by it.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components that will be affected by the animation
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`
- `maxFactor`: Number, factor to which `children` will be zoomed out

***Usage:***

```javascript
const driver = new ScrollDriver();

return (
  <ScrollView
    {...driver.scrollViewProps}
  >
    <ZoomOut
      driver={driver}
      inputRange={[100,150]}
      maxFactor={1.5}
    >
      <Image />
    </ZoomOut>
  </ScrollView>
);
```

The above code will create a scroll dependent zoom out animation over `Image` component from scroll 100 to scroll 150 where `Image` is scaled by maxFactor at scroll 100, and has its original size at scroll 150.
