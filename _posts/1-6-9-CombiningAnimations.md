---
layout: doc
permalink: /docs/ui-toolkit/animation/combining-animations
title: Combining animations
section: Animation
---

# Combining animations

Animations can be combined simply by wrapping each other. This is an example from open-sourced [Shoutem News](#todo) extension.

```javascript
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