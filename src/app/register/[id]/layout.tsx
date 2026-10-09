import RequireRole from "@/components/guards/RequireRole";

// The settings are white cards, so they load with the gray skeleton.
export default function BusinessSettingsLayout({ children }: LayoutProps<"/register/[id]">) {
  return (
    <RequireRole role="business" skeletonTone="neutral">
      {children}
    </RequireRole>
  );
}
