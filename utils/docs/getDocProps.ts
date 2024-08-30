import client from "tina/__generated__/client";

const query = `
query {
    docsTableOfContents(relativePath: "docs-toc.json") {
    	_values
  }
}
`;

export async function getDocsNav(preview?: boolean, previewData?: any) {
  const docTocData = await client.request({
    query, variables: { relativePath: 'docs-toc.json' }
  }, {})
  return formatTableofContentsData(docTocData, preview)
}

const stripReferenceDownToSlug = (
  tableOfContentsSubset: any
) => {
  tableOfContentsSubset.forEach((obj, index, array) => {
    if (obj._template) {
      if (obj._template === "items") {
        array[index].items = stripReferenceDownToSlug(obj.items);
      } else {
        array[index].slug = obj.slug.replace(/^content\/|\.mdx$/g, '/')
      }
    }
  })
  return tableOfContentsSubset
}

export const formatTableofContentsData = (
  tableOfContentsData: any,
  preview: boolean
) => {
  const exposedTOCData = tableOfContentsData.data.docsTableOfContents._values.supermenuGroup;
  exposedTOCData.forEach((obj, index, array) => array[index].items = stripReferenceDownToSlug(obj.items))

  return {
    data: exposedTOCData,
    sha: '',
    fileRelativePath: 'content/toc-doc.json',
    preview: !!preview,
  }
}

