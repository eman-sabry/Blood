import { Routes, Route, Navigate } from "react-router-dom";

/* Public Pages */
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import RegisterDonor from "./pages/donor/RegisterDonor";
import RegisterHospital from "./pages/hospital/RegisterHospital";

/* Protected System */
import ProtectedRoute from "./components/ProtectedRoute";

/* Layouts */
import DonorLayout from "./pages/donor/layout";
import HospitalLayout from "./pages/hospital/layout";
import AdminLayout from "./pages/admin/layout";

/* Pages */
import DonorDashboard from "./pages/donor/DonorDashboard";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/ProfilePage";
import RegisterAdmin from "./pages/Admin/RegisterAdmin";
import Requests from "./pages/donor/Requests";
import About from "./pages/About";
import CreateRequest from "./pages/hospital/CreateRequest";
import StockPage from "./pages/hospital/Stock";
import DonationHistoryPage from "./pages/hospital/DonationHistory";
import NotificationsPage from "./pages/notifications";
import DonationManagement from "./pages/hospital/DonationManagement";
import UsersPage from "./pages/Admin/UsersPage";

import Contact from "./pages/Contact";
function App() {
  return (
    <div className="mt-10 ">
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RoleSelect />} />

        <Route path="/register-donor" element={<RegisterDonor />} />
        <Route path="/register-hospital" element={<RegisterHospital />} />
        <Route path="/request-admin" element={<RegisterAdmin />} />

        {/* ================= DONOR ================= */}
        <Route
          path="/donor"
          element={
            <ProtectedRoute role="donor">
              <DonorLayout />
            </ProtectedRoute>
          }
        >
          {/* default redirect */}
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<DonorDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="requests" element={<Requests />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* ================= HOSPITAL ================= */}
        <Route
          path="/hospital"
          element={
            <ProtectedRoute role="hospital">
              <HospitalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<HospitalDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-request" element={<CreateRequest />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="Donation-History" element={<DonationHistoryPage />} />
          <Route path="Donation-management" element={<DonationManagement />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="users" element={<UsersPage />} />
      
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
