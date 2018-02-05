---
layout: doc
permalink: /docs/extensions/tutorials/setting-up-instagram
title: Setting up Instagram
section: Tutorials
---

# Setting up Instagram

Shoutem's Photos RSS can utilize an Instagram feed, however, since Instagram has now closed their API, you will have to be the owner of the feed in order to generate a URL.

In order to show an Instagram feed in a Shoutem app using the Photos RSS, you will have to set up a redirect URL. The first step is to go to the Instagram developer [site](https://www.instagram.com/developer/) and create a [new client](https://www.instagram.com/developer/clients/register/) if you don't already have one. Take note of the Client ID and Client Secret, you will be needing these to get your access token. Here are the steps:

#### 1) Manage your client, go to the Security tab and set two redirection URIs:

`https://new.shoutem.com` and `http://new.shoutem.com`

#### 2) Un-check the `Disable implicit 0Auth` setting.

<p class="image">
<img src='{{ site.url }}/img/tutorials/instagram/instagram-client.png'/>
</p>

#### 3) Update the client.

#### 4) Navigate to:

```
https://api.instagram.com/oauth/authorize/?client_id=<client_id>&redirect_uri=https://new.shoutem.com&response_type=token&scope=public_content
```

> #### Note
> Replace any placeholder values with the ones from your client. For example, `client_id=<client_id>` should be `client_id=1oct365163444080a0cd6c3451486736`.

At this point your browser may warn you that it requires you to authorize access to this if the client is in sandbox mode. Authorize it in order to proceed and get the access token.

#### 5) You can find the token after the # symbol in the address bar of your browser.

<p class="image">
<img src='{{ site.url }}/img/tutorials/instagram/access-token.png'/>
</p>

## How to generate a content URL for Shoutem

In order to fetch content via Photos RSS you will need to fetch it from an Instagram endpoint using your access token. You can find out which endpoints are available in the Instagram [documentation](https://www.instagram.com/developer/endpoints/), of which you'll most likely be interested in the [media](https://www.instagram.com/developer/endpoints/media/) ones.

Here are some example links you can use with Shoutem's Photos RSS in order to fetch Instagram images.

#### Recent images of all users

This can be used to retrieve all recent images, it's the most commonly used link.

```
https://api.instagram.com/v1/users/self/media/recent?access_token=<access_token>
```

> #### Note
> Replace any placeholder values with the ones from your client. For example, `client_id=<client_id>` should be `client_id=1oct365163444080a0cd6c3451486736`.

#### Search within a location

This can be used to retrieve images from a specific location defined by latitude and longitude.

```
https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=<access_token>
```

> #### Note
> Replace any placeholder values with the ones from your client. For example, `client_id=<client_id>` should be `client_id=1oct365163444080a0cd6c3451486736`.


## API alternative

You can also generate an access token using the following API call with `curl`:

```ShellSession
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
