---
layout: doc
permalink: /docs/ui-toolkit/components/headers
title: Headers
section: UI toolkit
---

# Headers 

Headers are Tile variations.

## Header / article
![alt text]({{ site.baseurl }}/img/ui-toolkit/headers/header-article@2x.png "Header / article"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile styleName="text-centric">
  <Title styleName="sm-gutter-bottom">MIKE PATTON TEAMING WITH JOHN KAADA FOR COLLAB ALBUM BACTERIA CULT</Title>
  <Caption>Sophia Jackson        21 hours ago</Caption>
</Tile>
```
  
## Header / Shop item
![alt text]({{ site.baseurl }}/img/ui-toolkit/headers/header-shop-item@2x.png "Header / shop item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile styleName="text-centric">
  <Overlay><Heading>-20%</Heading></Overlay>
  <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
  <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
  <Heading>$250.00</Heading>
  <Button styleName="dark md-gutter-top"><Icon name="cart" /><Text>ADD TO BASKET</Text></Button>
</Tile>
```
  
## Header / Deals item
![alt text]({{ site.baseurl }}/img/ui-toolkit/headers/header-deals-item@2x.png "Large Tile + Button"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile styleName="text-centric">
  <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
  <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
  <Heading>99.99</Heading>
  <Button styleName="dark md-gutter-top"><Text>CLAIM COUPON</Text></Button>
</Tile>
```

## Header / Products item
![alt text]({{ site.baseurl }}/img/ui-toolkit/headers/header-products-item@2x.png "Header / products item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile styleName="text-centric">
  <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
  <Overlay styleName="solid-dark">
    <Subtitle styleName="sm-gutter-horizontal">$18.30</Subtitle>
  </Overlay>
</Tile>
```

#### Style names

* Headers component can use same Style names like `Tiles` component can use.
  