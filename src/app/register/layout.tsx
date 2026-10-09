import RequireRole from "@/components/guards/RequireRole";

export default function RegisterLayout({ children }: LayoutProps<"/register">) {
  return (
    <RequireRole role="business" skeletonTone="neutral">
      {children}
    </RequireRole>
  );
}
