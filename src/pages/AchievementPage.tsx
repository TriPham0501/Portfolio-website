import * as React from 'react';
import PageBanner from '../components/NavHeader/PageBanner';

// ── Mock data ─────────────────────────────────────────────────────────────────

interface Achievement {
  id: number;
  name: string;
  year: number;
  organization: string;
  category: 'Certificate' | 'Award' | 'Recognition';
}

const achievementData: Achievement[] = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect – Associate',
    year: 2024,
    organization: 'Amazon Web Services',
    category: 'Certificate',
  },
  {
    id: 2,
    name: 'Professional Scrum Master I (PSM I)',
    year: 2024,
    organization: 'Scrum.org',
    category: 'Certificate',
  },
  {
    id: 3,
    name: 'Google Data Analytics Certificate',
    year: 2023,
    organization: 'Google / Coursera',
    category: 'Certificate',
  },
  {
    id: 4,
    name: 'Meta Front-End Developer Certificate',
    year: 2023,
    organization: 'Meta / Coursera',
    category: 'Certificate',
  },
  {
    id: 5,
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    year: 2023,
    organization: 'Microsoft',
    category: 'Certificate',
  },
  {
    id: 6,
    name: 'Best Innovation Project',
    year: 2022,
    organization: 'National Tech Hackathon',
    category: 'Award',
  },
  {
    id: 7,
    name: 'Docker & Kubernetes: The Complete Guide',
    year: 2022,
    organization: 'Udemy',
    category: 'Certificate',
  },
  {
    id: 8,
    name: `TypeScript: The Complete Developer's Guide`,
    year: 2022,
    organization: 'Udemy',
    category: 'Certificate',
  },
  {
    id: 9,
    name: 'Top Contributor – Open Source GIS Tools',
    year: 2022,
    organization: 'GitHub Community',
    category: 'Recognition',
  },
  {
    id: 10,
    name: 'Full-Stack Web Development Bootcamp',
    year: 2021,
    organization: 'Udemy',
    category: 'Certificate',
  },
  {
    id: 11,
    name: 'React – The Complete Guide (incl. Hooks, Redux)',
    year: 2021,
    organization: 'Udemy',
    category: 'Certificate',
  },
  {
    id: 12,
    name: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    year: 2021,
    organization: 'Udemy',
    category: 'Certificate',
  },
  {
    id: 13,
    name: '1st Place – University Programming Contest',
    year: 2021,
    organization: 'University of Technology',
    category: 'Award',
  },
  {
    id: 14,
    name: 'Outstanding Graduate Thesis Award',
    year: 2020,
    organization: 'University of Technology',
    category: 'Award',
  },
  {
    id: 15,
    name: 'Python for Everybody Specialization',
    year: 2020,
    organization: 'University of Michigan / Coursera',
    category: 'Certificate',
  },
  {
    id: 16,
    name: 'CS50: Introduction to Computer Science',
    year: 2019,
    organization: 'Harvard University / edX',
    category: 'Certificate',
  },
  {
    id: 17,
    name: `Dean's List – Academic Excellence`,
    year: 2019,
    organization: 'University of Technology',
    category: 'Recognition',
  },
  {
    id: 18,
    name: `TOEIC 850 – English Proficiency`,
    year: 2019,
    organization: 'ETS Global',
    category: 'Certificate',
  },
];

// ── Category badge colors ─────────────────────────────────────────────────────

const categoryStyle: Record<Achievement['category'], string> = {
  Certificate:  'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Award:        'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Recognition:  'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

// ── Trophy icon ───────────────────────────────────────────────────────────────

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3H5v2c0 3.87 2.24 7.19 5.47 8.6A5.5 5.5 0 0 0 6.5 19H6v2h12v-2h-.5a5.5 5.5 0 0 0-3.97-5.4C16.76 12.19 19 8.87 19 5V3zM7 5h10c-.34 3.07-2.5 5.61-5 6.32C9.5 10.61 7.34 8.07 7 5z" />
  </svg>
);

// ── AchievementCard ───────────────────────────────────────────────────────────

const AchievementCard: React.FC<{ item: Achievement; index: number }> = ({ item, index }) => (
  <div
    className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm
                transition-all duration-300 hover:border-blue-400/40 hover:bg-white/10
                hover:shadow-[0_0_28px_rgba(99,179,237,0.15)]"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    {/* Top row: icon + category badge */}
    <div className="flex items-start justify-between gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/35 transition-colors duration-300">
        <TrophyIcon className="h-5 w-5" />
      </div>
      <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-widest ${categoryStyle[item.category]}`}>
        {item.category}
      </span>
    </div>

    {/* Certificate name */}
    <h3 className="text-base font-semibold leading-snug text-white">
      {item.name}
    </h3>

    {/* Year + organization */}
    <div className="mt-auto flex flex-col gap-1 text-sm text-white/55">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-white/35" aria-hidden="true">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <span>{item.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-white/35" aria-hidden="true">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
        <span>{item.organization}</span>
      </div>
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const AchievementPage: React.FC = () => (
  <div
    className="relative flex flex-col text-white bg-cover bg-center bg-no-repeat overflow-hidden"
    style={{
      backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/dark-theme.jpg')`,
      height: '100vh',
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/70" />

    <PageBanner />

    <main className="relative z-[1] flex flex-col flex-1 overflow-hidden mx-auto w-full max-w-6xl px-6 pt-28 pb-6">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-wide uppercase">Achievements</h1>
        <p className="mt-4 text-lg text-white/65">
          Certificates, awards and recognitions collected along the way.
        </p>
        <hr className="mx-auto mt-7 mb-0 w-[80%] rounded-3xl border-t border-4 border-white/70" />
      </div>

      {/* Stats bar */}
      <div className="mb-10 flex justify-center gap-16">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-300">{achievementData.length}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/55">Total</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-300">
            {achievementData.filter((a) => a.category === 'Certificate').length}
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/55">Certificates</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-300">
            {achievementData.filter((a) => a.category === 'Award').length}
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/55">Awards</p>
        </div>
      </div>

      {/* Grid – scrollable when content overflows */}
      <div
        className="flex-1 overflow-y-auto pr-1"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(99,179,237,0.35) transparent' }}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 pb-4">
          {achievementData.map((item, idx) => (
            <AchievementCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default AchievementPage;
