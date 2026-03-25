import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import SearchResults from './components/SearchResults';
import SellProperty from './components/SellProperty';
import BuyProperty from './components/BuyProperty';
import RentProperty from './components/RentProperty';

// Admin
import AdminPanel from './components/admin/AdminPanel';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminBuyers from './components/admin/AdminBuyers';
import AdminSellers from './components/admin/AdminSellers';
import AdminProperties from './components/admin/AdminProperties';
import AdminProfile from './components/admin/AdminProfile';

// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isAdminLoginPage = location.pathname === '/admin/login';

  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const mainStyle = {
    flex: 1,
    marginTop: (isHomePage || isAdminPage) ? 0 : '70px'
  };

  return (
    <div style={appStyle}>
      <ScrollToTop />
      {/* Header only on non-admin pages */}
      {!isAdminPage && !isAdminLoginPage && <Header />}
      
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/sell" element={<SellProperty />} />
          <Route path="/buy" element={<BuyProperty />} />
          <Route path="/rent" element={<RentProperty />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="buyers" element={<AdminBuyers />} />
            <Route path="sellers" element={<AdminSellers />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </main>
      
      {/* Footer only on non-admin pages */}
      {!isAdminPage && !isAdminLoginPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Helmet>
        <title>4PGR Real Estate - Find Your Dream Property</title>
        <meta name="description" content="Buy, Sell, Rent Properties with 4PGR Real Estate" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>
      
      <AppContent />
    </Router>
  );
}

export default App;