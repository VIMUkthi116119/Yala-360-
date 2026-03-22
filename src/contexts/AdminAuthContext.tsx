/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { isAdminInFirestore } from '../services/adminService';

interface AdminAuthContextType {
  /** null = still checking, false = not admin, true = verified admin */
  isAdmin: boolean | null;
  adminEmail: string | null;
  adminLogout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: null,
  adminEmail: null,
  adminLogout: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // null = loading
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    // Listen to Firebase auth state — re-verify admin on every change
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        const verified = await isAdminInFirestore(user.email);
        if (verified) {
          setIsAdmin(true);
          setAdminEmail(user.email);
        } else {
          setIsAdmin(false);
          setAdminEmail(null);
        }
      } else {
        // No user signed in
        setIsAdmin(false);
        setAdminEmail(null);
      }
    });

    return unsubscribe;
  }, []);

  const adminLogout = async () => {
    await auth.signOut();
    setIsAdmin(false);
    setAdminEmail(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, adminEmail, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
