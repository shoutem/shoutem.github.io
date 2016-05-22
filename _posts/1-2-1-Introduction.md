---
layout: doc
permalink: /docs/user-data/introduction
---

# User data on your extension

This tutorial shows you can allow users of your application to submit their data, through building extension for rating restaurants. It will include users submitting their reviews using [Shoutem storage](TODO) and calculating the average points with [Shoutem Cloud Code](TODO). We will continue from the extension we've made in [Getting started](TODO) tutorial, so if you still haven't, check that tutorial which introduces the core principles of Shoutem platform. [Here's](TODO) the code you should end up with after that extension is done.

### New concepts
In this tutorial, these new concepts will be covered:

- defining permissions for your Schemas
- Shoutem Authentication
- introducing Shoutem Cloud Code
- advanced usage of Shoutem Admin Pages

## About the extension

Let's describe what we want to build. Restaurants Rating extension lists all the restaurants with the average points. Once some restaurant from the list is selected, new screen with the details of the restaurant is opened. That screen will also include form submitting users' reviews with associated points.

Following picture represents the mockup:

TODO - slika mockupa kako bi RestaurantsRatingExtension trebala izgledati

Let's extend our restaurants extension with permission which allows all users to submit their ratings.
