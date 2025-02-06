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
    name: String!
    price: Float!
  }

  type Appointment {
    id: ID!
    customerName: String!
    serviceName: String!
    appointmentTime: String!
    salon: Salon!
  }

  type Query {
    getAppointments: [Appointment!]!
  }

  type Mutation {
    addAppointment(
      salonId: String!
      customerName: String!
      serviceName: String!
      appointmentTime: String!
    ): Appointment!
    updateAppointment(
      id: ID!
      customerName: String
      serviceName: String
      appointmentTime: String
    ): Appointment!
    deleteAppointment(id: ID!): Boolean!
  }
`;
