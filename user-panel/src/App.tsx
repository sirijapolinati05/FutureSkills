import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { DashboardLayout } from './components/DashboardLayout';
import { UserDashboard } from './pages/dashboard/UserDashboard';
import { MyProfile } from './pages/dashboard/MyProfile';
import { AffiliateLink } from './pages/dashboard/AffiliateLink';
import { MyCourses } from './pages/dashboard/MyCourses';
import { Upgrade } from './pages/dashboard/Upgrade';
import { Leaderboard } from './pages/dashboard/Leaderboard';
import { EarningTarget } from './pages/dashboard/EarningTarget';
import { MyTeam } from './pages/dashboard/MyTeam';
import { SalesReport } from './pages/dashboard/reports/SalesReport';
import { PassiveEarnings } from './pages/dashboard/reports/PassiveEarnings';
import { Training } from './pages/dashboard/Training';
import { Webinars } from './pages/dashboard/Webinars';
import { LiveOffers } from './pages/dashboard/LiveOffers';
import { Freelancing } from './pages/dashboard/Freelancing';
import { CommunityLinks } from './pages/dashboard/CommunityLinks';

// Guard for protected routes
const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-sans)' }}>
        Loading session...
      </div>
    );
  }

  if (!user) {
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardRoute><UserDashboard /></DashboardRoute>} />
          <Route path="/profile" element={<DashboardRoute><MyProfile /></DashboardRoute>} />
          <Route path="/affiliate" element={<DashboardRoute><AffiliateLink /></DashboardRoute>} />
          <Route path="/courses" element={<DashboardRoute><MyCourses /></DashboardRoute>} />
          <Route path="/upgrade" element={<DashboardRoute><Upgrade /></DashboardRoute>} />
          <Route path="/leaderboard" element={<DashboardRoute><Leaderboard /></DashboardRoute>} />
          <Route path="/earning-target" element={<DashboardRoute><EarningTarget /></DashboardRoute>} />
          <Route path="/team" element={<DashboardRoute><MyTeam /></DashboardRoute>} />
          <Route path="/reports/sales" element={<DashboardRoute><SalesReport /></DashboardRoute>} />
          <Route path="/reports/passive" element={<DashboardRoute><PassiveEarnings /></DashboardRoute>} />
          <Route path="/training" element={<DashboardRoute><Training /></DashboardRoute>} />
          <Route path="/webinars" element={<DashboardRoute><Webinars /></DashboardRoute>} />
          <Route path="/live-offers" element={<DashboardRoute><LiveOffers /></DashboardRoute>} />
          <Route path="/freelancing" element={<DashboardRoute><Freelancing /></DashboardRoute>} />
          <Route path="/community" element={<DashboardRoute><CommunityLinks /></DashboardRoute>} />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
