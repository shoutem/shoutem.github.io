---
layout: doc
permalink: /docs/3rd-party/custom-admin-page
---

# Building custom admin pages

So far, extension serves static products and goal is to get products from admin's Shopify store. Before that, we need to make panel for authorizing your Shopify application, which will be shown on `OpenProductsList` shortcut. Up until now, we were using only Shoutem predefined Admin pages (more specifically, only Content page), which we customized by passing parameters. But, you can create fully customizable admin page which gives you full freedom in how admin's will interact with your extension. We've even built [Shoutem UI toolkit](TODO) for builder that you can use to build components for builder's interface. These components follow our UI concept, so admin will be familiar with the interface when it's interacting with your extension.

Ok, great! Let's create our first custom admin page. Use Shoutem CLI to create it:

```
shoutem admin-page AuthorizePage
```

Admin page is just an HTML file which can contain `javascript` and `css`. However, sometimes it is better to put these parts to special folder in `assets` file so it can be reused in other pages. 

To initiate authorization, all we need is `url` of the store. We're using bootstrap to style components.

```
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  </head>
  <body>    
    <form id="settingsForm">
      <div class="input-group">
        <input type="text" class="form-control" id="shop" placeholder="Shop url" aria-describedby="suffix" >
        <span class="input-group-addon" id="suffix">.myshopify.com</span>
      </div>
      <button type="submit" class="btn btn-default">Authorize</button>
    </form>
  </body>
</html>
```

Add this admin page to `OpenProductList` shortcut in `extension.json`:

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
  }]
}
</pre>

Do:

```
shoutem upload
```

This is the result you got in admin panel of `OpenProductList` shortcut.

TODO - add picture representing admin page, only with input control described in HTML of admin page on selected shortcut.

Now that we've built custom admin page, let's make it authorize Shopify app.
