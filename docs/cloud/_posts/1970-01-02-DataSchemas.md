---
layout: doc
permalink: /docs/cloud/data-schemas
title: Introduction
section: Data Schemas
---

# Data Schemas

Data Schema describes what the data will look like. Schemas are a `type` of data. The format of the data schema is nothing more than a Shoutem flavored [JSON schema](https://spacetelescope.github.io/understanding-json-schema/UnderstandingJSONSchema.pdf).

## Usage in extensions

Create a data schema with:

```ShellSession
$ shoutem schema add <schema-name>
```

where you should replace `<schema-name>` with the name of your Data Schema name. Example:

```ShellSession
$ shoutem schema add Restaurants
Schema `Restaurants` is created in file `server/schemas/Restaurants.json`!
File `extension.json` was modified.
```

Data schema is created in the `server/data-schemas` folder. Its default content is:

```JSON
{
  "title": "Restaurants",
  "properties": {
    "name": {
      "format": "single-line",
      "title": "Name",
      "type": "string",
      "displayPriority": 1
    }
  },
  "titleProperty": "name",
  "type": "object"
}
```

Root JSON fields that are immediately included are:

- `title`: Title of the schema shown on the CMS page
- `properties`: Properties of each object created from that data schema
- `titleProperty`: Property used as title of object in the list
- `type`: Type of data in JavaScript. It can only be `object`

Field `properties` is an object containing _keys_ as names of object properties and _values_ as descriptors of property's value. Shoutem flavored `properties` can't have children. Below is the reference for value descriptor.

## Value descriptor reference

With the value descriptor Shoutem builder knows which input fields to render on the CMS page. These input fields along with the `title` property explain to the application owner which kind of data they expect.

### Value types

Each value type has a combination of `type`, `format` and sometimes additional properties in the value descriptor which define type of the value. We call them _value signatures_. Referencing other data schemas is enabled by using `referencedSchema` field. Below are the signatures and examples for each value type that can be created with data schemas.

> #### Note
> JSON schema defines the types that can be used. It also provides some built-in formats. However, Shoutem uses its own flavored formats.

#### Single-line string

Signature:

```JSON
"type": "string",
"format": "single-line"
```

Example:

```JSON
"name": {
  "type": "string",
  "format": "single-line",
  "title": "Name",
  "required": true
}
```

#### Multi-line string

Signature:

```JSON
"type": "string",
"format": "multi-line"
```

Example:

```JSON
"description": {
  "type": "string",
  "format": "multi-line",
  "title": "Description",
  "minLength": 10,
  "maxLength": 1000
},
```

#### Integer

Signature:

```JSON
"type": "integer",
"format": "integer"
```

Example:

```JSON
"rating": {
  "type": "number",
  "format": "number",
  "title": "Rating",
  "minimum": 0,
  "maximum": 10
}
```

#### Boolean

Signature:

```JSON
"type": "boolean",
"format": "boolean"
```

Example:

```JSON
"offersWifi": {
  "type": "boolean",
  "format": "boolean",
  "title": "Offers WIFI"
}
```

#### Array

Signature:

```JSON
"type": "array",
"format": "array"
```

Example:

```JSON
"genericArray": {  
  "type": "array",
  "format": "array",
  "title": "Generic JS Array"
},
```

#### Generic object

Signature:

```JSON
"type": "object",
"format": "object"
```

Example:

```JSON
"genericObject": {  
  "type": "object",
  "format": "object",
  "title": "Generic JS Object"
}
```

#### Date time

Signature:

```JSON
"type": "object",
"format": "date-time"
```

Example:

```JSON
"openedSince": {
  "type": "object",
  "format": "date-time",
  "title": "Opened Since"
}
```

#### Location

Signature:

```JSON
"type": "object",
"format": "geolocation"
```

Example:

```JSON
"placeOfBirth": {
  "type": "object",
  "format": "geolocation",
  "title": "Place of birth"
}
```

#### Image

Signature:

```JSON
"type": "object",
"format": "attachment",
"referencedSchema": "shoutem.core.image-attachments"
```

Example:

```JSON
"image": {
  "type": "object",
  "format": "attachment",
  "title": "Restaurant's image",
  "referencedSchema": "shoutem.core.image-attachments"
}
```

#### Rich media

Signature:

```JSON
"type": "string",
"format": "html"  
```

Example:

```
"info": {
  "type": "string",
  "format": "html",
  "title": "Info",
  "maxLength": 10000
}
```

#### Custom referenced schema - single object

Signature:

```JSON
"type": "object",
"format": "entity-reference",
"referencedSchema": "<<absolute-data-schema-name>>"
```

Example:

```JSON
"Restaurant": {
  "type": "object",
  "format": "entity-reference",
  "title": "Best restaurant",
  "referencedSchema": "shoutem.restaurants.Restaurants"
}
```

> #### Note
> The absolute data schema reference is formated following structure {developerName}.{extensionName}.{extensionPartName} as explained in [Creating shortcut and screen]({{ site.url }}/docs/extensions/my-first-extension/shortcut-and-screen) tutorial

#### Custom referenced schema - array

Signature:

```JSON
"type": "object",
"format": "entity-reference-array",
"referencedSchema": "<<absolute-data-schema-name>>"
```

Example:

```JSON
"News": {
  "type": "object",
  "format": "entity-reference-array",
  "title": "News",
  "referencedSchema": "shoutem.news.News"
}
```


### Property order

As `properties` are a dictionary and dictionaries are by nature unordered, we added a `displayPriority` property in the value descriptor which you can use to define the order in which properties are shown on the Shoutem CMS interface. A valid value of `displayPriority` property is an integer - the lower the integer, the higher the property will be shown in the interface.

Display priority is an optional property. Properties which omit it will be rendered in an arbitrary order after all the properties with `displayPriority` defined.


### Additional descriptor properties

The value descriptor along with _value type_ can also describe additional information for a particular value. These fields are inherited from the JSON Schema specification:

- `properties.pattern` - regex pattern constraint, applicable only to `string` primitive type
- `properties.required` - required constraint
- `properties.minLength` and `properties.maxLength` - `string` length constraints, applicable only to `string` primitive type
- `properties.maximum` and `properties.minimum` - value range constraints, applicable only to number and integer primitive types


These additional descriptor properties allow us to create arbitrary types, such as generally used e-mail:

```JSON
"email": {
  "type": "string",
  "format": "single-line",
  "title": "Email",
  "minLength": 3,
  "maxLength": 100,
  "pattern": "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
},
```