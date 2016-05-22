---
layout: doc
permalink: /docs/user-data/submitting-user-data
---

# Allow application users to submit data

Create new data schema:

```
shoutem data-schema RestaurantRatings
```

We need a way to authenticate user in the application using specific extension. For that, we're using `shoutem.auth` [Authentication](TODO) Shoutem extension and it's `shoutem.auth.user` data schema. Modify newly created file in `server/data-schemas/RestaurantRatings.json` to:

<pre>
{
  "name": "RestaurantRatings",
  "properties": {
<span class="newCode">    "user": {
      "title": "User",
      "format": "entity-reference",
      "referencedSchema": "shoutem.auth.user",
      "type": "object"
    },
    "points": {
      "title": "Points",
      "format": "integer",
      "type": "integer"
    }, 
    "restaurant": {
      "title": "Restaurant",
      "format": "entity-reference",
      "referencedSchema": "dev-name.ext-name.Restaurants",
      "type": "object"
    }
  },
  "title": "Restaurant Ratings",
  "titleProperty": "user"</span>
}
</pre>

Replace `dev-name.ext-name` with the actual data. We're tracking the points given by the user for some restaurants. Value of `points` property that is sent will be used to form averagePoints of specific restaurant. Add `averagePoints` property to `server/data-schemas/Restaurants.json`:

<pre>
  "name": "Restaurant",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Name",
      "type": "string"
    },
    "url": {
      "format": "uri",
      "title": "Restorant's website",
      "type": "string"
    },
    "description": {
      "format": "html",
      "title": "Description",
      "type": "string"
    },
    "image": {
      "format": "image",
      "title": "Image",
      "type": "object"
    },
    "mail": {
      "format": "single-line",
      "title": "Restaurant's e-mail",
      "type": "string"
    },
<span class="newCode">    "averagePoints": {
      "format": "float",
      "title": "Average points",
      "type": "number"
    },</span>    
  },
  "title": "Restorant",
  "titleProperty": "name",
  "type": "object"
</pre>

However, we still need to adjust permissions at Restaurants ratings schema. At Shoutem, we care great deal about security. In this extension, we want to allow all users to create their reviews and every user to read those reviews for any restaurant, but only the owners of the reviews to have the chance to change it. For that, we'll use [Shoutem Access Control List](TODO) to define the permissions. We have 2 levels of permissions:

- Permission on schema
- Permission on resource

These permissions are here for application users, as application owners have all permissions, since it's their application. 

_Permission on schema_ is defined while specifying the schema object and includes `read` and `write` permissions. Permission `read` permission is granted by default on all schemas, meaning that all application users can read that data. If we want our application users to write data to our schemas, we need to set `write` permission. Let's do that on our schema `RestaurantRatings` schema:

<pre>
{
  "name": "RestaurantRatings"
  "properties": {
    "user": {
      "title": "User",
      "format": "entity-reference",
      "referencedSchema": "shoutem.auth.user",
      "type": "object"
    },
    "points": {
      "title": "Points",
      "format": "integer",
      "type": "integer"
    }, 
    "restaurant": {
      "title": "Restaurant",
      "format": "entity-reference",
      "referencedSchema": "dev-name.ext-name.Restaurants",
      "type": "object"
    }
  },
  "title": "Restaurant Ratings",
  "titleProperty": "user",
<span class="newCode">  "permissions": {
    "read": ["shoutem.auth.user/*"],
    "write": ["shoutem.auth.user/*"]
  }  </span>
}
</pre>

Since now we defined `permission` on our schema which overrides default permission settings, we needed to add also `read` permission. The values of read permissions are patterns that need to be satisfied for permission to be granted. Since we're using `shoutem.auth` extension for authentication and authorization, we specified its `shoutem.auth.user` schema for any user, denoted with star character `(*)`. Such flexible authentication and authorization permissions allow you to write [your authentication and authorization extension](TODO).

However, we need specify another level of permission and that is `permission on resource`. We'll set that when creating the actual resource. Permission on resource will allow every user to specify complete `CRUD` permission on the created resource. We'll do that when saving the object.

Add `averagePoints` to Restaurants UI. For that, we need to change `render` method of `RestaurantsRow` component:

<pre>
render() {
  let { restaurant, onPress } = this.props;

  return (
    &lt;TouchableOpacity onPress{onPress}>
      &lt;View style={styles.container}>
        &lt;Image
          source:{{uri: getAsset('img/restaurants.png')}}
          style={style.picture}
        />
        &lt;View style={styles.rightContainer}>
          &lt;Text style={styles.title}>{restaurant.title}&lt;/Text>
<span class="newCode">          &lt;Text>{restaurant.averagePoints}&lt;/Text></span>
        &lt;/View>
      &lt;/View>
    &lt;/TouchableOpacity></span>
  )
}
</pre>

We need to make sure that application users are signed in to our application before submitting their review.