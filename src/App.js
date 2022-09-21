import React from "react";
import Home from "./Routes/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { RepositorioUnico } from "./Routes/RepositorioUnico";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/:est" element={<Home />} />
        <Route
          path="/repositorioUnico/:user/:repo"
          element={<RepositorioUnico />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
