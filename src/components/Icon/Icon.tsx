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

/** Every other `<svg>` prop is passed through (`className`, `style`, …). */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /** Which icon, by its kebab-case name: `"arrow-left"`, `"calendar"`, `"store"`, … */
  name: IconName;
  /** Width and height in px. Default `20`. */
  size?: number;
  /**
   * Accessible name, for icons that carry meaning on their own (an icon-only button). Without
   * it the icon is decorative and hidden from screen readers: the usual case, next to text.
   */
  label?: string;
}

/**
 * Stroke icons drawn with `currentColor`, so they take the surrounding text color from the
 * theme.
 *
 * ```tsx
 * <Icon name="arrow-right" />
 * <Icon name="close" label="Cerrar menú" />
 * ```
 *
 * **Adding an icon**: create its file in `./icons` (only the shapes, drawn on a 20×20 grid) and
 * register it in `ICONS` under a kebab-case name.
 *
 * **Styling**: BEM block `icon`, plus `icon--<name>` (e.g. `icon--store`).
 */
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
