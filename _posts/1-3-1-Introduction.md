---
layout: doc
permalink: /docs/3rd-party/introduction
---

# Connecting your extension to 3rd party service

This tutorial shows you how to build extension which will enable applications using 3rd party services. Although it might seem very logic and easy to do so, there are some obstacles we need to pass. It's used as a reference how to integrate your extension with server other than Shoutem Storage. This tutorial is built on concepts gained in [Getting started](TODO) and [Restaurants](TODO) tutorials, but there are also some new concepts provided here:

- completely custom Admin pages
- extension settings
- hooks on Shoutem Cloude Code
- Shoutem API


<br />
## Shopify Application

Before we describe what we want to build, we need to separate different concepts: 

- Shopify:
  - App
  - Store
- Shoutem:
  - App
  - Extension

We're building ***Shoutem*** _extension_ which will be used in ***Shoutem*** _apps_. ***Shoutem*** _extension_ will use **your** ***Shopify*** _app_ to have authorized access over ***Shopify*** store of admin that installed ***Shopify*** _extension_ to their ***Shoutem*** _application_.

For the purpose of this tutorial, you will need to become [Shopify partner](TODO) to create Shopify app. Once you've [registered](TODO) as Shopify partner, creating Shopify app is pretty straightforward. Read [Shopify's documentation](https://docs.shopify.com/api/guides/introduction) on how to create and submit your ***Shopify*** _app_.

<br />
## About the extension

Let's describe what we want to build. Shopify extension allows admins to sell products on their Shopify store to their application users. Application admins need to authorize your Shopify app to connect to admin's Shopify store. Once admin has authorized Shopify app, extension lists the products contained in the Shopify app. Once this point is reached, we finished the process of connecting your extension to other 3rd party service and building upon it, like adding possibility to buy products, shouldn't present a problem.

Following pictures represent the mockup:

TODO - mockup pictures

Let's start by creating UI of the extension.
