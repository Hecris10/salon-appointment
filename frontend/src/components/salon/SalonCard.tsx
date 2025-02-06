import { motion } from "framer-motion";
import { Edit, MapPin, Scissors, Trash2 } from "lucide-react";
import { NavLink } from "react-router";
import { Salon } from "../../types";

interface SalonCardProps {
  salon: Salon;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SalonCard({ salon, onEdit, onDelete }: SalonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {salon.name}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-2" />
          <span>{salon.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Scissors size={16} className="mr-2" />
          <span>{salon.services.join(", ")}</span>
        </div>
        <div className="flex justify-between items-center">
          <NavLink
            to={`/dashboard/${salon.id}`}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Manage Salon
          </NavLink>
          <div>
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800 mr-2"
              aria-label="Edit salon"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete salon"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
