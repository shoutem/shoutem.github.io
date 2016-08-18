---
layout: doc
permalink: /docs/ui-toolkit/components/tiles
title: Tiles
section: UI toolkit
---

# Tiles

Tiles are a convenient way to display homogeneous content. They are often used in grid views. Children will be rendered vertically in tiles, one below the other.

## Tile
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/tile@2x.png "Tile"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="..." />
  <Subtitle lines=2>When The Morning Dawns - DJ Silver Samples</Subtitle>
  <Caption>20 hours ago</Caption>
</Tile>
```

## Tile + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/tile-icon@2x.png "Tile + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="...">
    <IconButton iconName="play" onPress={...} />
  </Image>
  <Subtitle lines=2>When The Morning Dawns - DJ Silver Samples</Subtitle>
  <Caption>20 hours ago</Caption>
</Tile>
```

## Large tile
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-tile@2x.png "Large Tile"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="...">
    <Title>MIKE PATTON TEAMING WITH JOHN KAADA FOR COLLAB ALBUM BACTERIA CULT</Title>
    <View styleName="horizontal">
      <Caption>Sophia Jackson</Caption>
      <Caption>2 hours ago</Caption>
    </View>
  </Image>
</Tile>
```

## Large tile + Button 
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-tile-button@2x.png "Large Tile + Button"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="...">
    <Title>A DEAL ITLE THAT BREAKS IN TWO LINES</Title>
    <Caption styleName="strikethrough">$150.00</Caption>
    <Heading>$99.99</Heading>
    <Button onPress={...}>CLAIM COUPON</Button>
  </Image>
</Tile>
```

## Large tile + Button + Sale tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-tile-button-sale-tag@2x.png "Large Tile + Button + Sale tag"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="...">
    <Tag>-20%</Tag>
    <Title>COOL BLACK AND WHITE STYLISH WATCHES  </Title>
    <Subtitle styleName="strikethrough">$280.00</Subtitle>
    <Heading>$250.00</Heading>
    <IconButton iconName="add-to-basket" onPress={...}>ADD TO BASKET</IconButton>
  </Image>
</Tile>
```

## Large list item
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item@2x.png "Large list item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="..." />
  <View styleName="vertical">
    <Title>IMPACT OF EXTRINSIC MOTIVATION ON INTRINSIC MOTIVATION</Title>
    <Caption>1 hour ago</Caption>
  </View>
</Tile>
```

## Large list item + Icon + Timestamp
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-icon-timestamp@2x.png "Large list item + icon + timestamp"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="...">
    <Icon iconName="play" />
  </Image>
  <View styleName="vertical">
    <Title>MAUI BY AIR THE BEST WAY AROUND THE ISLAND</Title>
    <View styleName="horizontal">
      <Caption styleName="flexible">1 hour ago</Caption>
      <Caption>15:34</Caption>
    </View>
  </View>
</Tile>
```

## Large list item + Price tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-price-tag@2x.png "Large list item + Price tag"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image styleName="banner" source="...">
    <Title>SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
    <Tag styleName="light">$18.30</Tag>
  </Image>
</Tile>
```

## Large list item + Action icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-action-icon@2x.png "Large list item + Action icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image styleName="banner" source="...">
    <View styleName="horizontal end">
      <IconButton iconName="star" onPress={...} />
    </View>
    <Title>COVENTRY CITY GUIDE INCLUDING COVENTRY HOTELS</Title>
    <Caption>6557 Americo Hills Apt. 118</Caption>
  </Image>
</Tile>
```

## Detail square + Price tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-square-price-tag@2x.png "Detail square + Price tag"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image
    styleName="large-square"
    source={require('../assets/examples/road.png')}
  >
    <Overlay>
      <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
      <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
    </Overlay>
  </Image>
</Tile>
```

## Detail square + Button
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-square-button@2x.png "Detail square + Button"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image
    styleName="large-square"
    source={require('../assets/examples/road.png')}
  >
    <Overlay>
      <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
      <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
      <Heading>99.99</Heading>
      <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
    </Overlay>
  </Image>
</Tile>
```

## Detail square + Button + Sale tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-square-button-sale-tag@2x.png "Detail square + Button + Sale tag"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image
    styleName="large-square"
    source={require('../assets/examples/road.png')}
  >
    <Overlay>
      <Overlay styleName="collapsed"><Heading>-20%</Heading></Overlay>
      <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
      <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
      <Heading>$250.00</Heading>
      <Button styleName="md-gutter-top"><Icon name="cart" /><Text>ADD TO BASKET</Text></Button>
    </Overlay>
  </Image>
</Tile>
```

## Detail large + Price tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-large-price-tag@2x.png "Detail large + Price tag"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image
    styleName="large-portrait"
    source={require('../assets/examples/road.png')}
  >
    <Overlay>
      <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
      <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
    </Overlay>
  </Image>
</Tile>
```

## Detail large + Button
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-large-button@2x.png "Detail large + Button"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image
    styleName="large-portrait"
    source={require('../assets/examples/road.png')}
  >
    <Overlay>
      <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
      <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
      <Heading>99.99</Heading>
      <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
    </Overlay>
  </Image>
</Tile>
```

## Detail large + Button + Sale tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-large-button-sale-tag@2x.png "Detail large + Button + Sale tag"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image
    styleName="large-portrait"
    source={require('../assets/examples/road.png')}
  >
    <Overlay>
      <Overlay styleName="collapsed"><Heading>-20%</Heading></Overlay>
      <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
      <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
      <Heading>$250.00</Heading>
      <Button styleName="md-gutter-top"><Icon name="cart" /><Text>ADD TO BASKET</Text></Button>
    </Overlay>
  </Image>
</Tile>
```
  