"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AppointmentModal from "../modals/appointment/AppointmentModal";

export default function NewAppointmentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-600 w-auto text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add New Appointment
      </motion.button>
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
