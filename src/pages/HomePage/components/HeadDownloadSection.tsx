import * as React from 'react';
import { headDownloadContent, headScatterImages } from '../mock-datas/headDownload.data';
import ImageHolder from '../../../components/material-ui/ImageHolder';

const HeadDownloadSection: React.FC = () => {
  return (
    <section
      id="head-download"
      className="relative group h-screen min-h-[560px] w-full overflow-hidden bg-[#111827]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#0b1220]" />

      {headScatterImages.map((image) => (
        <div
          key={image.src + image.rotate}
          className={`absolute ${image.boxClass} z-10`}
        >
          <ImageHolder
            imageUrl={image.src}
            caption={image.alt}
            rotation={parseFloat(image.rotate)}
            disableShine
            disableHover
          />
        </div>
      ))}

      <div className="pointer-events-none absolute left-1/2 top-[40vh] z-[15] w-full -translate-x-1/2 -translate-y-1/2 px-6 text-center">
        <div className="pointer-events-auto relative inline-block px-4 py-3">
          <div className="absolute left-1/2 top-1/2 h-[10rem] w-[28rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 blur-[64px]" />
          <h2
            className="relative text-4xl font-bold uppercase tracking-[0.16em] text-white/95 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              textShadow:
                '0 0 8px rgba(125, 211, 252, 0.9), 0 0 18px rgba(56, 189, 248, 0.78), 0 0 30px rgba(14, 165, 233, 0.58), 0 10px 24px rgba(0, 0, 0, 0.95), 0 0 52px rgba(0, 0, 0, 0.9)',
            }}
          >
            {headDownloadContent.heading}
          </h2>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
        <div className="absolute inset-0 bg-black/0 backdrop-blur-0 transition-[background-color,backdrop-filter,-webkit-backdrop-filter] duration-500 ease-out group-hover:bg-black/35 group-hover:backdrop-blur-md" />
        <div className="relative translate-y-3 transform px-6 text-center text-white transition-all duration-500 ease-out group-hover:translate-y-0">
          <h1 className="text-3xl font-semibold tracking-wide md:text-5xl">{headDownloadContent.title}</h1>
          <p className="mt-4 text-sm text-gray-100 md:text-base">{headDownloadContent.description}</p>
          <a
            href={headDownloadContent.downloadHref}
            download
            className="mt-7 inline-block rounded-full bg-golden px-7 py-3 text-sm font-semibold text-[#111827] transition-transform duration-200 hover:scale-105"
          >
            {headDownloadContent.downloadText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeadDownloadSection;
