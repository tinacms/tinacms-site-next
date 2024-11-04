import { Template } from "tinacms";
import { actionsButtonTemplate } from "./ActionsButton.template";
import { modalButtonTemplate } from "./ModalButton.template";

export const BannerTemplate: Template = {
  name: "Banner",
  label: "Banner",
  ui: {
    defaultItem: () => {
      return {
        backgroundColour: '#000000',
        headline: 'PlaceHolder',
        text: 'PlaceHolder',
        headlineColor: '#000000',
        bodyColor: '#000000',
      }
    }
  },
  fields: [
    {
      name: "backgroundColour",
      label: "Background Colour",
      type: "string",
      ui: {
        component: "color",
      },
    },
    {
      name: "headlineColor",
      label: "Headline Color",
      type: "string",
      required: true,
      ui: {
        component: "color",
      },
    },
    {
      name: "bodyColor",
      label: "Body Color",
      type: "string",
      required: true,

      ui: {
        component: "color",
      },
    },
    {
      name: "headline",
      label: "Headline",
      type: "string",
    },
    {
      name: "text",
      label: "Text",
      type: "string",
    },
    {
      name: "buttons",
      label: "Buttons",
      list: true,
      type: "object",
      templates: [actionsButtonTemplate as Template,
        modalButtonTemplate as Template,
      ],
    },
    {
      name: "image",
      label: "Image",
      type: "image",
    },
    {
      name: 'isReversed',
      label: 'Text on Right?',
      description:
        'This is the position of the text, relative to the media. Off is left, and on is right.',
      type: 'boolean',
      ui: {
        component: 'toggle',
        parse: (value) => !!value,
        format: (value) => !!value,
      },
    },
  ],
};
