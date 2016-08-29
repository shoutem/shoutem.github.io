---
layout: doc
permalink: /docs/ui-toolkit/components/rows
title: Rows
section: UI toolkit
---

# Rows

Components rendered within lists are usually implemented using the row container. Row is a container that renders its children horizontally.

## Small list item
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item@2x.png "Small list item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Text numberOfLines={1}>Portland ugh fashion axe Helvetica, YOLO Echo Party</Text>
</Row>
```

## Small list item + Avatar thumbnail
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-avatar@2x.png "Small list item + Avatar thumbnail"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row styleName="small">
  <Image
    styleName="small-avatar"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-9.png' }}
  />
  <Text>Add comment</Text>
</Row>
```

## Small list item + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon@2x.png "Small list item + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row styleName="small">
  <Icon iconName="star" />
  <Text>Add to favorites</Text>
</Row>
```

## Small list item + Icon + Right Arrow
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon-right-arrow@2x.png "Small list item + Icon + Right Arrow"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row styleName="small">
    <Icon name="web" />
    <Text>About</Text>
    <Icon styleName="disclosure" name="right-arrow" />
</Row>
```
  
## Small list item + Icon + Description
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon-description@2x.png "Small list item + Icon + Description"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row styleName="small">
  <Icon name="laptop" />
  <View styleName="vertical">
    <Subtitle>Bridges Rock Gym</Subtitle>
    <Text numberOfLines={1}>www.example.com/deal/link/that-is-really-long</Text>
  </View>
  <Icon styleName="disclosure" name="right-arrow" />
</Row>
```

## Small list item + Avatar + Description + Caption
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/small-list-item-icon-description-caption@2x.png "Small list item + Avatar + Description + Caption"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image
    styleName="small-avatar top"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
  />
  <View styleName="vertical">
    <View styleName="horizontal space-between">
      <Subtitle styleName="">Dustin Malone</Subtitle>
      <Caption>20 minutes ago</Caption>
    </View>
    <Text styleName="multiline">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap. Hashtag typewriter banh mi, squid keffiyeh High.</Text>
  </View>
</Row>
```

## Medium list item
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item@2x.png "Medium list item"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image
    styleName="small rounded-corners"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }}
  />
  <Subtitle styleName="top">Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party.</Subtitle>
</Row>
```

## Medium list item + Description
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description@2x.png "Medium list item + Description"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image
    styleName="small rounded-corners"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-6.png' }}
  />
  <View styleName="vertical stretch space-between">
    <Subtitle>Fact Check: Wisconsin Music, Film & Photography Debate</Subtitle>
    <Caption>20 hours ago</Caption>
  </View>
</Row>
```

## Medium list item + Description + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description-icon@2x.png "Medium list item + Description + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image
    styleName="small rounded-corners"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-3.png' }}
  />
  <View styleName="vertical stretch space-between">
    <Subtitle>Wilco Cover David Bowie&#39;s "Space Oddity"</Subtitle>
    <Caption>June 21  ·  20:00</Caption>
  </View>
  <Button styleName="right-icon"><Icon name="add-event" /></Button>
</Row>
```

## Medium list item + Description + Icon + Label
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description-icon-label@2x.png "Medium list item + Description + Icon + Label"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image
    styleName="small rounded-corners"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
  />
  <View styleName="vertical stretch space-between">
    <Subtitle>Family Safari Vacation To The Home Of The Gods</Subtitle>
    <View styleName="horizontal">
      <Subtitle styleName="md-gutter-right">$120.00</Subtitle>
      <Caption styleName="line-through">$150.00</Caption>
    </View>
  </View>
  <Button styleName="right-icon"><Icon name="add-to-cart" /></Button>
</Row>
```

## Medium list item + Notification dot
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-notification-icon@2x.png "Medium list item + Notification dot"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <View styleName="notification-dot" />
  <Image
    styleName="small rounded-corners"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-2.png' }}
  />
  <View styleName="vertical stretch space-between">
    <Subtitle>Fact Check: Wisconsin Music, Film & Photography Debate</Subtitle>
    <Caption>20 hours ago</Caption>
  </View>
</Row>
```

## Medium list item + Description + Label
![alt text]({{ site.baseurl }}/img/ui-toolkit/rows/medium-list-item-description-label@2x.png "Medium list item + Description + Label"){:.docs-component-image}

#### JSX Declaration
```JSX
<Row>
  <Image
    styleName="medium rounded-corners"
    source={% raw %}{{{% endraw %} uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-1.png' }}
  />
  <View styleName="vertical stretch space-between">
    <Subtitle>Take A Romantic Break In A Boutique Hotel</Subtitle>
    <View styleName="horizontal space-between">
      <Caption>3 days ago</Caption>
      <Caption>12:16</Caption>
    </View>
  </View>
</Row>
```
  
#### Style names  

* **small**: sets the fixed height of Row to 65px
  
#### Nested components can also use these Style names:
* **disclosure**: applicable only for `Icon` components within `Row`. Pulls the icon to the right, and sets opacity to 50%.  
* **right-icon**: applicable only for `Button` components within `Row` 
* **notification-dot**: applicable only for `View` components within  `Row`. Pulls the notification dot to the left of the content.  
* **vertical**: applicable only for `View` components within `Row`. Adds a bottom margin below each `View` in `Row`.
  
