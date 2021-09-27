---
layout: doc
permalink: /docs/extensions/tutorials/navigation-screen-decorators
title: Screen decorators
section: Tutorials
---

# Screen decorators

Another powerful tool at your disposal with the new platform is the ability to decorate all registered screens with some custom behaviour. Internally, this is most commonly used to replace any custom logic that depended on navigation actions middleware, but you can use it to deliver any kind of code that needs to affect screens globally.

A screen decorator in its nature is just a simple [HoC](https://reactjs.org/docs/higher-order-components.html) that wraps your screen with additional code. Good example of this can be seen in [shoutem.advertising](https://github.com/shoutem/extensions/blob/master/shoutem.advertising/app/services/withAdBanner.js) extension where we implement a screen decorator that renders ad banners on top of the screen, based on various parameters.

Once you write your decorator, you will need to register it, in order to be applied globally through the app. This is done in following way:


```JavaScript
import { Decorators } from 'shoutem.navigation';
import { withAdBanner } from './services';

Decorators.registerDecorator(withAdBanner);
```

This concludes the most notable or breaking changes that were introduced with the new platform. We encourage all developers to take a look at our [extensions repository](https://github.com/shoutem/extensions) that contains all of our extensions, rewritten to be compliant with the new navigation. It should be a great example on how to make use of the new functionalities, or just how to solve some familiar problems when it comes to creating good and meaningful navigation flows in your apps.

Lastly, we are thankful for any feedback or suggestions you may have in regards to the new additions. Feel free to contact us via our usual [channels](https://shoutem.com/about/contact-us/support/).
