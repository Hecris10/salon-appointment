import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router";
import { useServices } from "../../../hooks/useServices";
import { Appointment } from "../../../types";

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (appointment: Appointment) => void;
  appointment: Appointment;
}

export default function EditAppointmentModal({
  isOpen,
  onClose,
  onUpdate,
  appointment,
}: EditAppointmentModalProps) {
  const { salonId } = useParams();
  const { data: services, loading: loadingServices } = useServices(
    salonId || "",
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as HTMLFormElement).customerName.value;
    const serviceId = (e.target as HTMLFormElement).serviceId.value;

    const time = (e.target as HTMLFormElement).time.value;

    const updatedAppointment: Appointment = {
      ...appointment,
      customerName: name,
      serviceId,
      appointmentTime: new Date(time).toISOString(),
    };

    onUpdate(updatedAppointment);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Edit Appointment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  defaultValue={appointment.customerName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service
                </label>
                <select
                  name="serviceId"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                >
                  {loadingServices ? (
                    <option value="" disabled>
                      Loading services...
                    </option>
                  ) : (
                    <>
                      <option value="">
                        {services?.length === 0
                          ? "No services available"
                          : "Select a service"}
                      </option>
                      {services?.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  type="datetime-local"
                  id="time"
                  name="time"
                  defaultValue={new Date(appointment.appointmentTime)
                    .toISOString()
                    .slice(0, 16)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
