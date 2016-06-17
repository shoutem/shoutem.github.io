---
layout: doc
permalink: /docs/ui-toolkit/tiles
title: Tiles
---

# Tiles

Tiles are a convenient way to display homogeneous content. They are often used in grid views. Children will be rendered vertically in tiles, one below the other.

## Tile
![alt text]({{ site.baseurl }}/img/ui-toolkit/tile@2x.png "Tile"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
  <Image source="..." />
  <Subtitle lines=2>When The Morning Dawns - DJ Silver Samples</Subtitle>
  <Caption>20 hours ago</Caption>
</Tile>
```

## Tile + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/tile_+_icon@2x.png "Tile + Icon"){:.docs-component-image}

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
![alt text]({{ site.baseurl }}/img/ui-toolkit/large_tile@2x.png "Large Tile"){:.docs-component-image}

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
![alt text]({{ site.baseurl }}/img/ui-toolkit/large_tile_+_button@2x.png "Large Tile + Button"){:.docs-component-image}

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
![alt text]({{ site.baseurl }}/img/ui-toolkit/large_tile_+_button_+_sale_tag@2x.png "Large Tile + Button + Sale tag"){:.docs-component-image}

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
![alt text]({{ site.baseurl }}/img/ui-toolkit/large_list_item@2x.png "Large list item"){:.docs-component-image}

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
![alt text]({{ site.baseurl }}/img/ui-toolkit/large_list_item_+_icon_+_timestamp@2x.png "Large list item + icon + timestamp"){:.docs-component-image}

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
![alt text]({{ site.baseurl }}/img/ui-toolkit/large_list_item_+_price_tag@2x.png "Large list item + Price tag"){:.docs-component-image}

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
![alt text]({{ site.baseurl }}/img/ui-toolkit/large_list_item_+_action_icon@2x.png "Large list item + Action icon"){:.docs-component-image}

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
