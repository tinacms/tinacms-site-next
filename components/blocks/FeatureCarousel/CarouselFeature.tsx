import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import GradGlow from '../../../public/svg/grad-glow.svg';
import { icons } from '../../ui/IconPickerIcons';
import { Actions } from '../ActionButton/ActionsButton';
import { Container } from '../Container';

//From the MDN docs - https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
const checkTouchScreen = () => {
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else {
    const mQ = matchMedia?.('(pointer:coarse)');
    if (mQ?.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA: string = (navigator as Navigator).userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
};

const CarouselItem = ({
  data,
  index,
  id,
  isHovered,
  onClick,
  isSmallOrMediumScreen,
  renderMedia,
}) => {
  const { headline, text, button, icon2, videoSrc } = data || {};

  const IconComponent = icons[icon2] || null;

  const commonStyles =
    'transition-all delay-[50] duration-500 hover:scale-105 hover:z-20';

  const actionsArray = button ? [button] : [];

  const textDisplayCondition =
    (!isSmallOrMediumScreen && isHovered && text) ||
    (isSmallOrMediumScreen && text);

  const buttonDisplayCondition =
    (!isSmallOrMediumScreen && isHovered && button) ||
    (isSmallOrMediumScreen && button);

  return (
    <div
      className={`${
        isHovered && !isSmallOrMediumScreen
          ? 'group block bg-gradient-to-br from-white/25 via-white/50 to-white/75 shadow-2xl pl-6 pr-8 md:py-9 md:pr-11 lg:pb-8 lg:pt-8 lg:pr-4 rounded-2xl'
          : ''
      } ${commonStyles}`}
      onClick={() => onClick(index)}
      style={{ textDecoration: 'none', overflow: 'visible' }}
    >
      <div
        data-tina-field={tinaField(data, 'headline')}
        className="flex flex-col"
      >
        <div className="block lg:hidden pb-5">
          {renderMedia && renderMedia(index)}
        </div>
        <div className="flex items-center mb-2 pl-1">
          {IconComponent && (
            <IconComponent
              className={`text-xl  ${
                isHovered && !isSmallOrMediumScreen
                  ? 'text-orange-500/90 md:text-3xl pb-1'
                  : 'text-black md:text-2xl pb-1'
              }`}
            />
          )}
          {headline && (
            <h3
              className={` md:text-3xl text-2xl font-tuner leading-tight cursor-pointer pl-3 ${
                isHovered && !isSmallOrMediumScreen
                  ? 'text-transparent lg:text-3xl bg-gradient-to-br from-orange-400 cursor-default via-orange-500 to-orange-600 bg-clip-text'
                  : 'text-black lg:text-xl'
              }`}
            >
              {headline}
            </h3>
          )}
        </div>
        <div
          className={`transition-all duration-250 ${
            textDisplayCondition
              ? 'scale-y-100 opacity-100'
              : 'scale-y-75 opacity-0'
          }`}
        >
          {textDisplayCondition && (
            <p
              className={`md:pl-12 lg:pl-13 pl-9 text-lg font-medium slide-up`}
            >
              {text}
            </p>
          )}
          {buttonDisplayCondition && (
            <div className={`md:pl-6 lg:pl-6 pl-3 slide-up flex justify-start`}>
              <Actions items={actionsArray} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function CarouselFeatureBlock({ data, index }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const intervalRef = useRef(null);
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  // Set up media queries to detect screen size changes and adjust carousel behavior accordingly.
  useEffect(() => {
    const mediaQueryLarge = window.matchMedia('(min-width: 1024px)');
    const mediaQuerySmallOrMedium = window.matchMedia('(max-width: 1023px)');

    setIsLargeScreen(mediaQueryLarge.matches);
    setIsSmallOrMediumScreen(mediaQuerySmallOrMedium.matches);

    const handleMediaChange = (e) => {
      setIsLargeScreen(mediaQueryLarge.matches);
      setIsSmallOrMediumScreen(mediaQuerySmallOrMedium.matches);
      if (!e.matches) {
        clearInterval(intervalRef.current);
        setHoveredIndex(null);
      } else if (mediaQueryLarge.matches && !isUserInteracted) {
        startAutoTicking();
      }
    };

    mediaQueryLarge.addEventListener('change', handleMediaChange);
    mediaQuerySmallOrMedium.addEventListener('change', handleMediaChange);

    return () => {
      mediaQueryLarge.removeEventListener('change', handleMediaChange);
      mediaQuerySmallOrMedium.removeEventListener('change', handleMediaChange);
    };
  }, [data?.items?.length, isUserInteracted]);

  const startAutoTicking = () => {
    intervalRef.current = setInterval(() => {
      setHoveredIndex((prevIndex) => {
        if (prevIndex === null || prevIndex >= data.items.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 6000);
  };

  useEffect(() => {
    setIsTouchScreen(checkTouchScreen());
  });

  useEffect(() => {
    if (
      !isPaused &&
      isLargeScreen &&
      data?.items?.length > 0 &&
      !isUserInteracted
    ) {
      startAutoTicking();
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, isLargeScreen, data?.items?.length, isUserInteracted]);

  const handleItemClick = (index) => {
    setHoveredIndex(index);
    setIsUserInteracted(true);
    clearInterval(intervalRef.current);
  };

  const renderMedia = (index) => {
    if (index === null) return null;

    const item = data?.items?.[index];
    if (!item || !item.videoSrc) return null;

    const fullVideoUrl = isTouchScreen
      ? item.mobileVideoSrc ?? item.videoSrc
      : item.videoSrc;
    const fileExtension = fullVideoUrl.split('.').pop();

    if (fileExtension === 'gif') {
      // Width and height values *must* be provided to NextJS's Image component to build,
      // but they will not determine the rendered size of the image in this case.
      return (
        <div className="flex justify-center items-center">
          <Image
            key={index}
            src={fullVideoUrl}
            alt={`Media item ${index}`}
            width={1200}
            height={800}
            className="w-full h-auto mt-10 lg:mt-0 rounded-xl shadow-lg"
          />
        </div>
      );
    }

    if (fileExtension === 'mp4' || fileExtension === 'webm') {
      return (
        <video
          key={index}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className="w-full h-auto mt-6 lg:mt-0 rounded-xl shadow-lg"
        >
          {fileExtension === 'webm' && (
            <source src={fullVideoUrl} type="video/webm" />
          )}
          {fileExtension === 'mp4' && (
            <source src={fullVideoUrl} type="video/mp4" />
          )}
          There was an issue displaying the video.
        </video>
      );
    }

    throw new Error(`Unsupported video format: ${fileExtension}`);
  };

  return (
    <section
      key={'feature-grid-' + index}
      className={'relative z-0 py-20 lg:py-28 lg:h-[1100px]'}
      style={{ overflow: 'visible' }}
    >
      <Container width="wide">
        <div className="flex flex-col lg:flex-row gap-6 w-full rounded-xl overflow-visible pb-20">
          <div className="flex flex-col order-2 lg:order-1 w-full lg:w-2/5 gap-4 auto-rows-auto rounded-xl overflow-visible">
            <h1
              className={`pl-3 font-tuner inline-block text-4xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left mt-10 pb-3`}
            >
              {data.blockHeadline}
            </h1>
            {data?.items?.length > 0 &&
              data.items.map((item, index) => (
                <div key={Object.values(item).join('')} className="pt-4">
                  <CarouselItem
                    data={item}
                    index={index}
                    id={sanitizeLabel(item.headline)}
                    isHovered={hoveredIndex === index}
                    onClick={handleItemClick}
                    isSmallOrMediumScreen={isSmallOrMediumScreen}
                    renderMedia={renderMedia}
                  />
                </div>
              ))}
          </div>
          <div className="hidden lg:flex flex-col order-1 lg:order-2 w-full lg:w-3/5 gap-4 auto-rows-auto rounded-xl overflow-visible mt-10 pt-24 lg:mt-0 justify-center items-center">
            {renderMedia(hoveredIndex)}
          </div>
        </div>
      </Container>
      <GradGlow className="absolute w-full h-auto bottom-0 left-0 -z-1" />
    </section>
  );
}
