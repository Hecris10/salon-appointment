import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT,
} from "../server/graphql";
import { Appointment } from "../types";

export const useAppointments = () => {
  const { loading, error, data, refetch } = useQuery<{
    getAppointments: Appointment[];
  }>(GET_APPOINTMENTS, {
    fetchPolicy: "cache-and-network",
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

  return {
    loading,
    error,
    data,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
};
