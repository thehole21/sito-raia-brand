'use client';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import './brand-intro.css';
const DURATION = 3200;
const FONT_STACK = '"Segoe UI", "Helvetica Neue", Arial, sans-serif';

export default function BrandIntro() {
  const [intro, setIntro] = useState(null);
  const logo = useRef(null);
  const leftArtRef = useRef(null);
  const rightArtRef = useRef(null);
  const welcomeRef = useRef(null);
  const inkId = `ink-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    if (motion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '') || document.visibilityState !== 'visible' || location.hash) return;
    const timer = setTimeout(() => {
      const target = document.querySelector('.site-header .brand-logo__image');
      if (!target || motion.matches || document.visibilityState !== 'visible' || location.hash || document.activeElement?.closest('a, button, input')) return;
      setIntro({ target });
    }, 90);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!intro) return;
    const { target } = intro;
    const flying = logo.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => setIntro(null);
    const onKey = event => { if (event.key === 'Escape') finish(); };
    if (motion.matches || !flying?.animate) {
      const cancelFrame = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(cancelFrame);
    }

    const drawArt = () => {
      const nw = target.naturalWidth;
      const nh = target.naturalHeight;
      if (!nw || !nh) return;
      const splitX = nw * (1115 / 2096);
      const leftCanvas = leftArtRef.current;
      const leftCtx = leftCanvas?.getContext('2d');
      if (leftCtx) {
        leftCtx.clearRect(0, 0, leftCanvas.width, leftCanvas.height);
        leftCtx.drawImage(target, 0, 0, splitX, nh, 0, 0, leftCanvas.width, leftCanvas.height);
      }
      const rightCanvas = rightArtRef.current;
      const rightCtx = rightCanvas?.getContext('2d');
      if (rightCtx) {
        rightCtx.clearRect(0, 0, rightCanvas.width, rightCanvas.height);
        rightCtx.drawImage(target, splitX, 0, nw - splitX, nh, 0, 0, rightCanvas.width, rightCanvas.height);
      }
    };
    if (target.complete && target.naturalWidth > 0) drawArt();
    else if (target.decode) target.decode().then(drawArt).catch(() => {});
    else target.addEventListener('load', drawArt, { once: true });

    const welcomeCanvas = welcomeRef.current;
    const welcomeCtx = welcomeCanvas?.getContext('2d');
    if (welcomeCanvas && welcomeCtx) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const fontSize = Math.min(30, Math.max(19, window.innerWidth * 0.038));
      const prefix = 'Benvenuto in ';
      const brand = 'RAIA S.R.L.';
      welcomeCtx.font = `350 ${fontSize}px ${FONT_STACK}`;
      const prefixWidth = welcomeCtx.measureText(prefix).width;
      welcomeCtx.font = `550 ${fontSize}px ${FONT_STACK}`;
      const brandWidth = welcomeCtx.measureText(brand).width;
      const totalWidth = Math.ceil(prefixWidth + brandWidth + 40);
      const totalHeight = Math.ceil(fontSize * 1.45);
      welcomeCanvas.width = Math.ceil(totalWidth * dpr);
      welcomeCanvas.height = Math.ceil(totalHeight * dpr);
      welcomeCanvas.style.width = `${totalWidth}px`;
      welcomeCanvas.style.height = `${totalHeight}px`;
      welcomeCtx.scale(dpr, dpr);
      welcomeCtx.fillStyle = '#161616';
      welcomeCtx.textBaseline = 'middle';
      const xStart = (totalWidth - (prefixWidth + brandWidth)) / 2;
      const yMid = totalHeight / 2;
      welcomeCtx.font = `350 ${fontSize}px ${FONT_STACK}`;
      welcomeCtx.fillText(prefix, xStart, yMid);
      welcomeCtx.font = `550 ${fontSize}px ${FONT_STACK}`;
      welcomeCtx.fillText(brand, xStart + prefixWidth, yMid);
    }

    target.classList.add('raia-intro-target');
    let flight = null;
    const flightTimer = setTimeout(() => {
      if (!flying.isConnected || !target.isConnected) { finish(); return; }
      const start = flying.getBoundingClientRect();
      const end = target.getBoundingClientRect();
      if (!start.width || !end.width) { finish(); return; }
      const scale = Math.min(end.width / start.width, end.height / start.height);
      const dx = end.left + (end.width - start.width * scale) / 2 - start.left;
      const dy = end.top + (end.height - start.height * scale) / 2 - start.top;
      const pose = (x, y, size) => `translate3d(${x}px, ${y}px, 0) scale(${size})`;
      flight = flying.animate([
        { transform: pose(0, 0, 1), offset: 0, easing: 'cubic-bezier(.4,0,.2,1)' },
        { transform: pose(dx, dy, scale), offset: .89 },
        { transform: pose(dx, dy, scale), offset: 1 },
      ], { duration: DURATION * 0.19, fill: 'both' });
      flight.onfinish = finish;
    }, DURATION * 0.81);

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
      clearTimeout(flightTimer);
      clearTimeout(deadline);
      if (flight) flight.cancel();
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
          <canvas ref={leftArtRef} width="558" height="542" className="raia-intro__reveal" />
          <canvas ref={rightArtRef} width="490" height="542" className="raia-intro__wordmark" />
          <div className="raia-intro__layer raia-intro__sheet">
            <div className="raia-intro__layer raia-intro__ink">
              <svg viewBox="0 0 2096 1084" fill="none" className="raia-intro__art">
                <defs>
                  <linearGradient id={inkId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#b84b58" /><stop offset=".5" stopColor="#9c2f3e" /><stop offset="1" stopColor="#7d2332" />
                  </linearGradient>
                </defs>
                <path fill={`url(#${inkId})`} d="M584 16 C873 16 1108 244 1108 526 C1108 808 873 1036 584 1036 C295 1036 60 808 60 526 C60 244 295 16 584 16 Z" />
              </svg>
            </div>
            <div className="raia-intro__layer raia-intro__fold">
              <svg viewBox="0 0 2096 1084" fill="none" className="raia-intro__art">
                <path d="M270 890 Q620 980 1000 905" stroke="#e3a1a7" strokeWidth="5" />
              </svg>
            </div>
          </div>
          <div className="raia-intro__layer raia-intro__press">
            <svg viewBox="0 0 2096 1084" fill="none" className="raia-intro__art" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
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
            </svg>
            <div className="raia-intro__layer raia-intro__head">
              <svg viewBox="0 0 2096 1084" fill="none" className="raia-intro__art" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="250" y="385" width="115" height="112" rx="10" fill="var(--brand-paper)" />
                <path d="M270 405H345M270 420H345M285 481H330" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
        <canvas ref={welcomeRef} className="raia-intro__welcome" />
      </div>
    </div>
  );
}
