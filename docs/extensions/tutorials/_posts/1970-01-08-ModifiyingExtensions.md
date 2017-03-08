---
layout: doc
permalink: /docs/extensions/tutorials/modifying-extensions
title: Modifying extensions
section: Tutorials
---

# Modifying extensions

The Shoutem's mission is simple - **do not solve already solved problems**. Quite often apps that we build need common features you've seen already numerous times: push notifications, analytics, ads, authentication, RSS readers, eCommerce integrations and so on. This is what extensions are for - just pick and choose extensions which suit your need.

However, for the app to succeed, it needs to be **unique**. Recreating RSS reader just to make it unique is a redundant work. Sometimes, it's enough to customize your app in the dashboard, customize the theme, or [write a new theme]({{ site.baseurl }}/docs/extensions/tutorials/writing-a-theme), but sometimes we need to modify the currently available extensions.

There are 2 ways to achieve this:

- 1) Directly modify the extension code - new extension will **not** get the future updates
- 2) Extend the extension part - new extension will get the future updates

In both ways, a new extension is created.

## 1) Directly modify the extension code

As all Shoutem extensions are [open sourced](https://github.com/shoutem/extensions), you can directly take the code of some extension, modify it and push as your own extension.

Say you're using **News RSS** extension (its screen) and that you want a different layout than what's provided as layout options.

<p class="image">
<img src='{{ site.baseurl }}/img/tutorials/modifying-extensions/provided-layouts.png'/>
</p>

You do want list layout, but with large images in `Tiles`, such as the ones provided in the [UI toolkit]({{ site.baseurl }}/docs/ui-toolkit/components/tiles).

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

## 2) Extend the extension part

## How to customize the extensions

Customizing authentication or push notifications is documented in the repository.