---
layout: doc
permalink: /docs/extensions/tutorials/setting-up-instagram
title: Setting up Instagram
section: Tutorials
---

# Setting up Instagram

Shoutem's Photos RSS can utilize an Instagram feed, however, since Instagram has now closed their API, you will have to be the owner of the feed in order to generate a URL.

In order to show an Instagram feed in a Shoutem app using the Photos RSS, you will have to set up a redirect URL. The first step is to go to the Instagram developer [site](https://www.instagram.com/developer/) and create a [new client](https://www.instagram.com/developer/clients/register/) if you don't already have one. Take note of the Client ID and Client Secret, you will be needing these. In `Valid redirect URIs` insert `https://new.shoutem.com`.

You will also need to get an access token, which you can get in one of two ways.

## 1) Using API calls to get an access token

Open your instagram app, edit it and set the `redirection_uri` to:

```
&redirect_uri=https://new.shoutem.com&scope=public_content
```

You can then use the following API call to find out your access token:

```
curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'postman-token: 76328f00-0a28-153d-1e8e-14bab1433aef' \
  -F client_id=<client_id> \
  -F client_secret=<client_secret> \
  -F grant_type=authorization_code \
  -F redirect_uri=https://new.shoutem.com \
  -F code=2f012e51d8cd4e649d6971b9b11841a1
```

Instructions based on Dave Olsen's [tutorial](http://dmolsen.com/2013/04/05/generating-access-tokens-for-instagram/).

## 2) Using the Instagram developer site to get an access token

Go to the Instagram developer [site](https://www.instagram.com/developer/) and in the upper right corner, go to [Manage Clients](https://www.instagram.com/developer/clients/manage/). Select the `Security` tab and *un*-check `disable implicit 0Auth`.

<p class="image">
<img src='{{ site.url }}/img/tutorials/instagram/instagram-client.png'/>
</p>

Afterwards navigate to:
```
https://api.instagram.com/oauth/authorize/?client_id=<client_id>&redirect_uri=https://new.shoutem.com&response_type=token&scope=public_content
```
You can find the token after the `#` symbol in the address bar of your browser.

## How to generate a content URL for Shoutem

In order to fetch content via Photos RSS you will need to fetch it from an Instagram endpoint using your access token. You can find out which endpoints are available in the Instagram [documentation](https://www.instagram.com/developer/endpoints/), of which you'll most likely be interested in the [media](https://www.instagram.com/developer/endpoints/media/) ones.

Here are some example links you can use with Shoutem's Photos RSS in order to fetch Instagram images.

#### Recent images of all users
```
https://api.instagram.com/v1/users/self/media/recent?access_token=<access_token>
```

#### Search within a location
```
https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=<access_token>
```
