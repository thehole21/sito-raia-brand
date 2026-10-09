import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import SocialLinks from '@/components/social-links';
import BrandLogo from '@/components/brand-logo';
import { COMPANY, NAV } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="footer" aria-label="Informazioni RAIA">
      <div className="shell footer__inner">
        <div className="footer__top">
          <div className="footer__identity">
            <BrandLogo onDark className="footer__brand-logo" />
            <div className="footer__identity-copy">
              <strong>{COMPANY.tagline}</strong>
              <span>{COMPANY.description}</span>
            </div>
          </div>
        </div>
        <div className="footer__grid">
          <nav className="footer__group" aria-label="Esplora il sito">
            <span className="footer__label">ESPLORA</span>
            <div className="footer__nav">
              {NAV.filter(({ href }) => href !== '/').map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          </nav>
          <div className="footer__group">
            <span className="footer__label">CONTATTI</span>
            <a className="footer__emphasis" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone}</a>
          </div>
          <div className="footer__group footer__location">
            <span className="footer__label">SEDE</span>
            <strong className="footer__city">Guidonia Montecelio (RM)</strong>
            <a href={COMPANY.map} target="_blank" rel="noopener noreferrer" className="footer__map">
              Via Bruno Pontecorvo 46, 00012 <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} <strong>{COMPANY.name}</strong> · P.IVA {COMPANY.vat}</span>
          <SocialLinks className="footer__socials" label="Seguici: RAIA sui social" />
          <a href="#main-content" className="footer__backtop">Torna su <ArrowUp size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
