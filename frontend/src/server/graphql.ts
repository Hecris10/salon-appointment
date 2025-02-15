import { gql } from "@apollo/client";

// ---- SALONS ----
export const GET_SALONS = gql`
  query GetSalons {
    getSalons {
      id
      name
      location
      services {
        id
        name
        price
      }
    }
  }
`;

export const GET_SALON = gql`
  query GetSalon($id: ID!) {
    getSalon(id: $id) {
      id
      name
      location
      services {
        id
        name
        price
      }
    }
  }
`;

export const ADD_SALON = gql`
  mutation AddSalon($name: String!, $location: String!) {
    addSalon(name: $name, location: $location) {
      id
      name
      location
    }
  }
`;

export const UPDATE_SALON = gql`
  mutation UpdateSalon($id: ID!, $name: String, $location: String) {
    updateSalon(id: $id, name: $name, location: $location) {
      id
      name
      location
    }
  }
`;

export const DELETE_SALON = gql`
  mutation DeleteSalon($id: ID!) {
    deleteSalon(id: $id)
  }
`;

// ---- SERVICES ----
export const GET_SERVICES = gql`
  query GetServices($salonId: ID!) {
    getServices(salonId: $salonId) {
      id
      name
      price
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation AddService($salonId: ID!, $name: String!, $price: Float!) {
    addService(salonId: $salonId, name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $name: String, $price: Float) {
    updateService(id: $id, name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;

// ---- APPOINTMENTS ----
export const GET_APPOINTMENTS = gql`
  query GetAppointments(
    $salonId: ID!
    $searchTerm: String
    $date: String
    $service: String
  ) {
    getAppointments(
      salonId: $salonId
      searchTerm: $searchTerm
      date: $date
      service: $service
    ) {
      id
      customerName
      serviceId
      appointmentTime
      salon {
        id
        name
        location
      }
      service {
        id
        name
      }
    }
  }
`;

export const GET_APPOINTMENT = gql`
  query GetAppointment($id: ID!) {
    getAppointment(id: $id) {
      id
      customerName
      serviceId
      appointmentTime
      salon {
        id
        name
        location
      }
      service {
        id
        name
      }
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $salonId: String!
    $customerName: String!
    $serviceId: String!
    $appointmentTime: String!
  ) {
    addAppointment(
      salonId: $salonId
      customerName: $customerName
      serviceId: $serviceId
      appointmentTime: $appointmentTime
    ) {
      id
      customerName
      serviceId
      appointmentTime
      salon {
        id
        name
      }
      service {
        id
        name
      }
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $id: ID!
    $customerName: String
    $serviceId: String
    $appointmentTime: String
  ) {
    updateAppointment(
      id: $id
      customerName: $customerName
      serviceId: $serviceId
      appointmentTime: $appointmentTime
    ) {
      id
      customerName
      serviceId
      appointmentTime
      salon {
        id
        name
      }
      service {
        id
        name
      }
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: ID!) {
    deleteAppointment(id: $id)
  }
`;

export const GET_TODAYS_APPOINTMENTS_SUMMARY = gql`
  query GetTodaysAppointmentsSummary($salonId: ID!) {
    getTodaysAppointmentsSummary(salonId: $salonId) {
      numberOfAppointments
      numberOfServices
      expectedRevenue
    }
  }
`;

export const GET_TODAYS_APPOINTMENTS = gql`
  query GetTodaysAppointments($salonId: ID!) {
    getTodaysAppointments(salonId: $salonId) {
      id
      customerName
      serviceId
      appointmentTime
      salon {
        id
        name
        location
      }
      service {
        id
        name
      }
    }
  }
`;
