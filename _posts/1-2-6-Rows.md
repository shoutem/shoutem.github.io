---
layout: doc
permalink: /docs/ui-toolkit/components/rows
title: Rows
section: UI toolkit
---

# Rows

Components that are rendered within lists are usually implemented using the row container. Row is a container that renders its children horizontally.

## Small list item
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item@2x.png "Small list item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Text lines=1>Portland ugh fashion axe Helvetica, YOLO Echo Party</Text>
</Row>
```

## Small list item + Avatar thumbnail
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-avatar@2x.png "Small list item + Avatar thumbnail"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image styleName="avatar-small" source="..." />
  <Text>Add comment</Text>
</Row>
```

## Small list item + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon@2x.png "Small list item + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Icon iconName="star" />
  <Text>Add to favorites</Text>
</Row>
```

## Small list item + Icon + Right Arrow
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon-right-arrow@2x.png "Small list item + Icon + Right Arrow"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
    <Icon name="web" />
    <Text>About</Text>
    <Icon styleName="disclosure" name="right-arrow" />
</Row>
```
  
## Small list item + Icon + Description
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon-description@2x.png "Small list item + Icon + Description"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Icon iconName="laptop" />
  <View styleName="vertical">
    <Subtitle>Bridges Rock Gym</Subtitle>
    <Text>www.example.com/deal/link/that-is-real-deal</Text>
  </View>
  <Icon iconName="disclosure" />
</Row>
```

## Small list item + Avatar + Description + Caption
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon-description-caption@2x.png "Small list item + Avatar + Description + Caption"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image styleName="avatar-small" source="..." />
  <View styleName="vertical">
    <View styleName="horizontal">
      <Subtitle>Dustin Malone</Subtitle>
      <Caption>20 minutes ago</Caption>
    </View>
    <Text>Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap. Hashtag typewriter banh mi, squid keffiyeh High.</Text>
  </View>
</Row>
```

## Medium list item
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item@2x.png "Medium list item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image source="..." />
  <Subtitle>Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party.</Subtitle>
</Row>
```

## Medium list item + Description
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description@2x.png "Medium list item + Description"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image source="..." />
  <View styleName="vertical">
    <Subtitle>Fact Check: Wisconsin Democratic Debate</Subtitle>
    <Caption>20 hours ago</Caption>
  </View>
</Row>
```

## Medium list item + Description + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description-icon@2x.png "Medium list item + Description + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image source="..." />
  <View styleName="vertical">
    <Subtitle>Wilco Cover David Bowie's "Space Oddity"</Subtitle>
    <Caption>June 21  •  20:00</Caption>
  </View>
  <Icon iconName="add-to-calendar" />
</Row>
```

## Medium list item + Description + Icon + Label
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description-icon-label@2x.png "Medium list item + Description + Icon + Label"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image source="..." />
  <View styleName="vertical">
    <Subtitle>A really long shop item title that breaks in two lines</Subtitle>
    <View styleName="horizontal">
      <Subtitle>$120.00</Subtitle>
      <Caption styleName="strikethrough">$150.00</Caption>
    </View>
  </View>
  <Icon iconName="add-to-basket" />
</Row>
```

## Medium list item + Notification dot
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-notification-icon@2x.png "Medium list item + Notification dot"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Icon iconName="notification-dot" />
  <Image source="..." />
  <View styleName="vertical">
    <Subtitle>A really long shop item title that breaks in two lines</Subtitle>
    <Caption>20 hours ago</Caption>
  </View>
</Row>
```

## Medium list item + Description + Label
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description-label@2x.png "Medium list item + Description + Label"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image styleName="wide" source="..." />
  <View styleName="vertical">
    <Subtitle>Take A Romantic Break In A Boutique Hotel</Subtitle>
    <Divider />
    <View styleName="horizontal">
      <Caption styleName="flexible">3 days ago</Caption>
      <Caption>12:16</Caption>
    </View>
  </View>
</Row>
```
