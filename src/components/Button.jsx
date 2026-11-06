export default function Button({ href, onClick, variant = 'primary', icon: Icon, children, download, type = 'button', disabled = false, className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-sora text-[15px] font-semibold transition-all duration-300 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary: 'bg-brand-gradient-3 text-white shadow-glow hover:brightness-110 hover:-translate-y-0.5',
    secondary: 'glass text-ink hover:bg-raised hover:-translate-y-0.5',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
        {Icon && <Icon size={16} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {Icon && <Icon size={16} aria-hidden="true" />}
    </button>
  );
}
