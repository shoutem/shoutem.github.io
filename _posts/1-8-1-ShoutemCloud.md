---
layout: doc
permalink: /docs/cloud/introduction
title: Introduction
section: Shoutem Cloud
---

# Shoutem Cloud

Shoutem Extensions can be used with any server. For easier integration with backend, we've prepared a library called [@shoutem/redux-io](https://github.com/shoutem/redux-io), a layer on top of [redux](http://redux.js.org/docs/introduction/) which makes it easy to manage data fetching lifecycle.

However, if you don't have a server that you need to connect with, you can use Shoutem Cloud. Shoutem Cloud is one of the main Shoutem platform components. Using Shoutem Cloud, you don't need to worry about developing your own backend with all the problems that come along: optimizations for typical CRUD operations, scaling and security.

[//]: # (Add picture of Shoutem Cloud)

To use Shoutem Cloud with extensions, we need to create [data schemas]({{ site.baseurl }}/docs/extensions/getting-started/using-cloud-storage) which describe structure of the data that should be stored on Shoutem Cloud. When used in extensions, `@shoutem/redux-io` library is by default configured to Shoutem Cloud, but it can be configured to be used with any API.

We've prepared a few topics to ease the usage with Shoutem Cloud:

- [Data Schemas reference]({{ site.baseurl }}/docs/cloud/data-schemas)
- [Using @shoutem/redux-io library]({{ site.baseurl }}/docs/cloud/redux-io)