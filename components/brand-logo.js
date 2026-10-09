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
        src={onDark ? '/images/raia-logo-on-dark.png' : '/images/raia-logo-transparent.png'}
        alt="RAIA — Design, Stampa, Comunicazione"
        width={2096}
        height={1084}
        className="brand-logo__image"
        priority={!onDark}
        sizes="(max-width: 600px) 126px, (max-width: 959px) 142px, 170px"
      />
    </Link>
  );
}
