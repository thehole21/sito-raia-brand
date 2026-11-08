'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HomeVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let visible = true;
    let idle;

    function updatePlayback() {
      if (cancelled || motion.matches || navigator.connection?.saveData || document.hidden || !visible) {
        video.pause();
        return;
      }
      if (!video.getAttribute('src')) {
        const device = window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
        video.src = `/videos/raia-home-${device}.mp4`;
      }
      video.play().catch(() => {});
    }

    function ready() {
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(updatePlayback, { timeout: 1000 });
      } else {
        updatePlayback();
      }
    }

    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (document.readyState === 'complete') updatePlayback();
    });
    observer.observe(video);
    if (document.readyState === 'complete') ready();
    else window.addEventListener('load', ready, { once: true });
    motion.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.removeEventListener('load', ready);
      motion.removeEventListener('change', updatePlayback);
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return (
    <>
      <Image src="/images/home-poster.webp" alt="" fill unoptimized priority fetchPriority="high"
        className="film-hero__video" style={{ objectFit: 'cover' }} />
      <video ref={videoRef} className="film-hero__video" muted playsInline loop preload="none"
        aria-hidden="true" tabIndex={-1} />
    </>
  );
}
