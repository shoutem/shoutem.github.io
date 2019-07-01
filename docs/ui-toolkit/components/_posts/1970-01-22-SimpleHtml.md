---
layout: doc
permalink: /docs/ui-toolkit/components/simplehtml
title: Simple HTML
section: UI toolkit
---

# SimpleHtml

The `SimpleHtml` component is based on the [react-native-render-html](https://github.com/archriss/react-native-render-html). It parses HTML content and renders it using basic `react-native` components. Since it's based on `react-native-render-html`, it supports all HTML tags supported by it.

## API

#### Props

* **body**: string  
  - Body of the HTML content that will be transformed by this component and rendered using React Native components

* **customHandleLinkPress**: func
  - A function that would determine what happens when a link is pressed. By default, it will open the link in the device's browser outside of the app

#### Style names

`SimpleHtml` has no specific style names.

#### Style

Using the style prop, you can overwrite the styling for 4 different HTML tags:

* **a**

* **ul**

* **ol**

* **img**

Considering this is based on `react-native-render-html`, we suggest checking their [documentation on styling](https://github.com/archriss/react-native-render-html#styling).

## Examples
<br />

### Images
<br />

#### JSX Declaration
```JSX
const imageExample = `
<p>The images are centered using inline styling</p>
<p>'align-self:center;'</p>

<p>Simple image:</p>
<img style="align-self:center;" src="https://shoutem.github.io/img/ui-toolkit/simplehtml/se-logo.png" />

<p>Image with link to <strong>shoutem.github.io</strong>:</p>
<a href="https://shoutem.github.io">
  <img style="align-self:center;" src="https://shoutem.github.io/img/ui-toolkit/simplehtml/se-logo.png" />
</a>
`;

return(
  <SimpleHtml
    body={imageExample}
  />
);
```

Tapping the image with a link will open it in the device's browser.

<p class="image">
<img src='{{ site.url }}/img/ui-toolkit/simplehtml/simplehtml-images.png'/>
</p>

### Lists
<br />

#### JSX Declaration

```JSX
const listExample = `
<p>Unordered lists:</p>
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

<p>Ordered lists:</p>
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
`

return(
  <SimpleHtml
    body={listExample}
  />
);
```

<p class="image">
<img src='{{ site.url }}/img/ui-toolkit/simplehtml/simplehtml-lists.png'/>
</p>


### Text
<br />

#### JSX Declaration

```JSX
const textExample = `
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>

<p>Paragraph with <strong>bolded</strong> and <em>emphasized</em> text.</p>

<p style="background-color:powderblue;color:red;font-size:22px;">
Paragraph with simple inline HTML styling with 'powderblue' background color, 'red' text color and font size 22px.
</p>

<p>Paragraph with a <a href="https://shoutem.github.io">link</a>.</p>
`

return(
  <SimpleHtml
    body={textExample}
  />
);
```

Tapping the link will open it in the device's browser.

<p class="image">
<img src='{{ site.url }}/img/ui-toolkit/simplehtml/simplehtml-text.png'/>
</p>
