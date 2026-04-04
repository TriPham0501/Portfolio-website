import React, { useState, useEffect, useRef } from 'react';

interface TimelineItem {
  id: number;
  title: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: 'HTML',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quod distinctio quisquam quos quas iste obcaecati quaerat voluptatem cumque eius!',
  },
  {
    id: 2,
    title: 'CSS',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quod distinctio quisquam quos quas iste obcaecati quaerat voluptatem cumque eius!',
  },
  {
    id: 3,
    title: 'JavaScript',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quod distinctio quisquam quos quas iste obcaecati quaerat voluptatem cumque eius!',
  },
  {
    id: 4,
    title: 'Bootstrap',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quod distinctio quisquam quos quas iste obcaecati quaerat voluptatem cumque eius!',
  },
  {
    id: 5,
    title: 'jQuery',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quod distinctio quisquam quos quas iste obcaecati quaerat voluptatem cumque eius!',
  },
  {
    id: 6,
    title: 'WordPress',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quod distinctio quisquam quos quas iste obcaecati quaerat voluptatem cumque eius!',
  },
];

const AnimationTimeline: React.FC = () => {
  const [items] = useState<TimelineItem[]>(TIMELINE_DATA);
  const [visibleIndexes, setVisibleIndexes] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
        @keyframes animateLine {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tl-section {
          font-family: "Open Sans", sans-serif;
        }
        .tl-section::after {
          content: '';
          position: absolute;
          top: 0;
          right: 50%;
          width: 5px;
          height: 0;
          background: linear-gradient(#1b515e, #338275);
          border-radius: 50px;
          animation: animateLine 7s linear forwards;
          z-index: -1;
        }
        .tl-item-odd::before {
          content: '';
          position: absolute;
          top: 0;
          right: -7px;
          height: 20px;
          width: 20px;
          background: linear-gradient(#1b515e, #338275);
          border-radius: 50%;
          z-index: 1;
        }
        .tl-item-even::before {
          content: '';
          position: absolute;
          top: 0;
          left: -12.2px;
          height: 20px;
          width: 20px;
          background: linear-gradient(#1b515e, #338275);
          border-radius: 50%;
          z-index: 1;
        }
        .tl-item.visible {
          animation: fadeSlideIn 0.5s linear forwards;
        }
        @media (max-width: 1020px) {
          .tl-section::after {
            right: 0;
          }
          .tl-item {
            width: 100% !important;
            right: 0 !important;
          }
          .tl-item-even::before {
            left: 97%;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#abcd9e]">
        <section className="tl-section relative w-[1000px] mx-auto py-[100px] max-[1020px]:w-[400px]">
          {items.map((item, index) => {
            const isEven = index % 2 !== 0;
            const isVisible = visibleIndexes.has(index);

            return (
              <div
                key={item.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={[
                  'tl-item relative w-1/2 px-5 py-[10px] opacity-0',
                  isEven ? 'tl-item-even right-[-50%]' : 'tl-item-odd',
                  isVisible ? 'visible' : '',
                ].join(' ')}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="bg-[#1b515e] rounded-[10px] shadow-[0_5px_10px_rgba(25,25,25,0.43)] px-[30px] py-5">
                  <h2 className="text-white text-[25px] font-semibold pb-[14px]">
                    {item.title}
                  </h2>
                  <p className="text-white text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default AnimationTimeline;
