---
layout: doc
permalink: /docs/extensions/tutorials/using-localization
title: Localization
section: Tutorials
---

# Localization

i18n stands for internationalization (i, 18 letters, n). Shoutem's localization is based on [i18n-js by fnando](https://github.com/fnando/i18n-js). Each extension has it's own set of translations located in the `app` segment in the `translations` directory. These extension-level translations are fallbacks for when a new extension is made and an existing language file doesn't have it's strings.

Language files are uploaded by the app owner using the `shoutem.i18n` settings page.

<p class="image">
<img src='{{ site.url }}/img/tutorials/localization/i18n-settings-page.png'/>
</p>

## Using your Translation

To use your translation, you can download and unzip [this file]({{ site.url }}/static/localization/en.json.zip) and replace all the English strings with anything you like. Either a different language or alternative English strings.

Importing the necessary packages to your extension is very simple:

```JavaScript
import { i18n } from 'shoutem.i18n';
```

This of course means that you must have the `shoutem.i18n` extension (Language & Region) extension installed in your app.

The two following entries will explain both how to format your translation (for the app owner and non-technical users) and how to implement translations in the actual code.

#### Pluralized Strings

When editing strings that contain pluralization (e.g. `1 point` vs. `2 points`) we utilize the following format for the language file:

```JSON{4-7}
#file: en.json
{
  "shoutem": {
    "loyalty": {
      "pointsInStore": {
        "one": "{% raw %}{{{% endraw %}count}} point collected.",
        "other": "{% raw %}{{{% endraw %}count}} points collected.",
        "zero": "No points collected."
      }
    }
  }
}
```

And the following method inside the actual React Native component:

```JavaScript{6}
#file: shoutem.loyalty/app/components/PlaceIconView.js
const { place, points, onPress } = this.props;

return (
  <Caption>
    {I18n.t(ext('pointsInStore'), { count: points })}
  </Caption>
);
```

It's important to use the `count` variable name specifically due to the way `i18n-js` functions.

#### Variables in Strings

When editing strings that contain variables we utilize the following format for the language file:

```JSON{3-4}
#file: en.json
{
  "shoutem": {
    "auth": {
      "loggedInUserInfo": "Username: {% raw %}{{{% endraw %}username}}"
    }
  }
}
```

And the following method inside the actual React Native component:

```JavaScript{6}
#file: shoutem.auth/app/screens/EditProfileScreen.js
const { user } = this.props;
const { name, profile_image_url: image } = user;

return (
  <Caption>
    {I18n.t(ext('loggedInUserInfo'), { username: name })}
  </Caption>
);
```

## Implementing Fallback Strings

Fallback strings are made to make sure that each string has a translation if the language file (e.g. `en.json`) is missing a translation. They are implemented in each extension which has strings specific to itself. One such example is the `BUY THIS BOOK` string, which is specific to the `shoutem.books` extension. The fallback for this translation looks like this:

```JSON
#file: shoutem.books/app/translations/en.json
{
  "shoutem": {
    "books": {
      "buyButtonText": "BUY THIS BOOK"
    }
  }
}
```

As you can see, it's identical to the full language file, however, it only contains the strings for that specific extension.

You'll also have to export these translations from `app/index.js`.

```JavaScript
#file `shoutem.books/app/index.js`
import enTranslations from './translations/en.json';

export const shoutem = {
  i18n: {
    translations: {
      en: enTranslations,
    },
  },
};
```

## Full Example

Think back to [Getting Started]({{ site.}}/docs/extensions/tutorials/getting-started), we made a simple extension with a line of text in one screen:

```JavaScript{5}
#file: tom.restaurants/app/screens/List.js
export default class List extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Let's eat!</Text>
      </View>
    );
  }
}
```

To implement translations to that we'd have to import `I18n`:

```JavaScript{11}
#file: tom.restaurants/app/screens/List.js
import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { I18n } from 'shoutem.i18n';
```

Then use the imported `I18n`:

```JavaScript{2}
#file: tom.restaurants/app/screens/List.js
<View style={styles.container}>
  <Text style={styles.text}>I18n.t(ext('letsEatMessage'))</Text>
</View>
```

Now we need to implement the fallback by creating a `translations` directory in the `app` segment:

```ShellSession
$ mkdir app/translations && touch app/translations/en.json
```

And adding our extension's string to it:

```JavaScript
#file: tom.restaurants/app/translations/en.json
{
  "tom": {
    "restaurants": {
      "letsEatMessage": "Let's eat!"
    }
  }
}
```

This string has to be exported in `app/index.js`:

```JavaScript{1,10-16}
#file: tom.restaurants/app/index.js
import enTranslations from './translations/en.json';

// Constants `screens` (from extension.js) and `reducer` (from index.js)
// are exported via named export
// It is important to use those exact names

// export everything from extension.js
export * from './extension';

export const tom = {
  i18n: {
    translations: {
      en: enTranslations,
    },
  },
};
```

And that's it!
