---
layout: doc
permalink: /docs/ui-toolkit/components/html
title: HTML
section: UI toolkit
---

# Html

The `Html` component parses HTML content and renders it using corresponding React Native and Shoutem UI toolkit components.

## API

#### Props

* **body**: string  
  - Body of the HTML content that will be transformed by this component and rendered using React Native and Shoutem UI toolkit components
* **onError**: function
  - Triggered if Html component fails to parse given HTML (from `body` prop)
* **openURL(url)**: function
  - Triggered when user taps on HTML link. It can be used to override default action (defaults to opening url in external browser)
* **renderElement(node)**: function
  - Function that can be used to define (return) custom Element transformer (`Image` and `Video` elements), which have priority in respect to default element transformers
* **renderText(node)**: function
  - Function that can be used to define (return) custom Text transformer (`p`, `pre`, `li`, `br`, `h1`, `h2`, `h3`, `h4`, `h5` HTML elements), which have priority in respect to default Text transformers

#### Style names

`Html` has no specific style names.

#### Style

* **container**
  - Style prop applied to `View` component surrounding transformed content

* **img**
  - Style prop for Image transformer.
  - Height defaults to 200 px.

* **video**
  - Style prop for Video transformer.
  - Height defaults to 200 px.

## Example
<br />

#### JSX Declaration
```JSX
<Html
    body={...}
    onError={...}
    openUrl={...}
    renderElement={...}
    renderText={...}
    style={...}
/>
```
