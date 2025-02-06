import { Search } from "lucide-react";
import { useState } from "react";
import { useServices } from "../../hooks/useServices";
import AppointmentsTable from "./AppointmentsTable";
import NewAppointmentButton from "./NewAppointmentButton";

export default function ManageAppointments() {
  const { data: services, loading: loadingServices } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  return (
    <div className="container flex flex-col w-full gap-4">
      <div>
        <NewAppointmentButton />
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
        <AppointmentsTable
          searchTerm={searchTerm}
          dateFilter={dateFilter}
          serviceFilter={serviceFilter}
        />
      </div>
    </div>
  );
}
