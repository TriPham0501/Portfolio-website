import * as React from 'react';

interface ImageHolderProps {
  imageUrl: string;
  caption?: string;
  className?: string;
  rotation?: number;
  disableShine?: boolean;
  disableHover?: boolean;
}

const ImageHolder: React.FC<ImageHolderProps> = ({
  imageUrl,
  caption,
  className = '',
  rotation = -2,
  disableShine = false,
  disableHover = false,
}) => {
  return (
    <>
      <style>{`
        @keyframes ih-shine {
          0% { transform: translateX(-100%) rotate(120deg); }
          20%, 100% { transform: translateX(100%) rotate(120deg); }
        }
      `}</style>
      <div
        className={`inline-block bg-white p-2.5 pb-5 transition-all duration-300 ease-in-out ${!disableHover ? 'hover:scale-[1.02]' : ''} ${className}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          boxShadow:
            '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12)',
        }}
        onMouseEnter={disableHover ? undefined : (e) => {
          e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)';
          e.currentTarget.style.boxShadow =
            '0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15), 0 16px 16px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={disableHover ? undefined : (e) => {
          e.currentTarget.style.transform = `rotate(${rotation}deg)`;
          e.currentTarget.style.boxShadow =
            '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12)';
        }}
      >
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: '90%' }}>
          <img
            src={imageUrl}
            alt={caption || ''}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Shine overlay */}
          {!disableShine && (
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 32%, rgba(255,255,255,0) 35%)',
                animation: 'ih-shine 3s infinite',
              }}
            />
          )}
          {/* Dust */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0, 25px 25px',
            }}
          />
          {/* Scratches */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-50"
            style={{
              background:
                'linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.05) 46%, transparent 47%) 0 0, linear-gradient(-45deg, transparent 45%, rgba(0,0,0,0.05) 46%, transparent 47%) 0 0',
              backgroundSize: '200px 200px',
            }}
          />
        </div>
        {caption && (
          <p className="mt-3 text-center font-mono text-sm text-[#333] opacity-80">{caption}</p>
        )}
      </div>
    </>
  );
};

export default ImageHolder;
