import * as React from 'react';
const { useState, useMemo } = React;
import { projectActivityData } from '../mock-datas/projects.data';

// ── helpers ───────────────────────────────────────────────────────────────────

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/** Build a 53-week grid (Sun → Sat) starting from the Sunday on/before `startDate` */
function buildCalendarGrid(startDate: Date, endDate: Date, countByDate: Record<string, number>) {
  // Align to the Sunday on or before startDate
  const anchor = new Date(startDate);
  anchor.setDate(anchor.getDate() - anchor.getDay());

  const weeks: { date: Date; count: number; inRange: boolean }[][] = [];
  let cursor = new Date(anchor);

  while (cursor <= endDate) {
    const week: { date: Date; count: number; inRange: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(cursor);
      const key = formatDate(day);
      week.push({
        date: day,
        count: countByDate[key] ?? 0,
        inRange: day >= startDate && day <= endDate,
      });
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

/** Return a Tailwind-compatible color string based on project count */
function cellColor(count: number, inRange: boolean): string {
  if (!inRange) return 'transparent';
  if (count === 0) return 'rgba(255,255,255,0.07)';
  if (count === 1) return 'rgba(99,179,237,0.45)';   // light blue
  if (count === 2) return 'rgba(99,179,237,0.70)';
  if (count === 3) return 'rgba(66,153,225,0.90)';
  return '#4299e1'; // 4+  solid blue
}

// ── component ─────────────────────────────────────────────────────────────────

const ProjectSection: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null);

  const { weeks, monthPositions, totalProjects, activeDays } = useMemo(() => {
    const countByDate: Record<string, number> = {};
    let total = 0;
    let active = 0;
    for (const e of projectActivityData) {
      countByDate[e.date] = (countByDate[e.date] ?? 0) + e.count;
      total += e.count;
      active++;
    }

    const dates = Object.keys(countByDate).sort();
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);

    const grid = buildCalendarGrid(startDate, endDate, countByDate);

    // Compute which column each month label should appear above
    const positions: { label: string; col: number }[] = [];
    let lastMonth = -1;
    grid.forEach((week, colIdx) => {
      const firstInRange = week.find((d) => d.inRange);
      if (firstInRange) {
        const m = firstInRange.date.getMonth();
        if (m !== lastMonth) {
          positions.push({ label: MONTH_LABELS[m], col: colIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: grid, monthPositions: positions, totalProjects: total, activeDays: active };
  }, []);

  const CELL = 13; // px per cell
  const GAP = 3;   // px gap
  const STEP = CELL + GAP;

  const handleMouseEnter = (e: React.MouseEvent, count: number, date: Date, inRange: boolean) => {
    if (!inRange) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const label = count === 0
      ? `No projects on ${date.toDateString()}`
      : `${count} project${count > 1 ? 's' : ''} on ${date.toDateString()}`;
    setTooltip({ x: rect.left + rect.width / 2, y: rect.top - 8, label });
  };

  return (
    <section
      id="projects"
      className="relative py-20 text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/wp2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/65" />

      {/* Heading */}
      <div className="relative z-[1] mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-5xl font-bold tracking-wide">PROJECT ACTIVITY</h1>
        <p className="mt-4 text-lg text-white/70">
          A snapshot of project accomplishments over the past year.
        </p>
        <hr className="mb-8 mt-7 w-[80%] mx-auto rounded-3xl border-t border-4 border-white/70" />
      </div>

      {/* Stats */}
      <div className="relative z-[1] mx-auto max-w-5xl px-6 mb-10 flex justify-center gap-16">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-300">{totalProjects}</p>
          <p className="mt-1 text-sm uppercase tracking-widest text-white/60">Total Projects</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-300">{activeDays}</p>
          <p className="mt-1 text-sm uppercase tracking-widest text-white/60">Active Days</p>
        </div>
      </div>

      {/* Heatmap calendar */}
      <div className="relative z-[1] mx-auto max-w-5xl px-6">
        <div className="overflow-x-auto rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">

          {/* Day-of-week labels */}
          <div className="flex" style={{ marginLeft: 36 }}>
            {[0, 1, 2, 3, 4, 5, 6].map((d) => (
              <div
                key={d}
                className="text-white/40 text-[10px] text-center select-none"
                style={{ width: CELL, marginRight: GAP, flexShrink: 0 }}
              >
                {d % 2 === 1 ? DAY_LABELS[d][0] : ''}
              </div>
            ))}
          </div>

          <div className="flex" style={{ marginTop: 4 }}>
            {/* Week columns */}
            <div style={{ flex: '0 0 auto', position: 'relative', minWidth: weeks.length * STEP }}>
              {/* Month labels row */}
              <div style={{ position: 'relative', height: 20, marginBottom: 4 }}>
                {monthPositions.map(({ label, col }) => (
                  <span
                    key={`${label}-${col}`}
                    className="text-white/50 text-[11px] absolute select-none"
                    style={{ left: col * STEP }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Grid */}
              <div style={{ display: 'flex', gap: GAP }}>
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                    {week.map((cell, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 3,
                          backgroundColor: cellColor(cell.count, cell.inRange),
                          cursor: cell.inRange ? 'pointer' : 'default',
                          transition: 'transform 0.1s, box-shadow 0.1s',
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, cell.count, cell.date, cell.inRange)}
                        onMouseLeave={() => setTooltip(null)}
                        onMouseOver={(e) => {
                          if (cell.inRange) {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1.35)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 6px rgba(99,179,237,0.7)';
                          }
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-5 flex items-center gap-3 justify-end select-none">
            <span className="text-white/40 text-xs">Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 3,
                  backgroundColor: cellColor(lvl, true),
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            ))}
            <span className="text-white/40 text-xs">More</span>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="relative z-[1] mt-10 flex justify-center">
        <a
          href="/projects"
          className="inline-flex items-center gap-3 rounded-full border border-blue-400/50 bg-blue-500/15 px-10 py-3.5 text-sm uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-200 hover:bg-blue-500/30 hover:border-blue-300 hover:shadow-[0_0_24px_rgba(99,179,237,0.35)]"
        >
          View All Projects
          <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* Tooltip portal */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none rounded-md bg-gray-900/95 px-3 py-1.5 text-xs text-white shadow-lg border border-white/10 -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.label}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900/95" />
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
