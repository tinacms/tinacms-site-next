import type {
  PageBlocks,
  PostConnection,
} from '../../tina/__generated__/types';
import React from 'react';
import {
  StoryBlock,
  FeatureGridBlock,
  FeaturesBlock,
  FlyingBlock,
  HeroBlock,
  PricingBlock,
  FaqBlock,
  ContentBlock,
  LogoGridBlock,
  QuoteBlock,
} from './';
import { ColumnsBlock } from './Columns';
import { RecentPostsBlock } from './RecentPosts';
import { RoadmapGridBlock } from './RoadmapGrid';
import { ShowcaseItemsBlock } from './Showcase';
import { TestimonialsBlock } from './Testimonials';
import { VerticalCardsBlock } from './Events';
import { CompareBoxBlock } from './CompareBox';
import { BookingBlock } from './Booking';
import { MediaComponent } from './MediaComponent';
import { TextAndMediaColumnsComponent } from './TextAndMediaColumns';
import { TinaBanner } from './TinaBanner';
import { HighlightsSection } from './HighlightsSection';
import { SpacerComponent } from './Spacer';
import { CarouselFeatureBlock } from './CarouselFeature';
import Banner from './Banner';

export const Blocks = ({
  blocks,
  recentPosts,
}: {
  blocks: PageBlocks[];
  recentPosts: PostConnection;
}) => {
  if (!blocks) return null;

  return blocks.map((block, index) => {
    console.log(block.__typename); // Debugging log
    switch (block.__typename) {
      case 'PageBlocksFeatures':
        return (
          <FeaturesBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksCompareBox':
        return (
          <CompareBoxBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksFlying':
        return (
          <FlyingBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksBanner':
        return (
          <Banner key={`block-${index}`} data={block}/>
        )
      case 'PageBlocksEvents':
        return (
          <VerticalCardsBlock
            key={`block-${index}`}
            data={block}
            index={index}
          />
        );
      case 'PageBlocksMediaComponent':
        return <MediaComponent key={`block-${index}`} data={block} />;
      case 'PageBlocksBooking':
        return (
          <BookingBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksHero':
        return <HeroBlock key={`block-${index}`} data={block} index={index} />;
      case 'PageBlocksPricing':
        return <PricingBlock key={`block-${index}`} data={block} />;
      case 'PageBlocksFaq':
        return <FaqBlock key={`block-${index}`} data={block} index={index} />;
      case 'PageBlocksContent':
        return (
          <ContentBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksColumns':
        return (
          <ColumnsBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksShowcase':
        return (
          <ShowcaseItemsBlock
            key={`block-${index}`}
            data={block}
            index={index}
          />
        );
      case 'PageBlocksStory':
        return <StoryBlock key={`block-${index}`} data={block} index={index} />;
      case 'PageBlocksFeatureGrid':
        return (
          <FeatureGridBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksLogoGrid':
        return (
          <LogoGridBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksCarouselFeature':
        return (
          <CarouselFeatureBlock
            key={`block-${index}`}
            data={block}
            index={index}
          />
        );
      case 'PageBlocksRoadmapGrid':
        return (
          <RoadmapGridBlock key={`block-${index}`} data={block} index={index} />
        );
      case 'PageBlocksRecentPosts':
        return (
          <RecentPostsBlock
            key={`block-${index}`}
            data={block}
            index={index}
            recentPosts={recentPosts}
          />
        );
      case 'PageBlocksTestimonials':
        return (
          <TestimonialsBlock
            key={`block-${index}`}
            data={block}
            index={index}
          />
        );
      case 'PageBlocksQuote':
        return <QuoteBlock key={`block-${index}`} data={block} index={index} />;
      case 'PageBlocksTextMediaColumnComponent':
        return (
          <TextAndMediaColumnsComponent key={`block-${index}`} data={block} />
        );
      case 'PageBlocksTinaBanner':
        return <TinaBanner key={`block-${index}`} data={block} />;
      case 'PageBlocksHighlightsSection':
        return <HighlightsSection key={`block-${index}`} data={block} />;
      case 'PageBlocksSpacer':
        return <SpacerComponent key={`block-${index}`} data={block} />;
      default:
        return null;
    }
  });
};
