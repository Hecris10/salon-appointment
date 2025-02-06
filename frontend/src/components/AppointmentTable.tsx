import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Simulating API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockAppointments: Appointment[] = [
          {
            id: 1,
            customerName: "John Doe",
            service: "Haircut",
            time: "2023-06-01T10:00",
            stylist: "Emma Smith",
          },
          {
            id: 2,
            customerName: "Jane Smith",
            service: "Manicure",
            time: "2023-06-01T11:30",
            stylist: "Michael Johnson",
          },
          {
            id: 3,
            customerName: "Alice Johnson",
            service: "Hair Coloring",
            time: "2023-06-01T14:00",
            stylist: "Emma Smith",
          },
          {
            id: 4,
            customerName: "Bob Wilson",
            service: "Beard Trim",
            time: "2023-06-02T15:30",
            stylist: "David Brown",
          },
          {
            id: 5,
            customerName: "Emma Brown",
            service: "Facial",
            time: "2023-06-02T16:45",
            stylist: "Sarah Davis",
          },
          {
            id: 6,
            customerName: "Michael Lee",
            service: "Haircut",
            time: "2023-06-03T09:00",
            stylist: "Emma Smith",
          },
          {
            id: 7,
            customerName: "Olivia Taylor",
            service: "Manicure",
            time: "2023-06-03T10:30",
            stylist: "Michael Johnson",
          },
        ];
        setAppointments(mockAppointments);
        setFilteredAppointments(mockAppointments);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      const matchesSearch =
        appointment.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.stylist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate =
        dateFilter === "" || appointment.time.startsWith(dateFilter);
      const matchesService =
        serviceFilter === "" || appointment.service === serviceFilter;

      return matchesSearch && matchesDate && matchesService;
    });
    setFilteredAppointments(filtered);
  }, [searchTerm, dateFilter, serviceFilter, appointments]);

  const handleDeleteClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
    setDeleteModalOpen(false);
  };

  const handleUpdateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      )
    );
    setEditModalOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  const uniqueServices = Array.from(
    new Set(appointments.map((a) => a.service))
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
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
              <option value="">All Services</option>
              {uniqueServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
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
              Stylist
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
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
                {appointment.service}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(appointment.time).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {appointment.stylist}
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
          ))}
        </tbody>
      </table>
      {selectedAppointment && (
        <>
          <DeleteAppointmentModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={() => handleDeleteAppointment(selectedAppointment.id)}
            appointment={selectedAppointment}
          />
          <EditAppointmentModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={handleUpdateAppointment}
            appointment={selectedAppointment}
          />
        </>
      )}
    </div>
  );
}
