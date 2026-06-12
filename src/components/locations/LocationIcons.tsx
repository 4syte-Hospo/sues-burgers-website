type IconProps = {
  className?: string;
};

export function LocationPinIcon({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function LocationCarIcon({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 14h16l-1.5-5.5a2 2 0 0 0-1.9-1.5H7.4a2 2 0 0 0-1.9 1.5L4 14Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M4 14v3.5a1 1 0 0 0 1 1h1.5M20 14v3.5a1 1 0 0 1-1 1h-1.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="7.5" cy="17.5" r="1.25" fill="currentColor" />
      <circle cx="16.5" cy="17.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function LocationClockIcon({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 8v4.25l2.75 1.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function LocationPhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.2 4.5h2.1c.7 0 1.3.4 1.5 1.1l.7 2.6c.2.7-.1 1.4-.7 1.8l-1.1.9c1.3 2.4 3.3 4.4 5.7 5.7l.9-1.1c.4-.6 1.1-.9 1.8-.7l2.6.7c.7.2 1.2.8 1.2 1.5v2.1c0 .9-.8 1.6-1.7 1.6C10.6 21.5 2.5 13.4 2.5 3.3 2.5 2.4 3.3 1.6 4.2 1.6h3.9c.9 0 1.7.7 1.7 1.6v2.1c0 .7-.4 1.3-1.1 1.5l-2.6.7c-.7.2-1 .9-.6 1.6.8 1.5 2 2.7 3.5 3.5.6.4 1.4.1 1.6-.6l.7-2.6c.2-.7.8-1.1 1.5-1.1h2.1c.9 0 1.7.7 1.7 1.6v3.9c0 .9-.8 1.6-1.7 1.6h-1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
