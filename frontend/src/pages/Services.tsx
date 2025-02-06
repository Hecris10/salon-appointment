import ServicesTable from "../components/services/ServicesTable";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const Services = () => {
  useDocumentTitle("Salon System | Services");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Services Management
      </h1>
      <ServicesTable />
    </div>
  );
};
