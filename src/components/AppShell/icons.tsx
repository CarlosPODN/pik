import type { SVGProps } from "react";

// Stroke icons inherit the text color (currentColor), so they follow the theme.
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.33 4.17h13.34M3.33 10h13.34M3.33 15.83h13.34" />
    </Icon>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5 5l10 10M15 5L5 15" />
    </Icon>
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.75 7.31v7.23a2.55 2.55 0 0 0 2.55 2.56h7.4a2.55 2.55 0 0 0 2.55-2.56V7.31" />
      <path d="M17.5 8.3l-6.27-4.97a2 2 0 0 0-2.46 0L2.5 8.3" />
      <path d="M8.04 17.1v-3.1c0-.67 0-1 .12-1.26a1.3 1.3 0 0 1 .58-.58c.26-.13.6-.13 1.26-.13s1 0 1.26.13c.25.12.46.33.58.58.12.26.12.6.12 1.26v3.1" />
    </Icon>
  );
}

export function StoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3 8.5v7a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-7" />
      <path d="M2.5 5.5L4 3h12l1.5 2.5a2.5 2.5 0 0 1-5 .5 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5-.5z" />
      <path d="M8 17v-4h4v4" />
    </Icon>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="14" height="13" rx="2" />
      <path d="M3 8h14M7 2.5v3M13 2.5v3M7 11.5h2M11 11.5h2M7 14h2" />
    </Icon>
  );
}
