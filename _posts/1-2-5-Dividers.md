---
layout: doc
permalink: /docs/ui-toolkit/components/dividers
title: Dividers
section: UI toolkit
---

# Dividers

Dividers are components used to add space or any other separator between other components.

## Divider
![alt text]({{ site.baseurl }}/img/ui-toolkit/dividers/divider@2x.png "Divider"){:.docs-component-image}

#### JSX Declaration
```JSX
<Divider />
```

## Line divider
![alt text]({{ site.baseurl }}/img/ui-toolkit/dividers/line_divider@2x.png "Line divider"){:.docs-component-image}

#### JSX Declaration
```JSX
<Divider styleName="line" />
```

* Note that line divider doesn't contain padding around the line. White space around line on image above is only for clarification purposes.

## Section divider
Section dividers are usually used in lists, to separate groups of similar list items, for example to group contacts by the first letter of their name. ListView will automatically style all dividers added to it.

![alt text]({{ site.baseurl }}/img/ui-toolkit/dividers/section_divider@2x.png "Section divider"){:.docs-component-image}

#### JSX Declaration
```JSX
<Divider styleName="section-header" />
```

## Section divider + Label
![alt text]({{ site.baseurl }}/img/ui-toolkit/dividers/section_divider_+_label@2x.png "Section divider + Label"){:.docs-component-image}

#### JSX Declaration
```JSX
<Divider styleName="section-header">
  <Caption>INFORMATION</Caption>
</Divider>
```

## Section divider + Label + Caption
![alt text]({{ site.baseurl }}/img/ui-toolkit/dividers/section_divider_+_label_+_caption@2x.png "Section divider + Label + Caption"){:.docs-component-image}

#### JSX Declaration
```JSX
<Divider styleName="section-header">
  <Caption>PRODUCT NAME</Caption>
  <Caption>PRICE</Caption>
</Divider>
```