---
layout: doc
permalink: /docs/ui-toolkit/components/navigation-bar
title: NavigationBar
section: UI toolkit
---

# NavigationBar

Shoutem UI toolkit contains two different `NavigationBar` components:

1) Simple 3-column `NavigationBar` that can be used on any screen or `Modal` window

![Navbar / Solid example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-title-only@2x.png "Navbar / Solid"){:.docs-component-image}

2) `Redux` and stack-based `NavigationBar` enables any view to act as a navigation view using reducers to manipulate state at a top-level object. Can be used only on components that are within the stack (i.e. it cannot be used on `Modal` window). Internally, it relies on [`NavigationExperimental`](https://github.com/shoutem/react-native-navigation-experimental-compat) from `react-native-navigation-experimental-compat`.

# Simple NavigationBar

## Import

```JSX
import { NavigationBar } from '@shoutem/ui'
```

`NavigationBar` is `node` for [Navigator](https://facebook.github.io/react-native/docs/navigator.html#navigationbar) React Native component. It provides a simpler way to use 3-column navigation bar.

## API

#### Props

* **title**: string
  - Sets the `centerComponent` prop to a `Title` component with the provided string as the title text

* **centerComponent**: object  
  - Represents the center component in `NavigationBar` (e.g. screen title)

* **leftComponent**: object  
  - Represents the left component in `NavigationBar` (e.g. back button)

* **rightComponent**: object
  - Represents the right component in `NavigationBar` (e.g. drop-down menu button)

* **hasHistory**: bool
  - If set to `true`, the `leftComponent` will become a back arrow which triggers `navigateBack` on tap

* **navigateBack**: function
  - Callback triggered after tapping the `Back` button if `hasHistory` is set to `true`  

#### Style names

* **clear**: sets the `Text` color to white and background colors to transparent
* **inline**: forces relative positioning of `NavigationBar` component, allowing component to be used inline with other components, i.e. `ListView`, without its content overlapping `NavigationBar`
* **no-border**: removes the bottom border

#### Style

* **centerComponent**
  - Style applied to center navigation component

* **container**
  - Style for `View` that holds all components within `NavigationBar`

* **componentsContainer**
  - Style for `View` container that holds `leftComponent`, `centerComponent` and `rightComponent` objects

* **leftComponent**
  - Style applied to left navigation component

* **rightComponent**
  - Style applied to right navigation component


## Examples

### Solid
![Solid example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-title-only@2x.png "Solid"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  centerComponent={<Title>TITLE</Title>}
/>
```

### Showing Background Image
![Clear (Image) example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-imageoverlay-image@2x.png "Clear (Image)"){:.docs-component-image}

#### JSX Declaration
```JSX
<ImageBackground
  source={% raw %}{{{% endraw %}uri: '{{site.url}}/img/ui-toolkit/examples/image-3.png'}}
  style={% raw %}{{{% endraw %} width: 375, height: 70 }}
>
  <NavigationBar
    styleName="clear"
    centerComponent={<Title>TITLE</Title>}
  />
</ImageBackground>
```

### Navbar + Drawer
![Navbar + Drawer example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-drawernav@2x.png "Navbar + Drawer"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={<Icon name="sidebar" />}
  centerComponent={<Title>TITLE</Title>}
/>
```

### Navbar + Picker
![Navbar + Picker example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-picker@2x.png "Navbar + Picker"){:.docs-component-image}

#### JSX Declaration
```JSX
constructor(props){
  super(props);
  this.state = {
    filters: [
      { name: 'Filter', value: 'Filter' },
      { name: 'Sport', value: 'Sport' },
      { name: 'Food', value: 'Food' },
    ],
  }
}

render() {
  return (
    <NavigationBar
      styleName="inline"

      leftComponent={
        <Button>
          <Icon name="sidebar" />
        </Button>
      }
      centerComponent={
        <Title>
          {this.state.selectedFilter
            ? this.state.selectedFilter.value
            : this.state.filters[0].value}
        </Title>
      }
      rightComponent={
        <DropDownMenu
          options={this.state.filters}
          selectedOption={this.state.selectedFilter ? this.state.selectedFilter : this.state.filters[0]}
          onOptionSelected={(filter) => this.setState({ selectedFilter: filter })}
          titleProperty="name"
          valueProperty="value"
        />
      }
    />
  );
}
```

### Navbar + Action
![Navbar + Action example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-action@2x.png "Navbar + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={<Icon name="sidebar" />}
  centerComponent={<Title>TITLE</Title>}
  rightComponent={(
  <Button styleName="clear">
    <Text>List</Text>
  </Button>
)}
/>
```

### Navbar + Icon Button
![Navbar + Icon example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-icon@2x.png "Navbar + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={<Icon name="sidebar" />}
  centerComponent={<Title>TITLE</Title>}
  rightComponent={(
    <Button>
      <Icon name="cart" />
    </Button>
  )}
/>
```

### Navbar (Sublevel) + Icon
![Navbar (Sublevel) + Icon example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-sublevel-icon@2x.png "Navbar + (Sublevel) + icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  hasHistory
  centerComponent={<Title>TITLE</Title>}
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

### Navbar (Sublevel) + Action (no border)
![Navbar (Sublevel) + Action (no border) example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-sublevel-action-no-border@2x.png "Navbar (Sublevel) + Action (no border)"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  styleName="no-border"
  hasHistory
  centerComponent={<Title>TITLE</Title>}
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

### Navbar (Sublevel) + Action
![Navbar (Sublevel) + Action example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-sublevel-action@2x.png "NavigationBar (Sublevel) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  hasHistory
  centerComponent={<Title>TITLE</Title>}
  rightComponent={(
    <Button styleName="clear">
      <Text>Report</Text>
    </Button>
  )}
/>
```

### Navbar (Modal) + Share Button
![Navbar (Modal) + Share Button]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-modal-icon@2x.png "Navbar (Modal) + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Icon name="close" />
    </Button>
  )}
  centerComponent={<Title>TITLE</Title>}
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

### Navbar (Modal) + Action
![Navbar (Modal) + Action example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-modal-action@2x.png "Navbar (Modal) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Icon name="close" />
    </Button>
  )}
  centerComponent={<Title>TITLE</Title>}
  rightComponent={(
    <Button styleName="clear">
      <Text>Post</Text>
    </Button>
  )}
/>
```

## Navbar (Modal) + Action 2
![Navbar (Modal) + Action 2 example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-modal-action-2@2x.png "Navbar (Modal) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Text>Cancel</Text>
    </Button>
  )}
  centerComponent={<Title>TITLE</Title>}
  rightComponent={(
    <Button>
      <Text>Done</Text>
    </Button>
  )}
/>
```

### Navbar (Modal) + Action 2 (disabled)
![Navbar (Modal) + Action 2 (disabled) example]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-modal-action-2-disabled@2x.png "Navbar (Modal) + Action (disabled)"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Text>Cancel</Text>
    </Button>
  )}
  centerComponent={<Title>TITLE</Title>}
  rightComponent={(
    <Button styleName="muted">
      <Text>Done</Text>
    </Button>
  )}
/>
```

### Navbar (Sublevel) + Share + Showing Background Color
![Navbar (Sublevel) + Share + Showing Background Color]({{ site.url }}/img/ui-toolkit/navigationbar/navbar-sublevel-action-no-border-copy@2x.png "Navbar / On primary color / back + share"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  styleName="clear"
  hasHistory
  centerComponent={<Title>TITLE</Title>}
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

# Redux and stack-based NavigationBar with CardStack

## Import

```JSX
import { NavigationBar } from '@shoutem/ui/navigation'
```

This `NavigationBar` and `CardStack` components provide simpler API for navigation between `Screens` (scenes) with respect to its underlying [Redux](https://github.com/reactjs/redux)-based `NavigationExperimental` React Native component.

## NavigationBar

## API

#### Props

* **renderLeftComponent**: function  
  - Function that should return components representing left component in `NavigationBar` (example: back button)
  - Note that outermost component returned by this function should be `View` that has `container` styleName and `virtual` prop

* **renderRightComponent**: function
  - Function that should return components representing right component in `NavigationBar` (example: drop-down menu button)
  - Note that outermost component returned by this function should be `View` that has `container` styleName and `virtual` prop

* **onNavigateBack**: function
  - This callback is triggered after tapping the Back button if `hasHistory` Prop is set to `true`  

* **renderTitleComponent**: function  
  - Function that should return components representing center/title component, allowing you to override the default `title` component/prop in `NavigationBar`
  - Note that outermost component returned by this function should be `View` that has `container` styleName and `virtual` prop

* **title**: string
  - Prop that defines screen title

#### Style names

* **clear**: sets the `Text` color to white and background colors to transparent
* **fade**: sets the `Text` color to white and applies linear gradient to background
* **no-border**: removes the bottom border

#### Style

* **centerComponent**
  - Style applied to center Navigation component

* **container**
  - Style prop for `View` that holds all components within `NavigationBar`

* **componentsContainer**
  - Style prop for `View` container that holds `leftComponent`, `centerComponent` and `rightComponent` objects

* **leftComponent**
  - Style applied to left Navigation component

* **rightComponent**
  - Style applied to right Navigation component

## CardStack

## API

#### Props

* **navigationState**: object  
  - Object containing current navigation state (stack)

* **onNavigateBack**: function
  - This callback is triggered after tapping the Back button (usually in `leftComponent`)

* **renderNavBar**: function
  - Function that should return components representing actual `NavigationBar` `View` (container)

* **renderScene**: function  
  - Function that should return/render Screen (scene) depending on stack content (current topmost route)

#### Style names

* None

#### Style

* None

## Example

In order to use this `NavigationBar` component, you will need to initialize `CardStack` as root component of your application and define base `NavigationBar.View` which will hold actual `NavigationBar` according to provided props.  
<br />  

#### JSX Declaration
```JSX
class App extends Component {
  static propTypes = {
    onNavigateBack: React.PropTypes.func.isRequired,
    navigationState: React.PropTypes.object,
    scene: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.renderNavBar = this.renderNavBar.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(props) {
    const { route } = props.scene;

    let Screen = route.key === 'RestaurantDetails' ? RestaurantDetails : RestaurantsList;
    return (<Screen {...route.props} />);
  }

  renderNavBar(props) {
    const { onNavigateBack } = this.props;

    return (
      <NavigationBar.View
        {...props}
        onNavigateBack={onNavigateBack}
      />
    );
  }

  render() {
    const { navigationState, onNavigateBack } = this.props;

    return (
      <CardStack
        navigationState={navigationState}
        onNavigateBack={onNavigateBack}
        renderNavBar={this.renderNavBar}
        renderScene={this.renderScene}
      />
    );
  }
}
```

Also, on each screen where you want to have NavigationBar, you'll need to define it as every other component.  

```JSX
<NavigationBar
  title="title goes here"
  styleName="clear"
/>
```

Note that example above is just a part of required code. For a full example, refer to RestaurantApp [example](https://github.com/shoutem/ui/blob/develop/examples/RestaurantsApp/app/), where `App` is root application component holding code above.
