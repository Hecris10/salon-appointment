export interface Salon {
  id: string;
  name: string;
  location: string;
  services: Service[];
}

export interface Service {
  id: string;
  salonId: string;
  name: string;
  price: number;
}

export interface Appointment {
  id: string;
  salonId: string;
  customerName: string;
  serviceName: string;
  appointmentTime: string;
  salon: Salon;
}
