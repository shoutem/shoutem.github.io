---
layout: doc
permalink: /docs/ui-toolkit/animation/animations
title: Animation
---

# Animations
<hr />

When building an application, there is a need to create animations to enrich the user experience. Although React Native [provides a way](https://facebook.github.io/react-native/docs/animations.html) to implement arbitrary animations, it is not an easy task to do it, even for simple animations. That's where `@shoutem/animation` package comes in. Package contains **animation [components](#components)** that should be wrapped around components that you want to get animated and **[driver]**(#driver) that _drives_ the animation components.

##### Table of Contents  
  - [Driver](#driver)
  - [Animation components](#animation-components)
    - [FadeIn](#fadein)
    - [FadeOut](#fadeout)
    - [ZoomIn](#zoomin)
    - [ZoomOut](#zoomout)
    - [Parallax](#parallax)
    - [HeroHeader](#heroheader)
  - [Combining animations](#combining-animations)
  - [Coming soon](#coming-soon)

## Driver

Animation is driven by the `driver`. Driver encapsulates the creation of animation [input events](https://facebook.github.io/react-native/docs/animations.html#input-events), making React Native animations even more declarative. Drivers are attached to animation components which want to listen to specific driver inputs. For now, we're supporing only `ScrollDriver`, that binds scrolling of RN `[ScrollView](https://facebook.github.io/react-native/docs/scrollview.html)` to the attaching animation components. Binding is done via passing properties to `ScrollView`:

```
import React from 'react';
import { ScrollView } from 'react-native';
import { ScrollDriver } from '@shoutem/animation';


class Screen extends React.Component {
  render() {
    const driver = new ScrollDriver();

    return (
      <ScrollView {...driver.scrollViewProps}>
        {/* Pass driver to animation components */}
      </ScrollView>
    );
  }
}
```

More drivers are to [come soon](#coming-soon).

## Animation components

Any component can be animated just by wrapping it with animation components. Currently, `@shoutem/animation` includes these animation components:

- `FadeIn`
- `FadeOut`
- `ZoomIn`
- `ZoomOut`
- `Parallax`
- `HeroHeader`

and more are still [to come](#coming-soon).

### [FadeIn](#TODO-LinkToCode)

Fades in components wrapped by it.

**Properties:**

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`

***Usage:***

```
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

### [FadeOut](#TODO-LinkToCode)

Fades out components warped by it.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`

***Usage:***

```
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

Above code will create scroll dependent fade out animation over `Image` component from scroll 100, to scroll 150 where `Image` is opaque at scroll 100, and fully transparent at scroll 150.

### [ZoomIn](#TODO-LinkToCode)

Zooms in components warped by it.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`
- `maxFactor`: Number, factor to which `children` will be zoomed in

***Usage:***

```
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

### [ZoomOut](#TODO-LinkToCode)

Zooms out components warped by it.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `inputRange`: Array `[from, to]` including a `'from' animated value` and `'to' animated value`
- `maxFactor`: Number, factor to which `children` will be zoomed out

***Usage:***

```
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

Above code will create scroll dependent zoom out animation over `Image` component from scroll 100, to scroll 150 where `Image` is scaled by maxFactor at scroll 100, and has original size at scroll 150.
```

### [Parallax](#TODO-LinkToCode)

Adds parallax effect to its children components. By default children will by translated dependent on scroll speed, but you can pass extrapolation options to limit translation.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied
- `extrapolation`: Object, [extrapolation options](https://facebook.github.io/react-native/docs/animations.html#composing-animations) for parallax translation. By default, children will be translated by `scrollVector * (scrollSpeed - 1) * driver.value` where `scrollVector` is defined by scrolling direction
- `scrollSpeed`: Number, how fast passed children should scroll
- `insideScroll` Bool, Is parallax placed inside or outside of the `ScrollView`

***Usage:***

```
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

### [HeroHeader](#TODO-LinkToCode)

Adds a complex, premade animation to its children components.

***Properties:***

- `driver`: Driver that is running the animation
- `children`: Components to which an effect will be applied

***Usage:***

```
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


## Combining animations

Animations can be combined simply by wrapping each other. This is an example from open-sourced [Shoutem News](#todo) extension.

```
import React from 'react';
import { ScrollView } from 'react-native';
import {
  Screen,
  Title,
  Caption,
  Icon,
  Image,
  Overlay,
  RichMedia,
} from '@shoutem/ui';

import {
  HeroHeader,
  FadeOut,
  FadeIn,
  ZoomOut,
  ScrollDriver,
  Parallax,
} from '@shoutem/animation';

import {...}

class ArticleDetailsScreen extends React.Component {
  static propTypes = {...};

  shouldRenderNextArticle() {...}

  renderUpNext() {...}

  render() {
    const { article, setNavBarProps } = this.props;
    const driver = new ScrollDriver();

    setNavBarProps({...});

    return (
      <Screen styleName="full-screen">
        <ScrollView {...driver.scrollViewProps}>
          <HeroHeader driver={driver}>
            <Image styleName="large-portrait" source={{ uri: _.get(article, 'image.url') }}>
              <Overlay styleName="dark">
                <Parallax driver={driver} scrollSpeed={1.2}>
                <FadeIn driver={driver} inputRange={[-70, -50]}>
                  <FadeOut driver={driver} inputRange={[50, 200]}>
                    <Title styleName="centered">{article.title.toUpperCase()}</Title>
                    <Caption>
                      {article.newsAuthor}        {moment(article.timeUpdated).fromNow()}
                    </Caption>
                  </FadeOut>
                </FadeIn>
                </Parallax>
                <Icon name="down-arrow" styleName="scroll-indicator" />
              </Overlay>
            </Image>
          </HeroHeader>
          <Screen>
            <RichMedia
              body={article.body}
              attachments={article.attachments}
            />
            {this.shouldRenderNextArticle() && this.renderUpNext()}
          </Screen>
        </ScrollView>
      </Screen>
    );
  }
}

export default connect(...);
```


## Coming soon

We're working hard to open source more `animation components` and `drivers`, which are already helping us in many [Shoutem extensions](http://shoutem.github.io/docs/extensions/getting-started/introduction). Some of them are:

_Drivers:_
- `ComputionalDriver`
- `TimerDriver`
- `TouchDriver`

_Animation components:_
- `Slider`
- several `Transitions`

Stay tuned! :)