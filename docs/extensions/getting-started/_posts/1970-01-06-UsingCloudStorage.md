---
layout: doc
permalink: /docs/extensions/getting-started/using-cloud-storage
title: Using Cloud Storage
section: Getting Started
---

# Using Cloud Storage
<hr />

Shoutem Cloud Storage is a CMS solution for mobile apps. We prepared [@shoutem/redux-io](https://github.com/shoutem/redux-io) package that simplifies the communication with Shoutem CMS. Define a `data schema` to describe your data model.

```ShellSession
$ shoutem schema add Restaurants
Schema `Restaurants` is created in file `server/data-schemas/Restaurants.json`!
File `extension.json` was modified.
```

Folder `data-schemas` inside `server` folder was created with file `Restaurants.json`. Content of that file is following:

```JSON
#file: server/data-schemas/Restaurants.json
{
  "title": "Restaurants",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Name",
      "type": "string",
      "displayPriority": 1
    },
  },
  "titleProperty": "name",
  "type": "object"
}
```

This is the first time that we used `server` folder. The reason is that data schemas are not part of the app code, but rather server side of extension. Data schemas are nothing more than Shoutem-flavored [JSON Schemas](http://json-schema.org/). They describe data to be stored on Shoutem Cloud Storage.

All fields are explained in [data schema reference]({{ site.baseurl }}/docs/cloud/data-schemas). This schema is exported in `extension.json` file:

```JSON{18-21}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants",
  "screens": [{
    "name": "List"
  }, {
    "name": "Details"
  }],
  "shortcuts": [{
    "name": "Restaurants",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants"
    "screen": "@.List",
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/data-schemas/Restaurants.json"
  }]
}
```

Currently, schema only has the `name` property, which we'll use for restaurant name. Let's add additional properties which we want to store for each restaurant, such as: `address`, `description`, `url`, `image` and `mail`.

```JSON{4-40}
#file: server/data-schemas/Restaurants.json
{
  "title": "Restaurant",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Restaurant's name",
      "type": "string",
      "displayPriority": 1
    },
    "address": {
      "format": "single-line",
      "title": "Address",
      "type": "string",
      "displayPriority": 2
    },
    "description": {
      "format": "multi-line",
      "title": "Description",
      "type": "string",
      "displayPriority": 3
    },
    "url": {
      "format": "uri",
      "title": "Website",
      "type": "string",
      "displayPriority": 4
    },
    "image": {
      "format": "attachment",
      "title": "Image",
      "type": "object",
      "referencedSchema": "shoutem.core.image-attachments",
      "displayPriority": 5
    },
    "mail": {
      "format": "single-line",
      "title": "E-mail",
      "type": "string",
      "displayPriority": 6
    }
  },
  "titleProperty": "name",
  "type": "object"
}
```

To enter data for your schema, you need to use settings page. Shortly, [settings pages]({{ site.baseurl }}/docs/extensions/tutorials/writing-settings-page) are web pages shown inside of the Shoutem builder. Extension developers write them to enable app owners to manage extensions.

Shoutem prepared CMS settings page inside [shoutem.cms](https://github.com/shoutem/extensions/tree/master/shoutem-cms) extension that you can use to manage data for your `schema` on Shoutem Cloud. Reference that settings page in `Restaurants` shortcut and pass it the `Restaurants` schema. Page will appear when app owner selects `Restaurants` shortcut on the builder:

```JSON{17-23}
#file: extension.json
{
  "name": "restaurants",
  "version": "0.0.1",
  "platform": "1.0.*",
  "title": "Restaurants",
  "description": "List of restaurants",
  "screens": [{
    "name": "List"
  }, {
    "name": "Details"
  }],
  "shortcuts": [{
    "name": "Restaurants",
    "title": "Restaurants",
    "description": "Allow users to browse through list of restaurants",
    "screen": "@.List",
    "adminPages": [{
      "page": "shoutem.cms.CmsPage",
      "title": "Content",
      "parameters": {
        "schema": "@.Restaurants"
      }
    }]
  }],
  "dataSchemas": [{
    "name": "Restaurants",
    "path": "server/data-schemas/Restaurants.json"
  }]
}
```

Upload the extension:

```ShellSession
$ shoutem push
Uploading `Restaurants` extension to Shoutem...
Success!
```

Go to `Shoutem Builder`. When you select `Restaurants` under `Main navigation`, you can see the Shoutem CMS page.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-admin-page.png'/>
</p>

Click on `Create items` to start adding content. This will redirect you to `CMS` interface where you can manage the content for your extension.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-cms.png'/>
</p>

Click on `Add item`. This will open a modal for inserting data for `Restaurants` model, which you defined with your data schema.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/cms-modal.png'/>
</p>

Add some restaurants. If you don't want to add the data manually, you can import it in Shoutem CMS. We prepared CSV (comma-separated values) file which you can use for importing. In the Shoutem CMS interface, open the 3 points `...` and select `Import` option. When asked to select the source, select `Comma-separated values`. For CSV data source, use this link: [https://shoutem.github.io/static/getting-started/restaurants.csv](/static/getting-started/restaurants.csv). You can also upload CSV if you click `Browse`. Click `Next` and do the mapping. This is how the mapping should look like:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/import-csv.png'/>
</p>

Click `Next` and `X` afterwards in top right corner. Now you can see the data in the CMS settings page:

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/full-cms.png'/>
</p>

Although you've added them, your extension is still using static data. Let's fetch the data from Shoutem Cloud Storage using `@shoutem/redux-io` package.
