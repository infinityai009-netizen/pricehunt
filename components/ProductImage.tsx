'use client';

import { useState } from 'react';

// Renders a product image with a graceful SVG fallback if the URL fails.
// Returns just the inner image tag — the parent provides the container.
export default function ProductImage({
  src,
  alt,
  fallbackTitle,
  fallbackCategory,
  className = '',
}: {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackCategory: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`w-full h-full grid place-items-center text-white font-bold text-sm p-4 text-center ${className}`}
        style={{
          background: gradientForCategory(fallbackCategory),
        }}
      >
        <div>
          <div className="text-4xl mb-2">{iconForCategory(fallbackCategory)}</div>
          <div className="line-clamp-3 leading-tight">{fallbackTitle}</div>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function gradientForCategory(c: string): string {
  const map: Record<string, string> = {
    electronics: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
    fashion:     'linear-gradient(135deg,#ec4899,#9d174d)',
    beauty:      'linear-gradient(135deg,#f43f5e,#9f1239)',
    grocery:     'linear-gradient(135deg,#16a34a,#14532d)',
    home:        'linear-gradient(135deg,#f97316,#9a3412)',
    furniture:   'linear-gradient(135deg,#a16207,#713f12)',
    gaming:      'linear-gradient(135deg,#8b5cf6,#5b21b6)',
    sports:      'linear-gradient(135deg,#14b8a6,#115e59)',
    toys:        'linear-gradient(135deg,#f59e0b,#92400e)',
    outdoor:     'linear-gradient(135deg,#65a30d,#365314)',
    pet:         'linear-gradient(135deg,#a855f7,#6b21a8)',
    cameras:     'linear-gradient(135deg,#475569,#1e293b)',
    food:        'linear-gradient(135deg,#dc2626,#7f1d1d)',
    cars:        'linear-gradient(135deg,#1e3a8a,#172554)',
    insurance:   'linear-gradient(135deg,#0f766e,#134e4a)',
    broadband:   'linear-gradient(135deg,#9333ea,#581c87)',
    mobileplan:  'linear-gradient(135deg,#db2777,#831843)',
  };
  return map[c] || 'linear-gradient(135deg,#64748b,#334155)';
}

function iconForCategory(c: string): string {
  const map: Record<string, string> = {
    electronics: '📱', fashion: '👗', beauty: '💄', grocery: '🛒',
    home: '🏠', furniture: '🛋️', gaming: '🎮', sports: '⚽',
    toys: '🧸', outdoor: '🏕️', pet: '🐾', cameras: '📷',
    food: '🍔', cars: '🚗', insurance: '🛡️', broadband: '📡',
    mobileplan: '📞',
  };
  return map[c] || '📦';
}
