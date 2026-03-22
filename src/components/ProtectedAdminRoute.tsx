import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Shield } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

/**
 * ProtectedAdminRoute — wraps admin-only pages.
 *
 *  • isAdmin === null  → still verifying (show spinner)
 *  • isAdmin === false → not an admin, redirect to /admin-login
 *  • isAdmin === true  → verified admin, render children
 */
const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const { isAdmin } = useAdminAuth();

  // Still checking Firestore — show a full-screen loading state
  if (isAdmin === null) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] gap-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
          style={{ background: 'linear-gradient(135deg, #d5b991, #a07c3e)' }}
        >
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div
          className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: 'rgba(213,185,145,0.3)', borderTopColor: '#d5b991' }}
        />
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">
          Verifying Access…
        </p>
      </div>
    );
  }

  // Not a verified admin — redirect to admin login
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  // Verified admin — render the protected content
  return <>{children}</>;
};

export default ProtectedAdminRoute;
