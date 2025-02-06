import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { SalonsLayout } from "./components/layouts/SalonsLayout";
import { Appointments } from "./pages/Appointment";
import { Dashboard } from "./pages/Dashboard";
import { Salons } from "./pages/Salons";
import { Services } from "./pages/Services";
import client from "./server/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<SalonsLayout />}>
            <Route path="/" element={<Salons />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard/:salonId" element={<Dashboard />} />
            <Route path="/appointments/:salonId" element={<Appointments />} />
            <Route path="/services/:salonId" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
