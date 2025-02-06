import { useQuery } from "@apollo/client";
import { GET_TODAYS_APPOINTMENTS } from "../server/graphql";
import { GetTodaysAppointmentsResponse } from "../types";

export const useUpcomingAppointments = () => {
  const { data, loading, error } = useQuery<GetTodaysAppointmentsResponse>(
    GET_TODAYS_APPOINTMENTS,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  return { data: data?.getTodaysAppointments, loading, error };
};
