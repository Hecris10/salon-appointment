import ManageAppointments from "../components/appointments/ManageAppointments";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const Appointments = () => {
  useDocumentTitle("Salon System | Appointments");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Appointments</h1>
      <ManageAppointments />
    </div>
  );
};