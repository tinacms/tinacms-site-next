---
title: Block-based editing
prev: '/docs/editing/markdown'
id: '/docs/editing/blocks'
next: /docs/editing/single-document-collections
---

Tina supports block-based editing, so that your editors can build out full pages using your pre-defined blocks

![block-based-editing](https://res.cloudinary.com/forestry-demo/image/upload/v1645712511/tina-io/docs/your-blocks.gif)

Let's say you want your editors to build out a page, and you have 3 main "block" types to start.

- a "Hero" block
- a "Feature" block
- a "Main Content" block

We want to allow our editors to use various blocks on each page.

## Defining our schema

We are going to use the [`object` type](/docs/schema/#grouping-properties-within-an-object), and provide a list of `templates`, where each "template" represents a unique block type.

```ts
import { defineConfig } from 'tinacms'
import type { Template } from 'tinacms'

const heroBlock: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Text',
      name: 'text',
      ui: {
        component: 'textarea',
      },
    },
  ],
}

const featureBlock: Template = {
  name: 'features',
  label: 'Features',
  fields: [
    {
      type: 'object',
      label: 'Feature Items',
      name: 'items',
      list: true,
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Text',
          name: 'text',
        },
      ],
    },
  ],
}

const contentBlock: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    {
      type: 'string',
      ui: {
        component: 'textarea',
      },
      label: 'Body',
      name: 'body',
    },
  ],
}

export default defineConfig({
  // ...
  schema: {
    collections: [
      {
        // ...
        fields: [
          {
            type: 'object',
            list: true,
            name: 'blocks',
            label: 'Sections',
            templates: [heroBlock, featureBlock, contentBlock],
          },
        ],
      },
    ],
  },
})
```

We have defined the structure of our 3 blocks (`content`, `features`, `hero`), as well as our main blocks field: `blocks`.

> Note, since our contentBlock uses the [markdown plugin](/docs/reference/toolkit/fields/markdown/) which is not registered out of the box, we will need to manually import the `react-tinacms-editor` plugin.

## Querying Block Data

Because each item in a list of blocks can have a unique schema, querying this data isn't as straightforward as other types of fields. We'll need use GraphQL's fragment syntax to query the appropriate data shape for each block type.

The fragment names are automatically generated based on the collection name and parent field name. For example, if the collection is `pages`, the field is `blocks`, and the block's name is `hero`, the fragment will be named `PagesBlocksHero`.

```graphql
query PagesDocument($relativePath: String!) {
  pages(relativePath: $relativePath) {
    blocks {
      __typename
      ... on PagesBlocksHero {
        __typename
        tagline
        headline
        text
      }
      ... on PagesBlocksFeatures {
        __typename
        items {
          title
          text
        }
      }
      ... on PagesBlocksContent {
        __typename
        body
      }
    }
  }
}
```

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20pages(relativePath%3A%20%22turbo.json%22)%20%7B%0A%20%20%20%20blocks%20%7B%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20...%20on%20PagesBlocksHero%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20tagline%0A%20%20%20%20%20%20%20%20headline%0A%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20...%20on%20PagesBlocksFeatures%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20items%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20...%20on%20PagesBlocksContent%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20body%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="800" height="400">

> For more info on how to query data with Tina's GraphQL API, check out the [Query Documentation](https://tina.io/docs/graphql/queries/)

## Rendering our blocks

We can render out the blocks on a page by creating a new `Blocks` component, which will conditionally render each block-type in a switch statement.

```tsx
// Blocks.tsx

import React from 'react'
import type { Pages } from '../tina/__generated__/types'
import { Content } from './blocks/content'
import { Features } from './blocks/features'
import { Hero } from './blocks/hero'
import { Testimonial } from './blocks/testimonial'

export const Blocks = (props: Pages) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case 'PagesBlocksContent':
                return (
                  <React.Fragment key={i + block.__typename}>
                    <Content data={block} />
                  </React.Fragment>
                )
              case 'PagesBlocksHero':
                return (
                  <React.Fragment key={i + block.__typename}>
                    <Hero data={block} />
                  </React.Fragment>
                )
              case 'PagesBlocksFeatures':
                return (
                  <React.Fragment key={i + block.__typename}>
                    <Features data={block} />
                  </React.Fragment>
                )
              default:
                return null
            }
          })
        : null}
    </>
  )
}
```

Note that the `__typename` on each blog is `{CollectionName}{FieldName}{BlockTemplateName}`

In our case:

- CollectionName: "Pages"
- FieldName: "Blocks"
- BlockTemplateName: "Content" | "Hero" | "Features"

## Adding a visual block selector (Experimental)

![Preview of Visual Block Selector](https://res.cloudinary.com/forestry-demo/video/upload/w_800/v1647540863/Tina%20Newsletter/visual-selector-preview.gif)

<div class="short-code-warning">
   <div>
      <p>This is an experimental feature, and the API is subject to change. Have any thoughts? Let us know in the chat, or through one of our <a href="/community/">community channels</a>!</p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

This visual block selector allows editors to select blocks from a set images instead of text.

<!-- TODO: add a gif -->
<!-- ![block-based-editing-visual](/gif/visual-blocks.gif) -->

First, to enable the visual block selector the `visualSelector` property in the UI key must be set to true.

```diff
...
export default defineConfig({
  // ...
  schema: {
  collections: [
    {
      // ...
      fields: [
        {
          type: 'object',
          list: true,
          name: 'blocks',
          label: 'Sections',
+         ui: {
+           visualSelector: true,
+         },
          templates: [heroBlock, featureBlock, contentBlock],
        },
      ],
    },
  ]}
})
...
```

To set up the block selector a preview image must be provided for each block you want a preview image for. The basic structure for each block looks like this.

```diff
const featureBlock = {
  name: 'features',
  label: 'Features',
+  ui: {
+    previewSrc: "https://...",
+  },
  fields: [
    {
      type: 'object',
      label: 'Feature Items',
      name: 'items',
      list: true,
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Text',
          name: 'text',
        },
      ],
    },
  ],
}
```

The `previewSrc` is an image URL that will be rendered in the visual selector. If a preview isn't provided the block will still be available with a title to click on, just no preview image will be displayed.

_optionally_ a `category` can be provided that allow the blocks to be grouped into different categories.

```diff
const featureBlock = {
  name: 'features',
  label: 'Features',
  ui: {
+    category: "Page Section",
    previewSrc: "https://...",
  },
  fields: [
    {
      type: 'object',
      label: 'Feature Items',
      name: 'items',
      list: true,
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Text',
          name: 'text',
        },
      ],
    },
  ],
}
```

## Video Tutorial

For those who prefer to learn from video, you can check out a snippet on "Setting Up Blocks" from our ["TinaCMS Deep Dive"](https://www.youtube.com/watch?v=PcgnJDILv4w&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB&pp=iAQB) series.

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/PcgnJDILv4w?start=555&end=727" title="TinaCMS Deep Dive (Configuring Blocks)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>
