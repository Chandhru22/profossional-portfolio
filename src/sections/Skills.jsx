import { Terminal, Server, Monitor, Database, Wrench, ShieldCheck } from 'lucide-react';
import { skillCategories } from '../data/portfolio.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const icons = { Terminal, Server, Monitor, Database, Wrench };

const accentText = {
  cyan: 'text-cyan',
  lilac: 'text-lilac',
  periwinkle: 'text-periwinkle',
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-white/5 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1184px]">
        <SectionHeading
          eyebrow="Technical Stack"
          title="Technologies I Work With."
          description="Curated, enterprise-grade capabilities split across language foundations, backend runtimes, and databases."
          badge={
            <span className="hidden items-center gap-2 rounded-sm border border-periwinkle/20 bg-card px-3 py-1.5 font-geist text-[11px] font-semibold uppercase tracking-[0.08em] text-muted sm:flex">
              <ShieldCheck size={14} className="text-cyan" aria-hidden="true" />
              Verified Production Ready
            </span>
          }
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, index) => {
            const Icon = icons[cat.icon];
            return (
              <Reveal
                key={cat.id}
                delay={index * 0.08}
                className={`glass flex flex-col gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 ${cat.wide ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-raised">
                      <Icon size={14} className={accentText[cat.accent]} aria-hidden="true" />
                    </span>
                    <p className={`font-geist text-[11px] font-bold uppercase tracking-[0.06em] ${accentText[cat.accent]}`}>{cat.category}</p>
                  </div>
                  <p className="font-mono text-xs text-muted">{cat.tag}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-sora text-lg font-semibold text-ink">{cat.title}</h3>
                  <p className="font-geist text-[13px] leading-5 text-muted">{cat.description}</p>
                </div>

                <ul className="flex flex-wrap gap-2" aria-label={`${cat.title} skills`}>
                  {cat.items.map((item) => {
                    const name = typeof item === 'string' ? item : item.name;
                    const highlight = typeof item !== 'string' && item.highlight;
                    return (
                      <li
                        key={name}
                        className={`cursor-default rounded-sm border px-3 py-2 font-geist text-[11px] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan ${
                          highlight ? 'border-periwinkle/40 bg-raised font-semibold text-periwinkle' : 'border-white/5 bg-raised text-ink'
                        }`}
                      >
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
