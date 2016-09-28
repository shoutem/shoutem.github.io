---
layout: doc
permalink: /docs/extensions/reference/theme-variables
title: Theme variables
section: Reference
---

# Theme variables schema reference

Adjustment of theme is done through theme variables. These variables can be set through Shoutem builder, which interprets the variables schema.

## Structure of variables schema file

Variables schema file is nothing else than Shoutem flavored [JSON Schema](https://spacetelescope.github.io/understanding-json-schema/UnderstandingJSONSchema.pdf).

Example:

```JSON
{
  "properties": {
    "primaryColor": {
      "type": "string",
      "format": "shoutem.styles.color",
      "title": "Primary color",
      "default": "rgba(12, 111, 34, 0.5)"
    },
    "textFont": {
      "type": "object",
      "format": "shoutem.stylesfont",
      "title": "Text font",
      "default": {
        "fontFamily": "rubicon",
        "fontStyle": "normal",
        "fontWeight": "regular",
        "fontSize": 15,
        "color": "rgba(255,255,255,1)"
      }
    }
  },
  "layout": {
    "sections": [{
      "title": "Colors",
      "properties": ["primaryColor"]
    }, {
      "title": "Text",
      "properties": ["textFont"]
    }]
  }
}
```

It's `properties` are the variable descriptors - they describe the variable to the Shoutem builder. For now, there are only 2 types of variables:

- Color - `"type": "string", "format": "shoutem.styles.color"`
- Font - `"type": "object", "format": "shoutem.styles.font"`

Based on what the type is, descriptor has different fields. However, some fields are shared:

- **title**: Title of the variable on builder interface.
- **default**: Default value of the interface control. Value depends on the type.
- **disabled**: Whether admin can set the variable or not. Defaults to `false`.

#### Color

Variable of type color will result in color picker in interface for customizing theme.

[Picture]

###### Default value

String. One of the React Native supported [Color formats](https://facebook.github.io/react-native/docs/colors.html).


###### Fields 

Currently, there are no additional properties variable descriptor supports.

#### Font

Variable of type font will result in complex control in interface for customizing theme.

[Picture]

###### Default value

Object with following fields:

```JSON
{
  "fontFamily": "rubicon",
  "fontStyle": "normal",
  "fontWeight": "normal",
  "fontSize": 20,
  "color": "rgba(255,255,255,1)"
}
```

- **fontFamily** - String. Following fonts are supported: _Rubicon_ and _Normal_ (React Native's default). Defaults to "Rubicon".
- **fontStyle** - String. One of: `"normal", "italic"`. Defaults to "normal".
- **fontWeight** - String. One of: `"normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"`
- **fontSize** - Number. Defaults to 12
- **color** - String. One of the React Native supported [Color formats](https://facebook.github.io/react-native/docs/colors.html). Defaults to `"rgba(0,0,0,1)"`

###### Fields 

These are the additional properties font variable descriptor supports:

- **minFontSize**: Minimal font size. Number. Defaults to 8.
- **maxFontSize**: Maximal font size. Number. Defaults to 42.
