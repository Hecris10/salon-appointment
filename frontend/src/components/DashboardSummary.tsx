import { CalendarDays, DollarSign, Scissors, Users } from "lucide-react";
export default function DashboardSummary() {
  const stats = [
    { title: "Today's Appointments", value: 15, icon: CalendarDays },
    { title: "Total Clients", value: 250, icon: Users },
    { title: "Services Offered", value: 12, icon: Scissors },
    { title: "Today's Revenue", value: "$1,200", icon: DollarSign },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <stat.icon size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 truncate">
                {stat.title}
              </p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
