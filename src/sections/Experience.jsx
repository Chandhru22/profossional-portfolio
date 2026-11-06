import { CalendarDays, CheckCircle2 } from 'lucide-react';
import { experience } from '../data/portfolio.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-white/5 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1184px]">
        <SectionHeading
          eyebrow="Career Milestones"
          title="Where I've Worked."
          description="Hands-on application engineering, API lifecycle management, and agile delivery."
          accent="lilac"
        />

        <ol className="relative mt-12 ml-2 flex flex-col gap-12 border-l border-periwinkle/20 pl-8">
          {experience.map((job, index) => (
            <Reveal key={job.title} delay={index * 0.1} className="relative">
              <li className="list-none">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[41px] top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-surface ${
                    job.current ? 'border-cyan' : 'border-periwinkle/40'
                  }`}
                >
                  {job.current && <span className="absolute h-5 w-5 animate-ping rounded-full bg-cyan/50" />}
                </span>

                <article className="glass flex flex-col gap-4 rounded-2xl p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`w-fit rounded-sm border px-2.5 py-1 font-geist text-[10px] font-semibold uppercase tracking-[0.08em] ${
                          job.current ? 'border-cyan/30 bg-surface text-cyan' : 'border-white/10 bg-surface text-muted'
                        }`}
                      >
                        {job.type}
                      </span>
                      <h3 className="font-sora text-lg font-semibold text-ink">{job.title}</h3>
                      <p className="font-geist text-[15px] font-medium text-cyan">{job.organization}</p>
                    </div>
                    <p className="flex items-center gap-2 rounded-sm bg-raised px-3 py-1.5 font-geist text-[11px] font-semibold tracking-[0.04em] text-muted">
                      <CalendarDays size={12} aria-hidden="true" />
                      {job.period}
                    </p>
                  </div>

                  <p className="font-geist text-[15px] leading-6 text-muted">{job.summary}</p>

                  {job.highlights.length > 0 && (
                    <ul className="flex flex-col gap-2 py-2">
                      {job.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 font-geist text-[13px] leading-5 text-muted">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 border-t border-periwinkle/15 pt-4" aria-label="Technologies used">
                      {job.tags.map((tag) => (
                        <li key={tag} className="rounded-sm bg-raised px-2.5 py-1 font-geist text-[11px] text-ink">{tag}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
