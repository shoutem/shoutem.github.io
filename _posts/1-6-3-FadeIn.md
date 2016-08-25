---
layout: doc
permalink: /docs/ui-toolkit/animation/fade-in
title: FadeIn
section: Animation
---

# FadeIn

Fades in components wrapped by it.

**Properties:**

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`

***Usage:***

```javascript
const driver = new ScrollDriver();

return (
  <ScrollView
    {...driver.scrollViewProps}
  >
    <FadeIn
      driver={driver}
      inputRange={[100,150]}
    >
      <Image />
    </FadeIn>
  </ScrollView>
);
```

Above code will create scroll dependent fade in animation over `Image` component from scroll position 100, to scroll position 150 where `Image` is fully transparent at scroll position 100, and opaque at scroll position 150.