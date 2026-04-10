import * as React from 'react';
import GlowCard from '../../../components/material-ui/GlowCard';
import { homeHeroContent, homeProfileCard, homeStats } from '../mock-datas/home.data';

const IntroSection: React.FC = () => {
  return (
    <div id="home" className="inner">
      <div className="mx-[8%] grid min-h-screen grid-cols-1 content-center items-stretch gap-4 py-12 text-white md:mx-[10%] md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.9fr)] md:gap-14 md:py-16 lg:mx-[12%] lg:gap-20">
        <div className="inner-content max-w-[860px] justify-self-start text-left">
          <h2 className="text-left text-4xl leading-tight md:text-5xl lg:text-6xl">
            <span>{homeHeroContent.greeting}</span>
            <span className="block pt-2 leading-normal text-golden">{homeHeroContent.name}</span>
          </h2>
          <p className="mb-8 mt-8 w-full text-left text-xl leading-relaxed md:max-w-[42rem] lg:text-2xl lg:leading-[1.7]">
            {homeHeroContent.description}
          </p>

          <div className="mt-10 flex w-full gap-[2.5rem] md:max-w-[42rem]">
            {homeStats.map(({ value, label, icon }) => (
              <div
                key={label}
                className="relative flex flex-1 flex-col items-center justify-center rounded-xl border border-white/15 bg-white/15 py-4"
              >
                <span className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full bg-gray-700 ring-white/30">
                  <img src={`${process.env.PUBLIC_URL}${icon}`} alt={label + ' icon'} className="h-4 w-4 object-contain" />
                </span>
                <span className="text-2xl font-bold leading-tight text-golden">{value}</span>
                <span className="mt-1 text-center text-sm leading-snug text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden h-full items-center justify-center md:flex">
          <GlowCard
            title={homeProfileCard.title}
            imageUrl={`${process.env.PUBLIC_URL}${homeProfileCard.imageUrl}`}
            imageAlt={homeProfileCard.imageAlt}
            className="h-full w-full max-w-[430px] opacity-100 transition-transform duration-300 hover:scale-[1.02] lg:max-w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
