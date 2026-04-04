import * as React from 'react';
const { useEffect, useRef, useState } = React;
import { timelineData } from '../mock-datas/journey.data';

const JourneySection: React.FC = () => {
  const bgImage = '/assets/images/wp1.jpg';
  const heroImage = '/assets/images/avaBlack.png';
  const heroAlt = 'Journey image';

  const [visibleIndexes, setVisibleIndexes] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => new Set([...prev, index]));
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @keyframes animateSpineV {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .jtl-node.visible {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
      `}</style>

      <section
        id="journey"
        className="relative py-12 text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        {/* Heading */}
        <div
          id="journey-intro"
          className="relative z-[1] mx-auto max-w-6xl px-4 text-center"
        >
          <h1 className="text-5xl font-bold">MY JOURNEY</h1>
          <hr className="mx-auto mt-6 mb-8 w-48 border-t-4 border-white/20" />
        </div>

        {/* Portrait image */}
        <div className="relative z-[1] flex justify-center mb-8">
          <div className="w-44 rounded-xl overflow-hidden shadow-lg">
            <img src={heroImage} alt={heroAlt} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative z-[1] mx-auto max-w-screen-xl px-8">
          <div className="relative">
            {/* Vertical spine — grows top to bottom */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white/30 rounded-full origin-top"
              style={{ left: 'calc(50% - 2px)', animation: 'animateSpineV 7s linear forwards' }}
            />

            <div className="space-y-16">
              {timelineData.map((yearData, index) => {
                const isOdd = index % 2 === 0;
                const isVisible = visibleIndexes.has(index);

                return (
                  <div
                    key={yearData.year}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    className={['jtl-node relative opacity-0', isVisible ? 'visible' : ''].join(' ')}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    {/* Horizontal branch + dot + year label */}
                    <div className="relative h-6">
                      {isOdd ? (
                        <>
                          {/* Line: left edge → center dot */}
                          <div className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-1 bg-white/50" />
                          {/* Dot at center */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white z-10"
                            style={{ left: 'calc(50% - 10px)' }}
                          />
                          {/* Year label: right of dot */}
                          <span
                            className="absolute top-1/2 -translate-y-1/2 text-3xl font-bold text-white whitespace-nowrap"
                            style={{ left: 'calc(50% + 25px)' }}
                          >
                            {yearData.year}
                          </span>
                        </>
                      ) : (
                        <>
                          {/* Year label: left of dot */}
                          <span
                            className="absolute top-1/2 -translate-y-1/2 text-3xl font-bold text-white whitespace-nowrap"
                            style={{ right: 'calc(50% + 25px)' }}
                          >
                            {yearData.year}
                          </span>
                          {/* Dot at center */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white z-10"
                            style={{ left: 'calc(50% - 10px)' }}
                          />
                          {/* Line: center dot → right edge */}
                          <div className="absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/50" />
                        </>
                      )}
                    </div>

                    {/* Tags — hang below the branch on the same side as the line */}
                    {yearData.events.length > 0 && (
                      <div
                        className="flex flex-wrap gap-3 mt-0"
                        style={
                          isOdd
                            ? { width: '50%', paddingLeft: '48px' }
                            : { width: '50%', marginLeft: '50%', paddingLeft: '48px' }
                        }
                      >
                        {yearData.events.map((event, ei) => (
                          <div
                            key={ei}
                            className="flex flex-col items-center"
                            style={{ flex: '1 1 110px', maxWidth: '160px' }}
                          >
                            {/* Vertical connector from line to card */}
                            <div className="w-px h-4 bg-white/40" />
                            <div className={`rounded-lg p-2 ${event.bgColor} ${event.textColor} w-full`}>
                              <p className="font-bold text-xs">{event.title}</p>
                              {event.description && (
                                <p className="text-xs mt-1 whitespace-pre-line">{event.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JourneySection;
