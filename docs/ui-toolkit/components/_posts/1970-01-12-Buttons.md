---
layout: doc
permalink: /docs/ui-toolkit/components/buttons
title: Buttons
section: UI toolkit
---

# Buttons

Buttons are styled TouchableOpacities.

##  Button / Text only / Light
![Button / Text only / Light example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-text-only-light@2x.png "Button / Text only / Light"){:.docs-component-image}


#### JSX Declaration
```JSX
<Button>
  <Text>CHECK IN HERE</Text>
</Button>
```  

##  Button / Text only / Dark
![Button / Text only / Dark example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-text-only-dark@2x.png "Button / Text only / Dark"){:.docs-component-image}


#### JSX Declaration
```JSX
<Button styleName="dark">
  <Text>CHECK IN HERE</Text>
</Button>
```  

##  Button / Icon + Text / Light
![Button / Icon + Text / Light example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-icon-text-light@2x.png "Button / Icon + Text / Light"){:.docs-component-image}


#### JSX Declaration
```JSX
<Button>
  <Icon name="add-event" />
  <Text>ADD TO CALENDAR</Text>
</Button>
```  

##  Button / Icon + Text / Dark
![Button / Icon + Text / Dark example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-icon-text-dark@2x.png "Button / Icon + Text / Dark"){:.docs-component-image}


#### JSX Declaration
```JSX
<Button styleName="dark">
  <Icon name="add-event" />
  <Text>ADD TO CALENDAR</Text>
</Button>
```  

##  Button / Fixed size
![Button / Fixed size example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-fixed-size@2x.png "Button / Fixed size"){:.docs-component-image}


#### JSX Declaration
```JSX
<View styleName="horizontal flexible">
  <Button styleName="confirmation">
    <Text>REMOVE</Text>
  </Button>

  <Button styleName="confirmation dark">
    <Text>UPDATE</Text>
  </Button>
</View>
```  

##  Button / Full width
![Button / Full width example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-full-width@2x.png "Button / Full width"){:.docs-component-image}


#### JSX Declaration
```JSX
<Button styleName="full-width">
  <Text>SEE ALL COMMENTS</Text>
</Button>
```  

##  Button / Navbar
![Button / Navbar example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-navbar@2x.png "Button / Navbar"){:.docs-component-image}


#### JSX Declaration
```JSX
<Button styleName="clear">
  <Icon name="add-to-favorites-full" />
</Button>
```  

##  Button / Vertical / Icon + Text
![Button / Vertical / Icon + Text example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-vertical-icon-text@2x.png "Button / Vertical / Icon + Text"){:.docs-component-image}


#### JSX Declaration
```JSX
<Button styleName="stacked clear">
  <Icon name="tweet" />
  <Text>Text description</Text>
</Button>
```  

##  Button / Full width - Normal
![Button / Full width - Normal example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-full-width-normal@2x.png "Button / Full width - Normal"){:.docs-component-image}


#### JSX Declaration
```JSX
<View styleName="horizontal flexible">
  <Button styleName="full-width muted">
    <Icon name="add-to-favorites-full" />
    <Text>LIKE</Text>
  </Button>
  <Button styleName="full-width muted">
    <Icon name="comment-full" />
    <Text>COMMENT</Text>
  </Button>
</View>
```  

##  Button / Full width - Active (Feed)
![Button / Full width - Active (Feed) example]({{ site.baseurl }}/img/ui-toolkit/buttons/button-full-width-active@2x.png "Button / Full width - Active (Feed)"){:.docs-component-image}


#### JSX Declaration
```JSX
<View styleName="horizontal flexible">
  <Button styleName="full-width">
    <Icon name="add-to-favorites-full" />
    <Text>LIKE</Text>
  </Button>
  <Button styleName="full-width">
    <Icon name="comment-full" />
    <Text>COMMENT</Text>
  </Button>
</View>
```  

#### Props

* All Buttons have the same Props as React Native's `TouchableOpacity` component has

#### Style names

* **tight**: removes the right margin from `Icon` and `Text` within `Button`
* **clear**: removes the border around `Button` and sets `backgroundColor` to `Clear` color as defined in Theme
* **dark**: sets the text color to `Light` as defined in Theme, and background color to `Darker` as defined in Theme
* **muted**: sets the opacity of the `Icon` and `Text` components within `Button`to 50%
* **confirmation**: sets the border around `Button` and applies a medium margin around  
* **full-width**: `Button` stretches to full width of the container
* **border**: applies `Border` color as defined in Theme
* **stacked**: vertically stacks `Icon` and `Text` within `Button`
