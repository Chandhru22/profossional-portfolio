import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, description, accent = 'cyan', badge }) {
  const accentClass = accent === 'lilac' ? 'bg-lilac text-lilac' : 'bg-cyan text-cyan';

  return (
    <Reveal className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`h-0.5 w-8 ${accentClass.split(' ')[0]}`} aria-hidden="true" />
          <p className={`font-geist text-xs font-medium uppercase tracking-[0.12em] ${accentClass.split(' ')[1]}`}>
            {eyebrow}
          </p>
        </div>
        {badge}
      </div>
      <h2 className="font-sora text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
      {description && <p className="max-w-xl font-geist text-[15px] leading-6 text-muted">{description}</p>}
    </Reveal>
  );
}
