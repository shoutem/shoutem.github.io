---
layout: doc
permalink: /docs/extensions/reference/theme-variables
title: Theme variables
section: Reference
---

# Theme variables schema reference

Adjustment of theme is done through theme variables. These variables can be set through Shoutem builder, which interprets the variables schema.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/style-tab-themes-customise_theme-no_picker.png'/>
</p>

## Structure of variables schema file

Variables schema file is nothing else than Shoutem flavored [JSON Schema](https://spacetelescope.github.io/understanding-json-schema/UnderstandingJSONSchema.pdf).

Example:

```JSON
{
  "formats": {
    "font": {
      "title": "Font",
      "default": {
        "fontFamily": "Rubicon",
        "fontStyle": "normal",
        "fontWeight": "normal",
        "fontSize": 20,
        "color": "rgba(255,255,255,1)"
      },
      "constraints": {
        "fontFamily": {
          "enum": [ "normal", "Rubicon"]
        },
        "fontStyle": {
          "enum": ["normal", "italic"]
        },
        "fontWeight": {
          "enum": ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
        },
        "fontSize": {
          "minimum": 12,
          "maximum": 42
        }
      }
    }
  },
  "properties": {
    "primaryColor": {
      "type": "string",
      "format": "color",
      "title": "Primary color",
      "default": "rgba(12, 111, 34, 0.5)"
    },
    "textFont": {
      "type": "object",
      "format": "font",
      "title": "Text font",
      "default": {
        "fontFamily": "Rubicon",
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

- Color - `"type": "string", "format": "color"`
- Font - `"type": "object", "format": "font"`

Based on what the type is, descriptor has different fields. However, some fields are shared:

- **title**: Title of the variable on builder interface.
- **default**: Default value of the interface control. Value depends on the type.
- **disabled**: Whether admin can set the variable or not. Defaults to `false`.

There is also field `formats`. It is used to describe default values and constraints of specific format. 
Each variable of the same format thus _inherits_ values defined in `formats`, but can also override each field with its own value.

#### Color

Variable of type color will result in color picker in interface for customizing theme.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/style-tab-themes-customize_theme-color.png'/>
</p>

###### Default value

String. One of the React Native supported [Color formats](https://facebook.github.io/react-native/docs/colors.html).


###### Fields 

Currently, there are no additional properties variable descriptor supports.

#### Font

Variable of type font will result in complex control in interface for customizing theme.

<p class="image">
<img src='{{ site.url }}/img/tutorials/settings-theme/style-tab-themes-customize_theme-font.png'/>
</p>


###### Default value

Object with following fields:

```JSON
{
  "fontFamily": "Rubicon",
  "fontStyle": "normal",
  "fontWeight": "normal",
  "fontSize": 20,
  "color": "rgba(255,255,255,1)"
}
```

- **fontFamily** - String. One of the font families listed in `constraints.fontFamily` field. Defaults to "Rubicon".
- **fontStyle** - String. One of the font styles listed in `constraints.fontSize` field. Defaults to "normal".
- **fontWeight** - String. One of the font weights listed in `constraints.fontWeight` field. Defaults to "normal".
- **fontSize** - Number. Defaults to 12
- **color** - String. One of the React Native supported [Color formats](https://facebook.github.io/react-native/docs/colors.html). Defaults to `"rgba(0,0,0,1)"`

###### Fields 

Font variable descriptor defines additional property `constraints`, which describes values that are available for each field: 

- **fontFamily**: enum of Strings. All available font families should  be listed here. Default values: `"normal", "Rubicon"`.
- **fontStyle**: enum of Strings. All available font styles should be listed here. Default values: `"normal", "italic"`.
- **fontWeight**: enum of Strings. All available font weights should be listed here. Default values: `"normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"`.
- **fontSize**: object that defines minimal and maximal font size. It has two fields of type Number: `"minimum"` - defaults to 12 and `"maximum"` - defaults to 42.
