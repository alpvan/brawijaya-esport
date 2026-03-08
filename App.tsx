import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase';
import { useAuthStore } from './src/store/useAuthStore';

// Pages
import { LandingPage } from './src/pages/LandingPage';
import { Login } from './src/pages/Login';
import { AdminDashboard } from './src/pages/AdminDashboard';
import { AdminRoute } from './src/components/AdminRoute';

const App: React.FC = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Safety timeout: if Firebase doesn't respond in 6s, stop loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(timeout);
      setUser(user);
      setLoading(false);
    }, (error) => {
      clearTimeout(timeout);
      console.error('Firebase Auth error:', error);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [setUser, setLoading]);

  return (
    <Router basename="/LandingBuatBEST">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Login Route */}
        <Route path="/alvan/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/alvan" element={<AdminRoute />}>
          <Route index element={<Navigate to="/alvan/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;