import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./context/authContext.jsx";
import GlobalProvider from "./context/globalContext.jsx";
import "./index.css";
import UserProvider from "./context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
