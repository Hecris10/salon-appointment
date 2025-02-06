import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import {
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT,
} from "../server/graphql";
import { Appointment, NewAppointment } from "../types";

export const useAppointments = (queryParams?: {
  searchTerm?: string;
  date?: string;
  service?: string;
}) => {
  const { salonId } = useParams();
  const { loading, error, data, refetch } = useQuery<{
    getAppointments: Appointment[];
  }>(GET_APPOINTMENTS, {
    variables: {
      searchTerm: queryParams?.searchTerm,
      date: queryParams?.date,
      service: queryParams?.service,
    },
    fetchPolicy: "no-cache",
  });

  const [addAppointment] = useMutation(ADD_APPOINTMENT, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error adding appointment: ", error),
  });

  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error updating appointment: ", error),
  });

  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error deleting appointment: ", error),
  });

  const onAddApointment = async (appointment: NewAppointment) => {
    return await addAppointment({
      variables: {
        salonId: salonId,
        customerName: appointment.customerName,
        appointmentTime: appointment.appointmentTime,
        serviceId: appointment.serviceId,
      },
    });
  };

  const onUpdated = async (appointment: Appointment) => {
    return await updateAppointment({
      variables: {
        id: appointment.id,
        customerName: appointment.customerName,
        appointmentTime: appointment.appointmentTime,
      },
    });
  };

  const onDeleted = async (id: string) => {
    await deleteAppointment({ variables: { id } });
  };
  return {
    loading,
    error,
    data,
    addAppointment: onAddApointment,
    updateAppointment: onUpdated,
    deleteAppointment: onDeleted,
  };
};
