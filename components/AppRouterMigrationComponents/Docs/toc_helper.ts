import React from 'react';

interface Heading {
  id?: string;
  offset?: number;
  level?: string;
}

function createHeadings(
  contentRef: React.RefObject<HTMLDivElement>
): Heading[] {
  const headings: Heading[] = [];
  const htmlElements = contentRef.current?.querySelectorAll(
    'h1, h2, h3, h4, h5, h6'
  );

  htmlElements?.forEach((heading: HTMLHeadingElement) => {
    headings.push({
      id: heading.id,
      offset: heading.offsetTop,
      level: heading.tagName,
    });
  });
  return headings;
}

export function createTocListener(
  contentRef: React.RefObject<HTMLDivElement>,
  setActiveIds: (activeIds: string[]) => void
): () => void {
  const headings = createHeadings(contentRef);

  return function onScroll(): void {
    const scrollPos = window.scrollY + window.innerHeight / 4; // Adjust for active detection
    const activeIds: string[] = [];

    headings.forEach((heading) => {
      if (heading.offset && scrollPos >= heading.offset) {
        activeIds.push(heading.id ?? '');
      }
    });

    setActiveIds(activeIds);
  };
}

export function useTocListener(data: any) {
  const [activeIds, setActiveIds] = React.useState<string[]>([]);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!contentRef.current) return;
    const tocListener = createTocListener(contentRef, setActiveIds);
    const handleScroll = () => tocListener(); // Define scroll handler

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize active IDs on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  return { contentRef, activeIds };
}

export function syncTocScroll(tocWrapperRef: React.RefObject<HTMLDivElement>) {
  if (!tocWrapperRef.current) return;
  const htmlScrollTop = document.documentElement.scrollTop;
  const htmlScrollHeight = document.documentElement.scrollHeight;
  const scrollPercent = htmlScrollTop / (htmlScrollHeight - htmlScrollTop);

  const tocScrollHeight = tocWrapperRef.current.scrollHeight;
  const tocClientHeight = tocWrapperRef.current.clientHeight;
  tocWrapperRef.current.scrollTop =
    scrollPercent * (tocScrollHeight - tocClientHeight);
}
