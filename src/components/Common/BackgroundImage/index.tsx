import CachedImage from '@app/components/Common/CachedImage';
import type { ForwardRefRenderFunction, HTMLAttributes } from 'react';
import React from 'react';

interface BackgroundImageProps extends HTMLAttributes<HTMLDivElement> {
  backgroundImage: string;
  isDarker?: boolean;
  forceOptimize?: boolean;
}

const BackgroundImage: ForwardRefRenderFunction<HTMLDivElement, BackgroundImageProps> = (
  {
    backgroundImage,
    isDarker,
    forceOptimize,
    ...props
  },
  ref
) => {
  let gradient =
    'linear-gradient(180deg, rgba(45, 55, 72, 0.47) 0%, #1A202E 100%)';

  if (isDarker) {
    gradient =
      'linear-gradient(180deg, rgba(17, 24, 39, 0.47) 0%, rgba(17, 24, 39, 1) 100%)';
  }

  let overrides = {};

  if (forceOptimize) {
    overrides = {
      unoptimized: false,
    };
  }

  return (
    <div ref={ref}>
        <div
          key={`banner-image`}
          className={`absolute-top-shift absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in 'opacity-100'`}
          {...props}
        >
          <CachedImage
            className="absolute inset-0 h-full w-full"
            alt=""
            src={backgroundImage}
            layout="fill"
            objectFit="cover"
            {...overrides}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: gradient }}
          />
        </div>
    </div>
  );
};

export default React.forwardRef<HTMLDivElement, BackgroundImageProps>(BackgroundImage);
