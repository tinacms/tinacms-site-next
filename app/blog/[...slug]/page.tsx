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
      console.warn(`Metadata not found for slug: ${slugPath}`);
      return notFound(); // Redirect to not-found.tsx
    }

    return {
      title: `${data.post.title} | TinaCMS Blog`,
      openGraph: {
        title: data.post.title,
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for slug: ${slugPath}`, error);
    return notFound(); // Handle gracefully
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
      console.warn(`Post not found for slug: ${slugPath}`);
      return notFound(); // Redirect to not-found.tsx
    }

    const post = res.data.post;

    return <BlogPageClient data={{ post }} />;
  } catch (error) {
    console.error(`Error fetching post for slug: ${slugPath}`, error);

    // Gracefully handle errors related to missing records
    if (
      error.message.includes('Unable to fetch') ||
      error.message.includes('Unable to find record')
    ) {
      return notFound();
    }

    // Re-throw unexpected errors for debugging
    throw error;
  }
}
