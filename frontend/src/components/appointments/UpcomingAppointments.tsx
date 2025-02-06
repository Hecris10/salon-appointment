import { motion } from "framer-motion";

import { Calendar, Clock, User } from "lucide-react";
import { useTodayAppointments } from "../../hooks/useTodayAppointments";

export default function UpcomingAppointments() {
  const { data, loading, error } = useTodayAppointments();

  console.log({ data });

  if (loading) {
    return (
      <div className="text-center py-8">Loading upcoming appointments...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        There was an error loading the appointments. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data?.length === 0 || !data ? (
        <div className="text-center py-8 text-gray-600">
          No appointments scheduled for today.
        </div>
      ) : (
        data?.map((appointment) => (
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
                {appointment.serviceName}
              </h3>
            </div>
            <div className="flex items-center mb-2">
              <User className="text-gray-400 mr-2" size={16} />
              <p className="text-gray-600">{appointment.customerName}</p>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="text-gray-400 mr-2" size={16} />
              <p className="text-gray-600">
                {new Date(appointment.appointmentTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
