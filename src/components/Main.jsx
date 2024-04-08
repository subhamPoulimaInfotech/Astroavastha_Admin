import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Admin from "../routes/admin";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from "../redux/store";
import Auth from "../routes/auth";

export default function Main() {
  return (
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            {/* <Auth /> */}
            <Admin />
          </Provider>
        </PersistGate>
      </BrowserRouter>
  );
}
