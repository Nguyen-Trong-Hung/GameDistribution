import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout/Layout';
import HomePage from './routes/Home/HomePage';
import GamesPage from './routes/Games/GamePage';
import SupportPage from './routes/Support/SupportPage';
import Footer from './routes/Layout/Footer';
import DistributionPage from './routes/Distribution/DistributionPage';
import UserProfile from './routes/UserProfile/UserProfile';
import { AuthContextProvider } from './context/AuthContext';
import AdminPage from './routes/Admin/AdminPage';
import GameDetailPage from './routes/GameDetail/GameDetailPage';
import AdminLogin from './components/loginForm/AdminLogin';
import Users from './routes/Admin/components/Users';
import Games from './routes/Admin/components/Games';
import GamesApproved from './routes/Admin/components/GamesApproved';
import PrivateRoute from './components/Private/PrivateRoute'; // Import PrivateRoute component

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={<AdminLogin />}
          />
          {/* Bảo vệ các route của admin */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <PrivateRoute requiredRole="admin">
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/games"
            element={
              <PrivateRoute requiredRole="admin">
                <Games />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/games-approved"
            element={
              <PrivateRoute requiredRole="admin">
                <GamesApproved />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Layout />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/game/:slug" element={<GameDetailPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/distribution" element={<DistributionPage />} />
                  {/* Bảo vệ route người dùng */}
                  <Route
                    path="/userprofile"
                    element={
                      <PrivateRoute requiredRole="user">
                        <UserProfile />
                      </PrivateRoute>
                    }
                  />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;