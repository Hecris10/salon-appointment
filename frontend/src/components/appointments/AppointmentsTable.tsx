import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { Appointment } from "../../types";
import { formatDate } from "../../utilts/time";
import DeleteAppointmentModal from "../modals/appointment/DeleteAppointmentModal";
import EditAppointmentModal from "../modals/appointment/EditAppointmentModal";

export default function AppointmentsTable({
  searchTerm,
  serviceFilter,
  dateFilter,
}: {
  searchTerm: string;
  dateFilter: string;
  serviceFilter: string;
}) {
  const { data, loading, error, deleteAppointment, updateAppointment } =
    useAppointments({ searchTerm, date: dateFilter, service: serviceFilter });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleDeleteClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (appointmentId: string) => {
    await deleteAppointment(appointmentId);
    setDeleteModalOpen(false);
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };



  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error.message}</div>;
  }

  return (
    <>
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

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {!data || data?.getAppointments.length === 0 ? (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap" colSpan={4}>
                No appointments found.
              </td>
            </tr>
          ) : (
            data?.getAppointments.map((appointment) => (
              <motion.tr
                key={appointment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(appointment.appointmentTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                    onClick={() => handleEditClick(appointment)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteClick(appointment)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
