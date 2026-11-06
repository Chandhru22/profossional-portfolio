import { Award, CheckCircle2 } from 'lucide-react';
import { education } from '../data/portfolio.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 border-t border-white/5 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1184px]">
        <SectionHeading eyebrow="Credentials" title="Academic Background." description="Formal engineering grounding bridging hardware logic, signal theory, and modern software design." />

        <Reveal className="glass mt-12 grid gap-8 rounded-2xl p-6 md:p-10 lg:grid-cols-12 lg:items-center">
          <div className="flex justify-center lg:col-span-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-cyan shadow-glow">
              <Award size={32} className="text-white" aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-7">
            <span className="w-fit rounded-sm border border-cyan/20 bg-card px-3 py-1 font-geist text-[11px] font-semibold uppercase tracking-[0.06em] text-cyan">
              {education.degree}
            </span>
            <h3 className="font-sora text-2xl font-semibold text-ink">{education.field}</h3>
            <p className="font-geist text-lg font-medium text-lilac">{education.institution}</p>
            <p className="pt-1 font-geist text-[13px] leading-5 text-muted">{education.description}</p>
          </div>

          <dl className="flex flex-col items-start gap-2 border-t border-periwinkle/15 pt-6 lg:col-span-3 lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <dt className="font-geist text-[11px] uppercase tracking-[0.06em] text-muted">Graduation Year</dt>
            <dd className="font-sora text-base font-semibold text-ink">{education.graduationYear}</dd>
            <dd className="flex items-center gap-1.5 font-geist text-[11px] font-semibold tracking-[0.04em] text-mint-soft">
              <CheckCircle2 size={14} aria-hidden="true" />
              {education.status}
            </dd>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
