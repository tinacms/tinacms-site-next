import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Disclosure } from '@headlessui/react'
import { MinusSmIcon as MinusSmallIcon, PlusSmIcon as PlusSmallIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import styled from 'styled-components'
import { Prism } from '../styles/Prism'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const CodeWrapper = styled.div`
  position: relative;
`

const StyledCopyCodeButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  border: 1px solid var(--tina-color-grey-3);
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.03);
  color: var(--tina-color-grey-7);
  border-right-width: 0;
  transition: all 150ms ease-out;
  border-top-width: 0;
  font-size: var(--tina-font-size-1);
  border-radius: 0 0 0 5px;

  &:hover {
    color: var(--color-orange);
    opacity: 1;
  }
`

interface copyButtonProps {
  value?: string
}

const CopyCodeButton = ({ value }: copyButtonProps) => {
  const [copied, setCopied] = React.useState(false)

  const clickEvent = () => {
    setCopied(true)
    copyToClipboard(value)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <StyledCopyCodeButton onClick={clickEvent}>
      {!copied ? 'Copy' : 'Copied!'}
    </StyledCopyCodeButton>
  )
}

const copyToClipboard = (text: string) => {
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const CodeSnippets = (props) => {
  return (
    <div className="my-8 code-snippets">
      <style>{`.code-snippets .prism-code {height: 100%; margin: 0}`}</style>
      <style>{`.code-snippets .code-wrapper { height: 100% }`}</style>
      <style>{`.code-snippets h3 { margin-bottom: 0; }`}</style>
      <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
        {props.children}
      </dl>
    </div>
  )
}

const CodeSnippet = (props) => {
  const headingIndex = props.node.children.findIndex(
    (child) => child.tagName === 'h3'
  )
  const descriptionIndex = props.node.children.findIndex(
    (child) => child.tagName === 'p'
  )
  const codeIndex = props.node.children.findIndex(
    (child) => child.tagName === 'pre'
  )
  return (
    <Disclosure defaultOpen={props.open} as="div" className="pt-6">
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
              {props.children[headingIndex]}
              <span className="ml-6 flex h-7 items-center">
                {open ? (
                  <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-2 pr-12">
            {
              <div className="py-4 text-base leading-7">
                {descriptionIndex !== -1
                  ? props.children[descriptionIndex]
                  : null}
              </div>
            }
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">{props.children[codeIndex]}</div>
              <div className="flex-1 bg-gray-50 bg-[#f6f6f9] border border-gray-100 rounded-md overflow-hidden">
                <Image src={props.url} alt={props.children} height={1200} width={1200} />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

// Custom components for TinaMarkdown
export const aacomponents = {
  pre: (props) => <>{props.children}</>,
  'code-snippet': CodeSnippet,
  'code-snippets': CodeSnippets,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '') || props.lang
    return !inline && match ? (
      <CodeWrapper className="code-wrapper">
        <Prism
          lang={match[1]}
          theme="nightOwl"
          value={String(children).replace(/\n$/, '')}
        />
        <CopyCodeButton value={String(children).replace(/\n$/, '')} />
      </CodeWrapper>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}