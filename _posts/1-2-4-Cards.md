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
<Card>
  <Image
    styleName="medium-wide"
    source={require('../assets/examples/road.png')}
  />
  <View styleName="content">
    <Subtitle>Choosing The Right Boutique Hotel For You</Subtitle>
    <Caption>21 hours ago</Caption>
  </View>
</Card>
```

#### Style
* **medium-wide**: this style can be applied only to images (`shoutem.ui.Image`), it makes images wide and cover up the entire width of the card. Rest of image sizes are mentioned in "Image Sizes" section.
* **content**: adds standard card margins to any child component

## Card + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/cards/card-icon@2x.png "Card grid item + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Card>
  <Image
    styleName="medium-wide"
    source={require('../assets/examples/road.png')}
  />
  <View styleName="content">
    <Subtitle>Choosing The Right Boutique Hotel For You</Subtitle>
    <View styleName="horizontal v-center space-between">
      <Caption>Dec 21, 13:45</Caption>
      <Button styleName="tight clear"><Icon name="add-event" /></Button>
    </View>
  </View>
</Card>
```

#### Style
* **medium-wide**: this style can be applied only to images (`shoutem.ui.Image`), it makes images wide and cover up the entire width of the card. Rest of image sizes are mentioned in "Image Sizes" section.
* **content**: adds standard card margins to any child component
* **horizontal**: layouts the children of a component horizontally
* **end**: aligns the children to the right of the component
* **bottom**: aligns the children to the bottom of the component

## Card + Icon (Shop)
![alt text]({{ site.baseurl }}/img/ui-toolkit/cards/card-icon-shop@2x.png "Card grid item + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Card>
  <Image
    styleName="medium-wide"
    source={require('../assets/examples/road.png')}
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
```

#### Style
* **medium-wide**: this style can be applied only to images (`shoutem.ui.Image`), it makes images wide and cover up the entire width of the card. Rest of image sizes are mentioned in "Image Sizes" section.
* **content**: adds standard card margins to any child component
* **horizontal**: layouts the children of a component horizontally
* **end**: aligns the children to the right of the component
* **bottom**: aligns the children to the bottom of the component
  
  
TODO: FIGURE OUT styleNames from latter 2 examples