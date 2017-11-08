---
layout: doc
permalink: /docs/cloud/introduction
title: Introduction
section: Shoutem Cloud
---

# Shoutem Cloud

Shoutem Extensions can be used with any server. For easier integration with backend, we've prepared a library called [@shoutem/redux-io](https://github.com/shoutem/redux-io), a layer on top of [redux](http://redux.js.org/docs/introduction/) which makes it easy to manage data fetching lifecycle.

If you don't have a server to connect with, you can use Shoutem Cloud. Shoutem Cloud is one of the main components of the Shoutem platform. Using Shoutem Cloud, you don't need to worry about developing your own backend with all the problems that come along: optimisations for typical CRUD operations, scaling and security.

[//]: # (Add picture of Shoutem Cloud)

To use Shoutem Cloud with extensions, we need to create [data schemas]({{ site.url }}/docs/extensions/my-first-extension/using-cloud-storage) which describe structure of the data that should be stored on Shoutem Cloud. When used in extensions, the `@shoutem/redux-io` library is by default configured to Shoutem Cloud, but it can be configured for use with any API.

We've also prepared a [data schema reference]({{ site.url }}/docs/cloud/data-schemas). You can see an implementation of how a custom extension uses Shoutem Cloud storage in our [My First Extension]({{ site.url }}/docs/extensions/my-first-extension/introduction) tutorial in the Using Cloud Storage and Working with Data sections. However, we recommend going through the entire tutorial as a whole.
