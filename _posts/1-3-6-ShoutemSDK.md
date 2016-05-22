---
layout: doc
permalink: /docs/3rd-party/shoutem-sdk
---

# Shoutem SDK

Shoutem SDK is javascript library which enables admin page to get necessary data from extension. Let's include it in our admin page:

<pre>
&lt;html>
  &lt;head>
    &lt;link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    &lt;script src="https://code.jquery.com/jquery-2.2.1.min.js">&lt;/script>
<span class="newCode">    &lt;script src="cdn.shoutem.com/assests/js/shoutem.js">&lt;/script></span>
    &lt;script src="/assets/js/authorization.js">&lt;/script>
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

Shoutem SDK exposes `extension` object which can be used in the following scripts. Extension object has `init` method which accepts callback when the initialization of the `extension` on admin page is done. To that callback, `context` is passed which can be used for retrieving extension information, such as settings, or information about application that extension is installed. Initialize admin page before doing anything on admin page in `server/assets/js/authorization.js` file:

<pre>
<span class="newCode">extension.init(function(context) {

  var SHOUTEM_APP_ID = context.getAppId();</span>

  var EXTENSION_HOST = "extensions.shoutem.com/dev-name.shopify-extension"
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
<span class="newCode">}</span>
</pre>

Do:
```
shoutem upload
```

And try to authorize your Shopify app for the store. This is how the authorization process looks like:

TODO - add picture showing Shopify authorization window

Once you authorized your Shopify app, you'll be redirected back to Shoutem. The problem is that form control is still there and admin doesn't know if he authorized his Shopify app. We need to see if the Shopify app is authorized, and if so, to tell admin for which shop it is authorized. That's why we need to set the _shop_ name to settings also and remove form once Shopify app is authorized. Modify `server/assets/js/authorization.js` as follows:

<pre>
extension.init(function(context) {
<span class="newCode">  var settings = context.getExtensionSettings();</span>

  var SHOUTEM_APP_ID = context.getAppId();

  var EXTENSION_HOST = "[YOUR_HOST]"
  var API_KEY = "[YOUR_API_KEY]";
  var SCOPE = "read_products";
  var REDIRECT_URL = EXTENSION_HOST + "/shopify/auth/" + SHOUTEM_APP_ID;

<span class="newCode">  if (settings.get('accessToken')) {
    var shop = settings.get('shop');
    $('#settingsForm').remove();
    $('body').append('&lt;p>Extension is successfully authorized for shop:  ' + shop + '&lt;/p>');
  } else {</span>
    $('#settingsForm').on('submit', function(e) {
      var shop = $('#shop').val();
<span class="newCode">      settings.set('shop', shop);</span>

      var installUrl = "http://" + shop + ".myshopify.com/admin/oauth/authorize?client_id=" + API_KEY + 
        "&scope=" + SCOPE + "&redirect_uri=https://" + REDIRECT_URL;

      // TODO - rather open modal or something similiar
      // Go to shopify to authorize
      window.location.replace(installUrl);
    });
  }
}
</pre>

Upload it:
```
shoutem upload
```

To try if it works, you need to [remove](TODO) app from your Shopify store and reset extension instance settings, which can be done on admin dashboard by clicking on "Reset extension settings."

TODO - add picture showing admin page once user is authenticated to shopify with text "Extension is successfully authorized for shop: shoutem.myshopify.com" - you can use any other shopify shop name if necessary

Now that we have `ACCESS TOKEN` for Shopify shop, we're done with the builder side as well. Only mobile extension part is missing now. Let's make that.