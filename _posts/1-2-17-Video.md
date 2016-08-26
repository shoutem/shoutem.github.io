---
layout: doc
permalink: /docs/ui-toolkit/components/video
title: Video
section: UI toolkit
---

# Video

Video component is a component that can be used to render all types of Video items.  
- If the source is Youtube or Vimeo, then the `NativeVideo` component plays the video  
- In all other cases, the video is displayed in a WebView using `WebViewVideo` component  

## Video
![alt text]({{ site.baseurl }}/img/ui-toolkit/video/video_player@2x.png "Video"){:.docs-component-image}

#### JSX Declaration
```JSX
<Video
    videoURL={...}
    height={...}
    width={...}
/>
```

#### Props

* **videoURL**  : string
  - Prop that defines the source of the video that will be rendered

* **height** : number
  - Prop that sets the height of the container where the video preview thumbnail will be rendered
   
* **width** : number
  - Prop that sets the width of the container where the video preview thumbnail will be rendered


#### Style

* **container**
  - Style prop for container `View` that holds the Video component
  
---
  
## NativeVideo

A component that previews video in a native player.

![alt text]({{ site.baseurl }}/img/ui-toolkit/video/video_player@2x.png "NativeVideo"){:.docs-component-image}

#### JSX Declaration
```JSX
<NativeVideo
    videoURL={...}
    height={...}
    width={...}
/>
```

#### Props

* **videoURL**  : source (uri : string)
  - Prop that defines the source of the video that will be rendered

* **height** : number
  - Prop that sets the height of the container where the video preview thumbnail will be rendered
 
* **width** : number
  -  Prop that sets the width of the container where the video preview thumbnail will be rendered

#### Style

* **container**
  - Style prop for `View` container that holds a playable video 

* **controls**
  - Style prop for outermost `View` that holds tracking controls and progress bar
  
* **closeButton**
  - Style prop for `Text` component holding X string for closing the Video (when returning from full-screen)

* **fullScreen**
  - Style prop for `View` component holding a playable video in full-screen mode
  
* **header**
  - Style prop for `View` component holding `closeButton`

* **innerProgressCompleted**
  - Style prop for `View` container that indicates completed (watched) video progress 

* **innerProgressRemaining**
  - Style prop for `View` container that indicates remaining video progress 

* **progress**
  - Style prop for `View` component that holds `View` components with `innerProgressCompleted` and `innerProgressRemaining` styles props applied

* **trackingControls**
  - Style prop for `View` component that serves as a container for `View` with `progress` style applied    
  
---   

## WebViewVideo  

A component that renders Video content within a `WebView` component.

![alt text]({{ site.baseurl }}/img/ui-toolkit/video/video_player@2x.png "WebViewVideo"){:.docs-component-image}

#### JSX Declaration
```JSX
<WebViewVideo
    videoURL={...}
    height={...}
    width={...}
/>
```

#### Props

* **videoURL**  : source (uri : string)
  - Prop that defines the source of the video that will be rendered

* **height** : number
  - Prop that sets the height of the container where the video preview thumbnail will be rendered
 
* **width** : number
  -  Prop that sets the width of the container where the video preview thumbnail will be rendered

#### Style

* **container**
  - Style prop for `View` container that holds a playable video rendered in `WebView`
