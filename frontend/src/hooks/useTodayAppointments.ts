import { useQuery } from "@apollo/client";
import { GET_TODAYS_APPOINTMENTS } from "../server/graphql";
import { GetTodaysAppointmentsResponse } from "../types";

export const useTodayAppointments = () => {
  const { data, loading, error } = useQuery<GetTodaysAppointmentsResponse>(
    GET_TODAYS_APPOINTMENTS,
  );

  return { data: data?.getTodaysAppointments, loading, error };
};
