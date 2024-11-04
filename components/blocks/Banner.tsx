import React from 'react';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import RenderButton from 'utils/renderButtonArrayHelper';



const Banner = ({ data }) => {
  const gradientBackground = data.backgroundColour
    ? `linear-gradient(135deg, ${data.backgroundColour}33, ${data.backgroundColour})`
    : 'transparent';

  const renderButtons = (buttons) => {
    return buttons.map((button, index) => (
      <RenderButton key={index} button={button} index={index} />
    ));
  };

  return (
    <div
      className="w-full pt-8"
      style={{
        background: gradientBackground,
      }}
    >
      <div
        className={`container mx-auto px-8 flex flex-col md:flex-col items-center text-left ${
          data.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* Left Column: Text and Buttons */}
        <div className="lg:w-2/5 w-full flex flex-col gap-2 pl-0 lg:pl-20">
          <h2
            className="text-3xl font-semibold mb-4"
            data-tina-field={tinaField(data, 'headline')}
            style={{ color: data.textColour }}
          >
            {data.headline}
          </h2>
          <p
            className="text-lg mb-6"
            data-tina-field={tinaField(data, 'text')}
            style={{ color: data.textColour }}
          >
            {data.text}
          </p>

          {/* Buttons */}
          <div className="flex flex-col justify-start gap-4 mb-8">
            {data.buttons && renderButtons(data.buttons)}
          </div>
        </div>

        {/* Right Column: Image */}
        {data.image && (
          <div
            className="lg:w-3/5 w-full flex items-center justify-center h-full"
            data-tina-field={tinaField(data, 'image')}
          >
            <Image
              src={data.image}
              alt={data.headline}
              className="w-full h-auto object-cover"
              width={1000}
              height={1000}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
