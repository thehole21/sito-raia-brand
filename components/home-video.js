'use client';

import { useEffect, useRef } from 'react';
import HeroCanvas from '@/components/hero-canvas';

export default function HomeVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let visible = true;
    let idle;
    let readyToPlay = false;
    let timer;

    function updatePlayback() {
      if (cancelled || !readyToPlay || motion.matches || navigator.connection?.saveData || document.hidden || !visible) {
        video.pause();
        return;
      }
      if (!video.getAttribute('src')) {
        const device = window.matchMedia('(max-width: 959px)').matches ? 'mobile' : 'desktop';
        video.src = `/videos/raia-home-${device}-v2.mp4`;
      }
      video.play().catch(() => {});
    }

    function activate() {
      if (readyToPlay || cancelled) return;
      readyToPlay = true;
      if (timer) clearTimeout(timer);
      window.removeEventListener('wheel', activate);
      window.removeEventListener('touchstart', activate);
      window.removeEventListener('pointermove', activate);
      window.removeEventListener('keydown', activate);
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(updatePlayback, { timeout: 1000 });
      } else {
        updatePlayback();
      }
    }

    function ready() {
      timer = setTimeout(activate, 3200);
      window.addEventListener('wheel', activate, { passive: true, once: true });
      window.addEventListener('touchstart', activate, { passive: true, once: true });
      window.addEventListener('pointermove', activate, { passive: true, once: true });
      window.addEventListener('keydown', activate, { passive: true, once: true });
    }

    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (readyToPlay) updatePlayback();
    });
    observer.observe(video);
    if (document.readyState === 'complete') ready();
    else window.addEventListener('load', ready, { once: true });
    motion.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (timer) clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.removeEventListener('load', ready);
      window.removeEventListener('wheel', activate);
      window.removeEventListener('touchstart', activate);
      window.removeEventListener('pointermove', activate);
      window.removeEventListener('keydown', activate);
      motion.removeEventListener('change', updatePlayback);
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return (
    <>
      <HeroCanvas src="/images/home-poster-v2.webp" alt="" fill quality={60}
        className="film-hero__video" />
      <video ref={videoRef} className="film-hero__video" muted playsInline loop preload="none"
        aria-hidden="true" tabIndex={-1} />
    </>
  );
}
