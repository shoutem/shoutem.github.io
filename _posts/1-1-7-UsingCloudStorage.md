---
layout: doc
permalink: /docs/getting-started/using-cloud-storage
---

# Using Cloud Storage
<hr />

Shoutem Cloud Storage is a CMS solution for mobile apps. It is optimized to be used within React Native apps with premade `reducers` and `actions` that are available in `@shoutem/redux-io` package. To describe model of your data on Shoutem Cloud Storage, you need to define a `Data Schema`:

```ShellSession
$ shoutem data-schema create Restaurants
`Restaurants` data schema is created.
Success!
```

Folder `data-schemas` inside `server` folder was created with file `Restaurants.json`. Content of that file is following:

```JSON
#file: server/data-schemas/Restaurants.json
{
  "title": "Restaurants"
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Name",
      "type": "string"
    },
  },
  "titleProperty": "name",
  "type": "object"
}
```

This is for the first time that we used `server` folder for something. The reason is that data-schemas are not part of the application code, but rather server side for extension. Data Schemas are nothing more than Shoutem-flavored [JSON Schemas](http://json-schema.org/). At the end, there are some properties describing the schema itself.

This schema was immediately exported in `extension.json` file:

```JSON{13-16}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",

  "title": "Restaurants",
  "description": "Show the cool restaurants!",
  "shortcuts": [{
    "name": "OpenRestaurantsList",
    "action": "developer.restaurants.openRestaurantsList",
    "title": "List of restaurants",
    "description": "Allow users to browse through list of restaurants"
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/data-schemas/Restaurants.json"
  }]
}
```

Let's add now properties that we want to persist for a restaurant, such as: `name`, `address`, `description`, `url`, `image` and `mail`.

```JSON{4-34}
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

At the end, we added few properties that describe your schema. We need to have a way to enter data for models represented by our data schemas. This is done on Shoutem Builder. Shoutem Builder has **Admin Pages** that are to manage the extension, such as for creating the content for application or setting preferences of the extension. You can write your own Admin Pages and thus fully customize the way application admin interacts with your extension. Shoutem has already made few Admin Pages that you are used to enter data to Shoutem Cloud Storage.

Admin Pages are registered to a specific extension shortcut. Add Admin Page to `openRestaurantsList` shortcut and specify for which Data Schema you want to enter data:

```JSON{12-18}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",

  "title": "Restaurants",
  "description": "Show the cool restaurants!",
  "shortcuts": [{
    "name": "OpenRestaurantsList",
    "action": "developer.restaurants.openRestaurantsList",
    "title": "List of restaurants",
    "description": "Allow users to browse through list of restaurants"
    "adminPages": [{
      "page": "shoutem.admin.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "developer.restaurants.Restaurants"
      }
    }],
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/data-schemas/Restaurants.json"
  }]
}
```

Change `developer` with your developer name.

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Shoutem Builder`. There you can see an empty admin page which allows you to add restaurants.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-admin-page.png'/>
</p>

Click on `Create content` to start adding content. It will redirect you to `CMS` tab where you can manage content for that extension.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-cms.png'/>
</p>

Click on `Add item`. This will open a modal for inserting data for `Restaurants` model, which you defined with your Data Schema.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/cms-modal.png'/>
</p>

Add some restaurants to the admin page.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/full-cms.png'/>
</p>

Although you've added them, your extension is still using static data. Let's go to fetch the data from Shoutem Cloud Storage using `@shoutem/redux-io` package.