import type { IconName } from "@/components/Icon/Icon";
import type { Role } from "@/types/session";

export interface FlowStep {
  title: string;
  description: string;
}

export interface Audience {
  id: Role;
  tabLabel: string;
  icon: IconName;
  title: string;
  description: string;
  steps: FlowStep[];
  cta: string;
  href: string;
}

// The two ways to use PIK, each with the flow it walks through. Clients come first: they're
// most of PIK's users.
export const AUDIENCES: Audience[] = [
  {
    id: "client",
    tabLabel: "PIK para clientes",
    icon: "calendar",
    title: "Agenda tu próxima cita",
    description:
      "Encuentra el servicio que buscas, elige quién te atiende y reserva el horario que te acomode.",
    steps: [
      { title: "Conoce el negocio", description: "Revisa su perfil y sus servicios." },
      { title: "Elige el servicio", description: "Con duración y precio a la vista." },
      { title: "Elige quién te atiende", description: "Escoge a alguien del staff." },
      { title: "Escoge fecha y hora", description: "Solo verás los horarios libres." },
      { title: "Confirma tu cita", description: "Revisa el resumen y listo." },
    ],
    cta: "Agendar cita",
    href: "/book",
  },
  {
    id: "business",
    tabLabel: "PIK para profesionales",
    icon: "store",
    title: "Registra tu negocio",
    description: "Da de alta tu salón, barbería o spa y empieza a recibir reservas.",
    steps: [
      { title: "Datos del negocio", description: "Nombre, categoría y teléfono." },
      { title: "Ubicación y horario", description: "Dónde estás y cuándo atiendes." },
      { title: "Staff", description: "Quién atiende y en qué puesto." },
      { title: "Confirma", description: "Revisa el resumen y publica tu negocio." },
    ],
    cta: "Comenzar registro",
    href: "/register",
  },
];
