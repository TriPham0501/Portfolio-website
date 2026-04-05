import * as React from 'react';
const { useState, useEffect, useCallback } = React;
import PageBanner from '../components/NavHeader/PageBanner';
import { projectListData, ProjectItem } from './HomePage/mock-datas/project-list.data';

// ── Detail Modal ──────────────────────────────────────────────────────────────

const ProjectModal: React.FC<{ project: ProjectItem; onClose: () => void }> = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Panel – stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0d1117] shadow-[0_24px_80px_rgba(0,0,0,0.8)] text-white"
        style={{ animation: 'modalIn 0.22s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0)   scale(1); }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
          aria-label="Close"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Image banner */}
        <div className="relative h-52 w-full overflow-hidden rounded-t-2xl">
          {!imgError ? (
            <img
              src={project.imageUrl}
              alt={project.name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(66,153,225,0.3) 0%, rgba(16,24,40,1) 100%)' }}
            >
              <svg viewBox="0 0 80 80" width={56} height={56} fill="none" className="opacity-25">
                <rect x="8" y="18" width="64" height="44" rx="6" stroke="white" strokeWidth="3" />
                <circle cx="28" cy="34" r="7" stroke="white" strokeWidth="3" />
                <path d="M8 50l18-14 14 12 12-10 20 16" stroke="white" strokeWidth="3" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d1117] to-transparent" />
        </div>

        {/* Body */}
        <div className="px-8 pb-8 pt-2 flex flex-col gap-5">
          {/* Org */}
          <p className="text-xs uppercase tracking-widest text-blue-300/80">{project.organization}</p>

          {/* Title */}
          <h2 className="text-2xl font-bold leading-snug md:text-3xl">{project.name}</h2>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-0.5 text-xs font-medium text-blue-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/70">{project.description}</p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Highlights</h3>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Divider */}
          <hr className="border-white/10" />

          {/* Project link */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {project.projectLink ? (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(66,153,225,0.5)]"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width={15} height={15}>
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                Open Project
              </a>
            ) : (
              <span className="text-xs text-white/30 italic">No public link available</span>
            )}
            <button
              onClick={onClose}
              className="text-sm text-white/40 underline underline-offset-4 hover:text-white/70 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Project Card ──────────────────────────────────────────────────────────────

const ProjectCard: React.FC<{ project: ProjectItem; index: number; onView: (p: ProjectItem) => void }> = ({ project, index, onView }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="flex flex-col md:flex-row overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_8px_32px_rgba(66,153,225,0.2)]"
    >
      {/* Left – image */}
      <div className="md:w-2/5 flex-shrink-0 relative overflow-hidden" style={{ minHeight: 220 }}>
        {!imgError ? (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ minHeight: 220 }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              minHeight: 220,
              background: 'linear-gradient(135deg, rgba(66,153,225,0.25) 0%, rgba(99,179,237,0.10) 100%)',
            }}
          >
            <svg viewBox="0 0 80 80" width={64} height={64} fill="none" className="opacity-30">
              <rect x="8" y="18" width="64" height="44" rx="6" stroke="white" strokeWidth="3" />
              <circle cx="28" cy="34" r="7" stroke="white" strokeWidth="3" />
              <path d="M8 50l18-14 14 12 12-10 20 16" stroke="white" strokeWidth="3" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {/* Project number badge */}
        <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/80 text-xs font-bold text-white shadow">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Right – details */}
      <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-8">
        {/* Org */}
        <p className="text-xs uppercase tracking-widest text-blue-300/80">{project.organization}</p>

        {/* Name */}
        <h2 className="text-xl font-bold leading-snug text-white md:text-2xl">{project.name}</h2>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-0.5 text-xs font-medium text-blue-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-1 text-sm leading-relaxed text-white/65">{project.description}</p>

        {/* View button */}
        <div className="mt-2">
          <button
            onClick={() => onView(project)}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/50 bg-blue-500/15 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-200 hover:bg-blue-500/35 hover:border-blue-300 hover:shadow-[0_0_16px_rgba(99,179,237,0.35)]"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width={14} height={14}>
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const ProjectPage: React.FC<{ id?: string }> = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <div style={{ boxSizing: 'border-box', fontFamily: 'Inter' }}>
      {/* Navbar */}
      <PageBanner />

      {/* Single shared background wrapper */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url('/assets/images/wp3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/65" />

        {/* Hero header */}
        <div className="relative z-[1] flex min-h-[38vh] items-end justify-center pb-12 px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-wide md:text-6xl">MY PROJECTS</h1>
            <p className="mt-4 text-lg text-white/65 max-w-xl mx-auto">
              A collection of work I have contributed to across embedded systems, GIS platforms, and modern web applications.
            </p>
            <hr className="mt-8 mx-auto w-[70%] rounded-3xl border-t-4 border-white/50" />
          </div>
        </div>

        {/* Project list */}
        <div className="relative z-[1] min-h-screen py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col gap-8">
              {projectListData.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} onView={setActiveProject} />
              ))}
            </div>

            {/* Back to home */}
            <div className="mt-16 flex justify-center">
              <a
                href="/home"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/60"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width={16} height={16}>
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeProject && <ProjectModal project={activeProject} onClose={handleClose} />}
    </div>
  );
};

export default ProjectPage;

