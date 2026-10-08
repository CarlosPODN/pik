"use client";

import clsx from "clsx";
import { useRef, type KeyboardEvent } from "react";
import type { Audience } from "../../audiences";
import { AudienceSwitchWrapper } from "./AudienceSwitch.styles";

// Tabs that switch between the client and business views (WAI-ARIA tabs pattern: arrow keys,
// Home and End move between tabs, and only the selected tab is in the tab order).
export default function AudienceSwitch({
  audiences,
  selectedId,
  onSelect,
  tabId,
  panelId,
}: {
  audiences: Audience[];
  selectedId: Audience["id"];
  onSelect: (id: Audience["id"]) => void;
  tabId: (id: Audience["id"]) => string;
  panelId: string;
}) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = audiences.findIndex((audience) => audience.id === selectedId);
    const last = audiences.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(audiences[next].id);
    tabsRef.current[next]?.focus();
  };

  return (
    <AudienceSwitchWrapper
      className="audience-switch"
      role="tablist"
      aria-label="¿Cómo quieres usar PIK?"
      onKeyDown={onKeyDown}
    >
      {audiences.map((audience, index) => {
        const selected = audience.id === selectedId;
        return (
          <button
            key={audience.id}
            ref={(element) => {
              tabsRef.current[index] = element;
            }}
            type="button"
            role="tab"
            id={tabId(audience.id)}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            className={clsx("audience-switch__tab", {
              "audience-switch__tab--selected": selected,
            })}
            onClick={() => onSelect(audience.id)}
          >
            {audience.tabLabel}
          </button>
        );
      })}
    </AudienceSwitchWrapper>
  );
}
