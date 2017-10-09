---
layout: doc
permalink: /docs/ui-toolkit/components/dropdown-menu
title: DropDownMenu
section: UI toolkit
---

# DropDownMenu

DropDownMenu is a full-screen contextual menu for displaying lists of items.

![DropDownMenu example]({{ site.url }}/img/ui-toolkit/dropdownmenu/drop_down_menu@2x.png "DropDownMenu"){:.docs-component-image}

## API

#### Props

* **onOptionSelected(option: object)**: function  
  - Called after tapping an option from menu, with all Props from that option passed to the function

* **options**: array  
  - Array of options that are rendered as `Button`s within `ListView`

* **selectedOption**: any
  - Sets which `option` from the `options` array is selected by default

* **titleProperty**: string
  - Attribute that defines what `key` from `options` Prop will be used to render option Titles in Dropdown menu

* **valueProperty**: string
  - Attribute that defines what `key` from `options` Prop will be used to link an option from `options` with `id` in Dropdown menu

* **visibleOptions**: number
  - Sets a number of options shown without scroll in Dropdown menu. Can also be set through style, note that defining through Props overrides definition in Style

#### Style names

* **horizontal**: renders a full-width selected option button with background color (defaults to gray), as defined in Theme

#### Style

* **modal**
  - Style prop for the outermost `View` within `Modal` component

* **modalItem**
  - Style prop that holds single item (row) in `ListView`

* **selectedOption**
  - Style prop for a dropdown `Button` that opens a full-screen contextual menu and represents currently selected option

* **visibleOptions**
  - Sets a number of options shown without scroll in Dropdown menu. Can also be set through Props, note that defining through Props overrides definition in Style

## Examples

```JSX
  constructor(props){
    super(props);
    this.state = {
      cars: [
        { title: 'Car A', value: 'Brand A' },
        { title: 'Car B ', value: 'Brand B' },
        { title: 'Car C', value: 'Brand C' },
      ],
    }
  }

  render() {
    return (
      <Screen>
        <DropDownMenu
          styleName="horizontal"
          options={this.state.cars}
          selectedOption={this.state.selectedCar ? this.state.selectedCar : this.state.cars[0]}
          onOptionSelected={(car) => this.setState({ selectedCar: car })}
          titleProperty="title"
          valueProperty="value"
        />
        <Text>{this.state.selectedCar ? this.state.selectedCar.value : this.state.cars[0].value}</Text>
      </Screen>
    );
  }
```
