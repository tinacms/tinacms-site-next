import type { Template, TinaTemplate } from 'tinacms'
import { actionsTemplate } from './Actions.template'
import { modalButtonTemplate } from './ModalButton.template'
import { codeButtonTemplate } from './CodeButton.template'

export const flyingTemplate: TinaTemplate = {
  name: 'flying',
  label: 'Flying',
  ui: {
    previewSrc: '/img/blocks/flying.png',
  },
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'text',
      label: 'Text',
      ui: { component: 'textarea' },
      type: 'string',
    },
    {
      label: 'Buttons',
      list: true,
      name: 'buttons',
      type: 'object',
      ui: {
        visualSelector: true
      },
      templates: [actionsTemplate as Template, modalButtonTemplate as Template, codeButtonTemplate as Template],
    },
  ],
}
