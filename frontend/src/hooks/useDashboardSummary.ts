import { useQuery } from "@apollo/client";
import { GET_TODAYS_APPOINTMENTS_SUMMARY } from "../server/graphql";
import { GetTodaysAppointmentsSummaryResponse } from "../types";

export const useDashboardSummary = () => {
  const { loading, error, data } =
    useQuery<GetTodaysAppointmentsSummaryResponse>(
      GET_TODAYS_APPOINTMENTS_SUMMARY,
      {
        fetchPolicy: "cache-and-network",
      },
    );
  return {
    loading,
    error,
    data: data?.getTodaysAppointmentsSummary,
  };
};
