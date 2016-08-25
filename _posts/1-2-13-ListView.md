---
layout: doc
permalink: /docs/ui-toolkit/components/list-view
title: List View
section: UI toolkit
---

# ListView 

ListView component is base component that is used to render Lists of items. This component is also used by GridView to create Grid-like menu structure.  

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

* **data** : array  
  - Prop containing items that will be rendered by ListView component

* **loading** : bool  
  - Prop that defines whether the ListView should render loading spinner (still loading data) or actual items (data successfully loaded)

* **onLoadMore** : function  
  - Callback function that is called when ListView is scrolled all way to the bottom of the first page. In this function you should update `data` array with additional items

* **onRefresh** : function  
  - Callback function that is called when ListView is swiped towards down, triggering refresh action. In this function you should update `data` array with new items
  - If this function is declared, it is assumed that Component will be refreshable, otherwise Component will not be refreshable.

* **renderRow** : function  
  - Callback function that renders each item from `data`

* **renderFooter** : function  
  - Callback function that renders Footer content
 
* **renderHeader** : function  
  - Callback function that renders Header content

* **renderSectionHeader** : function  
  - Callback function that renders Section Header content

#### Style

* **list**
  - Component is passing content from this Style Prop to `customStyles` prop of underlying `GiftedListView` component

* **loadMoreSpinner**
  - Component is passing content from this Style Prop to Style Prop of `FullScreenSpinner` component that appears during initial content loading  
     
* **newDataSpinner**
  - Component is passing content from this Style Prop to Style Prop of `PlatformSpinner` component that appears when List is scrolled all way to bottom, together with calling the callback from `onLoadMore` prop
  
* **tintColor**
  - Component is passing content from this Style Prop to `tintColor` prop of `RefreshControl` component that underlying `GiftedListView` is reusing. 
