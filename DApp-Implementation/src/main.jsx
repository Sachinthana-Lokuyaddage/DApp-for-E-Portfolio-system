import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './Home.jsx';
import ContractAddresses from './ContractAdresses.jsx';
import Navbar from './Navbar.jsx';
import './index.css'; // Main CSS file for global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Dapp" element={<App />} />
        <Route path="/contract-addresses" element={<ContractAddresses />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
