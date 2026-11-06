import { profile } from '../data/portfolio.js';

export default function Footer() {
  return (
    <footer className="border-t border-periwinkle/10 py-8">
      <div className="mx-auto flex max-w-[1184px] flex-col items-center justify-between gap-3 px-6 text-center md:flex-row md:text-left lg:px-12">
        <p className="font-geist text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-geist text-xs text-muted/70">{profile.footerNote}</p>
      </div>
    </footer>
  );
}
