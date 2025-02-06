import { Search } from "lucide-react";
import { useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useServices } from "../../hooks/useServices";
import { Appointment } from "../../types";
import DeleteAppointmentModal from "../modals/appointment/DeleteAppointmentModal";
import EditAppointmentModal from "../modals/appointment/EditAppointmentModal";
import AppointmentsTable from "./AppointmentsTable";
import NewAppointmentButton from "./NewAppointmentButton";

export default function ManageAppointments() {
  const { data: services, loading: loadingServices } = useServices();
  const [openNewModal, setOpenNewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const {
    data,
    loading,
    error,
    deleteAppointment,
    updateAppointment,
    addAppointment,
  } = useAppointments({ searchTerm, date: dateFilter, service: serviceFilter });

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteAppointment(id);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const table = () => {
    if (error)
      <div className="text-center py-8 text-red-600">{error.message}</div>;
    if (loading)
      return <div className="text-center py-8">Loading appointments...</div>;

    return (
      <AppointmentsTable
        data={data?.getAppointments || []}
        handleDeleteClick={(appointment) => {
          setSelectedAppointment(appointment);
          setDeleteModalOpen(true);
        }}
        handleEditClick={(appointment) => {
          setSelectedAppointment(appointment);
          setEditModalOpen(true);
        }}
      />
    );
  };

  return (
    <>
      <div className="container flex flex-col w-full gap-4">
        <div>
          <NewAppointmentButton
            onClose={() => setOpenNewModal(false)}
            isOpen={openNewModal}
            onOpen={() => setOpenNewModal(true)}
            addAppointment={addAppointment}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            {" "}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
              <div>
                <input
                  type="date"
                  className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
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
                          : "All services"}
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
            </div>
          </div>
          {table()}
        </div>
      </div>

      {selectedAppointment && (
        <>
          <DeleteAppointmentModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={() => handleDeleteConfirm(selectedAppointment.id)}
            appointment={selectedAppointment}
          />
          <EditAppointmentModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={updateAppointment}
            appointment={selectedAppointment}
          />
        </>
      )}
    </>
  );
}
