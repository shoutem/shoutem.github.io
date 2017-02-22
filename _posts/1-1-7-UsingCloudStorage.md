---
layout: doc
permalink: /docs/extensions/getting-started/using-cloud-storage
title: Using Cloud Storage
section: Getting Started
---

# Using Cloud Storage
<hr />

Shoutem Cloud Storage is a CMS solution for mobile apps. We prepared `@shoutem/redux-io` package that communicates with our CMS. Define a `data schema` to describe your data model.

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

This is the first time that we used `server` folder. The reason is that data schemas are not part of the application code, but rather server side for extension. Data schemas are nothing more than Shoutem-flavored [JSON Schemas](http://json-schema.org/). At the end, there are some properties describing the schema itself. All properties are explained in [data schema reference]({{ site.baseurl }}/docs/cloud/data-schemas).

This schema is exported in `extension.json` file:

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

Let's add now properties that we want to persist for a restaurant, such as: `name`, `address`, `description`, `url`, `image` and `mail`.

```JSON{4-40}
#file: server/data-schemas/Restaurants.json
{
  "title": "Restaurant",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Restaurant name",
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

To enter data for your schema, you need to use Shoutem CMS settings page. Shortly, [settings pages]({{ site.baseurl }}/docs/extensions/tutorials/writing-settings-page) are web pages that you as developer can write to enable application owners to manage your extension. They are shown inside of the Shoutem builder when application owner clicks on the starting screen in the navigation bar (shortcut).

Shoutem prepared predefined CMS page inside [shoutem.cms](https://github.com/shoutem/extensions/tree/master/shoutem-cms) extension that you can connect with your `schema` through parameters. Add that admin page to `Restaurants` shortcut and specify data schema to be used:

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

Go to `Shoutem Builder`. When you select `Restaurants` under `Main navigation`, you can see a Shoutem CMS page.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-admin-page.jpg'/>
</p>

Click on `Create items` to start adding content. It will redirect you to `CMS` tab where you can manage content for that extension.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/empty-cms.png'/>
</p>

Click on `Add item`. This will open a modal for inserting data for `Restaurants` model, which you defined with your Data Schema.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/cms-modal.png'/>
</p>

Add some restaurants to the settings page.

<p class="image">
<img src='{{ site.baseurl }}/img/getting-started/full-cms.png'/>
</p>

Although you've added them, your extension is still using static data. Let's go to fetch the data from Shoutem Cloud Storage using `@shoutem/redux-io` package.
