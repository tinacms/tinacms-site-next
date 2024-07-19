import client from "tina/__generated__/client";

const removeContentDocs = (inputString) => {
    const prefix = '/docs/';
    if (inputString.startsWith(prefix)) {
      return inputString.slice(prefix.length);
    }
    return inputString;
  }
  
  export const fetchData = async (inputString) => {
    const relativePath = removeContentDocs(inputString);
  
    try {
      const docData = await client.queries.doc({ relativePath: relativePath + '.md' });
      return docData.data.doc.title;
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }
  