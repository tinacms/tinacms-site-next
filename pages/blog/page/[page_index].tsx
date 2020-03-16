import React, { useEffect } from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import getFiles from '../../../utils/github/getFiles'
import { orderPosts, formatExcerpt, formatDate } from '../../../utils'
import {
  Layout,
  Wrapper,
  Hero,
  MarkdownContent,
  RichTextWrapper,
} from '../../../components/layout'
import { DynamicLink, BlogPagination } from '../../../components/ui'
import { getGithubDataFromPreviewProps } from '../../../utils/github/sourceProviderConnection'
import getMarkdownData from '../../../utils/github/getMarkdownData'
import { useCMS } from 'tinacms'
import OpenAuthoringSiteForm from '../../../components/layout/OpenAuthoringSiteForm'
import { useForm } from 'tinacms'
import { OpenAuthoringModalContainer } from '../../../open-authoring/OpenAuthoringModalContainer'
const Index = props => {
  const { currentPage, numPages } = props

  const cms = useCMS()


  //workaround for fallback being not implemented
  if (!props.posts) {
    return (<><OpenAuthoringModalContainer uninterpretatedError={props.error} /></>)
  }

  const [, form] = useForm({
    id: 'blog-list',
    label: 'Blog',
    fields: [],
    onSubmit: () => {},
  })

  return (
    <OpenAuthoringSiteForm editMode={props.editMode} form={form} path={''}>
      <Layout
        sourceProviderConnection={props.sourceProviderConnection}
        editMode={props.editMode}
      >
        <NextSeo
          title="Blog"
          openGraph={{
            title: 'Blog',
          }}
        />
        <Hero mini></Hero>
        <BlogWrapper>
          {props.posts.map(post => (
            <DynamicLink
              key={post.data.slug}
              href={`/blog/${post.data.slug}`}
              passHref
            >
              <BlogExcerpt>
                <BlogTitle>{post.data.title}</BlogTitle>
                <RichTextWrapper>
                  <BlogMeta>
                    <MetaBit>
                      <span>By</span> {post.data.author}
                    </MetaBit>
                    <MetaBit>{formatDate(post.data.date)}</MetaBit>
                  </BlogMeta>
                  <MarkdownContent skipHtml={true} content={post.content} />
                  <hr />
                </RichTextWrapper>
                <br />
              </BlogExcerpt>
            </DynamicLink>
          ))}
          <BlogPagination currentPage={currentPage} numPages={numPages} />
        </BlogWrapper>
      </Layout>
    </OpenAuthoringSiteForm>
  )
}

/*
 ** DATA FETCHING ---------------------------------
 */

const POSTS_PER_PAGE = 8

export const getStaticPaths: GetStaticPaths = async function() {
  const fg = require('fast-glob')
  const contentDir = './content/blog/'
  const posts = await fg(`${contentDir}**/*.md`)

  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  var pages = []
  for (var i = 1; i <= numPages; i++) {
    pages.push({
      params: { page_index: i.toString() },
    })
  }

  return { paths: pages, fallback: false }
}

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
  ...ctx
}) {
  const {
    sourceProviderConnection,
    accessToken,
  } = getGithubDataFromPreviewProps(previewData)
  // @ts-ignore page_index should always be a single string
  const page = parseInt((ctx.params && ctx.params.page_index) || '1')

  const files = await getFiles(
    'content/blog',
    sourceProviderConnection,
    accessToken
  )

  const getPost = async file => {
    return (await getMarkdownData(file, sourceProviderConnection, accessToken)).data
  }
  try {
    const posts = await Promise.all(
      // TODO - potentially making a lot of requests here
      files.map(async file => {


        const post = await getPost(file)
        
        

        // create slug from filename
        const slug = file
          .replace(/^.*[\\\/]/, '')
          .split('.')
          .slice(0, -1)
          .join('.')

        const excerpt = formatExcerpt(post.markdownBody)

        return {
          data: { ...post.frontmatter, slug },
          content: excerpt,
        }
      })
    )

    // for pagination and ordering
    const numPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    const pageIndex = page - 1
    const orderedPosts = orderPosts(posts).slice(
      pageIndex * POSTS_PER_PAGE,
      (pageIndex + 1) * POSTS_PER_PAGE
    )

    return {
      props: {
        posts: orderedPosts,
        numPages: numPages,
        currentPage: page,
        editMode: !!preview,
        sourceProviderConnection,
      },
    }
  } catch (e) {
    return {
      props: {
        error: e
      }
    }
  }
  


  
  
}

export default Index

/**
 *  STYLES -----------------------------------------------------
 */

const BlogWrapper = styled(Wrapper)`
  padding-top: 10rem;
  max-width: 768px;
`

const BlogTitle = styled(({ children, ...styleProps }) => {
  return (
    <h3 className {...styleProps}>
      {children}
    </h3>
  )
})`
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  font-size: 1.5rem;
  color: inherit;
  transition: all 180ms ease-out;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  @media (min-width: 800px) {
    font-size: 2rem;
    max-width: 80%;
  }
`

const BlogExcerpt = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover,
  &:focus {
    outline: none;
    ${BlogTitle} {
      color: var(--color-primary) !important;
    }
  }
  &:focus {
    hr {
      transition: all 230ms ease-out;
      width: 100%;
    }
  }
  hr {
    transition: all 180ms ease-out;
  }
  &:not(:focus) {
    &:not(:hover) {
      hr {
        opacity: 0.3;
        filter: saturate(0%);
      }
    }
  }
`

const MetaBit = styled.p`
  display: flex;
  margin: 0 !important;

  span {
    opacity: 0.5;
    margin-right: 0.25rem;
  }
`

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
  opacity: 0.5;

  @media (min-width: 550px) {
    flex-direction: row;
  }
`
