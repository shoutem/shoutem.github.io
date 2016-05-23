---
layout: doc
permalink: /docs/getting-started/data-schemas
---

## Data Schemas
<hr />
First you need to define which kind of data you want to store on Shoutem cloud, namily it's structure - properties and types which it will hold. For this, we're using Shoutem-flavored [JSON Schemas](http://json-schema.org/) (We're just customizing it within the standard). JSON Schema is a way for defining your ```JSON```s, which will be instances of your model - Restaurants.

<br />

#### Use Shoutem CLI

Do:

```
shoutem data-schema Restaurants
```
Shoutem created `Restaurants.json` under new folder `server/data-schemas` folder. This is for the first time that we used `server` folder for something. The reason is that data-schemas are not part of the application code, but rather server side for extension. `Restaurants.json` looks like this:

```
{
  "name": "Restaurants",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Name",
      "type": "string"
    }
  },
  "title": "Restaurants",
  "titleProperty": "name"
}
```

```Restaurants.json``` is already prefilled with some memebers. Member ```type``` corresponds with the name passed when creating schema - that is the denoting the type of the Schema. Member ```properties``` represents properties of the instances created by ```Restaurants``` schema and it comes with the member ```name```. We'll use that for Restaurant's name. Other members are _meta_ about the schema and are explained in [Data](/docs/coming-soon) chapter.

Now we want to add some data to our _Restaurants_ schema. Since that's the job for `application admin`, we need to add `Admin page` to Shoutem builder for our extension. `Admin pages` are registered to specific extension shortcut. Shoutem has a list of [predefined Admin pages](/docs/coming-soon), out of which some have the purpose of entering the content for some data-schema. We need that Admin page which acts as Content page. Let's add it to `extension.json`:

<pre>
{
  "name": "restaurant-extension",
  "version": "0.0.1",

  "title": "RestaurantExtension",
  "description": "List restaurants",
  "shortcuts": [{
    "name": "OpenRestaurantsList",
    "action": "dev-name.restaurant-extension.openRestaurantsList",
    "title": "List of restaurants",
    "description": "Allow users to check the restaurants.",
    "icon": "",
<span class="newCode">    "adminPages": [{
      "page": "shoutem.admin.contentPage",
      "title": "Restaurants",
      "parameters": {
        "schema": "dev-name.restaurant-extension.Restaurants"
      }
    }]</span>
  }]
}
</pre> 

We used `shoutem.admin.contentPage` (from predefined Admin pages) which expects `schema` parameter that describes data schema to be used in Content editor. Don't forget to replace `dev-name` with your developer name.

Do:

```
shoutem upload
```

Now you can see that `Content page` on `RestaurantList` shortcut with the title `Restaurants`. 

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/cms-restaurants-empty.png'/>
</p>

Fill out the content of the restaurant. Here are some data that you can enter:

```
- Gourmand's place
- Fish and Chips
- Thaitanic
- Lord Of The Fries
- Vito's Pizza
- Noodle Bar
```

<p class="image">
<img src='http://shoutem.github.io/img/getting-started/cms-restaurants-filled.png'/>
</p>

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/screen"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/loading-data">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>