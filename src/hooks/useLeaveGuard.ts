"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// While `active`, stops leaving the page so the person can confirm first: clicks on in-app links
// (anywhere on the page: back links, the sidebar, the logo) are held until confirmLeave(), and
// reloading or closing the tab shows the browser's own warning. The browser's back button
// isn't covered.
export function useLeaveGuard(active: boolean) {
  const router = useRouter();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    // Capture phase runs before next/link's handler, which skips navigating when the click's
    // default was prevented.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }
      event.preventDefault();
      setPendingHref(url.pathname + url.search + url.hash);
    };

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // older browsers need it set to show the prompt
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [active]);

  return {
    pendingHref,
    cancelLeave: () => setPendingHref(null),
    confirmLeave: () => {
      if (pendingHref) router.push(pendingHref);
      setPendingHref(null);
    },
  };
}
