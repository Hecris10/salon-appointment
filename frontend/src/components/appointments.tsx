import { useQuery } from "@apollo/client";
import { GET_APPOINTMENTS } from "../server/graphql";

const Appointments = () => {
  const { loading, error, data } = useQuery(GET_APPOINTMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading appointments</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Appointments</h2>
      <ul>
        {data.getAppointments.map(
          (appointment: {
            id: number;
            customerName: string;
            serviceName: string;
            appointmentTime: Date;
            salon: { name: string };
          }) => (
            <li key={appointment.id} className="border p-2 mt-2">
              {appointment.customerName} - {appointment.serviceName} at{" "}
              {new Date(appointment.appointmentTime).toLocaleString()} (Salon:{" "}
              {appointment.salon.name})
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Appointments;
