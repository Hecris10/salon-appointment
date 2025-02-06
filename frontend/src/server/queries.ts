import { gql } from "@apollo/client";

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    getAppointments {
      id
      customerName
      serviceName
      appointmentTime
      salon {
        name
      }
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $salonId: String!
    $customerName: String!
    $serviceName: String!
    $appointmentTime: String!
  ) {
    addAppointment(
      salonId: $salonId
      customerName: $customerName
      serviceName: $serviceName
      appointmentTime: $appointmentTime
    ) {
      id
    }
  }
`;
