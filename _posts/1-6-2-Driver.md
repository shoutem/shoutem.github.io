---
layout: doc
permalink: /docs/ui-toolkit/animation/driver
title: Driver
section: Animation
---

## Driver

Animation is driven by the `driver`. Driver encapsulates the creation of animation [input events](https://facebook.github.io/react-native/docs/animations.html#input-events), making React Native animations even more declarative. Drivers are attached to animation components which want to listen to specific driver inputs. For now, we're supporing only `ScrollDriver`, that binds scrolling of RN [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html) to the attaching animation components. Binding is done via passing properties to `ScrollView`:

```javascript
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