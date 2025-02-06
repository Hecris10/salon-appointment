import DashboardSummary from "../components/DashboardSummary";
import NewAppointmentButton from "../components/NewAppointmentButton";
import UpcomingAppointments from "../components/UpcomingAppointments";

export const MainPage = () => {
  return (
    <main className="flex flex-col gap-4 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Salon Admin Dashboard
      </h1>
      <div>
        <NewAppointmentButton />
      </div>
      <DashboardSummary />
      <UpcomingAppointments />
    </main>
  );
};
