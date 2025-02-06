"use client";

import { FetchResult } from "@apollo/client";
import { motion } from "framer-motion";
import { Appointment, NewAppointment } from "../../types";
import AppointmentModal from "../modals/appointment/AddAppointmentModal";

export default function NewAppointmentButton({
  onClose,
  onOpen,
  isOpen,
  addAppointment,
}: {
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  addAppointment: (
    appointment: NewAppointment,
  ) => Promise<FetchResult<Appointment>>;
}) {
  return (
    <>
      <motion.button
        onClick={onOpen}
        className="bg-purple-600 w-auto text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add New Appointment
      </motion.button>
      <AppointmentModal
        addAppointment={addAppointment}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
