'use client';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import './brand-intro.css';
const DURATION = 2750;
const ART = '/_next/image?url=%2Fimages%2Fraia-logo-transparent.webp&w=1080&q=75';
export default function BrandIntro() {
  const [intro, setIntro] = useState(null);
  const logo = useRef(null);
  const maskId = `print-${useId().replace(/:/g, '')}`;
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    if (motion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '') || document.visibilityState !== 'visible' || location.hash) return;
    document.documentElement.dataset.raiaIntro = 'pending';
    let started = false;
    const release = () => {
      delete document.documentElement.dataset.raiaIntro;
      document.dispatchEvent(new Event('raia:intro-complete'));
    };
    let cancelled = false;
    const target = document.querySelector('.site-header .brand-logo__image');
    if (!target) { release(); return; }
    const artwork = new Image();
    artwork.src = ART;
    const deadline = setTimeout(() => { cancelled = true; }, 900);
    Promise.all([artwork.decode(), target.decode()]).then(() => {
      if (!cancelled && !motion.matches && document.visibilityState === 'visible' && !location.hash && !document.activeElement?.closest('a, button, input')) { started = true; setIntro({ target }); }
    }).catch(() => {}).finally(() => { clearTimeout(deadline); if (!started) release(); });
    return () => { cancelled = true; clearTimeout(deadline); if (!started) release(); };
  }, []);
  useLayoutEffect(() => {
    if (!intro) return;
    const { target } = intro;
    const flying = logo.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => setIntro(null);
    const onKey = event => { if (event.key === 'Escape') finish(); };
    const start = flying.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    if (!start.width || !end.width || motion.matches || !flying.animate) {
      delete document.documentElement.dataset.raiaIntro;
      document.dispatchEvent(new Event('raia:intro-complete'));
      finish(); return;
    }
    target.classList.add('raia-intro-target');
    // Match the contained header image, including its max-height constraint.
    const scale = Math.min(end.width / start.width, end.height / start.height);
    const dx = end.left + (end.width - start.width * scale) / 2 - start.left;
    const dy = end.top + (end.height - start.height * scale) / 2 - start.top;
    const pose = (x, y, size) => `translate3d(${x}px, ${y}px, 0) scale(${size})`;
    const flight = flying.animate([
      { transform: pose(0, 0, 1), offset: 0 },
      { transform: pose(0, 0, 1), offset: .68, easing: 'cubic-bezier(.4,0,.2,1)' },
      { transform: pose(dx, dy, scale), offset: .97 },
      { transform: pose(dx, dy, scale), offset: 1 },
    ], { duration: DURATION, fill: 'both' });
    flight.onfinish = finish;
    const deadline = setTimeout(finish, DURATION + 150);
    window.addEventListener('resize', finish);
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', finish, { passive: true });
    window.addEventListener('touchstart', finish, { passive: true });
    document.addEventListener('focusin', finish);
    document.addEventListener('visibilitychange', finish);
    motion.addEventListener('change', finish);
    return () => {
      target.classList.remove('raia-intro-target');
      delete document.documentElement.dataset.raiaIntro;
      document.dispatchEvent(new Event('raia:intro-complete'));
      flight.cancel(); clearTimeout(deadline);
      window.removeEventListener('resize', finish);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchstart', finish);
      document.removeEventListener('focusin', finish);
      document.removeEventListener('visibilitychange', finish);
      motion.removeEventListener('change', finish);
    };
  }, [intro]);
  if (!intro) return null;
  return (
    <div className="raia-intro" aria-hidden="true" style={{ '--intro-duration': `${DURATION}ms` }}>
      <div className="raia-intro__backdrop" />
      <div className="raia-intro__composition">
        <div ref={logo} className="raia-intro__logo">
          <svg viewBox="0 0 2096 1084" fill="none" className="raia-intro__art">
            <defs>
              <linearGradient id={`${maskId}-ink`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#b84b58" /><stop offset=".5" stopColor="#9c2f3e" /><stop offset="1" stopColor="#7d2332" />
              </linearGradient>
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="2096" height="1084">
                <rect className="raia-intro__reveal" width="1115" height="1084" fill="white" />
                <rect className="raia-intro__wordmark" x="1115" y="0" width="981" height="1084" fill="white" />
              </mask>
            </defs>
            <g className="raia-intro__scene-content">
            {/* The sheet and the monogram share their final centre and silhouette. */}
            <image href={ART} width="2096" height="1084" mask={`url(#${maskId})`} />
            <g className="raia-intro__sheet">
              <path fill={`url(#${maskId}-ink)`} d="M250 560 C470 560 690 560 910 560 C910 580 910 600 910 620 C690 620 470 620 250 620 C250 600 250 580 250 560 Z">
                <animate attributeName="d" dur="1.577s" fill="freeze" calcMode="spline" keyTimes="0; .12; .49; .72; 1" keySplines=".4 0 .2 1; .25 .1 .25 1; .4 0 .2 1; .4 0 .2 1" values="M250 560 C470 560 690 560 910 560 C910 580 910 600 910 620 C690 620 470 620 250 620 C250 600 250 580 250 560 Z; M250 560 C470 560 690 560 910 560 C910 580 910 600 910 620 C690 620 470 620 250 620 C250 600 250 580 250 560 Z; M250 560 C470 560 690 560 910 560 C910 690 970 850 1010 930 C780 1000 470 1000 270 920 C230 800 250 690 250 560 Z; M340 190 C600 80 1010 190 1080 420 C1150 690 960 970 720 1010 C430 1070 140 870 130 620 C110 400 180 270 340 190 Z; M584 16 C873 16 1108 244 1108 526 C1108 808 873 1036 584 1036 C295 1036 60 808 60 526 C60 244 295 16 584 16 Z" />
              </path>
              <path className="raia-intro__fold" d="M270 890 Q620 980 1000 905" stroke="#e3a1a7" strokeWidth="5" />
            </g>
            <g className="raia-intro__press" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
              {/* Wide carriage, side cabinets, feed rollers and freestanding chassis. */}
              <path d="M100 560V370Q100 342 128 342H1040Q1070 342 1070 370V560H940M100 560H230" fill="var(--brand-paper)" />
              <path d="M175 342V290H1000V342M190 380H980M190 460H980" />
              <rect x="95" y="365" width="130" height="245" rx="16" fill="var(--brand-paper)" />
              <rect x="945" y="365" width="130" height="245" rx="16" fill="var(--brand-paper)" />
              <path d="M235 520H935M235 548H935" strokeWidth="13" />
              <path d="M165 615V920H255M1010 615V920H920M170 850H1005" />
              <path d="M220 790H940" strokeWidth="25" opacity=".32" />
              <circle cx="165" cy="936" r="13" /><circle cx="1010" cy="936" r="13" />
              <rect x="973" y="394" width="71" height="49" rx="5" strokeWidth="5" />
              <path d="M989 411H1027M989 426H1013M123 400H195M123 417H195M123 434H195" strokeWidth="4" opacity=".5" />
              <circle cx="1008" cy="477" r="7" fill="#9c2f3e" stroke="none" />
              <g className="raia-intro__head">
                <rect x="250" y="385" width="115" height="112" rx="10" fill="var(--brand-paper)" />
                <path d="M270 405H345M270 420H345M285 481H330" strokeWidth="4" />
              </g>
            </g>
            {/* The brief contact prints the original mark before the stamp lifts away. */}
            <ellipse className="raia-intro__stamp-contact" cx="584" cy="550" rx="205" ry="48" stroke="#9c2f3e" strokeWidth="6" />
            <g className="raia-intro__stamp" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M530 320 C540 365 550 388 550 420 H618 C618 388 628 365 638 320 Z" fill="var(--brand-paper)" />
              <rect x="509" y="244" width="150" height="90" rx="40" fill="#9c2f3e" stroke="#9c2f3e" />
              <path d="M478 428 Q584 395 690 428 L728 505 Q584 550 440 505 Z" fill="var(--brand-paper)" />
              <path d="M440 505 V532 Q584 578 728 532 V505" fill="var(--brand-paper)" />
              <path d="M466 530 Q584 563 702 530" stroke="#9c2f3e" strokeWidth="12" />
              <path d="M538 267 H594" stroke="#fff" strokeWidth="5" opacity=".4" />
            </g>
            </g>
          </svg>
        </div>
        <p className="raia-intro__welcome"><span>Benvenuto in</span><strong>RAIA S.R.L.</strong></p>
      </div>
    </div>
  );
}
