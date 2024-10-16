// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout/Layout';
import HomePage from './routes/Home/HomePage';
import GamesPage from './routes/Games/GamePage';
import SupportPage from './routes/Support/SupportPage';
import Footer from './routes/Layout/Footer';

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
