---
layout: doc
permalink: /docs/ui-toolkit/animation/hero-header
title: HeroHeader
section: Animation
---

# HeroHeader

Adds a complex, premade animation to its children components.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied

***Usage:***

```javascript
const driver = new ScrollDriver();

return (
  <Screen styleName="full-screen">
    <HeroHeader driver={driver}>
        <Image />
    </HeroHeader>
    <ScrollView
      {...driver.scrollViewProps}
    >
      <Title>Title</Title>
    </ScrollView>
  </Screen>
);
```

Above code will create scroll dependent parallax animation over `Image` component where `Image` will be scrolled 1.5 times faster than `Title` and the `Image` will have a zoom in effect when the scroll reaches the top of the screen (on bounce).