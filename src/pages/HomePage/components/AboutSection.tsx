import * as React from 'react';
import { aboutOverview } from '../mock-datas/about.data';
import ImageStack from '../../../components/material-ui/ImageStack';
import LinksPanel from '../../../components/material-ui/LinksPanel';

const AboutSection: React.FC = () => {
  return (
    <div
      id="about"
      className="ml-[15%] pb-20 pt-8 text-white w-9/12 sm:pb-24 sm:pt-10 md:w-7/12 md:pb-28 md:pt-10 lg:w-6/12 xl:w-5-12 xl:pb-32 xl:pt-12"
    >
      <div>
        <p className="mb-3.5 text-xl">{aboutOverview.title}</p>
        <h1 className="mb-10 text-5xl text-golden">{aboutOverview.heading}</h1>

        <p className="text-justify text-base leading-relaxed md:text-lg">{aboutOverview.paragraphs[0]}</p>
        <p className="pt-5 text-justify text-base leading-relaxed md:text-lg">{aboutOverview.paragraphs[1]}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 sm:mt-8 md:mt-10 lg:mt-12">
        <ImageStack className="w-3/4" imageUrl="/assets/images/man-looking-at-pcb.jpg" />
        <ImageStack className="w-3/4" imageUrl="/assets/images/capabilities-pcb.jpg" />
        {/* <ImageStack className="w-full" imageUrl="/assets/images/3.jpg" />
        <ImageStack className="w-full" imageUrl="/assets/images/4.jpg" /> */}
      </div>

      <div id="languages" className="mt-12 sm:mt-12 md:mt-14">
        <h2 className="mb-6 text-3xl text-golden">Languages</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { name: 'Vietnamese', icon: '🇻🇳', level: 5, levelName: 'Native' },
            { name: 'Chinese', icon: '🇨🇳', level: 3, levelName: 'Intermediate' },
            { name: 'English', icon: '🇬🇧', level: 4, levelName: 'Professional' },
          ].map((lang) => (
            <div key={lang.name} className="flex flex-col items-center">
              <div className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2">
                <span className="text-xl">{lang.icon}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </div>
              <div className="mb-4 flex w-full gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-sm ${i <= lang.level ? 'bg-golden' : 'bg-white/20'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-golden">{lang.levelName}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="contact" className="mt-12 sm:mt-12 md:mt-14">
        <h2 className="mb-6 text-3xl text-golden">Contact</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex items-center gap-5 rounded-xl border border-white/10 bg-white/5 px-6 py-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold">Phone</p>
              <p className="text-base text-white/70">+8493 699 9988</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-xl border border-white/10 bg-white/5 px-6 py-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold">Email</p>
              <p className="text-base text-white/70">dororo2112@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-xl border border-white/10 bg-white/5 px-6 py-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold">Location</p>
              <p className="text-base text-white/70">Ho Chi Minh City, Vietnam</p>
            </div>
          </div>
        </div>
        <div id="links" className="mt-10">
          <LinksPanel className="justify-start" />
        </div>
      </div>

      <div className="statistic" />
    </div>
  );
};

export default AboutSection;
