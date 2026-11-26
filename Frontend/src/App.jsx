import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

// Public layout
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Public pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Programs from "./Pages/Programs";
import Campaigns from "./Pages/Campaigns";
import Events from "./Pages/Events";
import Gallery from "./Pages/Gallery";
import Volunteer from "./Pages/Volunteer";
import Contact from "./Pages/Contact";
import Donate from "./Pages/Donate";

// Admin pages
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminPrograms from "./Pages/admin/AdminPrograms";
import AdminCampaigns from "./Pages/admin/AdminCampaigns";
import AdminEvents from "./Pages/admin/AdminEvents";
import AdminGallery from "./Pages/admin/AdminGallery";
import AdminVolunteers from "./Pages/admin/AdminVolunteers";
import AdminContact from "./Pages/admin/AdminContact";
import AdminDonations from "./Pages/admin/AdminDonations";
import AdminApplications from "./Pages/admin/AdminApplications";
import AdminContent from "./Pages/admin/AdminContent";
import AdminEventRegistrations from "./Pages/admin/AdminEventRegistrations";
import AdminSecurity from "./Pages/admin/AdminSecurity";
import AdminApiLogs from "./Pages/admin/AdminApiLogs";

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ─── Public Routes ─────────────────────────── */}
          <Route
            path="/"
            element={<PublicLayout><Home /></PublicLayout>}
          />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/programs" element={<PublicLayout><Programs /></PublicLayout>} />
          <Route path="/campaigns" element={<PublicLayout><Campaigns /></PublicLayout>} />
          <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/volunteer" element={<PublicLayout><Volunteer /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />

          {/* ─── Admin Routes ──────────────────────────── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
            <Route path="contacts" element={<AdminContact />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="event-registrations" element={<AdminEventRegistrations />} />
            <Route path="security" element={<AdminSecurity />} />
            <Route path="logs" element={<AdminApiLogs />} />
          </Route>

          {/* ─── Fallback ──────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
