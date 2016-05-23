---
layout: doc
permalink: /docs/user-data/properties-admin-pages
---

# Properties for Admin pages 

Until now, we've only defined data-schemas to be passed to predefined [Shoutem admin page](TODO) defining content which will be shown on admin page. However, content pages accept number of [properties](TODO) which change how it appears to application admin. For our extension, we need a way to define which data admin can only see, but not modify. That includes only `averagePoints` property in `Restaurants` schema, but all properties in `RestaurantsRatings` schema. Actually, we don't want to permit admin to add instances of `RestaurantsRatings` schema through client pages.

Modify `extension.json` to include such content pages to `OpenRestaurantsList` shortcut:

<pre>
{
  "name": "restaurant-extension",
  "version": "0.0.1",
  "title": "RestaurantsExtension",
  "description": "List restaurants!",

  "shortcuts": [{
    "name": "OpenRestaurantsList",
    "action": "devName.restaurant-extension.OpenRestaurantsList",
    "description": "Allow users to check the restaurants.",

    "adminPages": [{
      "name": "restaurants-cms",
      "page": "shoutem.core.contentPage",
      "title": "Restaurants",
      "parameters": {
        "schema": "devName.restaurant-extension.Restaurants",
<span class="newCode">        "properties": {
          "averagePoints": {
            "readonly": true
          }
        }</span>
      }
<span class="newCode">    }, {
      "name": "ratings-cms",
      "page": "shoutem.core.contentPage",
      "title": "Restaurant Ratings",
      "parameters": {
        "schema": "devName.restaurant-extension.RestaurantsRatings",
        "editable": false
      }
    }]</span>
  }]
}
</pre>

Change `devName` to your developer name. Notice that we have 2 ways of adjusting CMS functionalities on admin pages: through `schema` properties, where you should specify how each property should behave on CMS or on complete `schema`, where you can completely disable editing schema.

There is also possibility to [hide](TODO) some properties from content page, but we didn't need it here.

Install the extension to some application with (if you haven't already) and upload it to Shoutem:

```
shoutem upload
shoutem install --app [APPID]
```

Replace `[APPID]` with the application ID. 

Visit [Shoutem Builder](TODO). You can see that now we have 2 tabs for admin pages: _Restaurants_ and _Restaurants Ratings_ and that some things are not possible to change.

TODO - add picture showing Shoutem builder screen.

Once data schemas and admin pages are set, we want to calculate average points from restaurant. For that, we're using Shoutem Cloud Code.

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/user-data/shoutem-authentication"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/user-data/cloud-code">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>