import LocationMap from '@/components/location-map';
import { pageMetadata } from '@/lib/seo';
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import SocialLinks from "@/components/social-links";
import { COMPANY } from "@/lib/content";
import "./contatti-polish.css";
import "./contatti-address-fix.css";

export const metadata = pageMetadata('/contatti');

const EMBED_URL = "https://www.google.com/maps?q=Via%20Bruno%20Pontecorvo%2046%2C%2000012%20Guidonia%20Montecelio%20RM&z=14&output=embed";

export default function ContattiPage() {
  return (
    <div className="contact-page">
      <section className="page-opening shell" aria-labelledby="contacts-title">
        <div className="page-opening__eyebrow">
          <span className="little-dot" aria-hidden="true" /> CONTATTI
        </div>
        <div className="page-opening__grid">
          <h1 id="contacts-title">Parliamone<span className="accent-dot">.</span></h1>
          <p>Una nuova idea o un progetto da realizzare? Qui trovi tutti i nostri recapiti.</p>
        </div>
      </section>

      <section className="shell contact-grid contact-grid--v7" aria-label="Recapiti RAIA">
        <div className="contact-grid__dark contact-feature">
          <svg className="contact-feature__watermark" viewBox="0 0 469.25 470.55" aria-hidden="true">
            <path fill="#ffffff" d="M439.78,318.98c-17.29,42.35-47.32,78.15-85.33,102.63-13.64,8.8-28.31,16.13-43.8,21.79-23.71,8.66-49.31,13.39-76.02,13.39s-52.98-4.85-76.95-13.73c11.18,3.35,21.72-7.61,17.49-18.85l-87.85-233.54c-4.56-12.13-11.79-17.82-21.68-17.07-5.01.22-8.35-.22-10.02-1.29-1.67-1.05-3.87-5.2-6.58-12.42-5.43-14.45-4.26-23.15,3.53-26.1l153.91-58.27c30.61-11.59,62.29-10.36,95.02,3.67,32.72,14.04,56.43,40.56,71.09,79.54,20.85,55.42,6.36,102.26-43.48,140.52,36.44-5.29,65.31,2.76,86.62,24.11.28.28.57.55.87.8.09.08.18.16.27.23.39.32.78.61,1.19.88.03.02.06.04.09.06.82.54,1.68.98,2.56,1.32,1.07.44,2.18.73,3.29.89.03,0,.06.01.1.01.2.03.4.06.6.07,6.15.67,12.54-2.39,15.08-8.64Z" />
            <path fill="#9c2f3e" d="M456.14,235.28c0,29.61-5.81,57.88-16.36,83.7-2.54,6.25-8.93,9.31-15.08,8.64-.2-.01-.4-.04-.6-.07-.04,0-.07-.01-.1-.01-1.12-.17-2.22-.47-3.29-.89-.88-.36-1.74-.8-2.56-1.32-.03-.02-.06-.04-.09-.06-.4-.27-.8-.56-1.19-.88-.09-.07-.18-.15-.27-.23-.3-.25-.59-.52-.87-.8-21.31-21.35-50.18-29.4-86.62-24.11,49.84-38.26,64.33-85.1,43.48-140.52-14.66-38.98-38.37-65.5-71.09-79.54-32.73-14.03-64.41-15.26-95.02-3.67l-153.91,58.27c-7.79,2.95-8.96,11.65-3.53,26.1,2.71,7.22,4.91,11.37,6.58,12.42,1.67,1.07,5.01,1.51,10.02,1.29,9.89-.75,17.12,4.94,21.68,17.07l87.85,233.54c4.23,11.24-6.31,22.2-17.49,18.85-3.94-1.46-7.83-3.03-11.66-4.7-.98-.43-1.96-.86-2.93-1.31C66.42,402.22,13.11,324.98,13.11,235.28,13.11,123.28,96.23,30.69,204.15,15.84c.81-.11,1.61-.22,2.42-.32.81-.1,1.62-.2,2.43-.3.12-.01.24-.03.36-.04,6.52-.76,13.04-1.2,19.55-1.35,1.71-.04,3.43-.06,5.15-.07h.57c1.12,0,2.25,0,3.37.04.23,0,.46,0,.68.01,120.47,2.16,217.46,100.48,217.46,221.47Z" />
            <path fill="#9c2f3e" d="M267.92,341.63l42.74,101.79c3.46-1.26,6.91-2.61,10.35-4.06,11.84-5.01,23.01-10.93,33.48-17.64l-27.94-66.55c-9.1-21.68-24.54-27.94-46.29-18.75l-12.34,5.21Z" />
            <path fill="#9c2f3e" d="M239.17,147.05c-6.49-15.45-13.93-25.11-22.35-29.02-8.42-3.91-18.76-3.28-31,1.9l-9.32,3.94,78.01,185.8,17.82-7.52c18.09-7.65,19.46-29.76,4.11-66.34l-37.27-88.76Z" />
          </svg>
          <div className="contact-feature__head">
            <span className="contact-feature__kicker">RAIA SRL</span>
            <span className="contact-feature__line" aria-hidden="true" />
          </div>
          <h2>Diamo forma<br /><em>alle tue idee.</em></h2>
          <div className="contact-feature__bottom">
            <span>Pensa · Crea · Stampa</span>
          </div>
        </div>

        <div className="contact-grid__details">
          <div>
            <Mail size={21} aria-hidden="true" />
            <div><span>EMAIL</span><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
          </div>
          <div>
            <Phone size={21} aria-hidden="true" />
            <div><span>TELEFONO</span><a href={`tel:${COMPANY.phoneLink}`}>{COMPANY.phone}</a></div>
          </div>
          <div>
            <MapPin size={21} aria-hidden="true" />
            <div>
              <span>SEDE</span>
              <a className="contact-address-link" href={COMPANY.map} target="_blank" rel="noopener noreferrer" aria-label={`Apri su Google Maps: ${COMPANY.address}`}>
                {COMPANY.address}
                <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="contact-grid__social-row">
            <span className="contact-grid__social-mark" aria-hidden="true">↗</span>
            <div><span>SEGUICI</span><SocialLinks className="contact-socials" label="RAIA sui social" /></div>
          </div>
        </div>
      </section>

      <section className="location-section shell" aria-labelledby="location-title">
        <div className="location-section__heading">
          <div>
            <span className="section-overline">DOVE SIAMO</span>
            <h2 id="location-title">Vieni a trovarci<span>.</span></h2>
          </div>
          <a href={COMPANY.map} target="_blank" rel="noopener noreferrer">
            Apri Google Maps <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
        <div className="location-section__map">
          <LocationMap src={EMBED_URL}/>
        </div>
        <a className="location-section__address contact-address-under-map" href={COMPANY.map} target="_blank" rel="noopener noreferrer">Via Bruno Pontecorvo 46 · 00012 Guidonia Montecelio (RM) <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" /></a>
      </section>
    </div>
  );
}
