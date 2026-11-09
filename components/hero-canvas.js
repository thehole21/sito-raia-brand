'use client';

import { useEffect, useRef } from 'react';

export default function HeroCanvas({
  src,
  alt = '',
  width = 1280,
  height = 720,
  fill = false,
  quality = 60,
  className = '',
  style,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let frameId = 0;
    const img = new window.Image();
    img.decoding = 'async';
    const w = window.innerWidth <= 960 ? 640 : 1080;
    img.src = `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${quality}`;

    const paint = () => {
      if (cancelled || !img.naturalWidth || !canvas.isConnected) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!fill) {
        if (canvas.width !== iw || canvas.height !== ih) {
          canvas.width = iw;
          canvas.height = ih;
        }
        ctx.clearRect(0, 0, iw, ih);
        ctx.drawImage(img, 0, 0, iw, ih);
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.max(1, Math.round((canvas.clientWidth || 640) * dpr));
      const ch = Math.max(1, Math.round((canvas.clientHeight || 360) * dpr));
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      ctx.clearRect(0, 0, cw, ch);
      const scale = Math.max(cw / iw, ch / ih);
      const sw = cw / scale;
      const sh = ch / scale;
      const sx = (iw - sw) / 2;
      const sy = (ih - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    const schedulePaint = () => {
      if (cancelled) return;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(paint);
    };

    img.onload = schedulePaint;
    if (fill) window.addEventListener('resize', schedulePaint);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      if (fill) window.removeEventListener('resize', schedulePaint);
    };
  }, [src, fill, quality]);

  const fillStyle = fill
    ? { position: 'absolute', height: '100%', width: '100%', inset: 0, display: 'block', ...style }
    : { width: '100%', height: 'auto', aspectRatio: `${width} / ${height}`, display: 'block', ...style };

  return (
    <canvas
      ref={canvasRef}
      width={fill ? 640 : width}
      height={fill ? 360 : height}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : 'true'}
      className={className}
      style={fillStyle}
    />
  );
}
