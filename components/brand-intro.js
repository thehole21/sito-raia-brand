'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import sprite from '@/public/images/raia-print-intro.webp';
import './brand-intro.css';

const LANDING = 2160;
const FRAMES = [[0, 0], [50, 0], [100, 0], [0, 100], [50, 100], [100, 100]];

export default function BrandIntro() {
  const [intro, setIntro] = useState(null);
  const layer = useRef(null);
  const logo = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    if (motion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '') ||
      document.visibilityState !== 'visible' || window.location.hash) return;

    let current = true;
    let timeout;
    const frame = requestAnimationFrame(() => {
      const target = document.querySelector('.site-header .brand-logo__image');
      if (!target) return;
      const film = new window.Image();
      film.fetchPriority = 'low';
      film.src = sprite.src;
      timeout = window.setTimeout(() => { current = false; }, 420);
      Promise.all([film.decode(), target.decode()]).then(() => {
        if (current && target.currentSrc && !motion.matches && !window.location.hash &&
          document.visibilityState === 'visible' && !document.activeElement?.closest('a, button, input')) {
          setIntro({ target, src: target.currentSrc });
        }
      }).catch(() => {}).finally(() => window.clearTimeout(timeout));
    });

    return () => {
      current = false;
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  useLayoutEffect(() => {
    if (!intro) return;
    const { target } = intro;
    const flying = logo.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => setIntro(null);
    const onEscape = event => { if (event.key === 'Escape') finish(); };
    const onFocus = event => { if (!layer.current?.contains(event.target)) finish(); };

    target.classList.add('raia-intro-target');
    const start = flying.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    if (!start.width || !end.width || motion.matches || !flying.animate) {
      target.classList.remove('raia-intro-target');
      finish();
      return;
    }
    // The header uses object-fit: contain and can cap the image height.
    const scale = Math.min(end.width / start.width, end.height / start.height);
    const dx = end.left + (end.width - start.width * scale) / 2 - start.left;
    const dy = end.top + (end.height - start.height * scale) / 2 - start.top;
    const animation = flying.animate([
      { opacity: 0, transform: 'translateY(8px) scale(.985)', offset: 0 },
      { opacity: 0, transform: 'translateY(8px) scale(.985)', offset: .44, easing: 'ease-out' },
      { opacity: 1, transform: 'none', offset: .65 },
      { opacity: 1, transform: 'none', offset: .72, easing: 'cubic-bezier(.65, 0, .2, 1)' },
      { opacity: 1, transform: `translate(${dx}px, ${dy}px) scale(${scale})`, offset: 1 },
    ], { duration: LANDING, fill: 'both' });

    animation.onfinish = finish;
    const fallback = window.setTimeout(finish, LANDING + 120);
    window.addEventListener('resize', finish);
    window.addEventListener('keydown', onEscape);
    window.addEventListener('wheel', finish, { passive: true });
    document.addEventListener('focusin', onFocus);
    document.addEventListener('visibilitychange', finish);
    motion.addEventListener('change', finish);
    return () => {
      target.classList.remove('raia-intro-target');
      animation.cancel();
      window.clearTimeout(fallback);
      window.removeEventListener('resize', finish);
      window.removeEventListener('keydown', onEscape);
      window.removeEventListener('wheel', finish);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('visibilitychange', finish);
      motion.removeEventListener('change', finish);
    };
  }, [intro]);

  if (!intro) return null;

  return (
    <div className="raia-intro" ref={layer}>
      <div className="raia-intro__backdrop" aria-hidden="true" />
      <div className="raia-intro__scene" aria-hidden="true">
        <div className="raia-intro__film" style={{ '--intro-sprite': `url("${sprite.src}")` }}>
          {FRAMES.map(([x, y], index) => <span key={index} style={{
            backgroundPosition: `${x}% ${y}%`,
            animationDelay: `${index * 126 - 20}ms`,
          }} />)}
        </div>
        <p>Benvenuto In <em>RAIA S.R.L.</em></p>
      </div>
      <div className="raia-intro__logo-slot" aria-hidden="true">
        {/* Use the exact image response already selected by the header. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={logo} className="raia-intro__logo" src={intro.src} alt="" width={2096} height={1084} />
      </div>
      <button className="raia-intro__skip" type="button" onClick={() => setIntro(null)}>Salta intro</button>
    </div>
  );
}
