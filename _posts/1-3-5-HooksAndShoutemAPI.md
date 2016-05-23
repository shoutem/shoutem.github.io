---
layout: doc
permalink: /docs/3rd-party/hooks
---

# Hooks and Shoutem API
<br />

Once admin has authorized your Shopify app, Shopify will redirect admin to provided `REDIRECT_URL` which points to your extension's Cloud Code hook. There you can keep your data that are private to an extension as a class, i.e. data that only developer of the extension should know. That's the place where we'll keep `API_SECRET` of your Shopify app.

Notice how we constructed redirect URL in `server/assets/js/authorization.js`:

```
var REDIRECT_URL = EXTENSION_HOST + "/shopify/auth/" + SHOUTEM_APP_ID;
```

For the path `/shopify/auth` we need to add a _hook controller_. As mentioned before, each ***Shopify*** _store_ will have different `ACCESS TOKEN` for accessing. We need to pass somehow that access token to extension **instance**. Since extension instances are created by installing extension to Shoutem application, we are identifying Shoutem extension instance by Shoutem application ID combined with Shoutem extension ID. Since we're developing Shoutem extension, we know its ID.

Let's create controller:

```
shoutem controller ShopifyAuth
```

New file `server/controllers/ShopifyAuth.js` has been created. Although with `shoutem upload` that controller will be on our Cloud Code, nothing will be able to call it, because we didn't register it in `extension.json`. Previously, we have defined events on which our controller should be called. Now, we want to register an API endpoint on which this controller will be available. Do that in `extension.json`:

<pre>
{
  "name": "shopify-extension",
  "version": "0.0.1",
  "title": "Shopify Extension",
  "description": "Sell products from your Shopify store",

  "shortcuts": [{
    "name": "OpenProdutsList",
    "action": "dev-name.shopify-extension.OpenProductsList",
    "title": "List of products",
    "description": "Allow users to check your products and buy them.",
    "adminPages": [{
      "page": "server/admin-pages/AuthorizePage.html",
      "title": "Authorize Shopify App"
    }]
<span class="newCode">  }],

  "controllers": [{
    "name": "ShopifyAuth",
    "routeHandling": "express"
  }]"</span>  
}
</pre>

Instead of specifying `schema` how we did it for `event controllers`, we're specifying that this controller will be route handler for [express](http://expressjs.com/en/4x/api.html#router).

Now it's the time to implement handling of the API call.

1. Verify if request came from Shopify
2. Retrieve ACCESS TOKEN for the shop
3. Send ACCESS TOKEN to Shoutem extension
4. Redirect to Shoutem

To perform these requests, we'll need `API_KEY` and `API_SECRET`. Create `server/controllers/conf/shopifyApp.js` file, with content:

```
module.exports = {
  API_KEY: "[YOUR_API_KEY]",
  API_SECRET: "[YOUR_API_SECRET]"
}
```

where you should replace `[YOUR_API_KEY]` and `[YOUR_API_SECRET]` with the real ones for your Shopify app. Now let's implement our `server/controllers/ShopifyAuth.js` controller. Import `request` library for HTTP requests and `conf/shopifyApp` file.

<pre>
var express = require('express')
var request = require('request');
var shopifyAppConf = require('./conf/shopifyApp.js');
</pre>

Since we don't have `express` nor `request` libraries, we need to install it. Do this from the root folder of your extension:

```
cd server/controllers && npm install express request
```

Create express router and define a route handler.

```
var router = express.Router();
router.get('/shopify/auth/:shoutemAppId', (req, res, next) => {
  // Implement route handling inside
});
```

Great! let's now start implementing route handling. Retrieve route `parameters` inside route callback:

<pre>
// Shopify query parameters
var shop = req.query.shop;
var code = req.query.code;
var hmac = req.query.hmac;

var shoutemAppId = req.params.shoutemAppId;
</pre>

Implement each of previously discussed tasks. Typically you should verify if request really came from `Shopify`, but we'll skip that part now, since it's only suited for Shopify case.

Once we have verified identity of Shopify, we need to retrieve access token for the Shopify store. Make `HTTP POST` method using `request` library. From Shopify [docs](https://docs.shopify.com/api/guides/authentication/oauth), we need to provide 3 parameters:

- `client_id`
  The API Key for the app.
- `client_secret`
  The Shared Secret for the app.
- `code`
  The authorization code provided by Shopify.

<pre>
var authShopifyUrl = 'https://' + shop + '.myshopify.com/admin/oauth/access_token';
  var shopifyBody = {
    client_id: shopifyAppConf.API_KEY,
    client_secret: shopifyAppConf.API_SECRET,
    code: code
  };

  request.post({url: authShopifyUrl, form: shopifyBody}, function(err, httpResponse, body) {
    // Handle Shopify response
  });
</pre>

On satisfying request to retrieve access token, Shopify will return with body:

```
{
  "access_token": "f85632530bf277ec9ac6f649fc327f17"
}
```

Implement now handling Shopify request inside of request callback. Access token needs to be send to the settings of extension instance. This can be done through [Shoutem API](TODO). Shoutem cloud exposes a set of API to manipulate your data on Shoutem. For manipulation to work, you need to be _authenticated_ and _authorized_. Similar with Shopify, we need to create configuration file for Shoutem Cloud Code. Create `server/controllers/conf/extensionConf.js` file with:

<pre>
export default {
  EXT_ID: '[YOUR_EXTENSION_ID]',
  EXT_SECRET: '[YOUR_EXTENSION_SECRET]''
}
</pre>

where you should replace _YOUR_EXTENSION_ID_ and _YOUR_EXTENSION_SECRET_ with proper data that you can find in [Developer console](TODO). Import that file in `routes/index.js` file:

```
import extensionConf from './conf/extensionConf.js'
```

See Shoutem API for manipulate [extension data](TODO), namely chapter [extension instance settings](TODO). Each extension instance can retrieve data from extension backend through settings, which can be latter used in client code. Write handler for Shopify response using Shoutem API endpoint for setting extension's instance settings:

<pre>
if (err) return next(err);

var accessToken = body.access_token;

// Send ACCESS TOKEN to Shoutem app
var shoutemUrl = 'https://api.shoutem.com/v1/apps/' + shoutemAppId + 
  '/extensions/' + extensionConf.EXT_ID + '/settings'
var shoutemBody = {
  EXT_SECRET: extensionConf.EXT_SECRET,
  key: 'accessToken',
  value: accessToken
}

request.post({url: shoutemUrl, form: shoutemBody}, function(err, httpResponse, body) {
  // Handle Shoutem response
});
</pre>

Finally, once we get Shoutem response, let's redirect admin to Shoutem's builder. Do this in handling SHoutem response handler.

<pre>
// Redirect to Shoutem builder 
res.redirect('https://www.shoutem.com/apps/' + shoutemAppId);
</pre>

This is what you should end up with:

<pre>
<span class="newCode">
import request from 'request';
import shopifyAppConf from './conf/shopifyApp.js';
import extensionConf from './conf/extensionConf.js'</span>

router.get('/shopify/auth/:shoutemAppId', (req, res, next) => {
<span class="newCode">  // Retrieve query parameters
  var shop = req.query.shop;
  var code = req.query.code;
  var hmac = req.query.hmac;

  var shoutemAppId = req.params.shoutemAppId;

  // Verify if request came from Shopify

  // Retrieve ACCESS TOKEN for the Shopify store
  var authShopifyUrl = 'https://' + shop + '.myshopify.com/admin/oauth/access_token';
  var body = {
    client_id: shopifyAppConf.API_KEY,
    client_secret: shopifyAppConf.API_SECRET,
    code: code
  };

  request.post({url: authShopifyUrl, form: body}, function(err, httpResponse, body) {
    // Handle Shopify response
    if (err) return next(err);

    var accessToken = body.access_token;

    // Send ACCESS TOKEN to Shoutem app
    var shoutemUrl = "https://api.shoutem.com/v1/apps/" + shoutemAppId + 
      "/extensions/" + extensionConf.EXT_ID + "/settings"
    var shoutemBody = {
      EXT_SECRET: extensionConf.EXT_SECRET,
      key: 'accessToken',
      value: accessToken
    }

    request.post({url: shoutemUrl, form: shoutemBody}, function(err, httpResponse, body) {
      // Handle Shoutem response
      // Redirect to Shoutem builder 
      res.redirect('https://www.shoutem.com/apps/' + shoutemAppId);
    });
  });
  </span>
});
</pre>

Great job for reaching the end of this chapter! Do `shoutem upload` and navigate to your Developer console. There, you should see created Cloud Code controller with all the code associated with it.

TODO - add picture of this controller with copied code and the name

Don't forget that in admin page we assumed that we have `SHOUTEM_APP_ID` set, but actually we didn't. It's the time for getting that id through Shoutem builder SDK.

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/3rd-party/authorize"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/3rd-party/shoutem-sdk">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>
