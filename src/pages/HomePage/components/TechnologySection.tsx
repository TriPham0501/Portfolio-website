import * as React from 'react';
// import MultiTabs from '../../../components/material-ui/MultiTabs';
import Tooltip from '../../../components/material-ui/Tooltip';
import { lexiconSections } from '../mock-datas/technologies.data';

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

const TechnologySection: React.FC = () => {
  return (
    <div
      id="missions"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/wp3.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        id="mission-intro"
        className="relative z-[1] row-span-1 flex flex-col items-center justify-center px-5 pt-16 pb-24 text-center text-white"
      >
        <h1 className="flex-shrink-0 text-5xl">TECHNICAL LEXICONS</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">Technologies and tools I work with to build modern, scalable applications.</p>
        <hr className="mb-3 mt-7 w-[85%] rounded-3xl border-t border-4 border-white/70 md:w-[70%] lg:w-[60%] xl:w-[55%]" />
      </div>

      {/* Tag styling refactor: removed <style> block and use Tailwind + inline color styles per-tag */}

      <div className="relative z-[1] h-full pb-[8vh] mx-[6vw] sm:mx-[10vw] md:mx-[8vw] lg:mx-[10vw] xl:mx-[16vw] 2xl:mx-[20vw]">
        <div className="flex flex-col gap-20">
          {lexiconSections.map((section) => {
            const folderParts = section.folder.split(' ');
            return (
              <div key={section.folder} className="flex items-stretch gap-6">
                <div className="flex w-16 shrink-0 items-center justify-center self-center">
                  <span
                    className="whitespace-nowrap text-xl font-bold uppercase tracking-widest text-white/80 leading-8"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {folderParts.length > 1
                      ? folderParts.map((part, idx) => (
                          <React.Fragment key={idx}>
                            {part}
                            {idx < folderParts.length - 1 && <br />}
                          </React.Fragment>
                        ))
                      : section.folder}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="mb-3 text-sm text-white/60">{section.description}</p>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-8 sm:p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05),0_0_40px_rgba(99,102,241,0.08)]">
                    <div className="flex flex-wrap gap-4 sm:gap-6">
                      {section.techs.map((tech) => {
                        if (section.type === 'tags') {
                          // const bg = tech.color ? hexToRgba(tech.color, 0.15) : 'rgba(255,255,255,0.06)';
                          // const border = tech.color ? tech.color : 'rgba(255,255,255,0.12)';
                          // const glow = tech.color ? `${tech.color}66` : 'rgba(255,255,255,0.12)';

                          const bg = 'rgba(255,255,255,0.06)';
                          const border = 'rgba(255,255,255,0.12)';
                          const glow = 'rgba(255,255,255,0.12)';

                          return (
                            <div key={tech.label} className="relative z-[1] flex items-center px-1">
                              <button
                                type="button"
                                className="rounded-md px-4 py-1 text-lg sm:text-xl font-semibold text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                style={{ backgroundColor: bg, border: `2px solid ${border}` }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px ${glow}`;
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                              >
                                <span className="whitespace-normal leading-tight">{tech.label}</span>
                              </button>
                            </div>
                          );
                        }

                        return (
                          <Tooltip
                            key={tech.label}
                            content={tech.label}
                            imageUrl={`${process.env.PUBLIC_URL}${tech.img}`}
                            className="h-24 w-24 sm:h-28 sm:w-28"
                            contentClassName="rounded-md bg-black/80 px-3 py-1.5 text-sm font-semibold text-white"
                          >
                            <div className="flex h-full w-full items-center justify-center">
                              {tech.img ? (
                                <img src={`${process.env.PUBLIC_URL}${tech.img}`} alt={tech.label} className="relative z-[1] h-1/2 w-1/2 object-contain" />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white font-semibold">
                                  {tech.short}
                                </div>
                              )}
                            </div>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechnologySection;
