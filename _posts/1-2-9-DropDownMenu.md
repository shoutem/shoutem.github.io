---
layout: doc
permalink: /docs/ui-toolkit/components/dropdown-menu
title: Dropdown Menu
section: UI toolkit
---

# DropDownMenu

DropDownMenu is a full screen contextual menu for displaying lists of links. 

## DropDownMenu
![alt text]({{ site.baseurl }}/img/ui-toolkit/dropdownmenu/drop_down_menu@2x.png "DropDownMenu"){:.docs-component-image}


#### JSX Declaration
```JSX
<DropDownMenu
      onOptionSelected={...}
      options={[
        {
          name: 'Lifestyle',
          id: '7',
        },
        {
          name: 'Food',
          id: '8',
        },
      ]}
      selectedOption={...}
      titleProperty={"name"}
      valueProperty={"id"}
      visibleOptions={...}
      styleName={...}
      style={...}
/>
```

#### Props
 
* **onOptionSelected** : callback function  
  - Called after a tap on some option from menu, passing all Props from that option to Callback function.

* **options** : array  
  - Array of options that are then rendered as `Button`s within `ListView`.

* **selectedOption** : any 
  - Sets a pre-selected `options`.

* **titleProperty** : string
  - Attribute that defines what `key` from `options` Prop will be used to render option Titles in Dropdown menu.

* **valueProperty** : string
  - Attribute that defines what `key` from `options` Prop will be used to link option from `options` with `id` in Dropdown menu.

* **visibleOptions** : number
  - Sets a number of options shown without scroll in DropDown menu.

#### Style names

* **horizontal** : renders a full-width selected option button with background color (defaults to gray), as defined in Theme.

#### Style

* **modal**
  - Style prop for the outermost `View` within `Modal` component.

* **modalItem**
  - Style prop that holds single item (row) in `ListView`.
 
* **selectedOption**
  - Style prop for a dropdown `Button` that opens a full screen contextual menu (and which is representing currently selected option).

