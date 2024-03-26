import React from "react";
import { createRoot } from "react-dom/client"; // Mise à jour de l'importation pour utiliser createRoot
import App from "./App";
import "./styles/index.scss";

// REDUX
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

const container = document.getElementById("root"); // Sélectionner l'élément racine
const root = createRoot(container); // Créer une racine pour l'application

// Utiliser root.render pour monter l'application React
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
