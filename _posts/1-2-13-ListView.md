---
layout: doc
permalink: /docs/ui-toolkit/components/list-view
title: List View
section: UI toolkit
---

# ListView 

ListView component is a base component used to render Lists of items. This component is also used by GridView to create Grid-like menu structures.  

## ListView
![alt text]({{ site.baseurl }}/img/ui-toolkit/listview/list_view@2x.png "ListView"){:.docs-component-image}

#### JSX Declaration
```JSX
<ListView
    data={...}
    loading={...}
    onLoadMore={...}
    onRefresh={...}
    renderFooter={...}
    renderHeader={...}
    renderRow={...}
    renderSectionHeader={...}
    style={...}
/>
```

#### Props

* **autoHideHeader** : bool
  - Prop defining if List View header should automatically hide

* **data** : array  
  - Prop containing items that will be rendered by the ListView component

* **loading** : bool  
  - Prop that defines whether the ListView should render loading spinner (to indicate it's still loading data) or actual items (when the data successfully loads)

* **onLoadMore()** : function  
  - Callback function called when the ListView is scrolled all the way to the bottom of the first page. 
  - In this function you should update `data` array (state) with additional items

* **onRefresh()** : function  
  - Callback function called when the ListView is pulled down, triggering the refresh action. 
  - In this function you should update `data` array (state) with new items
  - If this function is declared, the Component will be considered refreshable

* **renderRow(item: Object)** : function  
  - Callback function that renders each item from `data`

* **renderFooter()** : function  
  - Callback function that renders the Footer content
 
* **renderHeader()** : function  
  - Callback function that renders the Header content

* **renderSectionHeader()** : function  
  - Callback function that renders the Section Header content

#### Style

* **loadMoreSpinner**
  - these Props are passed to Style Prop of the `Spinner` component that appears during initial content loading  
     
* **refreshControl**
  - these Props are passed to Style Prop of the `RefreshControl` component. You can also define `refreshControl.tintColor` prop in this Style, which is passed to the `tintColor` prop of the `RefreshControl` component.
