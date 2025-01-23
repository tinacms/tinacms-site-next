import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import BlogPageClient from './BlogPageClient';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { BlogPost } from './BlogType';

export async function generateStaticParams() {
  let allPosts = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    try {
      const postsResponse = await client.queries.postConnection({ after });

      const edges = postsResponse?.data?.postConnection?.edges || [];
      const pageInfo = postsResponse?.data?.postConnection?.pageInfo || {
        hasNextPage: false,
        endCursor: null,
      };

      allPosts = allPosts.concat(
        edges.map((post) => ({
          slug: [post?.node?._sys?.filename],
        }))
      );

      hasNextPage = pageInfo.hasNextPage;
      after = pageInfo.endCursor;
    } catch (error) {
      console.error('Error during static params generation:', error);
      notFound();
    }
  }
  return allPosts;
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const vars = { relativePath: `${slugPath}.mdx` };

  try {
    const { data } = await client.queries.getExpandedPostDocument(vars);

    if (!data?.post) {
      console.warn(`No metadata found for slug: ${slugPath}`);
      return notFound();
    }

    return {
      title: `${data.post.title} | TinaCMS Blog`,
      openGraph: {
        title: data.post.title,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return notFound();
  }
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const vars = { relativePath: `${slugPath}.mdx` };

  try {
    const res = await client.queries.getExpandedPostDocument(vars);

    if (!res.data?.post) {
      console.warn(`No post found for slug: ${slugPath}`);
      return notFound();
    }

    const fetchedPost = res.data.post;

    const post: BlogPost = {
      _sys: fetchedPost._sys,
      id: fetchedPost.id,
      title: fetchedPost.title,
      date: fetchedPost.date || '',
      last_edited: fetchedPost.last_edited ?? null,
      author: fetchedPost.author || '',
      seo: fetchedPost.seo
        ? {
            title: fetchedPost.seo.title || 'Default SEO Title',
            description:
              fetchedPost.seo.description || 'Default SEO Description',
          }
        : null,
      prev: fetchedPost.prev ?? null,
      next: fetchedPost.next ?? null,
      body: fetchedPost.body as TinaMarkdownContent,
    };

    return <BlogPageClient data={{ post }} />;
  } catch (error) {
    console.error(`Error fetching post for slug: ${slugPath}`, error);
    return notFound();
  }
}
