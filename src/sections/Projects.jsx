import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/portfolio.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const labelColor = {
  cyan: 'border-cyan/30 text-cyan',
  lilac: 'border-lilac/30 text-lilac',
  periwinkle: 'border-periwinkle/30 text-periwinkle',
};

// Shows the mockup image, or a gradient panel if the file is missing.
function ProjectImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <div aria-hidden="true" className="h-full w-full bg-gradient-to-br from-violet/40 via-panel to-cyan/20" />;
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-white/5 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1184px]">
        <SectionHeading
          eyebrow="Selected Engineering"
          title="Things I've Built."
          description="Turning ideas into functional digital experiences with scalable backends and modern responsive interfaces."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1} className="glass group flex flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30">
              <div className="relative h-56 overflow-hidden bg-card">
                <ProjectImage src={project.image} alt={`${project.title} mockup`} />
                <span className={`absolute left-4 top-4 rounded-sm border bg-surface/90 px-2.5 py-1 font-geist text-[10px] font-bold uppercase tracking-[0.06em] backdrop-blur-xl ${labelColor[project.accent]}`}>
                  {project.label}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-5 p-6">
                <div className="flex flex-col gap-2">
                  <h3 className="font-sora text-lg font-semibold text-ink">{project.title}</h3>
                  <p className="font-geist text-[13px] leading-5 text-muted">{project.description}</p>
                </div>

                <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tech.map((t) => (
                    <li key={t} className="rounded-sm bg-raised px-2 py-1 font-geist text-[10px] text-ink">{t}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 border-t border-periwinkle/15 pt-4">
                  <a
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
                    rel={project.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-white/5 bg-card py-3 font-geist text-xs font-semibold tracking-[0.04em] text-ink transition-colors hover:border-cyan/40 hover:text-cyan"
                  >
                    View Project
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  <a
                    href={project.repoUrl}
                    target={project.repoUrl.startsWith('http') ? '_blank' : undefined}
                    rel={project.repoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={`${project.title} source code`}
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-sm border border-white/5 bg-card text-muted transition-colors hover:text-cyan"
                  >
                    <Github size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
