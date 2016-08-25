---
layout: doc
permalink: /docs/ui-toolkit/animation/introduction
title: Introduction
section: Animation
---

# Animation
<hr />

When building an application, there is a need to create animations to enrich the user experience. Although React Native [provides a way](https://facebook.github.io/react-native/docs/animations.html) to implement arbitrary animations, it is not an easy task to do it, even for simple animations. That's where `@shoutem/animation` package comes in. Package contains **animation [components](#components)** that should be wrapped around components that you want to get animated and [**driver**](#driver) that _drives_ the animation components.

## Installation

Simply install it with:

```bash
npm install @shoutem/animation
```

##### Table of Contents  
  - [Introduction]({{ site.baseurl }}/docs/ui-toolkit/animation/introduction)
  - [Driver]({{ site.baseurl }}/docs/ui-toolkit/animation/driver)
  - Animation components
    - [FadeIn]({{ site.baseurl }}/docs/ui-toolkit/animation/fade-in)
    - [FadeOut]({{ site.baseurl }}/docs/ui-toolkit/animation/fade-out)
    - [ZoomIn]({{ site.baseurl }}/docs/ui-toolkit/animation/zoom-in)
    - [ZoomOut]({{ site.baseurl }}/docs/ui-toolkit/animation/zoom-out)
    - [Parallax]({{ site.baseurl }}/docs/ui-toolkit/animation/parallax)
    - [HeroHeader]({{ site.baseurl }}/docs/ui-toolkit/animation/hero-header)
  - [Combining animations]({{ site.baseurl }}/docs/ui-toolkit/animation/combining-animations)


## Coming soon

We're working hard to open source more `animation components` and `drivers`, which are already helping us in many [Shoutem extensions](http://shoutem.github.io/docs/extensions/getting-started/introduction). Some of them are:

**Drivers:**

- `ComputionalDriver`
- `TouchDriver`

<br />
**Animation components:**

- `Slider`
- several `Transitions`

<br />

Stay tuned!