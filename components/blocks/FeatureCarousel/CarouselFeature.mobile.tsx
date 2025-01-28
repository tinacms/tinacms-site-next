import ScrollCards from 'components/ui/scrollBasedComponents/scrollCards';
import { tinaField } from 'tinacms/dist/react';
import { icons } from '../../ui/IconPickerIcons';
import { Actions } from '../ActionButton/ActionsButton';

function CarouselFeatureMobileItem(data) {
  const { headline, text, button, icon2, videoSrc } = data.data || {};

  const IconComponent = icons[icon2] || null;

  const actionsArray = button ? [button] : [];

  return (
    <div
      data-tina-field={tinaField(data, 'headline')}
      className="flex flex-col md:p-10 p-6"
    >
      <div className="flex items-center mb-2 px-1 text-left">
        {IconComponent && (
          <IconComponent
            className={`text-xl text-orange-500/90 md:text-3xl pb-1`}
          />
        )}
        {headline && (
          <h3
            className={` md:text-3xl text-2xl font-tuner leading-tight cursor-pointer pl-3 text-transparent lg:text-3xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text`}
          >
            {headline}
          </h3>
        )}
      </div>
      {text && (
        <p className={`lg:text-lg md:text-md text-sm font-medium slide-up`}>
          {text}
        </p>
      )}
      {button && (
        <div className={`slide-up flex justify-start`}>
          <Actions items={actionsArray} />
        </div>
      )}
    </div>
  );
}

interface CarouselFeatureMobileProps {
  data: any;
}

export function CarouselFeatureMobile(props: CarouselFeatureMobileProps) {
  const { data } = props;
  const items = data.items.map((item, index) => (
    <CarouselFeatureMobileItem data={item} key={`carousel-feature-${index}`} />
  ));
  return items.length > 0 ? (
    <>
      <ScrollCards content={items} title={data.blockHeadline} />
    </>
  ) : null;
}
