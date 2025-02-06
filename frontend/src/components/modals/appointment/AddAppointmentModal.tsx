"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router";
import { useAppointments } from "../../../hooks/useAppointments";
import { useServices } from "../../../hooks/useServices";
import { NewAppointment } from "../../../types";

export default function AddAppointmentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { salonId } = useParams();
  const { addAppointment } = useAppointments();
  const { data: services, loading: loadingServices } = useServices();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    const formData = new FormData(e.target as HTMLFormElement);
    const customerName = formData.get("customerName") as string;
    const serviceId = formData.get("serviceId") as string;
    const appointmentTime = formData.get("time") as string;

    const newAppointment: NewAppointment = {
      customerName,
      serviceId,
      appointmentTime,
      salonId: salonId || "",
    };

    try {
      const res = await addAppointment(newAppointment);

      if (res.errors) {
        throw new Error(res.errors[0]?.message);
      }

      setSubmitMessage({
        type: "success",
        text: "Appointment booked successfully!",
      });
      // Reset form fields
      // Close modal after successful submission
      setTimeout(() => {
        onClose();
        setSubmitMessage(null);
      }, 2000);
    } catch (error: unknown) {
      console.error("Failed to book appointment:", error);
      setSubmitMessage({
        type: "error",
        text: "Failed to book appointment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">
              Book an Appointment
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
                  name="customerName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salon Service
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
                  Appointment Time
                </label>
                <input
                  type="datetime-local"
                  id="time"
                  name="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
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
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </motion.button>
              </div>
            </form>
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-2 rounded ${
                  submitMessage.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitMessage.text}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
