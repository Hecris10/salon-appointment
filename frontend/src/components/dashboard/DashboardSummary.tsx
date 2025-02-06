import { ApolloError } from "@apollo/client";
import { CalendarDays, DollarSign, Scissors } from "lucide-react";
import { TodaysAppointmentsSummary } from "../../types";

export default function DashboardSummary({
  data,
  loading,
  error,
}: {
  data: TodaysAppointmentsSummary | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {error ? (
        <div>Error loading data</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <CalendarDays size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">
                  Today's Appointments
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {data?.numberOfAppointments || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Scissors size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">
                  Services Offered
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {data?.numberOfServices || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <DollarSign size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">
                  Today's Revenue
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {data?.expectedRevenue || 0}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
