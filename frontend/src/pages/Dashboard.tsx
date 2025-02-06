import { useState } from "react";
import { NavLink, useParams } from "react-router";
import NewAppointmentButton from "../components/appointments/NewAppointmentButton";
import UpcomingAppointments from "../components/appointments/UpcomingAppointments";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import { useDashboard } from "../hooks/useDashboard";

export const Dashboard = () => {
  const { salonId } = useParams();
  const [openNewModal, setNewModal] = useState(false);
  const { addAppointment, summary, appointments } = useDashboard();

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Salon Admin Dashboard
      </h1>
      <div className="mb-8">
        <NewAppointmentButton
          onClose={() => setNewModal(false)}
          isOpen={openNewModal}
          onOpen={() => setNewModal(true)}
          addAppointment={addAppointment}
        />
      </div>
      <div className="mb-8">
        <DashboardSummary {...summary} />
      </div>

      <h2 className="text-2xl font- emibold text-gray-700 mb-4">
        Upcoming Appointments
      </h2>
      <UpcomingAppointments {...appointments} />
      <div className="p-2">
        <NavLink
          to={`/appointments/${salonId}`}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          View All Appointments
        </NavLink>
      </div>
    </main>
  );
};
