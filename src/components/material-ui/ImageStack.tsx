import * as React from 'react';

type ImageStackProps = {
  className?: string;
  imageUrl: string;
};

const ImageStack: React.FC<ImageStackProps> = ({ className, imageUrl }) => {
  return (
    <div className={`group transition-all duration-[250ms] ease-in-out hover:rotate-[5deg] ${className || 'w-[55%] max-w-[400px]'}`}>
      <div className="relative">
        {/* Stacked cards behind */}
        <div
          className={[
            'absolute inset-0 border-4 border-black bg-white origin-center',
            'transition-all duration-150 ease-in-out',
            '-translate-y-[2%] -rotate-[6deg]',
            'group-hover:-translate-y-[2%] group-hover:-rotate-[4deg]',
          ].join(' ')}
        />
        <div
          className={[
            'absolute inset-0 border-4 border-black bg-white origin-center',
            'transition-all duration-150 ease-in-out',
            'translate-y-[2%] rotate-[6deg]',
            'group-hover:translate-y-[2%] group-hover:rotate-[4deg]',
          ].join(' ')}
        />
        {/* Main card */}
        <div
          className={[
            'relative z-10 h-full border-4 border-black bg-white cursor-pointer',
            'transition-all duration-150 ease-in-out',
            'p-[5%] pb-[15%]',
          ].join(' ')}
        >
          <img src={imageUrl} alt="" className="w-full border-4 border-black object-cover aspect-square" />
        </div>
      </div>
    </div>
  );
};

export default ImageStack;
