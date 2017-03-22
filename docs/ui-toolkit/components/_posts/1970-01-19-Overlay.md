---
layout: doc
permalink: /docs/ui-toolkit/components/overlay
title: Overlay
section: UI toolkit
---

# Overlay 

`Overlay` provides a convenient way to place content over `Image`, through semi-transparent background.

![Solid (bright) overlay example]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-price-tag@2x.png "Solid (bright) overlay example"){:.docs-component-image}

## API

#### Props

* `Overlay` component doesn't have specific (custom) Props, however, it supports every prop that the standard React Native `View` component supports. For full list of available props, visit 
[React Native View component documentation](https://facebook.github.io/react-native/docs/view.html "React Native View component documentation")  

#### Style names

* if style name isn't given, then `dark overlay` background color (as defined in Theme) is applied below nested content
* **fill-parent**: sets the Overlay to fully fill the parent container (without any margins, padding etc.)
* **rounded-small**: sets the Overlay to be rounded, with fixed width and height of 38x38 px
* **solid-bright**: sets the text color to `Darker` variant, and the `backgroundColor` to `Background` variant, as defined in Theme
* **solid-dark**: sets the `backgroundColor` to `Darker` variant, while keeping the text color set to `Light` variant, as defined in Theme

#### Style
* Supports every `Style` prop that the standard React Native `View` component supports 


## Example

### Solid (bright) overlay
![Solid (bright) overlay example]({{ site.baseurl }}/img/ui-toolkit/tiles/large-list-item-price-tag@2x.png "Solid (bright) overlay example"){:.docs-component-image}

#### JSX Declaration
```JSX
<Image
  styleName="large-square"
  source={{ uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-3.png' }}
>
  <Tile>
    <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
    <Overlay styleName="solid-bright">
      <Subtitle styleName="sm-gutter-horizontal">$18.30</Subtitle>
    </Overlay>
  </Tile>
</Image>
```
  
### Solid (dark) overlay
![Solid (dark) overlay example]({{ site.baseurl }}/img/ui-toolkit/headers/header-products-item@2x.png "Solid (dark) overlay example"){:.docs-component-image}

#### JSX Declaration
```JSX
<Tile styleName="text-centric">
  <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
  <Overlay styleName="solid-dark">
    <Subtitle styleName="sm-gutter-horizontal">$18.30</Subtitle>
  </Overlay>
</Tile>
```
    



