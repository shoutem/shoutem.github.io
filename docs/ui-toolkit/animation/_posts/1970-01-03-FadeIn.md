---
layout: doc
permalink: /docs/ui-toolkit/animation/fade-in
title: FadeIn
section: Animation
---

# FadeIn

Fades in components wrapped by it.

<div class="video-screen">
  <video width="280" loop autoplay>
    <source src="/video/examples/03 fade in and out.mp4" type="video/mp4">
    <source src="/video/examples/03 fade in and out.webm" type="video/webm">
  </video>
</div>

## API

#### Props

- `driver`: Driver that is running the animation
- `children`: Components that will be affected by the animation
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`

## Example
<br />  
  
#### JSX declaration
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

The above code will create a scroll dependent fade in animation over `Image` component from scroll position 100 to scroll position 150 where `Image` is fully transparent at scroll position 100 and opaque at scroll position 150.
