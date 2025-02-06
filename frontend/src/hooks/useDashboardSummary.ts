import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_TODAYS_APPOINTMENTS_SUMMARY } from "../server/graphql";
import { GetTodaysAppointmentsSummaryResponse } from "../types";

export const useDashboardSummary = () => {
  const { salonId } = useParams();

  const { loading, error, data } =
    useQuery<GetTodaysAppointmentsSummaryResponse>(
      GET_TODAYS_APPOINTMENTS_SUMMARY,
      {
        variables: { salonId },
        fetchPolicy: "cache-and-network",
      },
    );
  return {
    loading,
    error,
    data: data?.getTodaysAppointmentsSummary,
  };
};
