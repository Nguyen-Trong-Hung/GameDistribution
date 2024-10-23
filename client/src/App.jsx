// src/App.js
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

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={<AdminLogin />}
          />
          <Route
            path="/dashboard"
            element={<AdminPage />}
          />
          <Route
            path="*"
            element={
              <>
                <Layout />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/game/:id" element={<GameDetailPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/distribution" element={<DistributionPage />} />
                  <Route path="/userprofile" element={<UserProfile />} />
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
