import RequireRole from "@/components/guards/RequireRole";

export default function BookLayout({ children }: LayoutProps<"/book">) {
  return <RequireRole role="client">{children}</RequireRole>;
}
