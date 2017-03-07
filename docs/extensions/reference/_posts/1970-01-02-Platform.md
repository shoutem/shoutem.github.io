---
layout: doc
permalink: /docs/extensions/reference/platform
title: Platform
section: Reference
---

# Platform
<hr />

Shoutem platform defines an environment in which extensions are executed. This environment defines versions of React, React Native and other packages available to your extension by default.

Upon initializing your extension with `shoutem init` command, CLI defines those packages as peer dependencies in your `app/package.json` file. They are available to all extensions without needing to install them, but their version is managed by the platform. That's why all the packages have `*` as the version.

Here's an example of what `app/package.json` might look like after initialization:

```JSON
#file: app/package.json
{
  "name": "tom.restaurants",
  "version": "0.0.1",
  "description": "List of restaurants!",
  "peerDependencies": {
    "@shoutem/animation": "*",
    "@shoutem/core": "*",
    "@shoutem/redux-composers": "*",
    "@shoutem/redux-io": "*",
    "@shoutem/theme": "*",
    "@shoutem/ui": "*",
    "@shoutem/ui-addons": "*",
    "lodash": "*",
    "moment": "*",
    "whatwg-fetch": "*",
    "react": "*",
    "react-native": "*",
    "react-native-browser-polyfill": "*",
    "react-redux": "*",
    "redux": "*",
    "redux-action-buffer": "*",
    "redux-persist": "*",
    "redux-api-middleware": "*",
    "redux-logger": "*",
    "redux-thunk": "*"
  }
}
```

> #### Note
> File package.json always includes developer name alongside with the extension name, while the `name` in extension.json doesn't include the developer name.

The specific versions of current platform can be found in the `package.json` file in [platform repository]({{ site.baseurl }}/shoutem/platform). Versions included in previous platforms can be browsed in the `git` history.