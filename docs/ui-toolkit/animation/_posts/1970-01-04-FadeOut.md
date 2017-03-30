---
layout: doc
permalink: /docs/ui-toolkit/animation/fade-out
title: FadeOut
section: Animation
---

# FadeOut

Fades out components wrapped by it.

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
