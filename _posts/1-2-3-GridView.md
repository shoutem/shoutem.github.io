---
layout: doc
permalink: /docs/ui-toolkit/grid-view
title: Grid View
---

# GridView

Similar to [ListView]({{ site.baseurl }}/docs/ui-toolkit/list-view), GridView component is used to render Grid of items in predefined number of columns. 

## GridView
![alt text]({{ site.baseurl }}/img/ui-toolkit/grid_view@2x.png "GridView"){:.docs-component-image}

#### JSX Declaration
```JSX
<AdvancedGridView
    data={...}
    gridColumns={...}
    search={...} 
    fetch={...}
    renderGridItem={...}
    style={...}
/>
```

#### Props

* **gridColumns** : number  
  - Number of columns in the grid 

* **renderGridItem** : function  
  - Callback function that is called to render each grid item
  
* This Component also accepts all Props that underlying ListView component is accepting (i.e. `items`, `search`, `style` etc)


#### Style

* This component also accepts all Style Props from the underlying [ListView]({{ site.baseurl }}/docs/ui-toolkit/list-view).
