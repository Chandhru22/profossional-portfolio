import { Server, Monitor, Database } from 'lucide-react';
import { aboutStory, focusCards } from '../data/portfolio.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

const icons = { Server, Monitor, Database };

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-white/5 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1184px]">
        <SectionHeading
          eyebrow="Architect Profile"
          title="Behind the Code."
          description="Deep systems knowledge rooted in hardware logic and synthesized into clean full-stack web software."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="glass flex flex-col justify-between gap-8 rounded-2xl p-6 lg:col-span-5 md:p-7">
            <div className="flex flex-col gap-5">
              <p className="flex items-center gap-2 font-geist text-[11px] font-semibold uppercase tracking-[0.11em] text-lilac">
                {aboutStory.eyebrow}
              </p>
              <p className="font-geist text-lg leading-7 text-ink">
                I'm <span className="font-semibold text-cyan">BalaChandhru. P</span>, a Python Full Stack Developer with an Electronics and Communication Engineering background and a strong passion for software development.
              </p>
              <p className="font-geist text-[15px] leading-6 text-muted">{aboutStory.body}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 border-t border-periwinkle/15 pt-6">
              {aboutStory.meta.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <dt className="font-geist text-[11px] uppercase tracking-[0.06em] text-muted">{item.label}</dt>
                  <dd className="font-sora text-sm font-semibold text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 lg:col-span-7">
            {focusCards.map((card, index) => {
              const Icon = icons[card.icon];
              const numberColor = card.accent === 'cyan' ? 'text-cyan/40' : card.accent === 'periwinkle' ? 'text-periwinkle/40' : 'text-lilac/40';
              return (
                <Reveal key={card.number} delay={index * 0.1} className="glass group flex flex-col justify-between gap-8 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-3xl font-bold ${numberColor}`}>{card.number}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-raised text-ink transition-colors group-hover:text-cyan">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-sora text-lg font-semibold leading-6 text-ink">
                        {card.title[0]}
                        <br />
                        {card.title[1]}
                      </h3>
                      <p className="font-geist text-[13px] leading-5 text-muted">{card.body}</p>
                    </div>
                  </div>
                  <p className="border-t border-periwinkle/15 pt-4 font-geist text-[11px] font-semibold tracking-[0.08em] text-lilac">
                    {card.tags}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
