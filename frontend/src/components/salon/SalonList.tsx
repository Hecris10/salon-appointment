import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { Salon } from "../../types";
import AddSalonModal from "../modals/salon/AddSalonModal";
import DeleteSalonModal from "../modals/salon/DeleteSalonModal";
import EditSalonModal from "../modals/salon/EditSalonModal";
import SalonCard from "./SalonCard";

export default function SalonList() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        // Simulating API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockSalons: Salon[] = [
          {
            id: 1,
            name: "Glamour Salon",
            location: "123 Main St, City A",
            services: ["Haircut", "Coloring", "Styling"],
          },
          {
            id: 2,
            name: "Chic Styles",
            location: "456 Elm St, City B",
            services: ["Manicure", "Pedicure", "Facial"],
          },
          {
            id: 3,
            name: "Elegant Cuts",
            location: "789 Oak St, City C",
            services: ["Haircut", "Beard Trim", "Shave"],
          },
        ];
        setSalons(mockSalons);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch salons. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const handleAddSalon = (newSalon: Omit<Salon, "id">) => {
    const salonWithId = { ...newSalon, id: salons.length + 1 };
    setSalons([...salons, salonWithId]);
    setAddModalOpen(false);
  };

  const handleEditSalon = (updatedSalon: Salon) => {
    setSalons(
      salons.map((salon) =>
        salon.id === updatedSalon.id ? updatedSalon : salon
      )
    );
    setEditModalOpen(false);
  };

  const handleDeleteSalon = (id: number) => {
    setSalons(salons.filter((salon) => salon.id !== id));
    setDeleteModalOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading salons...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Our Salons</h2>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-sm flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add New Salon
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons.map((salon) => (
          <SalonCard
            key={salon.id}
            salon={salon}
            onEdit={() => {
              setSelectedSalon(salon);
              setEditModalOpen(true);
            }}
            onDelete={() => {
              setSelectedSalon(salon);
              setDeleteModalOpen(true);
            }}
          />
        ))}
      </div>
      <AddSalonModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddSalon}
      />
      {selectedSalon && (
        <>
          <EditSalonModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={handleEditSalon}
            salon={selectedSalon}
          />
          <DeleteSalonModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={() => handleDeleteSalon(selectedSalon.id)}
            salon={selectedSalon}
          />
        </>
      )}
    </div>
  );
}
