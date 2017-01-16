---
layout: doc
permalink: /docs/ui-toolkit/components/navigation-bar
title: NavigationBar
section: UI toolkit
---

# NavigationBar

- Shoutem UI toolkit consists of two different `NavigationBar` components. 

1. Simple `NavigationBar` (`import { NavigationBar } from '@shoutem/ui'`) provides a simpler way to use 3-column Navigation bar without reinventing the wheel. This `NavigationBar` can be used on any screen or Modal window  

2. Redux and Stack-based `NavigationBar` (`import { NavigationBar } from '@shoutem/ui/navigation'`) allow any view to act as a navigation view and using reducers to manipulate state at a top-level object. Note that this `NavigationBar` can be used only on components that are within the Stack (it cannot be used on i.e. `Modal` window). Internally, this `NavigationBar` relies on [`NavigationExperimental`](https://facebook.github.io/react-native/docs/navigation.html#navigationexperimental) component from React-Native 

![Navbar / Solid example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-title-only@2x.png "Navbar / Solid"){:.docs-component-image}

## Simple NavigationBar (@shoutem/ui)

NavigationBar component is `Node` for `Navigator` React Native component. 
It provides a simpler way to use 3-column Navigation bar without reinventing the wheel.

## API

#### Props

* **centerComponent**: object  
  - Prop that represents the center component in `NavigationBar` (example: screen title)

* **hasHistory**: bool
  - If this Prop is set to `true`, the leftComponent will become a back arrow and will trigger the `navigateBack` callback
  
* **leftComponent**: object  
  - Prop that represents the left component in `NavigationBar` (example: back button)

* **rightComponent**: object
  - Prop that represents the right component in `NavigationBar` (example: drop-down menu button)

* **navigateBack()**: function
  - This callback is triggered after tapping the Back button if `hasHistory` Prop is set to `true`  

#### Style names

* **clear**: sets the `Text` color to white and background colors to transparent
* **fade**: sets the `Text` color to white and applies linear gradient to background
* **inline**: forces relative positioning of `NavigationBar` component, allowing component to be used inline with other components, i.e. `ListView`, without its content overlapping `NavigationBar`
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


## Examples

### Navbar / Solid
![Navbar / Solid example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-title-only@2x.png "Navbar / Solid"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  centerComponent={<Title>TITLE</Title>}
/>
```

### Navbar / Clear (Solid color)
![Navbar / Clear (Solid color) example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-clear-solidcolor-titleonly@2x.png "Navbar / Clear (Solid color)"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  styleName="clear"
  centerComponent={<Title>TITLE</Title>}
/>
```

### Navbar / Clear (Image)
![Navbar / Clear (Image) example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-imageoverlay-image@2x.png "Navbar / Clear (Image)"){:.docs-component-image}

#### JSX Declaration
```JSX
<Image
  source={% raw %}{{{% endraw %}uri: '{{site.url}}/img/ui-toolkit/examples/image-3.png'}}
>
  <NavigationBar
    styleName="clear"
    centerComponent={<Title>TITLE</Title>}
  />
</Image>
```

### Navbar/ Fade (Gradient overlay + Solid color)
![Navbar/ Fade (Gradient overlay + Solid color) example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-fade-gradientoverlay-solidcolor@2x.png "Navbar/ Fade (Gradient overlay + Solid color)"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  styleName="fade clear"
  centerComponent={<Title>TITLE</Title>}
/>
```

### Navbar/ Fade (Gradient overlay + Image)
![Navbar/ Fade (Gradient overlay + Image) example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-fade-gradientoverlay-image@2x.png "Navbar/ Fade (Gradient overlay + Image)"){:.docs-component-image}

#### JSX Declaration
```JSX
<Image
  source={% raw %}{{{% endraw %}uri: '{{site.url}}/img/ui-toolkit/examples/image-3.png'}}
>
  <NavigationBar
    styleName="fade"
    centerComponent={<Title>TITLE</Title>}
  />
</Image>
```

### Navbar + Drawer
![Navbar + Drawer example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-drawernav@2x.png "Navbar + Drawer"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={<Icon name="sidebar" />}
  centerComponent={<Title>TITLE</Title>}
/>
```

### Navbar + Picker
![Navbar + Picker example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-picker@2x.png "Navbar + Picker"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={<Icon name="sidebar" />}
  centerComponent={<Title>TITLE</Title>}
  rightComponent={<DropDownMenu
    options={[
    { name: 'All', value: 1 },
    { name: 'Sport', value: 1 },
    { name: 'World', value: 1 },
    { name: 'Lifestyle', value: 1 },
    { name: 'Food', value: 1 },
    { name: 'Music', value: 1 },
    { name: 'Movies', value: 1 },
    { name: 'Tech', value: 1 },
    { name: 'Fun', value: 1 },
    { name: 'Fashion', value: 1 },
    ]}
    titleProperty="name"
    valueProperty="value"
  />}
/>
```

### Navbar + Action
![Navbar + Action example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-action@2x.png "Navbar + Action"){:.docs-component-image}

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

### Navbar + Icon
![Navbar + Icon example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-icon@2x.png "Navbar + Icon"){:.docs-component-image}

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
![Navbar (Sublevel) + Icon example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-icon@2x.png "Navbar + (Sublevel) + icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  hasHistory
  title="TITLE"
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

### Navbar (Sublevel) + Action (no border)
![Navbar (Sublevel) + Action (no border) example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-action-no-border@2x.png "Navbar (Sublevel) + Action (no border)"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  styleName="no-border"
  hasHistory
  title="TITLE"
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

### Navbar (Sublevel) + Action
![Navbar (Sublevel) + Action example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-action@2x.png "NavigationBar (Sublevel) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  hasHistory
  title="TITLE"
  rightComponent={(
    <Button styleName="clear">
      <Text>Report</Text>
    </Button>
  )}
/>
```

### Navbar (Modal) + Icon
![Navbar (Modal) + Icon example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-icon@2x.png "Navbar (Modal) + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Icon name="close" />
    </Button>
  )}
  title="TITLE"
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

### Navbar (Modal) + Action
![Navbar (Modal) + Action example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-action@2x.png "Navbar (Modal) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Icon name="close" />
    </Button>
  )}
  title="TITLE"
  rightComponent={(
    <Button styleName="clear">
      <Text>Post</Text>
    </Button>
  )}
/>
```

## Navbar (Modal) + Action 2
![Navbar (Modal) + Action 2 example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-action-2@2x.png "Navbar (Modal) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Text>Cancel</Text>
    </Button>
  )}
  title="TITLE"
  rightComponent={(
    <Button>
      <Text>Done</Text>
    </Button>
  )}
/>
```

### Navbar (Modal) + Action 2 (disabled)
![Navbar (Modal) + Action 2 (disabled) example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-action-2-disabled@2x.png "Navbar (Modal) + Action (disabled)"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  leftComponent={(
    <Button>
      <Text>Cancel</Text>
    </Button>
  )}
  title="TITLE"
  rightComponent={(
    <Button styleName="muted">
      <Text>Done</Text>
    </Button>
  )}
/>
```

### Navbar / On primary color / back + share
![Navbar / On primary color / back + share example]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-action-no-border-copy@2x.png "Navbar / On primary color / back + share"){:.docs-component-image}

#### JSX Declaration
```JSX
<NavigationBar
  styleName="clear"
  hasHistory
  title="TITLE"
  share={% raw %}{{{% endraw %}
    link: 'http://shoutem.github.io',
    text: 'This is the best',
    title: 'Super cool UI Toolkit',
  }}
/>
```

## Redux and Stack based NavigationBar (@shoutem/ui/navigation) and CardStack

This `NavigationBar` and `CardStack` components provide simpler API for navigation between Screens (scenes) with respect to its underlying Redux-based `NavigationExperimental` React-Native component. Still, for proper usage of these components, it is necessary that you're familiar with [Redux concept](https://github.com/reactjs/redux).

## NavigationBar API

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

## CardStack API

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

For a full example, refer to RestaurantApp [example](https://github.com/shoutem/ui/blob/develop/examples/RestaurantsApp/app/), where `App` is root application component holding code above.