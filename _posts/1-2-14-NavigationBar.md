---
layout: doc
permalink: /docs/ui-toolkit/components/navigation-bar
title: Navigation Bar
section: UI toolkit
---

# NavigationBar

NavigationBar component is `Node` for `Navigator` React Native component. 
It provides a simpler way to use 3-column Navigation bar without reinventing the wheel.

## Navbar / Solid
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-title-only@2x.png "Navbar / Solid"){:.docs-component-image}


#### JSX Declaration
```JSX
{% raw %}
<NavigationBar
  centerComponent={<Title>TITLE</Title>}
/>
{% endraw %}
```

## Navbar / Clear (Solid color)
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-clear-solidcolor-titleonly@2x.png "Navbar / Clear (Solid color)"){:.docs-component-image}


#### JSX Declaration
```JSX
{% raw %}
<NavigationBar
  styleName="clear"
  centerComponent={<Title>TITLE</Title>}
/>
{% endraw %}
```

## Navbar / Clear (Image)
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-imageoverlay-image@2x.png "Navbar / Clear (Image)"){:.docs-component-image}


#### JSX Declaration
```JSX
{% raw %}
<Image
  source={require('../assets/examples/road.png')}
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    styleName="clear"
    centerComponent={<Title>TITLE</Title>}
  />
</Image>
{% endraw %}
```

## Navbar/ Fade (Gradient overlay + Image)
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-fade-gradientoverlay-image@2x.png "Navbar/ Fade (Gradient overlay + Image)"){:.docs-component-image}


#### JSX Declaration
```JSX
{% raw %}
<Image
  source={require('../assets/examples/road.png')}
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    styleName="fade"
    centerComponent={<Title>TITLE</Title>}
  />
</Image>
{% endraw %}
```
  
## Navbar/ Fade (Gradient overlay + Solid color)
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-fade-gradientoverlay-solidcolor@2x.png "Navbar/ Fade (Gradient overlay + Solid color)"){:.docs-component-image}


#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    backgroundColor: '#1a70d5',
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    styleName="fade"
    centerComponent={<Title>TITLE</Title>}
  />
</View>
{% endraw %}
```

# Navigation bar variations

## Navbar + Drawer
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-drawernav@2x.png "Navbar + Drawer"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    leftComponent={<Icon name="sidebar" />}
    centerComponent={<Title>TITLE</Title>}
  />
</View>
{% endraw %}
```

## Navbar + Picker
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-picker@2x.png "Navbar + Picker"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
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
</View>
{% endraw %}
```

## Navbar + Action
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-action@2x.png "Navbar + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    leftComponent={<Icon name="sidebar" />}
    centerComponent={<Title>TITLE</Title>}
    rightComponent={(
    <Button styleName="clear">
      <Text>List</Text>
    </Button>
  )}
  />
</View>
{% endraw %}
```

## Navbar + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-icon@2x.png "Navbar + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    leftComponent={<Icon name="sidebar" />}
    centerComponent={<Title>TITLE</Title>}
    rightComponent={(
      <Button>
        <Icon name="cart" />
      </Button>
    )}
  />
</View>
{% endraw %}
```

## Navbar (Sublevel) + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-icon@2x.png "Navbar + (Sublevel) + icon"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    hasHistory
    navigateBack={() => {}}
    title="TITLE"
    share={{
      link: 'http://shoutem.github.io',
      text: 'This is the best',
      title: 'Super cool UI Toolkit',
    }}
  />
</View>
{% endraw %}
```
  
## Navbar (Sublevel) + Action
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-action@2x.png "NavigationBar (Sublevel) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    hasHistory
    navigateBack={() => {}}
    title="TITLE"
    rightComponent={(
      <Button styleName="clear">
        <Text>Report</Text>
      </Button>
    )}
  />
</View>
{% endraw %}
```

## Navbar (Sublevel) + Action (no border)
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-action-no-border@2x.png "Navbar (Sublevel) + Action (no border)"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    hasHistory
    navigateBack={() => {}}
    title="TITLE"
    share={{
      link: 'http://shoutem.github.io',
      text: 'This is the best',
      title: 'Super cool UI Toolkit',
    }}
  />
</View>
{% endraw %}
```

## Navbar (Modal) + Icon
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-icon@2x.png "Navbar (Modal) + Icon"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
  <NavigationBar
    leftComponent={(
      <Button>
        <Icon name="close" />
      </Button>
    )}
    title="TITLE"
    share={{
      link: 'http://shoutem.github.io',
      text: 'This is the best',
      title: 'Super cool UI Toolkit',
    }}
  />
</View>
{% endraw %}
```

## Navbar (Modal) + Action
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-action@2x.png "Navbar (Modal) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
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
</View>
{% endraw %}
```

## Navbar (Modal) + Action 2
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-action-2@2x.png "Navbar (Modal) + Action"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
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
</View>
{% endraw %}
```

## Navbar (Modal) + Action 2 (muted)
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-modal-action-2-disabled@2x.png "Navbar (Modal) + Action (muted)"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
  }}
>
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
</View>
{% endraw %}
```

## Navbar / On primary color / back + share
![alt text]({{ site.baseurl }}/img/ui-toolkit/navigationbar/navbar-sublevel-action-no-border-copy@2x.png "Navbar / On primary color / back + share"){:.docs-component-image}

#### JSX Declaration
```JSX
{% raw %}
<View
  style={{
    width: 375,
    height: 70,
    backgroundColor: '#1a70d5',
  }}
>
  <NavigationBar
    styleName="clear"
    hasHistory
    navigateBack={() => {}}
    title="TITLE"
    share={{
      link: 'http://shoutem.github.io',
      text: 'This is the best',
      title: 'Super cool UI Toolkit',
    }}
  />
</View>
{% endraw %}
```
  
#### Props
  
* **leftComponent** : object  
  - Prop that presents left component in `NavigationBar` (back button for example)

* **centerComponent** : object  
  - Prop that presents center component in `NavigationBar` (for example screen title)

* **rightComponent** : object
  - Prop that presents right component in `NavigationBar` (for example dropdown menu button)

* **hasHistory** : bool
  - If this Prop is set to `true`, leftComponent will become a back arrow and will trigger the `navigateBack` callback

* **navigateBack** : callback function
  - This callback is triggered after tapping the Back button if `hasHistory` Prop is set to `true`  

#### Style names

* **clear**: sets the `Text` color to white and background colors to transparent
* **fade**: sets the `Text` color to white and applies linear gradient to background


#### Style

* **container**
  - Style prop for `View` that holds all components within `NavigationBar`
  
* **componentsContainer**
  - Style prop for `View` container that holds `leftComponent`, `centerComponent`, `rightComponent` objects
  
* **leftComponent**
  - Style applied to left Navigation component

* **centerComponent**
  - Style applied to center Navigation component

* **rightComponent**
  - Style applied to right Navigation component
