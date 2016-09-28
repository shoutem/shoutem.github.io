---
layout: doc
permalink: /docs/ui-toolkit/components/text-input
title: Text Input
section: UI toolkit
---

# Text Input

Text Input component is used for inputting text into the application using keyboard. 

## Input / Placeholder text 
![Input / Placeholder text  example]({{ site.baseurl }}/img/ui-toolkit/inputs/input-placeholder@2x.png "Input / Placeholder text"){:.docs-component-image}

#### JSX Declaration
```JSX
<TextInput 
  placeholder={'Username or email'}
  onChangeText={...} 
/>
```

## Input / With text 
![Input / With text  example]({{ site.baseurl }}/img/ui-toolkit/inputs/input-with-value@2x.png "Input / With text"){:.docs-component-image}

#### JSX Declaration
```JSX
<TextInput 
  placeholder={'Username or email'}
  onChangeText={...} 
/>
```

## Input / With password  
![Input / With password  example]({{ site.baseurl }}/img/ui-toolkit/inputs/input-with-password@2x.png "Input / With password "){:.docs-component-image}

#### JSX Declaration
```JSX
<TextInput 
  placeholder={'Username or email'}
  secureTextEntry
/>
```
  
#### Props

* **placeholder**: string
  - defines the placeholder text within Input
* **secureTextEntry**: bool
  - If true, the text input obscures the text entered so that sensitive text like passwords stay secure
* Note that `TextInput` component has the same Props like React Native `TextInput` component has

#### Style

* **placeholderTextColor**:  
  - defines the placeholder text color
* **selectionColor**:  
  - The highlight color of the text input (and the cursor color on iOS)
* Note that `TextInput` component has the same Style props like React Native's `TextInput` component has
