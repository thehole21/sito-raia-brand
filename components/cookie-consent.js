'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { readConsent, writeConsent } from '@/lib/consent';
import './cookie-consent.css';

export function CookieSettingsButton() {
  return <button className="footer__legal-link cookie-settings" type="button" onClick={() => window.dispatchEvent(new Event('raia:cookie-settings'))}>Preferenze cookie</button>;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const pathname = usePathname();
  const lastPage = useRef('');
  const opener = useRef(null);
  const panel = useRef(null);
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '';

  useEffect(() => {
    function sync() {
      const choice = readConsent(window.localStorage);
      setAllowed(choice?.analytics === true);
      setVisible(!choice && Boolean(websiteId));
      if (choice?.analytics !== true) {
        document.getElementById('raia-statistics')?.remove();
        lastPage.current = '';
      }
    }
    const open = () => { opener.current = document.activeElement; setVisible(true); };
    sync();
    window.addEventListener('raia:cookie-settings', open);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('raia:cookie-settings', open); window.removeEventListener('storage', sync); };
  }, [websiteId]);

  useEffect(() => { if (visible && opener.current) panel.current?.querySelector('button')?.focus(); }, [visible]);

  useEffect(() => {
    if (!allowed || !websiteId || window.location.hostname !== 'www.raiaweb.it') return;
    if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
    function send() {
      if (readConsent(window.localStorage)?.analytics !== true || lastPage.current === pathname) return;
      window.umami?.track({ website: websiteId, hostname: 'www.raiaweb.it', url: pathname,
        title: document.title, referrer: document.referrer ? new URL(document.referrer).origin : '',
      });
      lastPage.current = pathname;
    }
    const existing = document.getElementById('raia-statistics');
    if (existing) { if (window.umami) send(); else existing.addEventListener('load', send, { once: true }); return () => existing.removeEventListener('load', send); }
    const script = document.createElement('script');
    script.id = 'raia-statistics'; script.async = true;
    script.src = 'https://stats.raiaweb.it/script.js';
    script.dataset.websiteId = websiteId;
    script.dataset.autoTrack = 'false';
    script.dataset.doNotTrack = 'true';
    script.dataset.domains = 'www.raiaweb.it';
    script.addEventListener('load', send, { once: true });
    document.head.appendChild(script);
    return () => script.removeEventListener('load', send);
  }, [allowed, websiteId, pathname]);

  function choose(analytics) {
    writeConsent(window.localStorage, analytics);
    setAllowed(analytics); setVisible(false);
    if (!analytics) { document.getElementById('raia-statistics')?.remove(); lastPage.current = ''; }
    opener.current?.focus();
  }
  if (!visible) return null;
  return <section ref={panel} className="cookie-panel" role="region" aria-labelledby="cookie-heading">
    <div className="cookie-panel__text"><h2 id="cookie-heading">La tua privacy, la tua scelta.</h2>
      <p>Usiamo strumenti tecnici necessari. Se accetti, raccogliamo anche statistiche facoltative con Umami, senza cookie di tracciamento e sul nostro server. Nessuna pubblicità personalizzata. <Link href="/cookie-policy">Cookie Policy</Link> · <Link href="/privacy">Privacy</Link></p>
    </div>
    <div className="cookie-panel__actions"><button type="button" onClick={() => choose(false)}>Rifiuta</button><button type="button" onClick={() => choose(true)}>Accetta statistiche</button></div>
  </section>;
}
