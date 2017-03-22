---
layout: doc
permalink: /docs/extensions/reference/extension-exports
title: Extension exports
section: Reference
---

# Extension exports

Each extension can export multiple values in:

- app/index.js - used by an application to find extension files
- server/index.js - used by Shoutem CMS to find extension data

## _app/index.js_

Following named exports are reserved in `app/index.js` and will be called by application.

Extension parts:

- `actions` - action creators referenced in `extension.json`
- `screens` - screens referenced in `extension.json`

<br />

Redux constructs:

- `reducer` - reducer for the extension
- `middleware` - middleware for the extension

<br />

App lifecycle methods:

- `appWillMount` - called when app is about to mount
- `appDidMount` - called when app is mounted

<br />

## _server/index.js_

No named exports are currently reserved.