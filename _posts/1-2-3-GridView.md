---
layout: doc
permalink: /docs/ui-toolkit/components/grid-view
title: Grid View
section: UI toolkit
---

# Grid View

Similar to [ListView]({{ site.baseurl }}/docs/ui-toolkit/list-view), Grid View is used to render Grid of items.  

Instead of having separate Grid View component, use `GridRow` component to encapsulate a single row of items (cells), and then pass `GridRow` as normal row to `Listview` component which does the actual content rendering.  
  
Main idea behind this approach is to allow developers to have variable number of columns in Grid.  
This means that developer can accomplish first row with 1 column, and then 1 rows with 2 columns etc.  

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
  - Number of columns in the Grid Row

* **key**: number
  - Unique key-ID of GridRow

#### Style names

* None