---
layout: doc
permalink: /docs/3rd-party/authorize
---

# Authorization

Let's authorize your Shopify app. If you didn't do it until now, now it's the time to [create](TODO) Shopify app. On Shopify, you can create either public or private app. Since private app would be restricted to use for only 1 store, we'll go for public Shopify apps.

To clarify, your Shopify app needs to be authorized by admin who is using your Shopify extension, so the Shopify app can communicate with admin's Shopify store. Shopify has a [document](TODO) explaining how authorization works, but we'd like to outline why you need to use so many concepts:

- **API KEY** <br />
  Each Shopify App that you create has API KEY and API SECRET. API KEY is used to identify your application, so Shopify knows which application wants to be authorized to communicate with the Shopify store. `API KEY` doesn't need to be kept secret, since it only identifies Shopify app.

- **API SECRET** <br />
  `API SECRET` is created with API KEY when creating Shopify app. You can think of it as a password which is used with API KEY to authenticate Shopify app on Shopify, to get `ACCESS TOKEN`. `API SECRET` is a secret and shouldn't be revealed to anyone.

- **ACCESS TOKEN** <br />
  `ACCESS TOKEN` is a piece of information which is needed to access specific store on Shopify. Each Shopify application gets different access token for each Shopify store. That information can be shared only with the admin of Shopify store.

- **SCOPE** <br />
  When the extension is seeking for the authorization, it species a `SCOPE` which tells admin what the extension will be allowed to do on Shopify store. Check which [scopes](https://docs.shopify.com/api/guides/authentication/oauth#scopes) Shopify defines.

### Authorization Lifecycle

Before we continue, we want to explain how authorization lifecycle works.

TODO make image that shows this.

1. Admin enters URL of the shop on the admin page and clicks on "Authorize"
2. Admin is sent to Shopify by custom admin page. When sending admin to Shopify, Shoutem extension is:
  - going to the URL of admin's Shopify store
  - sending `API KEY` so store knows which app is seeking to be authorized
  - sending `SCOPE` so store knows what the app will be allowed to do if authorized
  - sending redirect URL on which Shopify will send admin after authorizing extension
  - sending nonce as random value which will be sent back from Shopify to authenticate Shopify
3. Once extension is authorized, Shopify sends admin back to redirect URL
4. Server side of extension is sending `API KEY` and `API SECRET` to Shopify to grant `ACCESS TOKEN`
5. Shopify responds with the `ACCESS TOKEN` which will be used for that shop
6. Extension saves the `ACCESS TOKEN` to extension instance settings

Spot the term _extension instance_. Extension instance represents installed extension on Shoutem application. One extension can be installed on multiple Shoutem applications, but each application has unique extension instances.

You can also spot the term _server side of the extension_. As we already saw in the tutorial for `User data`, Shoutem provides you with Cloud Code which you can submit to our backend, so you don't have to worry about setting the whole infrastructure. In that previous tutorial, we used shoutem `controllers` to register on events. Now, we'll need to make API `hooks` that will be executed when API is called. Check the [complete reference for Shoutem Cloud Code](TODO) to see which kind of magic you can do with it.

On the other hand, `ACCESS TOKEN` will be needed on the client side, i.e. on your application. For that, we will need _Extension instance settings_. _Extension instance settings_ will be retrieved once the admin page is "initialized". This is done with Shoutem mobile SDK.

Let's start by sending authentication request to Shopify. Add JQuery for ease of sending requests and javascript file for authorization that we'll just write to admin page:

<pre>
&lt;html>
  &lt;head>
    &lt;link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<span class="newCode">    &lt;script src="https://code.jquery.com/jquery-2.2.1.min.js">&lt;/script></span>
<span class="newCode">    &lt;script src="/assets/js/authorization.js">&lt;/script></span>
  &lt;/head>
  &lt;body>    
    &lt;form id="settingsForm">
      &lt;div class="input-group">
        &lt;input type="text" class="form-control" id="shop" placeholder="Shop url" aria-describedby="suffix" >
        &lt;span class="input-group-addon" id="suffix">.myshopify.com&lt;/span>
      &lt;/div>
      &lt;button type="submit" class="btn btn-default">Authorize&lt;/button>
    &lt;/form>
  &lt;/body>
&lt;/html>
</pre>

Read in [Shopify docs](TODO) how the URL should be structured. Create now `server/assets/js/authorization.js` file and add following lines:

```
var EXTENSION_HOST = "[YOUR_HOST]"
var API_KEY = "[YOUR_API_KEY]";
var SCOPE = "read_products";
var REDIRECT_URL = EXTENSION_HOST + "/shopify/auth/" + SHOUTEM_APP_ID;

$('#settingsForm').on('submit', function(e) {
  var shop = $('#shop').val();

  var installUrl = "http://" + shop + ".myshopify.com/admin/oauth/authorize?client_id=" + API_KEY + 
    "&scope=" + SCOPE + "&redirect_uri=https://" + REDIRECT_URL;

  // TODO - rather open modal or something similiar
  // Go to shopify to authorize
  window.location.replace(installUrl);
});

```

Notice `EXTENSION_HOST` variable. It's value represents the host IP address which will have the API hooks that should be called from Shopify. In this tutorial, we'll use Shoutem hooks, so you don't need any server, but if you want to have spin it on your own server, you can do that as well.

Replace `[YOUR_HOST]` variable with `extensions.shoutem.com/dev-name.shopify-extension` which represents the API endpoint of your extension. Don't forget to replace `dev-name` with your developer name. Also, replace `[YOUR_API_KEY]` with the API_KEY of Shopify app. Notice that we have one unresolved variable: `SHOUTEM_APP_ID`. Leave that for now, until we introduce Shoutem SDK.

Following the authorization lifecycle, let's add a _hook controller_ for our extension which will communicate with Shopify service.
