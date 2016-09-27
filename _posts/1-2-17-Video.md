---
layout: doc
permalink: /docs/ui-toolkit/components/video
title: Video
section: UI toolkit
---

# Video

Video component is a component that can be used to render all types of Video items.  
It renders a Video based on the source type. If source is an url to a web player the video is displayed in a WebView, if not, then a Video HTML element is displayed in the WebView.  

## Video
![alt text]({{ site.baseurl }}/img/ui-toolkit/video/video_player@2x.png "Video"){:.docs-component-image}

#### JSX Declaration
```JSX
<Video
    source={...}
    height={...}
    width={...}
    style={...}
/>
```

#### Props

* **source**  : string
  - Prop that defines the source of the video that will be rendered

* **height** : number
  - Prop that sets the height of the container where the video preview thumbnail will be rendered
   
* **width** : number
  - Prop that sets the width of the container where the video preview thumbnail will be rendered


#### Style

* **container**
  - Style prop for container `View` that holds the Video component
