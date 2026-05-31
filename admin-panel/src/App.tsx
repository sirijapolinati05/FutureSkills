import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { DashboardLayout } from './components/DashboardLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { KycApprovals } from './pages/admin/KycApprovals';
import { CoursesManager } from './pages/admin/CoursesManager';
import { LiveOffersManager } from './pages/admin/LiveOffersManager';
import { TrainingManager } from './pages/admin/TrainingManager';
import { WebinarsManager } from './pages/admin/WebinarsManager';
import { PackagesManager } from './pages/admin/PackagesManager';
import { TargetsManager } from './pages/admin/TargetsManager';
import { CommunityLinksManager } from './pages/admin/CommunityLinksManager';
import { FreelancingManager } from './pages/admin/FreelancingManager';
import { ReportsManager } from './pages/admin/ReportsManager';

// Guard for protected admin routes
const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        Authenticating Admin...
      </div>
    );
  }

  if (!admin || admin.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Route wrapper that adds DashboardLayout shell
const DashboardRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RouteGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </RouteGuard>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/" element={<DashboardRoute><AdminDashboard /></DashboardRoute>} />
          <Route path="/users" element={<DashboardRoute><UserManagement /></DashboardRoute>} />
          <Route path="/kyc" element={<DashboardRoute><KycApprovals /></DashboardRoute>} />
          <Route path="/courses" element={<DashboardRoute><CoursesManager /></DashboardRoute>} />
          <Route path="/packages" element={<DashboardRoute><PackagesManager /></DashboardRoute>} />
          <Route path="/earning-target" element={<DashboardRoute><TargetsManager /></DashboardRoute>} />
          <Route path="/live-offers" element={<DashboardRoute><LiveOffersManager /></DashboardRoute>} />
          <Route path="/training" element={<DashboardRoute><TrainingManager /></DashboardRoute>} />
          <Route path="/webinars" element={<DashboardRoute><WebinarsManager /></DashboardRoute>} />
          <Route path="/community" element={<DashboardRoute><CommunityLinksManager /></DashboardRoute>} />
          <Route path="/freelancing" element={<DashboardRoute><FreelancingManager /></DashboardRoute>} />
          <Route path="/reports" element={<DashboardRoute><ReportsManager /></DashboardRoute>} />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
