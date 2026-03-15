import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home        from './pages/Home';
import About       from './pages/About';
import Contact     from './pages/Contact';
import Login       from './pages/Login';
import Admin       from './pages/Admin';

// Protected pages (require login)
import Booking     from './pages/Booking';
import MapPage     from './pages/Map';
import Gallery     from './pages/Gallery';
import Reviews     from './pages/Reviews';
import Rankings    from './pages/Rankings';
import ProfilePage from './pages/ProfilePage';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* ── Public pages ─────────────────────────── */}
            <Route path="/"       element={<Home />} />
            <Route path="/about"  element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login"  element={<Login />} />

            {/* ── Admin (has its own built-in auth) ──── */}
            <Route path="/admin"  element={<Admin />} />

            {/* ── Protected pages (login required) ──── */}
            <Route path="/booking" element={
              <ProtectedRoute><Booking /></ProtectedRoute>
            } />
            <Route path="/map" element={
              <ProtectedRoute><MapPage /></ProtectedRoute>
            } />
            <Route path="/gallery" element={
              <ProtectedRoute><Gallery /></ProtectedRoute>
            } />
            <Route path="/reviews" element={
              <ProtectedRoute><Reviews /></ProtectedRoute>
            } />
            <Route path="/rankings" element={
              <ProtectedRoute><Rankings /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><ProfilePage /></ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
