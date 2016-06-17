---
layout: doc
permalink: /docs/ui-toolkit/video
title: Video
---

# Video

Video component is component that can be used to render all types of Video items.  
- If source is Youtube or Vimeo, then `NativeVideo` component plays the video.  
- In all other cases, the video is displayed in a WebView using `WebViewVideo` component.  

## Video
![alt text]({{ site.baseurl }}/img/ui-toolkit/video_player@2x.png "Video"){:.docs-component-image}

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
  - Prop that defines source of Video that will be rendered

* **height** : number
  - Prop sets height of container where Video preview thumbnail will be rendered
 
   
* **width** : number
  - Prop sets width of container where Video preview thumbnail will be rendered


#### Style

* **container**
  - Style prop for container `View` that holds Video component
  
---
  
## NativeVideo

Component that previews video in a native player.

![alt text]({{ site.baseurl }}/img/ui-toolkit/video_player@2x.png "NativeVideo"){:.docs-component-image}

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
  - Prop that defines source of Video that will be rendered

* **height** : number
  - Prop sets height of container where Video preview thumbnail will be rendered
 
* **width** : number
  - Prop sets width of container where Video preview thumbnail will be rendered

#### Style

* **container**
  - Style prop for container `View` that holds playable Video 

* **controls**
  - Style prop for outermost `View` that holds tracking controls and progress bar
  
* **closeButton**
  - Style prop for `Text` component holding X string for closing the Video (when returning from full-screen)

* **fullScreen**
  - Style prop for `View` component holding Playable video in full-screen mode
  
* **header**
  - Style prop for `View` component holding `closeButton`

* **innerProgressCompleted**
  - Style prop for `View` container that indicates completed (watched) video progress 

* **innerProgressRemaining**
  - Style prop for `View` container that indicates remaining video progress 

* **progress**
  - Style prop for `View` component that holds `View` components with `innerProgressCompleted` and `innerProgressRemaining` styles props applied

* **trackingControls**
  - Style prop for `View` component that serves as container for `View` with `progress` style applied    
  
---   

## WebViewVideo  

Component that renders Video content within `WebView` component.

![alt text]({{ site.baseurl }}/img/ui-toolkit/video_player@2x.png "WebViewVideo"){:.docs-component-image}

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
  - Prop that defines source of Video that will be rendered

* **height** : number
  - Prop sets height of container where Video preview thumbnail will be rendered
   
* **width** : number
  - Prop sets width of container where Video preview thumbnail will be rendered  

#### Style

* **container**
  - Style prop for container `View` that holds playable Video rendered in `WebView`
