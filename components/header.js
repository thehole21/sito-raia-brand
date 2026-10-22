'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import SocialLinks from '@/components/social-links';
import BrandLogo from '@/components/brand-logo';
import { NAV } from '@/lib/content';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false); };
    const onDesktop = () => { if (window.innerWidth >= 960) setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onDesktop);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onDesktop);
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''} ${open ? 'site-header--open' : ''}`}>
        <div className="shell site-header__inner">
          <BrandLogo onClick={() => setOpen(false)} />

          <nav className="header-links" aria-label="Navigazione principale">
            {NAV.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={pathname === href ? 'is-active' : ''}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="header-quote" href="/preventivo" aria-label="Richiedi preventivo">
              <span className="header-quote__text">Richiedi preventivo</span>
              <span className="header-quote__icon"><ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></span>
            </Link>
            <button
              className="header-menu" type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Chiudi il menu di navigazione' : 'Apri il menu di navigazione'}
              aria-expanded={open} aria-controls="mobile-navigation"
            >
              {open ? <X size={20} strokeWidth={1.7} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.7} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav-backdrop ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav
        id="mobile-navigation"
        className={`mobile-nav-panel ${open ? 'is-open' : ''}`}
        aria-label="Navigazione mobile"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-nav-panel__heading"><strong>Navigazione</strong><span>RAIA / MENU</span></div>
        <div className="mobile-nav-panel__links">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>
              <span>{label}</span><ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <Link href="/preventivo" className="mobile-nav-panel__cta" onClick={() => setOpen(false)}>
          Richiedi un preventivo <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
        </Link>
        <div className="mobile-nav-panel__bottom"><span>SEGUICI</span><SocialLinks label="RAIA sui social dal menu mobile" /></div>
      </nav>
    </>
  );
}
