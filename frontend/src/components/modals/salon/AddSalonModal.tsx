"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
interface AddSalonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (salon: Omit<Salon, "id">) => void;
}

export default function AddSalonModal({
  isOpen,
  onClose,
  onAdd,
}: AddSalonModalProps) {
  const [newSalon, setNewSalon] = useState<Omit<Salon, "id">>({
    name: "",
    location: "",
    services: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSalon((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const services = e.target.value.split(",").map((service) => service.trim());
    setNewSalon((prev) => ({ ...prev, services }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newSalon);
    setNewSalon({ name: "", location: "", services: [] });
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
              Add New Salon
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salon Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newSalon.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newSalon.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="services"
                  className="block text-sm font-medium text-gray-700"
                >
                  Services (comma-separated)
                </label>
                <input
                  type="text"
                  id="services"
                  name="services"
                  value={newSalon.services.join(", ")}
                  onChange={handleServicesChange}
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
                  Add Salon
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
