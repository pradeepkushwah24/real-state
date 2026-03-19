import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import SearchResults from './components/SearchResults';
import SellProperty from './components/SellProperty';
import AdminPanel from './components/admin/AdminPanel';
import AdminBuyers from './components/admin/AdminBuyers';
import AdminSellers from './components/admin/AdminSellers';
import AdminProperties from './components/admin/AdminProperties';
import AdminDashboard from './components/admin/AdminDashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const mainStyle = {
    flex: 1
  };

  return (
    <Router>
      <div style={appStyle}>
        <Header />
        <main style={mainStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/sell" element={<SellProperty />} />
            <Route path="/admin" element={<AdminPanel />}>
              <Route index element={<AdminDashboard />} />
              <Route path="buyers" element={<AdminBuyers />} />
              <Route path="sellers" element={<AdminSellers />} />
              <Route path="properties" element={<AdminProperties />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;