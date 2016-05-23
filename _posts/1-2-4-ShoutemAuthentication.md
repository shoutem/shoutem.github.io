---
layout: doc
permalink: /docs/user-data/shoutem-authentication
---

# Shoutem Authentication

We need to ensure every user is authenticated before points are submitted. Shoutem allows you to use any kind of authentication. In previous chapter, when we defined `RestaurantRatings` schema, we made a property for Shoutem user. Already there, we defined how to use `shoutem.auth` extension. This is default authentication extension that connects with Shoutem Storage and manages authentication. You don't need to think of anything, everything is already provided. Just install `shoutem.auth` extension to your app:

TODO - show picture on add modal of Shoutem authencation, adding it.

Great!

Now we need to ensure that before some screens are opened, user is authenticated. We'll use annotation which is exported by `shoutem.auth` extension. Unauthenticated user will be prompted a sign up screen with `email` and `password` when accessing screen that requires authentication, as shown on picture:

TODO - picture showing sign up screen from shoutem.auth

<blockquote>
  <p>Note</p>
  <footer>That's default behaviour, although you can change settings of `shoutem.auth` through your Developer Console, where users will only need to enter their username and they will be tight to the application on specific device. Notice, however, that such authentication doesn't support changing authenticated user.</footer>
</blockquote>

Add now require permission to `RestaurantsList` screen.

<pre>
...
<span class="newCode">import requireAuthentication from 'shoutem.auth';

@requireAuthentication()</span>
class RestaurantsList extends Component ...
</pre>

Once authenticated user will be passed contained in `user` property of `shoutem.auth` extension. Get it in `connect` method in `app/screens/RestaurantsList.js`:

<pre>
export default connect((state, ownProps) => ({
  restaurants: state['developer.restaurant-extension'].allRestaurants.map(key =>
<span class="newCode">    state['developer.restaurant-extension'].restaurants[key]),
  user: state['shoutem.auth'].user</span>
})(RestaurantsList)
</pre>

We need to pass this to `RestaurantsDetails` through `RestaurantRow`.

Change invoking `RestaurantsRow` in `app/screens/RestaurantsList.js`:

<pre>
renderRow(restaurant) {
  let { navigator, user } = this.props;
  return (
    &lt;RestaurantsRow
      restaurant
      user
      onPress={() => navigator.push({
        screen: 'developer.restaurant-extension.RestaurantDetails',
        props: {
          restaurant, user, dispatch
        }
      })}
    />
  )
}
</pre>

We also need to handle submitting ratings to Shoutem Storage. Import `create` action and dispatch it with object for `RestaurantsRatings`.

<pre>
<span class="newCode">import { create } from 'shoutem/cms';</span>

class RestaurantsDetails extends Component {
  ...

<span class="newCode">  handleSubmit(points) {
    const { dispatch, restaurant, user } = this.props;
    const user = settings.currentUser;
    dispatch(create({
      restaurant,
      points,
      user
    }))
  }</span>

  ...
</pre>

If we would leave it just like this, it would work. But, like this every application user has a permission to change review that any user submitted with valid session. We can change this easily by including other type of `permission` that we talked about: `permissions on resources`. On `create` action, we can specify options, how it's documented in it's [API reference](TODO). In options, we'll provide `permission` property describing `permission on resources` for the resource that is being created. Modify `handleSubmit` method to follow:

<pre>
handleSubmit(points) {
  const { dispatch, restaurant, user } = this.props;
  const user = settings.user;
<span class="newCode">  dispatch(create({
    restaurant,
    points,
    user
  }, {
    permission: {
      read: 'shoutem.auth.user/*',
      update: `shoutem.auth.user/${user.id}`,
      delete: `shoutem.auth.user/${user.id}`
    }
  }))</span>
}
</pre>

As we can see, this permission doesn't have only `read` and `write`, but `RUD` options (Read, Update and Delete), allowing you to create whatever you imagine. Create permission is not needed, since it's defined in `permission for schema`. With such permission specified, we're allowing everyone to read users review, but only the owner can update and delete it.

It is the time to update admin pages which will be shown on `RestaurantsList` shortcut, because we don't want admin's to change average points for the restaurant or to submit their reviews of restaurants.

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/user-data/submitting-user-data"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/user-data/properties-admin-pages">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>