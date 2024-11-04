import type { Template } from 'tinacms';
import { actionsButtonTemplate } from './ActionsButton.template';
import { cardTemplate } from './Pricing.template';

export const featureGridTemplate: Template = {
  label: 'Feature Grid',
  name: 'featureGrid',
  ui: {
    previewSrc: '/img/blocks/feature-grid.png',
  },
  fields: [
    {
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'string',
    },
    {
      name: 'items',
      label: 'Feature Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.headline,
        }),
      },
      // @ts-ignore
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        {
          name: 'text',
          label: 'Text',
          ui: { component: 'textarea' },
          type: 'string',
        },
        {
          name: 'url',
          label: 'URL',
          type: 'string',
        },
        // @ts-ignore
        actionsButtonTemplate,
      ],
    },
  ],
};
