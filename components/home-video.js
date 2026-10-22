'use client';
import {useEffect,useRef} from 'react';
import Image from 'next/image';
export default function HomeVideo(){const videoRef=useRef(null);
useEffect(()=>{const video=videoRef.current;const motion=matchMedia('(prefers-reduced-motion: reduce)');let cancelled=false;
 const start=()=>{if(cancelled||motion.matches||navigator.connection?.saveData){video.pause();return;}if(!video.getAttribute('src')){video.src=matchMedia('(max-width: 767px)').matches?'/videos/raia-home-mobile.mp4':'/videos/raia-home-desktop.mp4';}video.play().catch(()=>{});};
 // Paint the responsive poster first; load the decorative film after page resources.
 const ready=()=>{if('requestIdleCallback' in window)window.requestIdleCallback(start,{timeout:1000});else start();};
 if(document.readyState==='complete')ready();else window.addEventListener('load',ready,{once:true});motion.addEventListener('change',start);
 return()=>{cancelled=true;window.removeEventListener('load',ready);motion.removeEventListener('change',start);};},[]);
return <><Image src="/images/home-poster.webp" alt="" fill priority fetchPriority="high" sizes="100vw" className="film-hero__video" style={{objectFit:'cover'}}/><video ref={videoRef} className="film-hero__video" muted playsInline loop preload="none" aria-hidden="true" tabIndex={-1}/></>;
}
