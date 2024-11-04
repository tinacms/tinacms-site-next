import { heroTemplate } from '../../components/blocks/Hero.template'
import { featuresTemplate } from '../../components/blocks/Features.template'
import { flyingTemplate } from '../../components/blocks/Flying.template'
import { pricingTemplate } from '../../components/blocks/Pricing.template'
import { faqTemplate } from '../../components/blocks/FAQ.template'
import { contentTemplate } from '../../components/blocks/Content.template'
import { columnsTemplate } from '../../components/blocks/Columns.template'
import { showcaseTemplate } from '../../components/blocks/Showcase.template'
import { storyTemplate } from '../../components/blocks/Story.template'
import { featureGridTemplate } from '../../components/blocks/FeatureGrid.template'
import { logoGridTemplate } from '../../components/blocks/LogoGrid.template'
import { roadmapGridTemplate } from '../../components/blocks/RoadmapGrid.template'
import { recentPostsTemplate } from '../../components/blocks/RecentPosts.template'
import { testimonialsTemplate } from '../../components/blocks/Testimonials.template'
import { quoteTemplate } from '../../components/blocks/Quote.template'
import { eventsTemplate } from '../../components/blocks/Events.template'
import { compareBoxTemplate } from '../../components/blocks/CompareBox.template'
import { bookingTemplate } from '../../components/blocks/Booking.template'
import { mediaComponentTemplate } from '../../components/blocks/MediaComponent.template'
import { Template } from 'tinacms'
import { textAndMediaColumnsComponentTemplate } from '../../components/blocks/TextAndMediaColumns.template'
import { tinaBannerTemplate } from '../../components/blocks/TinaBanner.template'
import { highlightsSectionTemplate } from '../../components/blocks/HighlightsSection.template'
import { spacerTemplate } from '../../components/blocks/Spacer.template'
import {carouselFeatureTemplate} from '../../components/blocks/CarouselFeature.template'
import { BannerTemplate } from '../../components/blocks/Banner.template'

export const pagesCollection = {
    label: 'Pages',
    name: 'page',
    path: 'content/blocksPages',
    format: 'json',
    ui: {
      router: ({ document }) => {
        if (document._sys.filename === 'home') {
          return `/`
        }
        return `/${document._sys.filename}`
      },
    },
    fields: [
      {
        type: 'object',
        name: 'seo',
        label: 'SEO Information',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            description:
              "' | Tina' will be appended to the end of the value. If no title is provided, the default title in siteConfig.tsx is used.",
          },
          {
            type: 'boolean',
            label: 'Has Custom Title Suffix?',
            name: 'hasCustomSuffix',
            ui: {
              component: "toggle",
            },
            description:
              "Set to true to remove the appended suffix ' | Tina'.",
          },
          {
            type: 'string',
            label: ' Description',
            name: 'description',
            ui: {
              component: 'textarea',
            },
          },
        ],
      },
      {
        label: 'Page Sections',
        name: 'blocks',
        type: 'object',
        list: true,
        ui: {
          visualSelector: true,
        },
        templates: [
          heroTemplate as Template,
          featuresTemplate as Template,
          flyingTemplate as Template,
          pricingTemplate as Template,
          faqTemplate as Template,
          contentTemplate as Template,
          showcaseTemplate as Template,
          columnsTemplate as Template,
          storyTemplate as Template,
          featureGridTemplate as Template,
          logoGridTemplate as Template,
          roadmapGridTemplate as Template,
          recentPostsTemplate as Template,
          testimonialsTemplate as Template,
          quoteTemplate as Template,
          eventsTemplate as Template,
          compareBoxTemplate as Template,
          bookingTemplate as Template,
          mediaComponentTemplate as Template,
          textAndMediaColumnsComponentTemplate as Template,
          tinaBannerTemplate as Template,
          highlightsSectionTemplate as Template,
          spacerTemplate as Template,
          carouselFeatureTemplate as Template,
          BannerTemplate as Template,
        ],
      },
    ],
  };