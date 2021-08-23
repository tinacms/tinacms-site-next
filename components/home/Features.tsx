import React from 'react'
import {
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from 'react-tinacms-inline'
import ReactMarkdown from 'react-markdown'
import { BlockTemplate } from 'tinacms'
import { ActionFields, Actions } from './Actions'
import { Container } from './Container'
import BlobOne from '../../public/svg/blob-1.svg'
import BlobTwo from '../../public/svg/blob-2.svg'
import BlobThree from '../../public/svg/blob-3.svg'
import BlobFour from '../../public/svg/blob-4.svg'
import BlobFive from '../../public/svg/blob-5.svg'
import BlobSix from '../../public/svg/blob-6.svg'

const blobSvgOptions = [
  BlobOne,
  BlobTwo,
  BlobThree,
  BlobFour,
  BlobFive,
  BlobSix,
]

export const feature_template: BlockTemplate = {
  label: 'Feature',
  defaultItem: {
    headline: 'New Feature',
    subline:
      'Pick from your custom predefined components to build web experiences, blazing fast',
    media: { src: '/img/io-placeholder.jpg' },
  },
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      component: 'text',
    },
    {
      label: 'Subline',
      name: 'subline',
      component: 'text',
    },
    ...ActionFields,
    {
      label: 'Media',
      name: 'media',
      component: 'group',
      fields: [
        {
          label: 'Image Source',
          name: 'src',
          component: 'text',
        },
        {
          label: 'Video Source',
          description: 'Cloudinary ID and file name',
          name: 'videoSrc',
          component: 'text',
        },
        {
          label: 'Show CLI Codeblock Instead',
          name: 'cli',
          component: 'toggle',
        },
      ],
    },
  ],
  itemProps: (item: any) => ({
    label: item.headline,
  }),
}

export function FeatureBlock({ data, index }) {
  const isReversed = index % 2 === 1
  const FeatureBlobSvg = blobSvgOptions[index % blobSvgOptions.length]

  return (
    <>
      <BlocksControls index={index}>
        <div className={`feature ${isReversed ? 'featureReverse' : ''}`}>
          <div className="featureText">
            <h3 className="featureTitle">
              <InlineTextarea name="headline" />
            </h3>
            <hr className="dottedBorder" />
            <div className="textLarge">
              <ReactMarkdown source={data.subline} />
            </div>
            {data.actions && <Actions items={data.actions} />}
            <div className="blob">
              <FeatureBlobSvg />
            </div>
          </div>
          {data.media.src && (
            <div className={`featureImage`}>
              <img
                src={data.media.src}
                alt={data.headline}
                width="1120px"
                height="800px"
              />
            </div>
          )}
          {data.media.videoSrc && <FeatureVideo src={data.media.videoSrc} />}
          {data.media.cli && (
            <div className={`featureImage`}>
              <FeatureCLI />
            </div>
          )}
        </div>
      </BlocksControls>
      <style jsx>{`
        .feature {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: var(--spacer-size);
          align-items: center;
          z-index: 2;

          :not(:last-child) {
            margin-bottom: 9rem;
          }

          @media (min-width: 900px) {
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--spacer-size);
          }
        }

        .featureTitle {
          font-family: var(--font-tuner);
          font-weight: bold;
          line-height: 1.4;
          margin-bottom: 1rem;
          font-size: 2.25rem;
          color: #00255b;
        }

        .featureReverse {
          direction: rtl;
          > * {
            direction: ltr;
          }
        }

        .featureText {
          position: relative;
          max-width: 28rem;
          justify-self: center;
          margin-top: 1rem;

          :global(a) {
            text-decoration: none;
            transition: all ease-out 150ms;
            &:hover {
              text-decoration: underline;
            }
          }

          :global(p) {
            max-width: 400px;
          }
        }

        .featureImage {
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.07);
          margin: 0;
          overflow: hidden;
          border-radius: 0.5rem;

          :global(img) {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
          }
        }

        .dottedBorder {
          border-top: none;
          border-right: none;
          border-left: none;
          border-image: initial;
          border-bottom: 5px dotted var(--color-seafoam-dark);
          width: 6rem;
          max-width: 100%;
          display: block;
          height: 0px;
          margin: 1.5rem 0px;
        }

        .blob {
          position: absolute;
          top: -3rem;
          left: -10%;
          right: 33.3%;
          bottom: -3rem;
          z-index: -1;
          opacity: 0.5;

          :global(svg) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </>
  )
}

export const features_template: BlockTemplate = {
  label: 'Features',
  defaultItem: {
    headline: 'Explore the *Tina ecosystem*',
    subline:
      'More than just a headless CMS, Tina has all the tools for building web experiences for interdisciplinary teams.',
    color: 'white',
    items: [
      {
        _template: 'feature',
        headline: 'Data Source Plugins',
        subline:
          'Data Source plugins allow you to extend Tina to connect to different databases and 3rd Party APIs',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Screen UI Plugins',
        subline:
          'Data Source plugins allow you to extend Tina to connect to different databases and 3rd Party AP',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Custom Fields',
        subline:
          'Extend primary fields with custom field plugins to completely control the editing experience and functionality.',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
    ],
  },
  fields: [
    {
      label: 'Items',
      name: 'items',
      component: 'blocks',
      //@ts-ignore
      templates: {
        feature: feature_template,
      },
    },
  ],
}

export function FeaturesBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className={'section white featureSection'}>
        <Container>
          <InlineBlocks name="items" blocks={FEATURE_BLOCKS} />
        </Container>
      </section>
    </BlocksControls>
  )
}

const FEATURE_BLOCKS = {
  feature: {
    Component: FeatureBlock,
    template: feature_template,
  },
}

export const FeatureVideo = ({ src }) => {
  const videoRef = React.useRef(null)

  React.useEffect(() => {
    if (videoRef && videoRef.current) {
      if ('IntersectionObserver' in window) {
        var lazyVideoObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(video) {
            if (video.isIntersecting) {
              for (var source in video.target.children) {
                var videoSource = video.target.children[source]
                if (
                  typeof videoSource.tagName === 'string' &&
                  videoSource.tagName === 'SOURCE'
                ) {
                  // @ts-ignore
                  videoSource.src = videoSource.dataset.src
                }
              }

              // @ts-ignore
              video.target.load()
              lazyVideoObserver.unobserve(video.target)
            }
          })
        })

        lazyVideoObserver.observe(videoRef.current)
      } else {
        for (var source in videoRef.current.children) {
          var videoSource = videoRef.current.children[source]
          if (
            typeof videoSource.tagName === 'string' &&
            videoSource.tagName === 'SOURCE'
          ) {
            // @ts-ignore
            videoSource.src = videoSource.dataset.src
          }
        }

        // @ts-ignore
        videoRef.current.load()
      }
    }
  }, [videoRef])

  return (
    <>
      <video
        ref={videoRef}
        className="video"
        autoPlay={true}
        loop
        muted
        playsInline
        poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${src}.jpg`}
      >
        <source
          data-src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/e_accelerate:-20/${src}.webm`}
          type="video/webm"
        />
        <source
          data-src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/e_accelerate:-20/${src}.mp4`}
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        .video {
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.07);
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  )
}

export const FeatureCLI = () => {
  return (
    <>
      <pre className="pre">
        <code>
          <span
            style={{ display: 'block', marginBottom: '1.25rem' }}
          >{`$ npx create-next-app`}</span>
          <span
            style={{ display: 'block', marginBottom: '1.25rem' }}
          >{`$ npx @tinacms/cli init`}</span>
          <span
            style={{
              display: 'block',
              marginBottom: '1.25rem',
              fontWeight: 'bold',
              color: '#49AF25',
            }}
          >{`Setting up Tina...`}</span>
          <span
            style={{ display: 'block', marginBottom: '1.25rem' }}
          >{`Installing Tina packages. This might take a moment... ✅`}</span>
          <span style={{ display: 'block' }}>
            <span
              style={{
                display: 'inline',
                fontWeight: 'bold',
                color: '#49AF25',
              }}
            >{`?`}</span>
            <span
              style={{
                display: 'inline',
                fontWeight: 'bold',
              }}
            >{` Do you want us to override your _app.js`}</span>
            {`? › (y/N)`}
          </span>
        </code>
      </pre>
      <style jsx>{`
        .pre {
          padding: 3.5rem;
          background: linear-gradient(to top, #f5fdfc, #ecfcfa, #cef9f5);
          white-space: pre-wrap;
          color: #1d2b68;
          font-size: 1rem;
          line-height: 1.5;
          font-family: monospace;

          @media (min-width: 1300px) {
            font-size: 1.365rem;
          }
        }
      `}</style>
    </>
  )
}
