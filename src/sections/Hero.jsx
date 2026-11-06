import { useState } from 'react';
import { Download, ArrowRight, Github, Linkedin, Mail, Circle } from 'lucide-react';
import { profile, heroBadges } from '../data/portfolio.js';
import Button from '../components/Button.jsx';
import TypingText from '../components/TypingText.jsx';
import Reveal from '../components/Reveal.jsx';
import profileImage from '../assets/images/profile.jpg';

const badgePosition = {
  'top-left': '-left-6 -top-4',
  'top-right': '-right-6 top-12',
  'bottom-right': '-right-5 bottom-16',
  'bottom-left': '-left-4 -bottom-4',
};

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-panel font-sora text-6xl font-bold text-lilac/60" aria-hidden="true">
        BC
      </div>
    );
  }

  return (
    <img
      src={profileImage}
      alt="Portrait of BalaChandhru. P"
      loading="eager"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pb-20 pt-32 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/3 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] rounded-full bg-cyan/15 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1184px] items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-sm border border-cyan/30 bg-card px-4 py-1.5 font-geist text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan">
              <Circle size={8} className="fill-cyan text-cyan" aria-hidden="true" />
              Python Full Stack Developer
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-sora text-4xl font-bold tracking-tight text-ink md:text-6xl">
              {profile.headline}{' '}
              <span className="bg-gradient-to-r from-lilac via-periwinkle to-cyan bg-clip-text text-transparent">
                {profile.shortName}. P
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-2">
            <span className="font-mono text-2xl font-bold text-cyan" aria-hidden="true">&gt;</span>
            <TypingText text={profile.roles[0]} />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-[640px] font-geist text-[17px] leading-7 text-muted">{profile.pitch}</p>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="#projects" icon={ArrowRight}>Explore My Work</Button>
            <Button href={profile.resume} download variant="secondary" icon={Download}>Download Resume</Button>
          </Reveal>

          <Reveal delay={0.25} className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-periwinkle/15 pt-5">
            <div className="flex items-center gap-4">
              <span className="font-geist text-xs font-medium uppercase tracking-[0.06em] text-muted">Connect:</span>
              <div className="flex items-center gap-2">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="glass flex h-10 w-10 items-center justify-center rounded-sm text-muted transition-colors hover:text-cyan">
                  <Github size={18} aria-hidden="true" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="glass flex h-10 w-10 items-center justify-center rounded-sm text-muted transition-colors hover:text-cyan">
                  <Linkedin size={18} aria-hidden="true" />
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Send an email" className="glass flex h-10 w-10 items-center justify-center rounded-sm text-muted transition-colors hover:text-cyan">
                  <Mail size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <p className="flex items-center gap-2 font-geist text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
              {profile.statusText}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mx-auto h-[468px] w-full max-w-[420px] lg:col-span-5">
          <div aria-hidden="true" className="absolute inset-4 rounded-2xl bg-gradient-to-br from-violet/60 via-indigo/40 to-cyan/30 opacity-70 blur-[70px]" />

          <div className="glass relative h-full overflow-visible rounded-2xl p-2 shadow-2xl">
            <div className="relative h-full overflow-hidden rounded-lg bg-panel">
              <ProfilePhoto />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-sm border border-white/10 bg-panel/85 p-3 backdrop-blur-xl">
                <div>
                  <p className="font-sora text-sm font-semibold text-ink">{profile.name}</p>
                  <p className="font-geist text-[11px] uppercase tracking-[0.03em] text-cyan">Core Backend &amp; Architecture</p>
                </div>
              </div>
            </div>

            {heroBadges.map((badge) => (
              <span
                key={badge.label}
                className={`absolute hidden rounded-sm border border-periwinkle/30 bg-raised/90 px-4 py-2 font-geist text-[11px] font-bold uppercase tracking-[0.05em] text-ink shadow-xl backdrop-blur-xl sm:block ${badgePosition[badge.position]}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
