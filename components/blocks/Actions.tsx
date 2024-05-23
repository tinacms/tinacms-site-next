import React from 'react'
import { BiArrowBack, BiCopy } from 'react-icons/bi'
import { copyToClipboard } from '../../components/layout/MarkdownContent'
import { LinkButton } from '../../components/ui'
import { tinaField } from 'tinacms/dist/react'

export const sanitizeLabel = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

export const Actions = ({ items, align = 'left' }) => {
  const isList = items.length > 2;
  return (
    <>
      <div
        className={[
          'actionGroup',
          isList ? 'actionGroupList' : 'actionGroupRow',
          align === 'center' && 'actionGroupCenter',
        ].join(' ')}
      >
        {items &&
          items.map((item, index) => {
            if (item.variant == 'command') {
              const id = sanitizeLabel(item.label);
              return (
                <React.Fragment key={item.label}>
                  {index === 2 && <span className="or-text">or</span>} {}
                  <CodeButton
                  label={item.label}
                  data-tina-field={tinaField(item, 'label')}
                  id={id}
                  >
                    {item.label}
                  </CodeButton>
                </React.Fragment>
              );
            }
            const { variant, label, icon, url } = item
            const externalUrlPattern = /^((http|https|ftp):\/\/)/
            const external = externalUrlPattern.test(url)
            let link = null
            return (
              <LinkButton
                key={label}
                id={sanitizeLabel(label)}
                size={item.size ? item.size : 'medium'}
                link={url}
                target="_blank"
                color={variant}
                data-tina-field={tinaField(item, 'label')}
              >
                {label}{' '}
                {icon && (
                  <BiArrowBack className="h-[1.125em] w-auto opacity-70 ml-2 -mr-1 -mt-1 rotate-180" />
                )}
              </LinkButton>
            )
          })}
      </div >
      <style jsx>{`
        .actionGroup {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin: 0 -0.75rem -0.5rem -0.75rem;

          :global(a),
          :global(button) {
            margin: 0.5rem 0.75rem;
          }
        }

        .actionGroupRow {
          flex-direction: row;
          align-items: center;
        }

        .actionGroupList {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .or-text{
          margin: 0.5rem 1.5rem 0.5rem 0.75rem;
          font-size: 1.125rem;
          color: var(--color-secondary);
          font-weight: bold;
        }

        .actionGroupCenter {
          justify-content: center;
        }

        .link {
          font-size: 1.125rem;
          color: var(--color-orange);
          padding: 0;

          &:after {
            width: calc(100% + 1.5rem);
            height: calc(100% + 1rem);
            top: -0.5rem;
            left: -0.75rem;
          }

          :global(svg) {
            display: inline-block;
            fill: currentColor;
            margin-left: 0.375em;
            margin-right: 0;
            height: 1em;
            width: auto;
            transition: opacity ease-out 150ms;
          }
          :not(:hover):global(svg) {
            opacity: 0.85;
          }
        }
      `}</style>
    </>
  )
}

export const CodeButton = ({ children, label, ...props }) => {
  const [copied, setCopied] = React.useState(false)

  const clickEvent = () => {
    setCopied(true)
    copyToClipboard(children)    
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <>
      <button
        className="button event-cmd-button"
        onClick={clickEvent}
        {...props}
      >
        <span className={`success-message ${copied ? `visible` : ``}`}>
          Copied to clipboard!
        </span>
        <span className="text">
          <span className="bash">&gt;</span> {children}
        </span>
        <span className="icon">
          <BiCopy />
        </span>
      </button>
      <style jsx>{`
        .bash {
          opacity: 0.5;
          margin-right: 0.25rem;
        }

        .success-message {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          text-align: center;
          color: var(--color-orange);
          font-family: var(--font-tuner);
          font-weight: regular;
          font-style: normal;
          background: white;
          z-index: 10;
          transition: opacity 180ms ease-out;
          opacity: 0;
        }

        .visible {
          opacity: 1;
        }

        .icon {
          width: 2.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-seafoam);
          border-left: 1px solid #b4f4e0;
          color: var(--color-orange);
          align-self: stretch;
          opacity: 0.5;
          transition: opacity 180ms ease-out;

          :global(svg) {
            height: 1.5em;
            width: auto;
          }
        }

        .text {
          padding: 1rem 1.25rem;
        }

        .button {
          display: flex;
          font-weight: bold;
          overflow: hidden;
          font-size: 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 150ms ease-out;
          width: max-content;
          transform: translate3d(0px, 0px, 0px);
          display: flex;
          align-items: center;
          background-color: white;
          color: var(--color-secondary);
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          padding: 0;
          border: 1px solid #b4f4e0;
          font-weight: regular;
          font-style: normal;
          text-decoration: none !important;
          white-space: nowrap;
          opacity: 1;
          line-height: 1;

          &:hover,
          &:focus {
            color: var(--color-orange);
            text-decoration: none;
            transform: translate3d(-1px, -2px, 0);
            transition: transform 180ms ease-out;

            .icon {
              opacity: 1;
            }
          }
          &:focus {
            box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset,
              rgba(236, 72, 21, 0.7) 0px 0px 0px 3px,
              rgba(0, 0, 0, 0.12) 0px 2px 3px;
          }
          &:focus,
          &:active {
            outline: none;
          }
          &:active {
            filter: none;
          }
        }
      `}</style>
    </>
  )
}
