---
layout: doc
permalink: /docs/extensions/tutorials/connecting-to-api
title: Connecting to Third Party API
section: Tutorials
---

# Connecting to Third Party API

Since Shoutem apps are plain React Native apps, you can connect to any API. It's very simple to do [networking in React Native](https://facebook.github.io/react-native/docs/network.html). Basically, React Native enables you to use [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) out of the box, a simple interface for communicating with API endpoints. If, however, you need something more sophisticated, you can use [Async Actions](https://github.com/reactjs/redux/blob/master/docs/advanced/AsyncActions.md) in Redux.

In this tutorial we'll explain how to build a simple React Native app fetching the photo of the day from [NASA's APOD API](https://api.nasa.gov/index.html). We'll also use the [Shoutem UI toolkit]({{ site.url }}/docs/ui-toolkit/introduction). Here's how the completed app should look:

<p class="image">
<img src='{{ site.url }}/img/tutorials/connecting-to-api/final.png'/>
</p>

The complete code for this extension is available in our [GitHub repository](https://github.com/shoutem/extension-examples/tree/master/connecting-to-3rd-party-api).

## Initialize the Extension

Shoutem apps are made of extensions, so start by creating a new extension.

```ShellSession
$ shoutem init nasa
Enter information about your extension. Press `return` to accept (default) values.

Title: NASA
Version: 0.0.1
Description: Photo of the day from Nasa
...
Extension initialized!
```

Switch over to the extension's folder:

```ShellSession
$ cd nasa
```

Create a new starting screen and shortcut:

```ShellSession
$ shoutem screen add PhotoDay --shortcut Photo
Enter shorcut information:
Title: Nasa Photo

Screen `PhotoDay` is created in file `app/screens/PhotoDay.js`!
Shortcut `Photo` is created!
Shortcut `Photo` opens `PhotoDay` screen.
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Push the extension to Shoutem:

```ShellSession
$ shoutem push
Uploading `NASA` extension to Shoutem...
Success!
```

Install that extension to a new app. You can do this through the Builder or directly through the CLI:

```ShellSession
$ shoutem install --new NasaApp
Installing `NASA` extension to the new app...
Extension successfully installed to the new app. Check it here:
{{ site.shoutem.builderURL }}/app/{{ site.example.appId }}
```

Once this is done, go to the [Builder]({{ site.shoutem.builderURL }}) and add the screen inside the app. Now you can preview the app:

<p class="image">
<img src='{{ site.url }}/img/tutorials/connecting-to-api/hello-world.png'/>
</p>

## Fetch the Photo

Now let's fetch the photo into the screen. We'll use the Fetch API from JavaScript. This is the complete code from `app/screens/PhotoDay.js`

```JavaScript
#file app/screens/PhotoDay.js

import React, {
  Component
} from 'react';

import {
  Screen,
  View,
  Image,
  Spinner,
  Tile,
  Title,
  Subtitle
} from '@shoutem/ui';

// public API, you can get yours on: https://api.nasa.gov
const apiKey = 'NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo';

// NASA photo API url
var photoUrl = "https://api.nasa.gov/planetary/apod";


export default class PhotoDay extends Component {
  state = {
    photo: null
  }

  componentDidMount() {
    fetch(photoUrl + '?api_key=' + apiKey, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((photo => {
        this.setState({ photo });
      }));
  }

  render() {
    const { photo } = this.state;
    // render Spinner is photo is not fetched
    const content = photo ?
    (
      <Image
        styleName="large-portrait"
        source={% raw %}{{{% endraw %} uri: photo.url }}
      >
        <Tile>
          <Title>{photo.title}</Title>
          <Subtitle>{photo.copyright}</Subtitle>
        </Tile>
      </Image>
    ) : <Spinner />;

    return (
      <Screen>
        <View styleName="flexible vertical v-center">
          {content}
        </View>
      </Screen>
    );
  }
}
```

Push the changed extension to Shoutem:

```ShellSession
$ shoutem push
Uploading `NASA` extension to Shoutem...
Success!
```

Preview it to see the changes. This is the final result:

<p class="image">
<img src='{{ site.url }}/img/tutorials/connecting-to-api/final-builder.png'/>
</p>
