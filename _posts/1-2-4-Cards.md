---
layout: doc
permalink: /docs/ui-toolkit/components/cards
title: Cards
section: UI toolkit
---

# Cards

Cards have become very popular in recent years. They are useful when displaying interactive content composed of different elements.

## Card
![alt text]({{ site.baseurl }}/img/ui-toolkit/card@2x.png "Card grid item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Card>
  <Image styleName="banner" source="..." />
  <View styleName="card-content">
    <Subtitle lines=4>Lady Gaga Sings National Anthem at Super Bowl 50</Subtitle>
    <Divider />
    <Caption>21 hours ago</Caption>
  </View>
</Card>
```

#### Style
* **banner**: this style can be applied only to images (`shoutem.ui.Image`), it makes images wide and cover up the entire width of the card
* **card-content**: adds standard card margins to any child component

## Card + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/card_+_icon@2x.png "Card grid item + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Card>
  <Image styleName="banner" source="...">
    <View styleName="horizontal bottom end">
      <IconButton iconName="basket" onPress={...} />
    </View>
  </Image>
  <View styleName="card-content">
    <Subtitle lines=4>Lady Gaga Sings National Anthem at Super Bowl 50</Subtitle>
    <Divider />
    <Caption>21 hours ago</Caption>
  </View>
</Card>
```

#### Style
* **banner**: this style can be applied only to images (`shoutem.ui.Image`), it makes images wide and cover up the entire width of the card
* **card-content**: adds standard card margins to any child component
* **horizontal**: layouts the children of a component horizontally
* **end**: aligns the children to the right of the component
* **bottom**: aligns the children to the bottom of the component
