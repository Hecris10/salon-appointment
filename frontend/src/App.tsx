import { ApolloProvider } from "@apollo/client";
import client from "./server/apolloClient";

import "./App.css";
import Appointments from "./components/appointments";

function App() {
  return (
    <ApolloProvider client={client}>
      <Appointments />
    </ApolloProvider>
  );
}

export default App;
