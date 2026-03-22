import React from 'react';
import AdminApp from './AdminPortal/App';

/**
 * Admin — renders the full Admin Portal.
 *
 * Auth is guaranteed by ProtectedAdminRoute in App.tsx.
 * This component no longer needs to handle login or admin verification.
 */
const Admin: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden">
      <AdminApp />
    </div>
  );
};

export default Admin;
