---
layout: doc
permalink: /docs/ui-toolkit/components/grid-view
title: GridView
section: UI toolkit
---

# GridView

Similar to [ListView]({{ site.baseurl }}/docs/ui-toolkit/components/list-view), `GridView` is used to render Grid of items.  

![GridView (GridRow) example]({{ site.baseurl }}/img/ui-toolkit/grid_view@2x.png "Grid View"){:.docs-component-image}

Instead of having a separate `GridView` component, you should use `GridRow` component to encapsulate a single row of items (cells), and then pass the `GridRow` as a normal row to a `ListView` component which does the actual content rendering.  

The main idea behind this approach is to allow developers to have a variable number of columns in each row, for example, the first row can have only 1 column, followed by a number of rows with 2 columns.  

## API

#### Props

* **columns**: number  
  - Number of columns in the GridRow

#### Style names

* None

#### Methods

* **groupByRows(data: *array*, columns: *number*, getColumnSpan: *function*)**
  - **data**: *array* containing all items.
  - **columns**: *number* defining number of columns in grid.
  - **getColumnSpan**: *function* (optional) returns the column span of a single element. Each element has a span of 1 by default.
  - **returns** an array of rows, where each row is an array of data elements.
  
## Examples

#### Minimal example
```JSX
const groupedData = GridRow.groupByRows(data, 2)

<GridRow columns={3}>
  {groupedData}
</GridRow>
```  

#### Full example

```JSX
renderRow(data) {
  // data contains grouped data for one row, 
  // so we need to remap it into cells and pass to GridRow
  const cellViews = _.map(data, (item) => {
  return (
    <MyGridCell
      key={item.id}
      data={item}
      onPress={...}
    />
  );
});
return (
  <GridRow columns={2}>
    {cellViews}
  </GridRow>
  );
}

renderArticles(data) {
  // Group the data into rows with 2 columns
  const groupedData = GridRow.groupByRows(data, 2)

  return (
    <ListView
      data={groupedData}
      renderRow={this.renderRow}
      {...}
    />
  );
}
```
