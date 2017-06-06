---
layout: doc
permalink: /docs/extensions/tutorials/settings-pages-advanced
title: Advanced Settings page use cases
section: Tutorials
---

# Advanced use cases in writing settings pages
<hr />

From [Writing settings pages]({{ site.url }}/docs/extensions/tutorials/writing-settings-page) you saw how to create simple shortcut settings page that enable managing of shortcut settings and how those settings are used in application.

In this section we will cover advanced use cases that are beyond only managing extension or shortcut settings. You can implement any functionality that you would ordinary implement in standalone React app, you only need to be aware that settings page needs integration with Shoutem Builder.

## Defining custom redux state

If you are implementing functionality beyond settings management, you will probably need to define custom redux state with custom actions, selectors and reducers. In this example we will show how to integrate ordinary concepts from redux with settings pages.

First add `redux.js` into your extension in `/src` directory, it will be a file for implementing custom actions, selectors and reducers. Let's start with defining reducers:

```JS
#file: server/redux.js
import { createScopedReducer } from '@shoutem/api';

function categories(state=[], action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
        },  
      };
    default:
      return state;
  }
}

function todos(state=[], action) {
  switch (action.type) {
    case 'ADD_TODO':
      const { id, categoryId, text } = action;
      return [
        ...state,
        {
          id,
          categoryId,
          text,
          completed: false,
        },  
      };
    default:
      return state;
  }
}

export default createScopedReducer({
  extension: {
    categories,
  },
  shortcut: {
    todos,
  },
});
```

For our custom example where we are trying to create todo app we defined two reducers, `categories` and `todos`. Idea is that `categories` are managed globally per extension and `todos` in shortcuts where each shortcut will present different category. If you are familiar with `redux` you can notice we don't use `combineReducer` to create root reducer but instead we use `createScopedReducer` from `@shoutem/api`. It's purpose is to create and manage reducers on different scopes in Builder. Depending on scope, reducers receive different scoped state. That enables creation of multiple instances of extension/shortcut/screen state for each extension/shortcut/screen scope and allow settings pages to access redux state for particular scope depending on their current place of render in Builder.

Once we created and exported root reducer we need to export it also in `src/index.js`. It's based on [Extension exports]({{ site.url }}/docs/extensions/reference/extension-exports) where all exports of extensions are defined.

```JS
#file: server/index.js
import reducer from './redux.js';

export { reducer };
```

Next, we want to access state during binding of our React Page component to Redux store using `connect`. `shoutem/api` exposes selectors `getExtensionState`, `getShortcutState` and `getScreenState` that are used to access different parts of extension state. In example we are implementing shortcut settings page and we need list of all categories defined in extension and list of all todos for instance of shortcut. So let's add new shortcut settings page `TodosPage` using Shoutem CLI:

```ShellSession
$ shoutem add page TodosPage
Page `TodosPage` is created in `server/src/pages/todos-page` folder!
File `extension.json` was modified.
```

 ```JS
 #file: server/src/pages/todos-page/TodosPage.js
import React from 'react';
import { connect } from 'react-redux';
import {
  getExtensionState,
  getShortcutState,
} from '@shoutem/api';

// Implementation of TodosPage React component
// export class TodosPage extends React.Component {
// ...
//}


function mapStateToProps(state, ownProps) {
  const { shortcutId, extensionName } = ownProps;

  const extensionState = getExtensionState(state, extensionName);
  const shortcutState = getShortcutState(state, extensionName, shortcutId);

  const categories = _.get(extensionState, 'categories');
  const todos = _.get(shortcutState, 'shortcuts');

  return {
    categories,
    todos,
  };
}

export default connect(mapStateToProps, null)(TodosPage);
 ```

Selectors require scope parameters to be able to select right scoped state. Scope parameters `appId`, `extensionName`, `shortcutId` and `screenId` along with `parameters` are provided via `ownProps` that Shoutem provides as parent of settings page.

Don't forget to export `TodosPage` in `src/index.js`.

```JS
#file: server/index.js
import TodosPage from './pages/todos-page';
export const pages = {
  TodosPage,
};

import reducer from './redux.js';
export { reducer };
```

Now that we are able to provide `todos` and `categories` to `TodosPage` component, we also need to implement actions for managing categories and todo items in state. You can implement typical action creators, but we suggest using [FSA convention](https://github.com/acdlite/flux-standard-action#example) and depending upon scope which action targets use `shoutem/api` scope setters `setExtensionScope`,  `setShortcutScope` and `setScreenScope`. In this example we will implement actions for creating categories and todo items in `src/redux.js`:

```JS
#file: server/redux.js
import { setExtensionScope, setShortcutScope } from '@shoutem/api';

export function createCategory(extensionName, id, name) {
  const action = {
    type: 'ADD_CATEGORY',
    payload: {
      id,
      name,
    },
  };

  return setExtensionScope(action, extensionName);
}

export function createTodoItem(extensionName, shortcutId, id, categoryId, text) {
  const action = {
    type: 'ADD_CATEGORY',
    payload: {
      id,
      categoryId,
      text,
    },
  };

  return setShortcutScope(action, extensionName, shortcutId);
}
```

Above example shows how ordinary React and Redux functionality implementation integrates with Shoutem when custom state is required.

## Using lifecycle methods

Each extension can subscribe to Shoutem lifecycle methods, for now we only expose `pageWillMount` documented in [Extension exports]({{ site.url }}/docs/extensions/reference/extension-exports), but in the future we will add other lifecycle methods. Subscription is simple, you only need to export lifecycle method in `src/index.js`:

```JS
#file: server/index.js
...
export function pageWillMount(page) {
  //Add your code that needs to configure or initialize or depend upon page object
}
...
```

Lifecycle methods are useful if you need to configure your extension based on Shoutem Builder context and parameters. For example if you need to initialize reducers or API service that communicates with your server. Below in the example, instead of directly exporting your root reducer from `redux.js` we use `pageWillMount` to initialize reducer. This is pattern that enables passing `page` object to reducer factory.

```JS
#file: server/index.js
import reducer from './redux';

//export { reducer };

let pageReducer = null;

export function pageWillMount(page) {
  pageReducer = reducer(page);
}

export { pageReducer as reducer };
```

## Using redux-form

You can use any JS library in implementation of Shoutem settings pages, but because of integration requirements in some cases you will need to first configure your library. [Redux-form](https://github.com/erikras/redux-form) is example of such case where by convention form state is under `state.form` as they suggest it in [Getting Started](https://redux-form.com/6.7.0/docs/GettingStarted.md/), but because of Shoutem settings pages requirement you will need to add redux-form reducer under extension scope:

```JS
#file: server/redux.js
import _ from 'lodash';
import { createScopedReducer } from '@shoutem/api';
import { reducer as formReducer } from 'redux-form';
import ext from './const';

export default createScopedReducer({
  extension: {
    form: formReducer,
  },
});

export function getFormState(state) {
  return _.get(state, [ext(), 'form']);
}
```

As we added redux-form reducer under extension scope we also added form state selector `getFormState` that returns redux-form state. It is nice convenience so that we don't need to add it everywhere when we decorate form component with `reduxForm()`. You only need to pass custom selector when you are using decorator:

```JS
#file: server/FormComponent.js
import { reduxForm } from 'redux-form';
import { getFormState } from './redux';

// React component with form implementation
// export class FormComponent extends React.Component {
//   form implementation
// }

export default reduxForm({
  getFormState,
  form: 'customFormName',
  fields: [
    'field1',
    'field2',
  ],
})(FormComponent);
```
