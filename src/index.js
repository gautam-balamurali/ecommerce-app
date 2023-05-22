import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./core/contexts/products-context/ProductsContext";
import { AuthenticationProvider } from "./core/contexts/authentication-context/AuthenticationContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
