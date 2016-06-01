---
layout: doc
permalink: /docs/getting-started/using-cloud-storage
---

# Using Cloud Storage
<hr />

Shoutem Cloud Storage is a CMS solution for mobile apps. It is optimized to be used within React Native apps with premade `reducers` and `actions` that are available in `shoutem-cloud` package. To describe model of your data on Shoutem Cloud, you need to define `Data Schema`:

```
shoutem create data-schema Restaurants
`Restaurants` data schema is created.
Success!
```

Folder `data-schemas` inside `server` folder was created with file `Restaurants.json`. Content of that file is following:

```JSON
#file: server/data-schemas/Restaurants.json
{
  "name": "Restaurants",
  "properties": {
  }
}
```

This is for the first time that we used `server` folder for something. The reason is that data-schemas are not part of the application code, but rather server side for extension. Data Schemas are nothing more than Shoutem-flavored [JSON Schemas](http://json-schema.org/).

Let's add now properties that we want to persist for a restaurant, such as: `name`, `address`, `description`, `url`, `image` and `mail`.

```JSON{4-,34}
#file: server/data-schemas/Restaurants.json
{
  "name": "Restaurants",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Restaurant name",
      "type": "string"
    },
    "address": {
      "format": "single-line",
      "title": "Address",
      "type": "string"
    },
    "description": {
      "format": "multi-line",
      "title": "Description",
      "type": "string"
    },
    "url": {
      "format": "uri",
      "title": "Website",
      "type": "string"
    },
    "image": {
      "format": "image",
      "title": "Image",
      "type": "object"
    },
    "mail": {
      "format": "single-line",
      "title": "E-mail",
      "type": "string"
    }
  },
  "title": "Restaurant",
  "titleProperty": "name",
  "type": "object"
}
```

At the end, we added few properties that describe your schema. We need to have a way to enter data for models represented by our data schemas. This is done on Shoutem Builder. Shoutem Builder has `admin pages` that are used for creating content for application and setting the preferences of the extension. You can write your own `admin pages` and thus fully customize the way app admin interacts with your extension. Shoutem has already made few `admin pages` that you are used to enter data to Shoutem Cloud.

`Admin pages` are registered to specific extension shortcut. Add `admin page` to `OpenRestaurantsList` shortcut and specify for which `data-schema` you want to enter data:

```JSON{13-19}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",

  "title": "Restaurants",
  "description": "Show the cool restaurants!",
  "shortcuts": [{
    "name": "OpenRestaurantsList",
    "action": "dev-name.restaurants.openRestaurantsList",
    "title": "List of restaurants",
    "description": "Allow users to browse through list of restaurants"
  }]
    "adminPages": [{
    "page": "shoutem.admin.contentPage",
    "title": "Content",
    "parameters": {
      "schema": "dev-name.restaurants.Restaurants"
    }
  }]
}
```

Change `dev-name` with your developer name.

Upload the extension:

```
shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Shoutem Builder`. There you can see an empty admin page which allows you to add restaurants.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-admin-page.png'/>
</p>

Click on `Edit content` to start adding content. It will redirect you to `CMS` tab where you can manage content for that extension.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-cms.png'/>
</p>

Click on `Add item`. This will open a modal for inserting data for `Restaurant` model, which you defined with your `data-schema`.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/cms-modal.png'/>
</p>

Add some restaurants to the admin page.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/full-cms.png'/>
</p>

Although you've added them, our extension is still using static data. Let's go to fetch the data from Shoutem Cloud Storage using `shoutem cloud` package.

