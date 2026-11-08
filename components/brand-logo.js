import Image from 'next/image';
import Link from 'next/link';

/** The original company logo. Separate local variants keep it legible on dark backgrounds. */
export default function BrandLogo({ onDark = false, className = '', onClick }) {
  return (
    <Link
      href="/"
      className={`brand-logo ${onDark ? 'brand-logo--on-dark' : ''} ${className}`.trim()}
      aria-label="RAIA — torna alla home"
      onClick={onClick}
    >
      <Image
        src={onDark ? '/images/raia-logo-on-dark.webp' : '/images/raia-logo-transparent.webp'}
        alt="RAIA — Design, Stampa, Comunicazione"
        width={2096}
        height={1084}
        className="brand-logo__image"
        priority={!onDark}
        sizes={onDark ? '(max-width: 560px) 119px, 151px' : '(max-width: 959px) 122px, 132px'}
      />
    </Link>
  );
}
