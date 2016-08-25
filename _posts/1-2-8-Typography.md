---
layout: doc
permalink: /docs/ui-toolkit/components/typography
title: Typography
section: UI toolkit
---

# Typography

Typography components are `Text` components with predefined styles. You can use them instead of `Text` components to avoid defining the same styles in multiple places. These components are connected to our themes, so by using them instead of `Text` it makes it easy to change the typography of the entire application by installing a new theme.

#### Props
All components in this section support everything that the standard React Native `Text` component support, but they support some additional props as well. Those props are documented here

* **lines**: number
  - Number of lines that the component should display, the component will be sized so that it always takes up the space for the number of lines specified in this prop. This prop should not be used for text elements that should be dynamically resized depending on length of their content, use the standard `numberOfLines` prop in those cases.

## Heading
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/heading@2x.png "Heading"){:.docs-component-image}

#### JSX Declaration
```JSX
<Heading>Mobile App Creator</Heading>
```

## Title
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/title@2x.png "Title"){:.docs-component-image}

#### JSX Declaration
```JSX
<Title>Mobile App Creator</Title>
```

## Subtitle
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/subtitle@2x.png "Subtitle"){:.docs-component-image}

#### JSX Declaration
```JSX
<Subtitle>Mobile App Creator</Subtitle>
```

## Text
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/text@2x.png "Text"){:.docs-component-image}

#### JSX Declaration
```JSX
<Text>Mobile App Creator</Text>
```

## Text strong
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/text-strong@2x.png "Text strong"){:.docs-component-image}

#### JSX Declaration
```JSX
<Text styleName="bold">Mobile App Creator</Text>
```

## Description
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/description-text@2x.png "Description"){:.docs-component-image}

#### JSX Declaration
```JSX
<Description>Mobile App Creator</Description>
```

## Caption
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/caption@2x.png "Caption"){:.docs-component-image}

#### JSX Declaration
```JSX
<Caption>Mobile App Creator</Caption>
```
