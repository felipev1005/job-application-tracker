import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ApplicationsProvider } from "./context/ApplicationsContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ApplicationsProvider>
        <App />
      </ApplicationsProvider>
    </AuthProvider>
  </BrowserRouter>
);