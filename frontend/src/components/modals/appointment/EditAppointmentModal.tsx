import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (appointment: any) => void;
  appointment: any;
}

export default function EditAppointmentModal({
  isOpen,
  onClose,
  onUpdate,
  appointment,
}: EditAppointmentModalProps) {
  const [editedAppointment, setEditedAppointment] =
    useState<Appointment>(appointment);

  useEffect(() => {
    setEditedAppointment(appointment);
  }, [appointment]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedAppointment);
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
                  value={editedAppointment.customerName}
                  onChange={handleInputChange}
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
                <input
                  type="text"
                  id="service"
                  name="service"
                  value={editedAppointment.service}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  required
                />
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
                  value={editedAppointment.time}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="stylist"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stylist
                </label>
                <input
                  type="text"
                  id="stylist"
                  name="stylist"
                  value={editedAppointment.stylist}
                  onChange={handleInputChange}
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
