---
layout: doc
permalink: /docs/ui-toolkit/components/tiles
title: Tiles
section: UI toolkit
---

# Tiles

Tiles are a convenient way to display homogeneous content. They are often used in grid views. Children are rendered vertically in tiles, one below the other.

## Tile
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/tile@2x.png "Tile"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile styleName="small">
  <Image
    styleName="medium-square"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-12.png'}} />
  />
  <View styleName="content">
    <Subtitle numberOfLines={2}>When The Morning Dawns - DJ Silver Sample Album</Subtitle>
    <Caption>20 hours ago</Caption>
  </View>
</Tile>
{% endraw %}
```

## Tile + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/tile-icon@2x.png "Tile + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile styleName="small">
  <Image
    styleName="medium-square"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-2.png'}} />
  >
    <Icon name="play" styleName="rounded-overlay-small" />
  </Image>
  <View styleName="content">
    <Subtitle numberOfLines={2}>When The Morning Dawns - DJ Silver Sample Album</Subtitle>
    <Caption>20 hours ago</Caption>
  </View>
</Tile>
{% endraw %}
```

## Large (featured) tile
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-tile@2x.png "Large Tile"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="featured"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-4.png'}} />
  >
    <Overlay>
      <Title styleName="md-gutter-bottom">MIKE PATTON TEAMING WITH JOHN KAADA FOR COLLAB ALBUM BACTERIA CULT</Title>
      <Caption>Sophia Jackson        21 hours ago</Caption>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Large (featured) tile + Button + Sale tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-tile-button-sale-tag@2x.png "Large Tile + Button + Sale tag"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="featured"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-11.png'}} />
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
{% endraw %}
```

## Large (featured) tile + Button 
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-tile-button@2x.png "Large Tile + Button"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile>
{% raw %}
  <Image
    styleName="featured"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-9.png'}} />
  >
    <Overlay>
      <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
      <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
      <Heading>99.99</Heading>
      <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Large list item
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item@2x.png "Large list item"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile styleName="light">
  <Image
    styleName="large-banner"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-5.png'}} />
  />
  <View styleName="content">
    <Title>MAUI BY AIR THE BEST WAY AROUND THE ISLAND</Title>
    <View styleName="horizontal space-between">
      <Caption>1 hour ago</Caption>
      <Caption>15:34</Caption>
    </View>
  </View>
</Tile>
{% endraw %}
```

## Large list item + Icon + Timestamp
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-icon-timestamp@2x.png "Large list item + icon + timestamp"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile styleName="light">
  <Image
    styleName="large-banner"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-7.png'}} />
  >
    <Icon name="play" styleName="rounded-overlay" />
  </Image>
  <View styleName="content">
    <Title>MAUI BY AIR THE BEST WAY AROUND THE ISLAND</Title>
    <View styleName="horizontal space-between">
      <Caption>1 hour ago</Caption>
      <Caption>15:34</Caption>
    </View>
  </View>
</Tile>
{% endraw %}
```

## Large list item + Price tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-price-tag@2x.png "Large list item + Price tag"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-banner"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-3.png'}} />
  >
    <Overlay>
      <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
      <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Large list item + Action icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-action-icon@2x.png "Large list item + Action icon"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-banner"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-3.png'}} />
  >
    <Overlay>
      <View styleName="actions">
        <Button styleName="tight clear"><Icon name="add-to-favorites" /></Button>
      </View>
      <Title>HOW TO MAINTAIN YOUR MENTAL HEALTH IN 2016</Title>
      <Caption>6557 Americo Hills Apt. 118</Caption>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Detail square + Price tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-square-price-tag@2x.png "Detail square + Price tag"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-square"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-3.png'}} />
  >
    <Overlay>
      <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
      <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Detail square + Button
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-square-button@2x.png "Detail square + Button"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-square"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-9.png'}} />
  >
    <Overlay>
      <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
      <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
      <Heading>99.99</Heading>
      <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Detail square + Button + Sale tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-square-button-sale-tag@2x.png "Detail square + Button + Sale tag"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-square"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-11.png'}} />
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
{% endraw %}
```

## Detail large + Price tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-large-price-tag@2x.png "Detail large + Price tag"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-portrait"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-3.png'}} />
  >
    <Overlay>
      <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
      <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Detail large + Button
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-large-button@2x.png "Detail large + Button"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-portrait"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-9.png'}} />
  >
    <Overlay>
      <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
      <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
      <Heading>99.99</Heading>
      <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
    </Overlay>
  </Image>
</Tile>
{% endraw %}
```

## Detail large + Button + Sale tag
![alt text]({{ site.baseurl }}/img/ui-toolkit/tiles/detail-large-button-sale-tag@2x.png "Detail large + Button + Sale tag"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<Tile>
  <Image
    styleName="large-portrait"
    source={{uri: {% endraw %}'{{site.url}}{% raw %}/img/ui-toolkit/examples/image-11.png'}} />
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
{% endraw %}
```
  
#### Style Names

* **text-centric**: centers content within container and applies standard margins
* **clear**: sets the `clear` background color, as defined in Theme (usually transparent)
* **small**: sets the fixed width to 145px and reduces margins and paddings
* Nested `View` component can use the following Style name:
  * **content**: applies the standard margins around the content in `View`
