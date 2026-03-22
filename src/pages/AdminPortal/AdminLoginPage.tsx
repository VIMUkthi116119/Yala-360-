import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';

/**
 * AdminLoginPage — a fully standalone page (outside public Layout).
 * • If the user is already a verified admin, redirect straight to /admin.
 * • Otherwise show the AdminLogin form.
 * • On successful login the AdminAuthContext auto-updates → we navigate to /admin.
 */
const AdminLoginPage: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  // If already verified, skip login and go straight to portal
  useEffect(() => {
    if (isAdmin === true) {
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, navigate]);

  // Still loading auth check — show nothing (ProtectedAdminRoute handles spinner)
  if (isAdmin === null) return null;

  return (
    <div className="h-screen overflow-hidden">
      <AdminLogin
        onLoginSuccess={() => {
          // AdminAuthContext will auto-detect the new admin login via onAuthStateChanged.
          // Navigate immediately; the context will populate isAdmin in the background.
          navigate('/admin', { replace: true });
        }}
      />
    </div>
  );
};

export default AdminLoginPage;
