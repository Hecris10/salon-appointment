import { Plus } from "lucide-react";
import { useState } from "react";
import { useSalons } from "../../hooks/useSalons";
import type { NewSalon, Salon } from "../../types";
import AddSalonModal from "../modals/salon/AddSalonModal";
import DeleteSalonModal from "../modals/salon/DeleteSalonModal";
import EditSalonModal from "../modals/salon/EditSalonModal";
import SalonCard from "./SalonCard";

export default function SalonList() {
  const { loading, error, data, addSalon, updateSalon, deleteSalon } =
    useSalons();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  const handleAddSalon = async (newSalon: NewSalon) => {
    try {
      await addSalon({
        variables: { ...newSalon },
      });
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding salon: ", error);
    }
  };

  const handleEditSalon = async (updatedSalon: Salon) => {
    try {
      await updateSalon({
        variables: {
          id: updatedSalon.id,
          name: updatedSalon.name,
          location: updatedSalon.location,
        },
      });
      setEditModalOpen(false);
      console.log("Updated salon with id: ", updatedSalon.id);
    } catch (error) {
      console.error("Error updating salon: ", error);
    }
  };

  const handleDeleteSalon = async (id: string) => {
    try {
      await deleteSalon({ variables: { id } });
      console.log("Deleted salon with id: ", id);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting salon: ", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading salons...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">{error?.message}</div>
    );
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
        {data?.getSalons.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No salons found. Please add a new salon.
          </div>
        )}
        {data?.getSalons.map((salon) => (
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
            onDelete={() =>
              selectedSalon && handleDeleteSalon(selectedSalon.id)
            }
            salon={selectedSalon}
          />
        </>
      )}
    </div>
  );
}
