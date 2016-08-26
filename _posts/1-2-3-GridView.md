---
layout: doc
permalink: /docs/ui-toolkit/components/grid-view
title: Grid View
section: UI toolkit
---

# Grid View

Similar to [ListView]({{ site.baseurl }}/docs/ui-toolkit/list-view), Grid View is used to render Grid of items.  

Instead of having a separate Grid View component, use `GridRow` component to encapsulate a single row of items (cells), and then pass the `GridRow` as a normal row to a `ListView` component which does the actual content rendering.  
  
The main idea behind this approach is to allow developers to have a variable number of columns in each row, for example: the first row can have only 1 column, followed by a number of rows with 2 columns.  

## GridView
![alt text]({{ site.baseurl }}/img/ui-toolkit/grid_view@2x.png "Grid View"){:.docs-component-image}

#### JSX Declaration
```JSX
<GridRow 
    columns={...}
    key={...}>
  {children}
</GridRow>
```

#### Props

* **columns** : number  
  - Number of columns in the GridRow

* **key**: number
  - Unique key-ID of the GridRow

#### Style names

* None
