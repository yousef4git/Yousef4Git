// The site mark: a Y with a diamond of light in its fork, the same gold
// gradient as the headline sheen. Mirrored as a static asset in app/icon.svg.
export default function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="mark-gold" x1="14" y1="12" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9a96e" />
          <stop offset="0.5" stopColor="#e8d5a4" />
          <stop offset="1" stopColor="#c9a96e" />
        </linearGradient>
      </defs>
      <path
        d="M20 15 32 33M44 15 32 33M32 33v18"
        stroke="url(#mark-gold)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M32 18.3 34.7 21 32 23.7 29.3 21Z" fill="#e8d5a4" />
    </svg>
  );
}
