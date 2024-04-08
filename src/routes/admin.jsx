import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/admin/Login";
import ResponsiveDrawer from "../components/Sidebar";
import Dashboard from "../pages/dashboard/Dashboard";
import UserManagement from "../pages/UserManagement";
import ReportManagement from "../pages/ReportManagement";
import NotificationManagement from "../pages/NotificationManagement";
import ProductManagement from "../pages/ProductManagement";
import { COLORS } from "../constants/colors";
import AddProduct from "../pages/ProductManagement/AddProduct";
import EditProduct from "../pages/ProductManagement/EditProduct";
import PrivateRoute from "../components/PrivateRoute";
import AddTranslationForProduct from "../pages/ProductManagement/AddTranslationForProduct";
import SavedDrafts from "../pages/ProductManagement/SavedDrafts";

export default function Admin() {
  const location = useLocation();
  // Check if the current location is the login screen
  const isLoginScreen = location.pathname === "/login";

  return (
    <>
      {/* Render ResponsiveDrawer only if it's not the login screen */}
      {!isLoginScreen && <ResponsiveDrawer />}
      <div style={{ marginLeft: isLoginScreen ? 0 : "17rem" }}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/user-management' element={<PrivateRoute><UserManagement /></PrivateRoute>} />
          <Route path='/report-management' element={<PrivateRoute><ReportManagement /></PrivateRoute>} />
          <Route path='/notification-management' element={<PrivateRoute><NotificationManagement /></PrivateRoute>} />
          <Route path='/product-management' element={<PrivateRoute><ProductManagement /></PrivateRoute>} />
          <Route path='/add-product' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path='/edit-product/:productId' element={<PrivateRoute><EditProduct /></PrivateRoute>} />
          <Route path='/add-translation-product/:productId' element={<PrivateRoute><AddTranslationForProduct /></PrivateRoute>} />
          <Route path='/saved-drafts' element={<PrivateRoute><SavedDrafts /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}
