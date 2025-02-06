import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { Appointments } from "./pages/Appointment";
import { Salons } from "./pages/Salons";
import { Services } from "./pages/Services";
import client from "./server/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Salons />} />
            <Route path="/Dashboard" element={<Appointments />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
