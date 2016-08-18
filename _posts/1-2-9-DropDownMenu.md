---
layout: doc
permalink: /docs/ui-toolkit/components/dropdown-menu
title: Dropdown Menu
section: UI toolkit
---

# DropDownMenu

DropDownMenu is a full screen contextual menu for displaying lists of links. 

## DropDownMenu
![alt text]({{ site.baseurl }}/img/ui-toolkit/drop_down_menu@2x.png "DropDownMenu"){:.docs-component-image}


#### JSX Declaration
```JSX
<DropDownMenu
      data={...}
      bindings={...}
      onItemSelected={...}
      selectedItem={...}
      style={...}
/>
```

#### Props

* **data** : array  
  - Array of items that are then rendered as `Button`s within `ListView`

* **bindings** : array  
  - Array of key:value attributes `{{ text: 'name', value: 'id' }}` that define binding rules for `items` array (text and id values).
  
* **onItemSelected** : callback function  
  - Called after a tap on some item from menu, passing all Props from that item to Callback function

* **selectedItem** : any 
  - Sets a pre-selected `item`

#### Style

* **popUpButton**
  - Style prop for a dropdown `Button` that opens a full screen contextual menu

* **modalContainer**
  - Style prop for the outermost `View` within `Modal` component

* **modalItems**
  - Style prop for all items within `ListView`

* **modalItem**
  - Style prop that holds single item (row) in `ListView`
 
* **modalItemText**
  - Style prop for `Text` component in `item`.
  - _Note:_ Text is forced to be uppercase  
 
* **modalCloseButton**
  - Style prop for a close `Button` that closes a full screen contextual menu
