import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminApp from './AdminPortal/App';
import AdminLogin from './AdminPortal/AdminLogin';

// Emails allowed to use the admin portal
const ADMIN_EMAILS = [
  'vimukthiubeysekera@gmail.com',
  'admin@yala360.com',
  'vimukthi116119@gmail.com',
];

const Admin: React.FC = () => {
  const { currentUser, loading } = useAuth();

  // While checking auth state, show a spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A059]" />
      </div>
    );
  }

  // If not logged in, or not an admin — show the admin login form
  const isAdmin = currentUser && ADMIN_EMAILS.includes(currentUser.email || '');

  if (!isAdmin) {
    return (
      <div className="pt-[72px] h-screen overflow-hidden">
        <AdminLogin onLoginSuccess={() => {}} />
      </div>
    );
  }

  // Logged in and is an admin — show the portal
  return (
    <div className="pt-[72px] h-screen overflow-hidden">
      <AdminApp />
    </div>
  );
};

export default Admin;
