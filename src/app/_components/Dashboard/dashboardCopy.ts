import type { Role } from "@/types/session";

export interface DashboardCopy {
  // Ends the title in the accent color: "Te damos la bienvenida, Cliente."
  roleName: string;
  title: string;
  description: string;
  listTitle: string;
  cta: { label: string; href: string };
  empty: { title: string; description: string; action: string };
}

// UI copy for each role's home.
export const DASHBOARD_COPY: Record<Role, DashboardCopy> = {
  client: {
    roleName: "Cliente",
    title: "Te damos la bienvenida,",
    description: "Aquí puedes ver tus citas agendadas y reservar una nueva cuando quieras.",
    listTitle: "Tus citas",
    cta: { label: "Agendar cita", href: "/book" },
    empty: {
      title: "Aún no tienes citas",
      description: "Cuando agendes una cita, aparecerá aquí con su fecha, hora y precio.",
      action: "Agendar mi primera cita",
    },
  },
  business: {
    roleName: "Negocio",
    title: "Te damos la bienvenida,",
    description: "Aquí puedes ver las citas que tus clientes agendaron en tu negocio.",
    listTitle: "Citas agendadas",
    cta: { label: "Registrar mi negocio", href: "/register" },
    empty: {
      title: "Aún no hay citas",
      description:
        "Cuando tus clientes reserven, verás aquí cada cita con su servicio, horario y staff.",
      action: "Registrar mi negocio",
    },
  },
};
