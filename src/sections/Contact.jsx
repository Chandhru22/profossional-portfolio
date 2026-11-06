import { Mail, Share2, Code2, ArrowRight } from 'lucide-react';
import { contactChannels, contactForm, profile } from '../data/portfolio.js';
import SectionHeading from '../components/SectionHeading.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../components/Reveal.jsx';

const icons = { Mail, Share2, Code2 };

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-white/5 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1184px]">
        <SectionHeading eyebrow={contactForm.eyebrow} title={contactForm.heading} description={contactForm.description} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal className="glass rounded-2xl border-cyan/25 p-6">
              <p className="flex items-center gap-2 font-geist text-[11px] font-bold uppercase tracking-[0.06em] text-mint-soft">
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-mint" />
                </span>
                Currently Available
              </p>
              <p className="mt-3 font-geist text-[13px] leading-5 text-muted">{profile.availability}</p>
            </Reveal>

            {contactChannels.map((channel, index) => {
              const Icon = icons[channel.icon];
              const external = channel.href.startsWith('http');
              return (
                <Reveal key={channel.label} delay={index * 0.08}>
                  <a
                    href={channel.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="glass group flex items-center justify-between gap-4 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-raised text-cyan">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="font-geist text-[11px] uppercase tracking-[0.06em] text-muted">{channel.label}</span>
                        <span className="font-sora text-sm font-semibold text-ink">{channel.value}</span>
                      </span>
                    </span>
                    <ArrowRight size={16} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-cyan" aria-hidden="true" />
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
