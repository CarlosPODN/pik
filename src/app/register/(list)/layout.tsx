import RequireRole from "@/components/guards/RequireRole";

// The list sits in a violet panel, so it loads with the brand skeleton.
export default function RegisterLayout({ children }: LayoutProps<"/register">) {
  return <RequireRole role="business">{children}</RequireRole>;
}
