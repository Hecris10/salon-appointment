import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import {
  ADD_APPOINTMENT,
  GET_TODAYS_APPOINTMENTS,
  GET_TODAYS_APPOINTMENTS_SUMMARY,
} from "../server/graphql";
import {
  GetTodaysAppointmentsResponse,
  GetTodaysAppointmentsSummaryResponse,
  NewAppointment,
} from "../types";

export const useDashboard = () => {
  const { salonId } = useParams();

  const {
    data: appointmentsData,
    loading: appointmentsLoading,
    error: appointmentsError,
    refetch: refetchTodaysAppointments,
  } = useQuery<GetTodaysAppointmentsResponse>(GET_TODAYS_APPOINTMENTS, {
    variables: { salonId },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
    refetch: refetchTodaysAppointmentsSummary,
  } = useQuery<GetTodaysAppointmentsSummaryResponse>(
    GET_TODAYS_APPOINTMENTS_SUMMARY,
    {
      variables: { salonId },
      fetchPolicy: "cache-and-network",
    },
  );

  const [addAppointment] = useMutation(ADD_APPOINTMENT, {
    onCompleted: () => {
      refetchTodaysAppointments();
      refetchTodaysAppointmentsSummary();
      console.log("Appointment added successfully");
    },
    onError: (error) => console.error("Error adding appointment: ", error),
  });

  const onAddAppointment = async (appointment: NewAppointment) => {
    return await addAppointment({
      variables: {
        salonId: salonId,
        customerName: appointment.customerName,
        appointmentTime: appointment.appointmentTime,
        serviceId: appointment.serviceId,
      },
    });
  };

  return {
    appointments: {
      data: appointmentsData?.getTodaysAppointments,
      loading: appointmentsLoading,
      error: appointmentsError,
    },
    summary: {
      data: summaryData?.getTodaysAppointmentsSummary,
      loading: summaryLoading,
      error: summaryError,
    },
    addAppointment: onAddAppointment,
  };
};
