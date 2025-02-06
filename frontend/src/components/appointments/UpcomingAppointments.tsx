import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Calendar, Clock, User } from "lucide-react";

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Simulating API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockAppointments: any[] = [
          {
            id: 1,
            customerName: "John Doe",
            service: "Haircut",
            time: "2023-06-01T10:00",
            stylist: "Emma Smith",
          },
          {
            id: 2,
            customerName: "Jane Smith",
            service: "Manicure",
            time: "2023-06-01T11:30",
            stylist: "Michael Johnson",
          },
          {
            id: 3,
            customerName: "Alice Johnson",
            service: "Hair Coloring",
            time: "2023-06-01T14:00",
            stylist: "Emma Smith",
          },
          {
            id: 4,
            customerName: "Bob Wilson",
            service: "Beard Trim",
            time: "2023-06-01T15:30",
            stylist: "David Brown",
          },
        ];
        setAppointments(mockAppointments);
        setIsLoading(false);
      } catch (err: any) {
        setError("Failed to fetch appointments. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">Loading upcoming appointments...</div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {appointments.map((appointment) => (
        <motion.div
          key={appointment.id}
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <Calendar className="text-purple-500 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              {appointment.service}
            </h3>
          </div>
          <div className="flex items-center mb-2">
            <User className="text-gray-400 mr-2" size={16} />
            <p className="text-gray-600">{appointment.customerName}</p>
          </div>
          <div className="flex items-center mb-2">
            <Clock className="text-gray-400 mr-2" size={16} />
            <p className="text-gray-600">
              {new Date(appointment.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Stylist: {appointment.stylist}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
