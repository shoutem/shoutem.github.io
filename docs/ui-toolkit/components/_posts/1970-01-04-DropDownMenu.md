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
      {
        brand: "Audi",
        models:
          {
            model: "Audi R8",
            image: {
              url: "https://shoutem.github.io/img/ui-toolkit/dropdownmenu/Audi-R8.jpg"
            },
            description: "Exclusively designed by Audi AG's "
            + "private subsidiary company, Audi Sport GmbH."
          }
      },
      {
        brand: "Bugatti",
        models: {
          model: "Chiron",
          image: {
            url: "https://shoutem.github.io/img/ui-toolkit/dropdownmenu/Chiron.jpg"
          },
          description: "Bugatti premiered the Bugatti "
            + "Chiron as a successor to the Veyron."
        }
      },
      {
        brand: "Chrysler",
        models: {
          model: "Dodge Viper",
          image: {
            url: "https://shoutem.github.io/img/ui-toolkit/dropdownmenu/Dodge-Viper.jpg"
          },
          description: "The Dodge Viper is a super car "
            + "manufactured by Dodge (SRT for 2013 and 2014)."
        }
      },
    ],
  }
}

render() {
  const selectedCar = this.state.selectedCar || this.state.cars[0];

  return (
    <Screen>
      <NavigationBar
        title="Cars"
        styleName="inline"
      />
      <DropDownMenu
        styleName="horizontal"
        options={this.state.cars}
        selectedOption={selectedCar ? selectedCar : this.state.cars[0]}
        onOptionSelected={(car) => this.setState({ selectedCar: car })}
        titleProperty="brand"
        valueProperty="cars.model"
      />
      <Title styleName="h-center">
        {selectedCar ?
          selectedCar.models.model :
          this.state.cars[0].models.model}
      </Title>
      <Image
        styleName="large"
        source={{
          uri: selectedCar ?
            selectedCar.models.image.url :
            this.state.cars[0].models.image.url
        }}
      />
      <Text styleName="md-gutter-horizontal">
        {selectedCar ?
          selectedCar.models.description :
          this.state.cars[0].models.description}
      </Text>
    </Screen>
  );
}
```
