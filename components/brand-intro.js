'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './brand-intro.css';

const LANDING = 2160;

export default function BrandIntro() {
  const [intro, setIntro] = useState(null);
  const stage = useRef(null);
  const logo = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    if (motion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '') ||
      document.visibilityState !== 'visible' || window.location.hash) return;

    const controller = new AbortController();
    let objectUrl;
    let timeout;
    const frame = requestAnimationFrame(async () => {
      const target = document.querySelector('.site-header .brand-logo__image');
      if (!target) return;
      timeout = window.setTimeout(() => controller.abort(), 620);
      try {
        const [film] = await Promise.all([
          fetch('/images/raia-print-intro.mp4', { signal: controller.signal, priority: 'low' })
            .then(response => {
              if (!response.ok) throw new Error('Intro video unavailable');
              return response.blob();
            }),
          target.decode(),
        ]);
        if (!controller.signal.aborted && target.currentSrc && !motion.matches && !window.location.hash &&
          document.visibilityState === 'visible' && !document.activeElement?.closest('a, button, input')) {
          objectUrl = URL.createObjectURL(film);
          setIntro({ target, src: target.currentSrc, film: objectUrl });
        }
      } catch {
        // Leave the page interactive if optional media is unavailable.
      } finally {
        window.clearTimeout(timeout);
      }
    });

    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  useLayoutEffect(() => {
    if (!intro) return;
    const { target } = intro;
    const flying = logo.current;
    const film = stage.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => setIntro(null);
    const onEscape = event => { if (event.key === 'Escape') finish(); };

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
    const pose = (x, y, size, angle = 0) => `translate(${x}px, ${y}px) scale(${size}) rotate(${angle}deg)`;
    const glide = 'cubic-bezier(.36, .2, .35, 1)';
    const lift = Math.min(30, start.height * .2);
    film.play().catch(finish);
    const animation = flying.animate([
      { opacity: 0, transform: pose(0, 16, .91), offset: 0 },
      { opacity: 0, transform: pose(0, 16, .91), offset: .43, easing: 'ease-out' },
      { opacity: 1, transform: pose(0, 0, 1), offset: .62, easing: 'ease-in' },
      { opacity: 1, transform: pose(dx * .18, dy * .14 - lift, .94, -4), offset: .74 },
      { opacity: 1, transform: pose(dx * .72, dy * .64 - lift * .65, scale + (1 - scale) * .2, -3), offset: .88, easing: glide },
      { opacity: 1, transform: pose(dx, dy, scale), offset: 1 },
    ], { duration: LANDING, fill: 'both' });

    animation.onfinish = finish;
    const fallback = window.setTimeout(finish, LANDING + 120);
    window.addEventListener('resize', finish);
    window.addEventListener('keydown', onEscape);
    window.addEventListener('wheel', finish, { passive: true });
    document.addEventListener('focusin', finish);
    document.addEventListener('visibilitychange', finish);
    motion.addEventListener('change', finish);
    return () => {
      target.classList.remove('raia-intro-target');
      film.pause();
      URL.revokeObjectURL(intro.film);
      animation.cancel();
      window.clearTimeout(fallback);
      window.removeEventListener('resize', finish);
      window.removeEventListener('keydown', onEscape);
      window.removeEventListener('wheel', finish);
      document.removeEventListener('focusin', finish);
      document.removeEventListener('visibilitychange', finish);
      motion.removeEventListener('change', finish);
    };
  }, [intro]);

  if (!intro) return null;

  return (
    <div className="raia-intro" aria-hidden="true" style={{ '--intro-duration': `${LANDING}ms` }}>
      <div className="raia-intro__backdrop" />
      <div className="raia-intro__scene">
        <video ref={stage} className="raia-intro__film" src={intro.film} muted playsInline disablePictureInPicture />
        <p>Benvenuto In <em>RAIA S.R.L.</em></p>
      </div>
      <div className="raia-intro__logo-slot">
        {/* Use the exact image response already selected by the header. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={logo} className="raia-intro__logo" src={intro.src} alt="" width={2096} height={1084} />
      </div>
    </div>
  );
}
