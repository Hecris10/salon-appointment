import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_TODAYS_APPOINTMENTS } from "../server/graphql";
import { GetTodaysAppointmentsResponse } from "../types";

export const useTodayAppointments = () => {
  const { salonId } = useParams();

  const { data, loading, error } = useQuery<GetTodaysAppointmentsResponse>(
    GET_TODAYS_APPOINTMENTS,
    {
      variables: { salonId },
      fetchPolicy: "no-cache",
    },
  );

  return { data: data?.getTodaysAppointments, loading, error };
};
