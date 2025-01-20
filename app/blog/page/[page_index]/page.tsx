import client from 'tina/__generated__/client';

import { glob } from 'fast-glob';
import BlogIndexPageClient from './BlogIndexPageClient';

const POSTS_PER_PAGE = 8;

export async function generateStaticParams() {
  const contentDir = './content/blog/';
  const files = await glob(`${contentDir}**/*.mdx`);
  const numFiles = Math.ceil(files.length / POSTS_PER_PAGE);
  return Array.from(Array(numFiles).keys()).map((page) => ({
    page_index: (page + 1).toString(),
  }));
}

export async function generateMetadata({params}){

    const title = 'TinaCMS Blog';
    const description = 'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development';
    const pageIndex = params.page_index;
    const url = `https://tinacms.org/blog/page/${pageIndex}`;
    return{
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: url,
      }
    }
}

export default async function BlogPaginationPage({
  params,
}: {
  params: { page_index: string };
}) {
  const contentDir = './content/blog/';
  const posts = await glob(`${contentDir}**/*.mdx`);
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageIndex = parseInt(params.page_index) || 1;
  const startIndex = (pageIndex - 1) * POSTS_PER_PAGE;

  const postResponse = await client.queries.postConnection({
    first: posts.length,
    sort: 'date',
  });

  const reversedPosts = postResponse?.data?.postConnection?.edges
    ?.map((edge) => edge.node)
    .reverse();

  const finalisedPostData = reversedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  console.log('in blog page');
  

  return (
    <>
      <BlogIndexPageClient
        currentPageIndexNumber={pageIndex}
        postsForPageIndex={finalisedPostData}
        numberOfPages={numPages}
      />
    </>
  );
}
