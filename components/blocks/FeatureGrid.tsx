import React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { Actions } from './ActionsButton';
import GradGlow from '../../public/svg/grad-glow.svg';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';

const Feature = ({ data, index, id }) => {
  const { headline, text, actions, url } = data;

  const formattedUrl =
    url && !url.match(/^https?:\/\//) && !url.startsWith('/')
      ? `http://${url}`
      : url;
  const isInternalLink = formattedUrl && formattedUrl.startsWith('/');

  return !isInternalLink ? (
    <a
      href={formattedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-6 px-8 md:py-9 md:px-11 lg:py-8 lg:px-10 rounded-2xl shadow-lg bg-gradient-to-br from-white via-white to-white/50 transition duration-500 "
      style={{ textDecoration: 'none', overflow: 'visible' }}
      id={id}
    >
      <div
        data-tina-field={tinaField(data, 'headline')}
        className="flex flex-col gap-4"
      >
        {headline && (
          <h3 className="text-2xl md:text-xl lg:text-2xl font-tuner leading-tight text-transparent bg-gradient-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text break-words">
            {headline}
          </h3>
        )}
        {text && <p>{text}</p>}
        {actions && <Actions items={actions} />}
      </div>
    </a>
  ) : (
    <Link
      href={formattedUrl}
      className="h-full w-full group block py-6 px-8 md:py-9 md:px-11 lg:py-12 lg:px-14 rounded-sm bg-gradient-to-br from-white via-white to-white/50 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),_0_0_1px_1px_rgba(223,219,252,0.5)] transition duration-500 "
      style={{ textDecoration: 'none', overflow: 'visible' }}
      id={id}
    >
      <div
        data-tina-field={tinaField(data, 'headline')}
        className="flex flex-col gap-4"
      >
        {headline && (
          <h3 className="text-2xl md:text-xl lg:text-2xl font-tuner leading-tight text-transparent bg-gradient-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text mb-2 break-words">
            {headline}
          </h3>
        )}
        {text && <p>{text}</p>}
        {actions && <Actions items={actions} />}
      </div>
    </Link>
  );
};

export default Feature;

export function FeatureGridBlock({ data, index }) {
  const isMoreThanSix = data.items && data.items.length > 6;

  return (
    <section
      key={'feature-grid-' + index}
      className={'relative z-0 py-20 px-32 lg:py-28'}
      style={{ overflow: 'visible' }}
    >
      <h2 className="text-center pb-6 font-tuner text-3xl text-blue-700 rounded-lg p-4">
        {data.sectionTitle && data.sectionTitle}
      </h2>

      <Container width="wide">
        <div
          className={`grid gap-6 grid-cols-2 auto-rows-auto w-full rounded-xl overflow-visible`}
        >
          {data.items &&
            data.items.map((data, index) => {
              return (
                <Feature
                  key={Object.values(data).join('')}
                  data={data}
                  index={index}
                  id={sanitizeLabel(data.headline)}
                />
              );
            })}
        </div>
      </Container>
      <GradGlow className="absolute w-full h-auto bottom-0 left-0 -z-1" />
    </section>
  );
}
