---
layout: doc
permalink: /docs/ui-toolkit/rich-media
title: Rich Media
section: UI toolkit
---

# RichMedia

RichMedia component parses HTML content and replaces is with corresponding React Native components.

## JSX Declaration
```JSX
<RichMedia
    body={item.body}
    attachments={item.attachments}
/>
```
#### Image
>[TBD]

#### Props

* **attachments** : object  
  - Prop containing Shoutem Data Exchange Protocol compatible attachments (image, video) that are referenced in `Body` using `<attachment>` HTML tags, per 
  
  
> davor: we need more explanation here like: Attachments are Shoutem specific DOM elements for video and image galleries that can be insterted within the HTML.  
> kale: rephrased a bit, see comment below  
> davor: Why are we not passing attachments within HTML?  
> kale: check this https://fiveminutes.jira.com/wiki/display/SE/Data+Exchange+Protocol  
> kale: DEP is designed to reference attachments by using `<attachment>` tags in body, and then to pull those attachments from `attachment` JSON object

* **body** : string  
  - Prop containing HTML code that will be rendered using this Component  

#### Style

* **a**
  - Style prop for content within HTML `a` tags
  
* **b**
  - Style prop for content within HTML `b` tags
  
* **code**
  - Style prop for content within HTML `code` tags
  
* **em**
  - Style prop for content within HTML `em` tags
  
* **i**
  - Style prop for content within HTML `i` tags
  
* **img**
  - Style prop for content within HTML `img` tag
  
* **p**
  - Style prop for content within HTML `p` tags
  
* **pre**
  - Style prop for content within HTML `pre` tags
  
* **strong**
  - Style prop for content within HTML `strong` tags
  
* **video**
  - Style prop for content withing HTML `video` tags