// A booked appointment. Times are ISO 8601 strings so they survive JSON storage; prices are in
// whole pesos (MXN).
export interface Appointment {
  id: string;
  businessId: string;
  businessName: string;
  serviceName: string;
  staffName: string;
  clientName: string;
  startsAt: string;
  durationMinutes: number;
  price: number;
}
