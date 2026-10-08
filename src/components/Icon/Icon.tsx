import clsx from "clsx";
import type { SVGProps } from "react";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import Calendar from "./icons/Calendar";
import Check from "./icons/Check";
import Close from "./icons/Close";
import Home from "./icons/Home";
import Menu from "./icons/Menu";
import Plus from "./icons/Plus";
import Store from "./icons/Store";
import Trash from "./icons/Trash";

// Every available icon. To add one: create its file in ./icons (the shapes only,
// drawn on a 20×20 grid) and register it here under a kebab-case name.
const ICONS = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  calendar: Calendar,
  check: Check,
  close: Close,
  home: Home,
  menu: Menu,
  plus: Plus,
  store: Store,
  trash: Trash,
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  name: IconName;
  size?: number;
  // Accessible name, for icons that carry meaning on their own. Without it the icon is
  // decorative and hidden from screen readers (the usual case: next to visible text).
  label?: string;
}

// Stroke icons drawn with currentColor, so they take the surrounding text color from the theme.
export default function Icon({ name, size = 20, label, className, ...props }: IconProps) {
  const Shapes = ICONS[name];

  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className={clsx("icon", `icon--${name}`, className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...props}
    >
      <Shapes />
    </svg>
  );
}
