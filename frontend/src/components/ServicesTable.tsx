import { motion } from "framer-motion";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddServiceModal from "./AddServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import EditServiceModal from "./EditServiceModal";

export default function ServicesTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Simulating API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockServices: Service[] = [
          { id: 1, name: "Haircut", duration: 30, price: 50 },
          { id: 2, name: "Hair Coloring", duration: 120, price: 150 },
          { id: 3, name: "Manicure", duration: 45, price: 35 },
          { id: 4, name: "Pedicure", duration: 60, price: 45 },
          { id: 5, name: "Facial", duration: 60, price: 80 },
        ];
        setServices(mockServices);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch services. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (service: Service) => {
    setSelectedService(service);
    setDeleteModalOpen(true);
  };

  const handleAddService = (newService: Service) => {
    setServices([...services, { ...newService, id: services.length + 1 }]);
    setAddModalOpen(false);
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices(
      services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    setEditModalOpen(false);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
    setDeleteModalOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Services</h2>
        <button
          onClick={handleAddClick}
          className="bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-sm flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add New Service
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration (min)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price ($)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <motion.tr
              key={service.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {service.duration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">${service.price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                  onClick={() => handleEditClick(service)}
                >
                  <Edit size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteClick(service)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <AddServiceModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddService}
      />
      {selectedService && (
        <>
          <EditServiceModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={handleUpdateService}
            service={selectedService}
          />
          <DeleteServiceModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={() => handleDeleteService(selectedService.id)}
            service={selectedService}
          />
        </>
      )}
    </div>
  );
}
