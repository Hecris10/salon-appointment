export interface Salon {
  id: string;
  name: string;
  location: string;
  services: Service[];
}

export type NewSalon = Omit<Salon, "id" | "services">;

export interface Service {
  id: string;
  salonId: string;
  name: string;
  price: number;
}

export type NewService = Omit<Service, "id" | "salonId">;

export interface Appointment {
  id: string;
  salonId: string;
  customerName: string;
  serviceId: string;
  appointmentTime: string;
  salon: Salon;
  service: Service;
}

export type NewAppointment = Omit<Appointment, "id" | "salon" | "service">;

// GraphQL Query Responses
export interface GetSalonsResponse {
  getSalons: Salon[];
}

export interface GetSalonResponse {
  getSalon: Salon;
}

export interface GetServicesResponse {
  getServices: Service[];
}

export interface GetAppointmentsResponse {
  getAppointments: Appointment[];
}

export interface GetAppointmentResponse {
  getAppointment: Appointment;
}

export interface GetTodaysAppointmentsResponse {
  getTodaysAppointments: Appointment[];
}

export interface GetTodaysAppointmentsSummaryResponse {
  getTodaysAppointmentsSummary: {
    numberOfAppointments: number;
    numberOfServices: number;
    expectedRevenue: number;
  };
}

// GraphQL Mutation Responses
export interface AddSalonResponse {
  addSalon: Salon;
}

export interface AddServiceResponse {
  addService: Service;
}

export interface AddAppointmentResponse {
  addAppointment: Appointment;
}

export interface DeleteResponse {
  deleteSalon: boolean;
  deleteService: boolean;
  deleteAppointment: boolean;
}
