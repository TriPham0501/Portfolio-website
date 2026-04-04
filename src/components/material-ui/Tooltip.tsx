import * as React from 'react';

type TooltipProps = {
  imageUrl?: string;
  content: React.ReactNode;
  imageAlt?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  hexColor?: string;
  children?: React.ReactNode;
};

const hexagonPath =
  'M 44.8 5 Q 50 2 55.2 5 L 86.4 23 Q 91.6 26 91.6 32 L 91.6 68 Q 91.6 74 86.4 77 L 55.2 95 Q 50 98 44.8 95 L 13.6 77 Q 8.4 74 8.4 68 L 8.4 32 Q 8.4 26 13.6 23 Z';

const Tooltip: React.FC<TooltipProps> = ({
  imageUrl,
  content,
  imageAlt = 'Tooltip trigger image',
  className = '',
  triggerClassName = '',
  contentClassName = '',
  hexColor,
  children,
}) => {
  const hexToRgba = (hex: string, alpha: number) => {
    try {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map((ch) => ch + ch).join('');
      const bigint = parseInt(c, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r},${g},${b},${alpha})`;
    } catch (e) {
      return `rgba(255,255,255,${alpha})`;
    }
  };

  const fillColor = hexColor ? hexToRgba(hexColor, 0.15) : 'rgba(255,255,255,0.15)';
  const strokeColor = hexColor ? hexColor : 'rgba(255,255,255,0.15)';
  return (
    <div className={[
      'group relative h-14 w-14 overflow-x-visible overflow-y-clip text-center',
      className,
    ].filter(Boolean).join(' ')}>
      <div
        className={[
          'absolute top-0 flex h-full w-full items-center justify-center text-white transition-all duration-300 group-hover:origin-top group-hover:scale-[.60]',
          triggerClassName,
        ].filter(Boolean).join(' ')}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={hexagonPath} fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
        {children ||
          (imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="relative z-[1] h-1/2 w-1/2 object-contain"
            />
          ) : null)}
      </div>
      <div className={[
        'absolute -bottom-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-center text-sm font-bold text-white transition-all duration-300 group-hover:bottom-0',
        contentClassName,
      ].filter(Boolean).join(' ')}>
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
