"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import PageSkeleton, { type SkeletonTone } from "@/components/feedback/PageSkeleton/PageSkeleton";
import { useHydrated } from "@/hooks/useHydrated";
import { useSession } from "@/hooks/useSession";
import type { Role } from "@/types/session";

// Renders a route only for the role it belongs to. Logged out, or in the other role, the person
// is sent home to pick one. The role lives in localStorage, so until hydration this shows a
// skeleton instead of the page.
export default function RequireRole({
  role,
  skeletonTone,
  children,
}: {
  role: Role;
  skeletonTone?: SkeletonTone;
  children: ReactNode;
}) {
  const hydrated = useHydrated();
  const { role: current } = useSession();
  const router = useRouter();
  const allowed = current === role;

  useEffect(() => {
    if (hydrated && !allowed) router.replace("/");
  }, [hydrated, allowed, router]);

  return hydrated && allowed ? children : <PageSkeleton tone={skeletonTone} />;
}
