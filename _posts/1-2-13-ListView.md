---
layout: doc
permalink: /docs/ui-toolkit/components/list-view
title: ListView
section: UI toolkit
---

# ListView 

ListView component is a base component used to render Lists of items. This component is also used by GridView to create Grid-like menu structures.  

![ListView example]({{ site.baseurl }}/img/ui-toolkit/listview/list_view@2x.png "ListView"){:.docs-component-image}

## API

#### Props

* **autoHideHeader**: bool
  - Prop defining if ListView header should automatically hide

* **data**: array  
  - Prop containing items that will be rendered by the ListView component

* **loading**: bool  
  - Prop that defines whether the ListView should render loading spinner (to indicate it's still loading data) or actual items (when the data is successfully loaded)

* **onLoadMore()**: function  
  - Called when the ListView is scrolled all the way to the bottom of the first page. 
  - In this function you should update `data` array (state) with additional items

* **onRefresh()**: function  
  - Called when the ListView is pulled down, triggering the refresh action. 
  - In this function you should update `data` array (state) with new items
  - If this function is declared, the Component will be considered refreshable

* **renderRow(item: Object)**: function  
  - Function that renders each item (row) from `data`

* **renderFooter()**: function  
  - Function that renders the Footer content
 
* **renderHeader()**: function  
  - Function that renders the Header content

* **renderSectionHeader()**: function  
  - Function that renders the Section Header content

#### Style

* **list** 
  - these Props are passed to Style Prop of underlying React-Native `ListView` component  

* **listContent**
  - these Props are passed to `contentContainerStyle` Prop of underlying React-Native `ListView` component  

* **loadMoreSpinner**
  - these Props are passed to Style Prop of the `Spinner` component that appears during initial content loading  
     
* **refreshControl**
  - these Props are passed to Style Prop of the `RefreshControl` component.  
  - You can also define `refreshControl.tintColor` prop in this Style, which is passed to the `tintColor` prop of the `RefreshControl` component.

## Examples

#### Minimal example
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

#### Full example