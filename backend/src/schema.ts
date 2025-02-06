import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Salon {
    id: ID!
    name: String!
    location: String!
    services: [Service!]!
  }

  type Service {
    id: ID!
    salonId: String!
    name: String!
    price: Float!
    salon: Salon!
  }

  type Appointment {
    id: ID!
    salonId: String!
    customerName: String!
    serviceId: String!
    appointmentTime: String!
    salon: Salon!
    service: Service!
  }

  type TodaysAppointmentsSummary {
    numberOfAppointments: Int!
    numberOfServices: Int!
    expectedRevenue: Float!
  }

  type Query {
    getSalons: [Salon!]!
    getSalon(id: ID!): Salon

    getServices(salonId: ID!): [Service!]!
    getService(id: ID!): Service

    getAppointments(
      salonId: ID!
      searchTerm: String
      date: String
      service: String
    ): [Appointment!]!
    getAppointment(id: ID!): Appointment

    getTodaysAppointmentsSummary(salonId: ID!): TodaysAppointmentsSummary!
    getTodaysAppointments(salonId: ID!): [Appointment!]!
  }

  type Mutation {
    addSalon(name: String!, location: String!): Salon!
    updateSalon(id: ID!, name: String, location: String): Salon!
    deleteSalon(id: ID!): Boolean!

    addService(salonId: ID!, name: String!, price: Float!): Service!
    updateService(id: ID!, name: String, price: Float): Service!
    deleteService(id: ID!): Boolean!

    addAppointment(
      salonId: String!
      customerName: String!
      serviceId: String!
      appointmentTime: String!
    ): Appointment!
    updateAppointment(
      id: ID!
      customerName: String
      serviceId: String
      appointmentTime: String
    ): Appointment!
    deleteAppointment(id: ID!): Boolean!
  }
`;
