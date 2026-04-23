import React, { useMemo, useState } from 'react';

function buildPlaceholder(label) {
  const safeLabel = encodeURIComponent(label || 'DV Kids Castle');

  return `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='%23fff1de'/>
        <stop offset='50%' stop-color='%23eaf7ff'/>
        <stop offset='100%' stop-color='%23fff8f1'/>
      </linearGradient>
    </defs>
    <rect width='800' height='800' fill='url(%23bg)'/>
    <circle cx='160' cy='160' r='90' fill='%23ffb26f' fill-opacity='0.28'/>
    <circle cx='650' cy='180' r='110' fill='%2377c7ff' fill-opacity='0.22'/>
    <circle cx='620' cy='640' r='120' fill='%23ff8fb1' fill-opacity='0.18'/>
    <rect x='180' y='250' width='440' height='300' rx='36' fill='white' fill-opacity='0.72'/>
    <text x='400' y='390' text-anchor='middle' font-size='86'>🧸</text>
    <text x='400' y='465' text-anchor='middle' font-family='Arial, sans-serif' font-size='34' font-weight='700' fill='%23334155'>${safeLabel}</text>
    <text x='400' y='515' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%2364758b'>DV Kids Castle</text>
  </svg>`;
}

export default function ImageWithFallback({ src, alt, className = '', ...props }) {
  const [hasError, setHasError] = useState(false);
  const fallbackSrc = useMemo(() => buildPlaceholder(alt), [alt]);

  return (
    <img
      src={hasError || !src ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
