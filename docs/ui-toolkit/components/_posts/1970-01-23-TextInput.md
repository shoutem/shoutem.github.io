---
layout: doc
permalink: /docs/ui-toolkit/components/text-input
title: TextInput
section: UI toolkit
---

# TextInput

`TextInput` component is used for inputting text into the application using keyboard.

## API

#### Props

`TextInput` has no specific (custom) Props, however, it supports every prop that the standard React Native `TextInput` component supports. For full list of available props, visit
[React Native TextInput component documentation](https://facebook.github.io/react-native/docs/textinput.html "React Native TextInput component documentation").

#### Style names

`TextInput` has no specific style names.

#### Style

* **placeholderTextColor**:  
  - Defines the placeholder text color
* **selectionColor**:  
  - The highlight color of the text input (and the cursor color on iOS)
* Also, supports every `Style` prop that the standard React Native `TextInput` component supports

## Examples

### Input / Placeholder text
![Input / Placeholder text  example]({{ site.url }}/img/ui-toolkit/inputs/input-placeholder@2x.png "Input / Placeholder text"){:.docs-component-image}

#### JSX Declaration
```JSX
<TextInput
  placeholder={'Username or email'}
  onChangeText={...}
/>
```

### Input / With text
![Input / With text  example]({{ site.url }}/img/ui-toolkit/inputs/input-with-value@2x.png "Input / With text"){:.docs-component-image}

#### JSX Declaration
```JSX
<TextInput
  defaultValue={'Username or email'}
  onChangeText={...}
/>
```

### Input / With password  
![Input / With password  example]({{ site.url }}/img/ui-toolkit/inputs/input-with-password@2x.png "Input / With password "){:.docs-component-image}

#### JSX Declaration
```JSX
<TextInput
  placeholder={'Password'}
  secureTextEntry
/>
```
