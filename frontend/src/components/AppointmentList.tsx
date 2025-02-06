"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AppointmentList() {
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
          },
          {
            id: 2,
            customerName: "Jane Smith",
            service: "Manicure",
            time: "2023-06-01T11:30",
          },
          {
            id: 3,
            customerName: "Alice Johnson",
            service: "Hair Coloring",
            time: "2023-06-01T14:00",
          },
          {
            id: 4,
            customerName: "Bob Wilson",
            service: "Beard Trim",
            time: "2023-06-01T15:30",
          },
          {
            id: 5,
            customerName: "Emma Brown",
            service: "Facial",
            time: "2023-06-01T16:45",
          },
        ];
        setAppointments(mockAppointments);
        setIsLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to fetch appointments. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-purple-800">
        Upcoming Appointments
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-purple-50 rounded-lg p-4 shadow"
            >
              <p className="font-semibold text-lg">
                {appointment.customerName}
              </p>
              <p className="text-purple-600">{appointment.service}</p>
              <p className="text-sm text-gray-600">
                {new Date(appointment.time).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
