---
layout: doc
permalink: /docs/ui-toolkit/animation/fade-out
title: FadeOut
section: Animation
---

# FadeOut

Fades out components wrapped by it.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components that will be affected by the animation
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`

***Usage:***

```javascript
const driver = new ScrollDriver();

return (
  <ScrollView
    {...driver.scrollViewProps}
  >
    <FadeOut
      driver={driver}
      inputRange={[100,150]}
    >
      <Image />
    </FadeOut>
  </ScrollView>
);
```

The above code will create a scroll dependent fade out animation over `Image` component from scroll 100 to scroll 150 where `Image` is opaque at scroll 100, and fully transparent at scroll 150.
