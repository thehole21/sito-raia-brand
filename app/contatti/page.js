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
          <div className="contact-feature__head">
            <span className="contact-feature__kicker">RAIA SRL</span>
            <span className="contact-feature__line" aria-hidden="true" />
          </div>
          <h2>Diamo forma<br /><em>alle tue idee.</em></h2>
          <div className="contact-feature__bottom">
            <span>Pensa · Crea · Stampa</span>
            <span className="contact-feature__mark" aria-hidden="true">↗</span>
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
