import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Exercise from './pages/Exercise';
import History from './pages/History';
import Login from './pages/Login';
import Meal from './pages/Meal';
import Profile from './pages/Profile';
import Register from './pages/Register';

// Layout component to avoid repetition
const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <>
        <Navbar />
        {children}
      </>
    </PrivateRoute>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateLayout>
                <Dashboard />
              </PrivateLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateLayout>
                <Dashboard />
              </PrivateLayout>
            }
          />
          <Route
            path="/exercise"
            element={
              <PrivateLayout>
                <Exercise />
              </PrivateLayout>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateLayout>
                <History />
              </PrivateLayout>
            }
          />
          <Route
            path="/meal"
            element={
              <PrivateLayout>
                <Meal />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <Profile />
              </PrivateLayout>
            }
          />

          {/* Catch all route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;