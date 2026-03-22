import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Pages
import Home        from './pages/Home';
import About       from './pages/About';
import Contact     from './pages/Contact';
import Login       from './pages/Login';
import Admin       from './pages/Admin';
import AdminLoginPage from './pages/AdminPortal/AdminLoginPage';

// Protected pages (require user login)
import Booking     from './pages/Booking';
import MapPage     from './pages/Map';
import Gallery     from './pages/Gallery';
import Reviews     from './pages/Reviews';
import Rankings    from './pages/Rankings';
import ProfilePage from './pages/ProfilePage';

import { AuthProvider }      from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { ThemeProvider }     from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>

              {/* ── Admin routes — completely outside the public Layout ── */}
              {/* /admin-login: dedicated admin login page (no public navbar) */}
              <Route path="/admin-login" element={<AdminLoginPage />} />

              {/* /admin: protected admin portal — redirects to /admin-login if not verified */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <Admin />
                  </ProtectedAdminRoute>
                }
              />

              {/* ── Public & user-protected routes — wrapped in public Layout ── */}
              <Route
                path="/*"
                element={
                  <Layout>
                    <Routes>
                      {/* Public pages */}
                      <Route path="/"        element={<Home />} />
                      <Route path="/about"   element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login"   element={<Login />} />

                      {/* Protected pages (require user login) */}
                      <Route path="/booking"  element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                      <Route path="/map"      element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
                      <Route path="/gallery"  element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
                      <Route path="/reviews"  element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
                      <Route path="/rankings" element={<ProtectedRoute><Rankings /></ProtectedRoute>} />
                      <Route path="/profile"  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    </Routes>
                  </Layout>
                }
              />

            </Routes>
          </Router>
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
