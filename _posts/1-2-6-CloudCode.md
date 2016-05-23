---
layout: doc
permalink: /docs/user-data/cloud-code
---

# Shoutem Cloud Code

Shoutem Cloud Code is an extremely powerful service that let's you add customized functions, called controllers, to Shoutem Storage which can be registered to events. Controllers are a way to define handlers that should be executed once an event, such as changing the instances of some data schema, occurs. See the [complete list](TODO) of Shoutem provided events. For _Restaurants extension_, create controller which will calculate the average points for specific `Restaurant`. This needs to be executed every time any `RestaurantsRatings` instance is created or updated.

<blockquote>
  <p>Note</p>
  <footer>Calculating average points can be done over the client side too, but we shouldn't allow users to modify application data such as Restaurants average.</footer>
</blockquote>

Create a controller that will be registered *after* _create_, _update_ or _delete_ event happens on `RestaurantsRatings` schema. Do:

```
shoutem controller CalculateAverage
```

New file `server/controllers/CalculateAverage.js` has been created, with the content:

```
export default (event) => {
  // Implement controller
}
```

Notice `event` that is being passed to exported arrow function. That's [Shoutem Event object](TODO) which is passed to denote event that is going to or has occurred. The moment when the controller will be executed needs to be written in `extension.json` file. Modify `extension.json` to register controller to already described event:

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
        "properties": {
          "averagePoints": {
            "readonly": true
          }
        }
      }
    }, {
      "name": "ratings-cms",
      "page": "shoutem.core.contentPage",
      "title": "Restaurant Ratings",
      "parameters": {
        "schema": "devName.restaurant-extension.RestaurantsRatings",
        "editable": false
      }
    }]
<span class="newCode">  }],

  "controllers": [{
    "name": "calculateAverage",
    "on": [{
      "schema": "devName.restaurant-extension.RestaurantsRatings",
      "events": [
        "CREATED",
        "UPDATED",
        "DELETED"
      ]
    }]
  }]</span>
}
</pre>

Change `devName` to your developer name. Property `on` accepts the events unit object which describes which `events` our controller should handle for which `schema`. We registered our controller on `CREATED`, `UPDATED`, and `DELETED` events, when we'll update `averagePoints`.


## Implementing controller

Controller code will be executed on server. Modify `server/controllers/CalculateAverage.js` file. Import `shoutem-cloud` package.

```
import cloud from 'shoutem-cloud';
```

Package [shoutem-cloud](TODO) is a library that directly communicates with Shoutem Storage and gives you handy methods to manipulate your data there. In it's [API Reference](TODO) we documented how to use it's data. To calculate `averagePoints`, we'll use `aggregate` function with `$match` operators, to match all reviews of the restaurant that was updated and `$group` operator to calculate `$avg` of points that restaurant. Data that was modified on request, you can access through `event.data`. Add the following into the controller:

```
const restaurantRating = event.data;

const result = cloud['RestaurnatsRatings'].aggregate([
  { $match: { restaurant: restaurantRating.restaurant } },
  { $group: { _id: '$restaurant', avg: { $avg: '$points' }} }
]);
```

Once we have average points calculated, `update` it for restaurant:

<pre>
cloud['Restaurants'].update(
  { _id: restaurantsRating.restaurant },
  { $set: { averatePoints: result.avg } }
);
</pre>


This is what you should end up with:

<pre>
<span class="newCode">import cloud from 'shoutem-cloud';</span>

export default (event) => {
<span class="newCode">  const restaurantRating = event.data;

  // Calculate average
  const result = cloud['RestaurnatsRatings'].aggregate([
    { $match: { restaurant: restaurantRating.restaurant } },
    { $group: { _id: '$restaurant', avg: { $avg: '$points' }} }
  ]);

  // Update average points on Restaurants schema
  cloud['Restaurants'].update(
    { _id: restaurantsRating.restaurant },
    { $set: { averatePoints: result.avg } }
  );
}</span>
</pre>

<blockquote>
  <p>Note</p>
  <footer>The implemented controller is not the most optimized. You don't need to calculate average on complete set of points each time. Rather, use data being passed in <a href="TODO">Shoutem event object</a> and persist number of average points included in the average grade.</footer>
</blockquote>

Do:

```
shoutem upload
```

Go to your developer console where you can see controllers and logs that they produced.

TODO - in extensions tab, or developer console, we need to have a way to see controllers which are registered on our Cloud Code. They can produce analytics of their controllers data and logs that they're producing. This is similar what Amazon lambda has, since we'll use their service. See [this](https://www.google.hr/search?q=amazon+lambda&source=lnms&tbm=isch&sa=X&ved=0ahUKEwis5Yf91ejMAhUGrRoKHdgIDt4Q_AUIBygB&biw=1920&bih=1083#tbm=isch&q=amazon+lambda+logs)

Add some restaurant to your Shoutem CMS and rate it over the app. This is what you'll see in CMS admin pages:

TODO - Show 2 admin page tabs, and show only restaurant content page with average points.

Great, calculating average points is done! Let's recap what we've learned in this tutorial.

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/user-data/properties-admin-pages"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/user-data/summary">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>