import type { IconName } from "@/components/Icon/Icon";

export interface LandingAction {
  audience: string;
  title: string;
  description: string;
  steps: string[];
  cta: string;
  href: string;
  icon: IconName;
}

// The two flows of the app, one per kind of user.
export const LANDING_ACTIONS: LandingAction[] = [
  {
    audience: "Para negocios",
    title: "Registra tu negocio",
    description:
      "Da de alta tu salón, barbería, spa o estudio de uñas y empieza a recibir reservas.",
    steps: ["Datos y ubicación", "Horario de atención", "Servicios y staff"],
    cta: "Comenzar registro",
    href: "/register",
    icon: "store",
  },
  {
    audience: "Para clientes",
    title: "Agenda una cita",
    description:
      "Encuentra el servicio que buscas, elige quién te atiende y reserva el horario que te acomode.",
    steps: ["Elige el servicio", "Elige quién te atiende", "Escoge fecha y hora"],
    cta: "Agendar cita",
    href: "/book",
    icon: "calendar",
  },
];
