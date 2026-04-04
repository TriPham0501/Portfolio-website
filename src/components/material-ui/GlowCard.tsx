import * as React from 'react';

type GlowCardProps = {
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    children?: React.ReactNode;
    className?: string;
};

const GlowCard: React.FC<GlowCardProps> = ({
    title = 'Magic Card',
    imageUrl,
    imageAlt,
    children,
    className = '',
}) => {
    const hasImage = Boolean(imageUrl) && !children;

    return (
        <div
            className={[
                'group relative z-[1] box-border h-full w-full max-w-[190px] rounded-2xl p-[5px]',
                'bg-gradient-to-l from-[#f7ba2b] to-[#ea5358]',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <div
                aria-hidden="true"
                className={[
                    'pointer-events-none absolute inset-x-0 top-[30px] -z-[1] h-full w-full scale-90',
                    'bg-gradient-to-l from-[#f7ba2b] to-[#ea5358] blur-[25px]',
                    'transition-opacity duration-500 group-hover:opacity-0',
                ].join(' ')}
            />

            <div
                className={[
                    'flex h-full min-h-[254px] w-full items-center justify-center overflow-hidden rounded-xl',
                    hasImage ? 'bg-[#181818] p-0 text-[#181818] transition-colors duration-1000' : 'bg-[#181818] px-4 py-6 text-[#181818] transition-colors duration-1000',
                    'group-hover:text-[#f7ba2b]',
                    'sm:min-h-[254px]',
                ].join(' ')}
            >
                {children ||
                    (imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={imageAlt || title}
                            className="h-full w-full rounded-xl object-cover object-top"
                        />
                    ) : (
                        <p className="text-center text-base font-bold tracking-[0.1em]">{title}</p>
                    ))}
            </div>
        </div>
    );
};

export default GlowCard;
