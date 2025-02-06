import { AnimatePresence, motion } from "framer-motion";
import { Salon } from "../../../types";

interface DeleteSalonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  salon: Salon;
}

export default function DeleteSalonModal({
  isOpen,
  onClose,
  onDelete,
  salon,
}: DeleteSalonModalProps) {
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
              Delete Salon
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the salon "{salon.name}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
