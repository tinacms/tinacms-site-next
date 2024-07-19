---
id: /docs/schema/
title: Content Modeling with TinaCMS
last_edited: ''
next: /docs/features/data-fetching
---

## Introduction

The Tina schema defines the shape of your content. Tina uses a "content-modeling as code" approach. This has a few benefits compared to modelling through a UI:

* The schema is version-controlled
* Mutating the schema is easy, as you can test out changes locally, or in a branch.
* The developer can extend the schema in interesting ways (custom validation, custom UI fields, etc).

The content model, and all configuration code is defined in a file called `tina/config.{ts,js,tsx}`.

```ts
// tina/config.{ts,js,tsx}
import { defineConfig } from 'tinacms'

export default defineConfig({
  // ...
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'post',
        path: 'content/posts',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
          {
            type: 'string',
            label: 'Post Body',
            name: 'body',
            isBody: true,
          },
        ],
      },
    ],
  },
})
```

## Defining "collections"

Each item in your `collections` array represents its own entity. In the above example, we defined a `post` collection, and set its path as `content/posts`, which maps to a directory in our site's repository. Each collection contains an array of `fields`, that each have a defined `type`.

```md
---
title: This is my title
---

This is my main post body.
```

> Note: The `isBody` property is used to output a given field to the markdown body, instead of its frontmatter.

Once we've defined a collection, we can edit its fields through the Tina UI, or [query its content](/docs/graphql/overview/) using the Tina Content API.

## "List" fields

Specifying `list: true` on *any* field type will turn that field into an array of items:

```js
// ...
fields: [
  {
    label: 'Tags',
    name: 'tags',
    type: 'string',
    list: true,
  },
]
```

<a href="https://tina-gql-playground.vercel.app/string-list" target="_blank">See Example</a>

## Limiting values to a set of options

Any *scalar* field can accept an `options` array, note that in the example below we're using both `options` and `list` properties:

```js
// ...
fields: [
  {
    label: 'Categories',
    name: 'categories',
    type: 'string',
    list: true,
    options: [
      {
        value: 'movies',
        label: 'Movies',
      },
      {
        value: 'music',
        label: 'Music',
      },
    ],
  },
]
```

<a href="https://tina-gql-playground.vercel.app/string-list-options" target="_blank">See Example</a>

> Omitting `list: true` (or setting it to `false`) would result in a single-select `radio` field.

## Grouping properties as an "object"

An object type takes either a `fields` or `templates` property (just like the `collections` definition). The simplest kind of `object` is one with `fields`:

```js
// ...
fields: [
  {
    label: 'Testimonial',
    name: 'testimonial',
    type: 'object',
    fields: [
      {
        label: 'Author',
        name: 'author',
        type: 'string',
      },
      {
        label: 'Role',
        name: 'role',
        type: 'string',
      },
      {
        label: 'Quote',
        name: 'quote',
        type: 'string',
        ui: {
          component: 'textarea',
        },
      },
    ],
  },
]
// ...
```

<a href="https://tina-gql-playground.vercel.app/object" target="_blank">See Example</a>

Setting `list: true` would turn the values into an array:

<a href="https://tina-gql-playground.vercel.app/object-list-data" target="_blank">See Example</a>

> More complex shapes can be built by using the [`templates`](/docs/reference/types/object/#with-multiple-templates) property. This allows your editors to build out pages using predefined blocks.

## Defining defaults

Every collection has a `defaultItem` property, which is used to populate the form when creating a new item. This is useful for setting default values for fields, or for adding default content to the markdown body.

### Default item

```js
export default defineConfig({
  // ...
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'post',
        path: 'content/posts',
        defaultItem: () => {
          return {
            // When a new post is created the title field will be set to "New post"
            title: 'New Post',
          }
        },
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
        ],
      },
    ],
  },
})
```

[See the docs](/docs/reference/collections/) for more examples of how to define defaults.

### Default value for objects

To set default values for objects of fields, use the `defaultItem` property (see [example here](https://tina-gql-playground.vercel.app/object-list-data)).

### Default value for rich-text

Currently, when setting a default value for a [rich-text field](/docs/reference/types/rich-text/), you must provide the document Abstract Syntax Tree (AST). See the following example:

```js
export default defineConfig({
  // ...
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'post',
        path: 'content/posts',
        defaultItem: () => {
          return {
            title: 'My New Post',
            // The body will be populated with "Default Text"
            body: {
              type: 'root',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      type: 'text',
                      text: 'Default Text',
                    },
                  ],
                },
              ],
            },
          }
        },
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
          {
            type: 'string',
            label: 'Post Body',
            name: 'body',
            isBody: true,
          },
        ],
      },
    ],
  },
})
```

## Referencing another document

The `reference` field connects one document to another and only needs to be defined on *one* side of the relationship. You can specify any number of collections you'd like to connect:

```js
// ...
fields: [
  // ...
  {
    label: 'Author',
    name: 'author',
    type: 'reference',
    collections: ['author'], // points to a collection with the name "author"
  },
]
//
```

<a href="https://tina-gql-playground.vercel.app/reference" target="_blank">See Example</a>

## Available data types

Each field in a collection can be of the following `type`:

### *scalar types*

* [string](/docs/reference/types/string/)
* [datetime](/docs/reference/types/datetime/)
* [boolean](/docs/reference/types/boolean/)
* [image](/docs/reference/types/image/)
* [number](/docs/reference/types/number/)

### *nonscalar types*

* [reference](/docs/reference/types/reference/)
* [object](/docs/reference/types/object/)
* [rich-text](/docs/reference/types/rich-text/)

## Video Tutorial

For those who prefer to learn from video, you can check out a snippet on media from our ["TinaCMS Deep Dive"](https://www.youtube.com/watch?v=PcgnJDILv4w\&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB\&pp=iAQB) series.

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/PcgnJDILv4w?start=554&end=777" title="TinaCMS Deep Dive (Content Modeling)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>

## Summary

* Your content is modeled in the `tina/config.{ts,js,tsx}` in your repo using `defineConfig`.
* Your content model contains an array of "collections". A "collection" maps a content type to a directory in your repo.
* A "collection" contains multiple fields, which can be of multiple scalar or non-scalar data types.
