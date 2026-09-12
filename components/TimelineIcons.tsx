type IconProps = {
  className?: string;
};

export function RingsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="19" cy="27" r="10" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="29" cy="27" r="10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function AperitifIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 10h6l-1 14a4 4 0 0 1-4 4h0a4 4 0 0 1-4-4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M18 28v10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13 38h10" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M29 11h7l-1.2 12.5a3.4 3.4 0 0 1-3.4 3.1h0a3.4 3.4 0 0 1-3.4-3.1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M32.5 26.6v11.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M28 38h9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function MealIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="24" r="6.5" stroke="currentColor" strokeWidth="1" />
      <path d="M10 13v11M10 13c-1.6 0-2.6 1-2.6 2.5S8.4 27 10 27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M38 13v22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M38 13c2 0 3 1.2 3 3.4S40 20 38 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function PartyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="22" r="11" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M13 22h22M24 11v22M16.2 15.2l15.6 13.6M31.8 15.2 16.2 28.8"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.6"
      />
      <path d="M24 33v6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function timelineIconFor(icon: "rings" | "aperitif" | "meal" | "party") {
  switch (icon) {
    case "rings":
      return RingsIcon;
    case "aperitif":
      return AperitifIcon;
    case "meal":
      return MealIcon;
    case "party":
      return PartyIcon;
  }
}
