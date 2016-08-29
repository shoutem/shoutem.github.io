---
layout: doc
permalink: /docs/ui-toolkit/components/typography
title: Typography
section: UI toolkit
---

# Typography

Typography components are `Text` components with predefined styles. You can use them instead of `Text` components to avoid defining the same styles in multiple places. These components are connected to our themes, so using them instead of `Text` components makes it easy to change the typography of the entire application by installing a new theme.

#### Props
All components in this section support every prop that the standard React Native `Text` component supports, such as `numberOfLines` prop.

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
<Title>MOBILE APP CREATOR</Title>
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

## Caption
![alt text]({{ site.baseurl }}/img/ui-toolkit/typography/caption@2x.png "Caption"){:.docs-component-image}

#### JSX Declaration
```JSX
<Caption>Mobile App Creator</Caption>
```


#### Style names

* **line-through**: Defines a line through the text
* **h-center**: Centers the text horizontally
* **bright**: Sets text color to `Light` color set in Theme
* **bold**: Sets text to be bold
* **multiline**: Increases line-height to allow text to wrap 
* **v-center**: Works only in combination with `multiline` styleName. Applies additional top and bottom margins to compensate the unsupported `textAlignVertical` prop on iOS
