import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout";
import { AppointmentsPage } from "./pages/AppointmentPages";
import { MainPage } from "./pages/MainPage";
import client from "./server/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
