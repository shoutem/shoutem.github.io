---
layout: doc
permalink: /docs/ui-toolkit/components/typography
title: Typography
section: UI toolkit
---

# Typography

Typography components consist of several flavors of `Text` components with predefined styles. Available components are:

```JSX
<Heading>...</Heading>
<Title>...</Title>
<Subtitle>...</Subtitle>
<Text>...</Text>
<Caption>...</Caption>
```

![Title example]({{ site.url }}/img/ui-toolkit/typography/title@2x.png "Title"){:.docs-component-image}

## API

#### Props
* Every component in this section supports every `prop` that the standard React Native `Text` component supports (eg. `numberOfLines`). You can see the full list of available props on React Native [Text component documentation](https://facebook.github.io/react-native/docs/text.html "React Native Text component documentation").

#### Style names

* **bold**: Sets text to be bold
* **h-center**: Centers the text horizontally
* **line-through**: Defines a line through the text
* **multiline**: Increases line-height to allow text to wrap
* **v-center**: Works only in combination with `multiline` styleName. Applies additional top and bottom margins to compensate the unsupported `textAlignVertical` prop on iOS
* **secondary**: Applies secondary styles as defined in [theme](https://github.com/shoutem/ui/blob/develop/theme.js#L1011)

## Examples

### Heading
![Heading example]({{ site.url }}/img/ui-toolkit/typography/heading@2x.png "Heading"){:.docs-component-image}

#### JSX Declaration
```JSX
<Heading>Mobile App Creator</Heading>
```

### Title
![Title example]({{ site.url }}/img/ui-toolkit/typography/title@2x.png "Title"){:.docs-component-image}

#### JSX Declaration
```JSX
<Title>MOBILE APP CREATOR</Title>
```

### Subtitle
![Subtitle example]({{ site.url }}/img/ui-toolkit/typography/subtitle@2x.png "Subtitle"){:.docs-component-image}

#### JSX Declaration
```JSX
<Subtitle>Mobile App Creator</Subtitle>
```

### Text
![Text example]({{ site.url }}/img/ui-toolkit/typography/text@2x.png "Text"){:.docs-component-image}

#### JSX Declaration
```JSX
<Text>Mobile App Creator</Text>
```

### Caption
![Caption example]({{ site.url }}/img/ui-toolkit/typography/caption@2x.png "Caption"){:.docs-component-image}

#### JSX Declaration
```JSX
<Caption>Mobile App Creator</Caption>
```
