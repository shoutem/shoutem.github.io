---
layout: doc
permalink: /docs/ui-toolkit/components/cards
title: Cards
section: UI toolkit
---

# Cards

Cards have become very popular in recent years. They are useful when displaying interactive content composed of different elements.

## Card
![alt text]({{ site.baseurl }}/img/ui-toolkit/cards/card@2x.png "Card grid item"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Card>
  <Image
    styleName="medium-wide"
      source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-10.png'}}
  />
  <View styleName="content">
    <Subtitle>Choosing The Right Boutique Hotel For You</Subtitle>
    <Caption>21 hours ago</Caption>
  </View>
</Card>
{% endraw %}
```

## Card + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/cards/card-icon@2x.png "Card grid item + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Card>
  <Image
    styleName="medium-wide"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-12.png'}}
  />
  <View styleName="content">
    <Subtitle>Choosing The Right Boutique Hotel For You</Subtitle>
    <View styleName="horizontal v-center space-between">
      <Caption>Dec 21, 13:45</Caption>
      <Button styleName="tight clear"><Icon name="add-event" /></Button>
    </View>
  </View>
</Card>
{% endraw %}
```

## Card + Icon (Shop)
![alt text]({{ site.baseurl }}/img/ui-toolkit/cards/card-icon-shop@2x.png "Card grid item + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Card>
  <Image
    styleName="medium-wide"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-11.png'}}
  />
  <View styleName="content">
    <Subtitle>Choosing The Right Boutique Hotel For You</Subtitle>
    <View styleName="horizontal v-center space-between">
      <View styleName="horizontal">
        <Subtitle styleName="md-gutter-right">$99.99</Subtitle>
        <Caption styleName="line-through">$120.00</Caption>
      </View>
      <Button styleName="tight clear"><Icon name="cart" /></Button>
    </View>
  </View>
</Card>
{% endraw %}
```

#### Style names
* `Card` component doesn't have specific Style names, however the `View` component nested under `Card` can use the following Style name:
* **content**: adds standard card margins to any child component

