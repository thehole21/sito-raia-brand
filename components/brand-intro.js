'use client';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import './brand-intro.css';
const DURATION = 2800;
const ART = '/_next/image?url=%2Fimages%2Fraia-logo-transparent.webp&w=1080&q=75';
export default function BrandIntro() {
  const [intro, setIntro] = useState(null);
  const logo = useRef(null);
  const maskId = `print-${useId().replace(/:/g, '')}`;
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    if (motion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '') || document.visibilityState !== 'visible' || location.hash) return;
    let cancelled = false;
    const target = document.querySelector('.site-header .brand-logo__image');
    if (!target) return;
    const artwork = new Image();
    artwork.src = ART;
    const deadline = setTimeout(() => { cancelled = true; }, 900);
    Promise.all([artwork.decode(), target.decode()]).then(() => {
      if (!cancelled && !motion.matches && document.visibilityState === 'visible' && !location.hash && !document.activeElement?.closest('a, button, input')) setIntro({ target });
    }).catch(() => {}).finally(() => clearTimeout(deadline));
    return () => { cancelled = true; clearTimeout(deadline); };
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
    if (!start.width || !end.width || motion.matches || !flying.animate) { finish(); return; }
    target.classList.add('raia-intro-target');
    // Match the contained header image, including its max-height constraint.
    const scale = Math.min(end.width / start.width, end.height / start.height);
    const dx = end.left + (end.width - start.width * scale) / 2 - start.left;
    const dy = end.top + (end.height - start.height * scale) / 2 - start.top;
    const pose = (x, y, size) => `translate3d(${x}px, ${y}px, 0) scale(${size})`;
    const flight = flying.animate([
      { transform: pose(0, 0, 1), offset: 0 },
      { transform: pose(0, 0, 1), offset: .65, easing: 'cubic-bezier(.4,0,.2,1)' },
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
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="2096" height="1084">
                <circle className="raia-intro__reveal" cx="582" cy="535" r="300" stroke="white" strokeWidth="620" pathLength="1" transform="rotate(90 582 535)" />
                <rect className="raia-intro__wordmark" x="1115" y="0" width="981" height="1084" fill="white" />
                <rect className="raia-intro__seal" width="2096" height="1084" fill="white" />
              </mask>
            </defs>
            {/* Reveal the original artwork: the final shape is never an approximation. */}
            <image href={ART} width="2096" height="1084" mask={`url(#${maskId})`} />
            <g className="raia-intro__press" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M200 700V460Q200 430 230 430H920Q950 430 950 460V700M200 600H950M230 700H920M270 700V860M880 700V860M250 860H300M850 860H900" />
              <path d="M235 490H915M280 545H865M310 650H845" opacity=".35" />
              <rect className="raia-intro__head" x="280" y="465" width="90" height="110" rx="10" fill="var(--brand-paper)" />
              <circle cx="895" cy="540" r="7" fill="#9c2f3e" stroke="none" />
            </g>
            <path className="raia-intro__ribbon" d="M575 615C575 735 645 895 785 895C1080 895 1100 330 780 220C470 110 190 350 245 620C275 795 395 900 565 900" stroke="#9c2f3e" strokeWidth="100" strokeLinecap="butt" pathLength="1" />
          </svg>
        </div>
        <p className="raia-intro__welcome">Benvenuto in <strong>RAIA S.R.L.</strong></p>
      </div>
    </div>
  );
}
