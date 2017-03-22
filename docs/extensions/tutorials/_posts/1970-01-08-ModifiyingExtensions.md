---
layout: doc
permalink: /docs/extensions/tutorials/modifying-extensions
title: Modifying extensions
section: Tutorials
---

# Modifying extensions

The Shoutem's mission is simple - **do not solve already solved problems**. Quite often apps that we build need common features you've seen already numerous times: push notifications, analytics, ads, authentication, RSS readers, eCommerce integrations and so on. This is what extensions are for - just reuse ready features.

However, for the app to succeed, it needs to be **unique**. Recreating RSS reader just to make it unique is a redundant work. Sometimes, it's enough to customize your app in the dashboard, customize the theme, or [write a new theme]({{ site.baseurl }}/docs/extensions/tutorials/writing-a-theme), but sometimes we need to modify the currently available extensions.

There are 2 ways to achieve this:

- 1) Directly modify the extension code - new extension will **not** get the future updates
- 2) Extend the extension - new extension will get the future updates

In both ways, a new extension is created.

## 1) Directly modify the extension code

As all Shoutem extensions are [open sourced](https://github.com/shoutem/extensions), you can directly take the code of some extension, modify it and _push_ as your own extension to Shoutem.

For the purpose of the demo, create new app (e.g. called **News App**) and add **News RSS** screen inside of the navigation. In the **Layout** section, select `List` as the default layout.

This is what it should look like:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/modifying-extensions/provided-layouts.png'/>
</p>

You do want list layout, but with large images in `Tiles`, such as the ones provided in the [UI toolkit]({{ site.baseurl }}/docs/ui-toolkit/components/tiles). Let's modify News RSS extension directly.

Download the [News RSS extension](https://github.com/shoutem/extensions/tree/master/shoutem-rss-news) from the repository and locate inside of the extension's folder:

```ShellSession
$ cd shoutem-rss-news
```

Check the `renderRow` method of `app/screens/ArticlesListScreen.js` screen:

```javascript
#file: app/screens/ArticlesListScreen.js
  renderRow(article) {
    return (
      <ListArticleView
        article={article}
        onPress={this.openDetailsScreen}
      />
    );
  }
```

It uses the `ListArticleView` component. Customize the `render` method in that component to use `Tiles` and don't forget to import additional components from `@shoutem/ui`. This is the complete code you should end up with:

```JSX{7-8,38-46}
#file: app/components/ListArticleView
import React from 'react';
import moment from 'moment';
import {
  TouchableOpacity,
  Caption,
  Image,
  Tile,
  Title
} from '@shoutem/ui';

import { getLeadImageUrl } from 'shoutem.rss';

/**
 * A component used to render a single list article item
 */
export default class ListArticleView extends React.Component {
  static propTypes = {
    onPress: React.PropTypes.func,
    article: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.article);
  }

  render() {
    const { article } = this.props;
    const dateFormat = moment(article.timeUpdated).isBefore(0) ?
    null : (<Caption>{moment(article.timeUpdated).fromNow()}</Caption>);

    return (
      <TouchableOpacity key={article.id} onPress={this.onPress}>
        <Image
          styleName="featured"
          source={% raw %}{{ uri: getLeadImageUrl(article) }}{% endraw %}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{article.title}</Title>
            <Caption>{dateFormat}</Caption>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }
}

```

And that's it! Save it and push it to Shoutem:

```ShellSession
$ shoutem push
Uploading `News RSS` extension to Shoutem...
Success!
```

Install it on your app either through Shoutem builder or with:

```ShellSession
$ shoutem install
Select app to install extension: News App
Success!
```

Delete the old News RSS screen from the navigation (click on the 3 dots in top right corner and select **Delete**), insert the new `News RSS` screen from the `Custom` category and select `List` layout.

This is what you should get:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/modifying-extensions/customized-list-layout.png'/>
</p>

This is the result that we wanted! It was quite easy and straightforward. However, doing this means creating a completely separate extension which won't get any updates done by Shoutem on Shoutem **News RSS** extension.

To get the updates from Shoutem, we want to extend the extension, instead of changing its code directly.

## 2) Extend the extension

Extending the extension is preferred way of modifying extension.

##### When to do it?

For bigger modifications, such as changing the data schema being used, it's not possible to modify functionality without directly modifying the extension. Extending the extension is usually used for writing alternative layouts.

##### How to do it?

[Here](https://github.com/shoutem/extension-examples/tree/master/extending-extension) is the open sourced extension as the final result of this chapter . Let's create a new extension:

```ShellSession
$ shoutem init news-rss
...
Extension initialized!
```

Locate to created directory:

```ShellSession
$ cd shoutem init news-rss
```

Create a new screen which will extend the List screen from the original Shoutem **News RSS** extension:

```ShellSession
$ shoutem screen add List
Screen `List` is created in file `app/screens/List.js`!
File `app/extension.js` was modified.
File `extension.json` was modified.
```

Now we need to say which screen our `List` screen extends. Do this in `extension.json` in `extends` field:

```JSON{9-11}
#file: extension.json
{
  "name": "news-rss",
  "title": "My news RSS",
  "version": "0.0.1",
  "description": "",
  "platform": "1.0.*",
  "screens": [{
    "name": "List",
    "title": "List with big pictures",
    "image": "./server/assets/large-news-list.png",
    "extends": "shoutem.rss-news.ArticlesGridScreen"
  }]
}
```

We extended `ArticlesGridScreen` from Shoutem **News RSS** extension, as it's the [original screen](https://github.com/shoutem/extensions/blob/master/shoutem-rss-news/extension.json#L29). We've also added `title` and `image` which will both be shown in the layout selector. Download the image [here]({{ site.baseurl }}/static/modifying-extension/assets.zip), extract it and paste the `assets` folder in the extension `server` folder.

> #### Note
> If you can't remember the fields in the `extension.json`, all the fields are documented in the [reference](http://shoutem.github.io/docs/extensions/reference/extension).

Let's implement our `List` screen. In `extension.json`, we are extending `ArticlesGridScreen`, but that's only for layout selector. In the implemention, we actually want to extend the `ArticlesListScreen`.

`ArticlesListScreen` renders the `ListArticleView` component from Shoutem **News RSS**. When overriding that method, we could immediately implement the `ListArticleView` functionality inside. However, since we want to get updates from the `ListArticleView` component too, we'll create a new component extending that one and use it in the overridden `renderRow` function.

Create the `components` folder and a component file inside:

```ShellSession
$ mkdir app/components
$ touch app/components/Item.js
```

Implement the `Item` component:

```javascript
#file: app/components/Item.js
import { components } from 'shoutem.rss-news';
import moment from 'moment';
import {
  TouchableOpacity,
  Caption,
  Image,
  Tile,
  Title
} from '@shoutem/ui';

import { getLeadImageUrl } from 'shoutem.rss';

export default class Item extends components.ListArticleView {
  render() {
    const { article } = this.props;
    const dateFormat = moment(article.timeUpdated).isBefore(0) ?
    null : (<Caption>{moment(article.timeUpdated).fromNow()}</Caption>);

    return (
      <TouchableOpacity key={article.id} onPress={this.onPress}>
        <Image
          styleName="featured"
          source={% raw %}{{{% endraw %} uri: getLeadImageUrl(article) }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{article.title}</Title>
            <Caption>{dateFormat}</Caption>
          </Tile>
        </Image>
      </TouchableOpacity>
    );
  }
}
```

We're importing `components` from `shoutem.rss-news` extension. That means it's in the public API of the extension and that you can find it in the `app/index.js` file. Always check what is the public API of an extension either in the `README.md` file or in the source code.

We've implemented new `render` function and deleted everything we didn't need to override from `ListArticleView` component.

Now, override the `renderRow` method in the screen:

```javascript
#file: app/screens/List.js
import { screens } from 'shoutem.rss-news';
import { Item } from '../components/Item';

export default class List extends screens.ArticlesListScreen {
  renderRow(article) {
    return (
      <Item
        article={article}
        onPress={this.openDetailsScreen}
      />
    );
  }
}
```

And we're done! Push the extension to Shoutem.

```ShellSession
$ shoutem push
Uploading `My news RSS` extension to Shoutem...
Success!
```

Install it to a new app:

```ShellSession
shoutem install --new "News App"
...
```

Open the app in the builder. Now, add the screen, but from the Shoutem **News RSS** extension. In our new extension, we only extended a screen and didn't create a new shortcut. However, since both **News RSS** and **My news RSS** extensions are installed, layout selector will recognize the new `List with big pictures` layout and show it in the layout list.

Select the new layout and run the app. This is what you should get:

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/modifying-extensions/new-layout.png'/>
</p>

This way, we only extended Shoutem **News RSS** extension and we will our extension will automatically get the all updates from Shoutem extension.