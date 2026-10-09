import Script from 'next/script';

// Hooks-free motion setup for Next.js 15; same discreet 8px entrance as V9.
// Text never becomes invisible while waiting for JavaScript.
export default function ScrollReveal() {
  return (
    <Script id="raia-scroll-reveal" strategy="afterInteractive">{`
      (() => {
        if (window.__raiaBrandRevealStarted) return;
        window.__raiaBrandRevealStarted = true;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!('IntersectionObserver' in window)) return;

        const selector = 'main h1, main h2, main h3, main h4, main p, main .eyebrow, main .section-overline, main .page-opening__eyebrow, .footer .footer__label';
        const watched = new WeakSet();
        let delayIndex = 0;
        let frame = 0;
        const observer = new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('raia-text-enter');
            observer.unobserve(entry.target);
          }
        }, { threshold: 0.06, rootMargin: '0px 0px -3% 0px' });

        const scan = () => {
          for (const el of document.querySelectorAll(selector)) {
            if (watched.has(el) || el.closest('dialog, .clients-marquee')) continue;
            watched.add(el);
            el.style.setProperty('--raia-enter-delay', ((delayIndex++ % 4) * 42) + 'ms');
            observer.observe(el);
          }
        };
        scan();
        const mutationObserver = new MutationObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(scan);
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });
      })();
    `}</Script>
  );
}
