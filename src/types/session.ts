// How the person uses PIK: booking appointments as a client, or running a business.
export type Role = "client" | "business";

// The "logged" state. There is no real auth: it only records which side of PIK the person
// picked, so the app can show the matching navigation and flow.
export interface Session {
  role: Role;
}
