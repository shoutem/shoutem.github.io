---
layout: doc
permalink: /docs/ui-toolkit/components/Inputs
title: Inputs
section: UI toolkit
---

# Inputs

Inputs are components for inputting text into the application using keyboard. 

## Input / Placeholder text 
![alt text]({{ site.baseurl }}/img/ui-toolkit/inputs/input-placeholder@2x.png "Input / Placeholder text"){:.docs-component-image}

#### JSX Declaration
```JSX
<Input 
  placeholder={'Username or email'}
  onChangeText={...} />
```

## Input / With text 
![alt text]({{ site.baseurl }}/img/ui-toolkit/inputs/input-with-value@2x.png "Input / With text"){:.docs-component-image}

#### JSX Declaration
```JSX
<Input 
  placeholder={'Username or email'}
  onChangeText={...} />
```

## Input / With password  
![alt text]({{ site.baseurl }}/img/ui-toolkit/inputs/input-with-password@2x.png "Input / With password "){:.docs-component-image}

#### JSX Declaration
```JSX
<Input 
  placeholder={'Username or email'}
  secureTextEntry={true}
  onChangeText={} />
```
  
#### Props

* **placeholder**: defines the placeholder text within Input
* **secureTextEntry**: If true, the text input obscures the text entered so that sensitive text like passwords stay secure.
* **onChangeText**: function 
  - Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.