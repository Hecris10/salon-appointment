import SalonList from "../components/salon/SalonList";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const Salons = () => {
  useDocumentTitle("Salons");

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Salon Management System
      </h1>
      <SalonList />
    </main>
  );
};
