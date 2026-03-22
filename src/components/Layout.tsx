
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, LogOut, User, Sun, Moon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { isAdmin } = useAdminAuth();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Yala', path: '/about' },
    { name: 'Booking', path: '/booking' },
    { name: 'Map', path: '/map' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'Profile', path: '/profile' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 w-full z-[99990] transition-all duration-500 px-6 lg:px-12 py-3 bg-beige dark:bg-gray-900 shadow-md flex items-center justify-between text-black dark:text-white"
      >
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-widest serif uppercase text-gold">
            YALA360
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-5 uppercase tracking-wider text-[11px] font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-gold transition-colors whitespace-nowrap ${location.pathname === link.path ? 'underline underline-offset-8' : 'hover:opacity-70'}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Admin Dashboard — only visible to verified admins */}
          {isAdmin === true && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-4 py-1.5 border border-gold text-gold hover:bg-gold hover:text-white transition-all whitespace-nowrap"
            >
              <ShieldCheck size={13} />
              <span>ADMIN</span>
            </Link>
          )}

          {/* Sign In / Sign Out */}
          {currentUser ? (
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-5 py-2 bg-[#1A1A1A] text-white hover:bg-gold transition-all whitespace-nowrap dark:bg-white dark:text-black dark:hover:bg-gold dark:hover:text-white"
            >
              <LogOut size={14} /> <span>SIGN OUT</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 px-5 py-2 bg-[#1A1A1A] text-white hover:bg-gold transition-all whitespace-nowrap dark:bg-white dark:text-black dark:hover:bg-gold dark:hover:text-white"
            >
              <User size={14} /> <span>SIGN IN</span>
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95"
            style={{
              background: isDark
                ? 'rgba(99,102,241,0.15)'
                : 'rgba(213,185,145,0.2)',
              border: isDark
                ? '1.5px solid rgba(99,102,241,0.4)'
                : '1.5px solid rgba(213,185,145,0.5)',
              boxShadow: isDark
                ? '0 0 10px rgba(99,102,241,0.25)'
                : '0 0 10px rgba(213,185,145,0.3)',
            }}
          >
            {isDark
              ? <Moon size={16} style={{ color: '#818cf8' }} strokeWidth={2} />
              : <Sun size={16} style={{ color: '#d5b991' }} strokeWidth={2} />
            }
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          {/* Dark Mode Toggle (mobile) */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95"
            style={{
              background: isDark
                ? 'rgba(99,102,241,0.15)'
                : 'rgba(213,185,145,0.2)',
              border: isDark
                ? '1.5px solid rgba(99,102,241,0.4)'
                : '1.5px solid rgba(213,185,145,0.5)',
            }}
          >
            {isDark
              ? <Moon size={16} style={{ color: '#818cf8' }} strokeWidth={2} />
              : <Sun size={16} style={{ color: '#d5b991' }} strokeWidth={2} />
            }
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-beige dark:bg-gray-900 z-[99999] flex flex-col items-center justify-center space-y-8 text-2xl serif dark:text-white">
          <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          {/* Admin link in mobile menu — only for verified admins */}
          {isAdmin === true && (
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-gold"
            >
              <ShieldCheck size={18} />
              Admin Dashboard
            </Link>
          )}
          {currentUser ? (
            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="mt-4 flex items-center space-x-2">
              <LogOut size={24} /> <span>Sign Out</span>
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mt-4 flex items-center space-x-2 border-2 px-6 py-2">
              <User size={24} /> <span>Sign In</span>
            </Link>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl serif mb-6 tracking-widest">YALA360</h2>
            <p className="text-gray-400 max-w-md leading-loose font-light">
              Elevating the Sri Lankan safari experience through technology and luxury.
              Our mission is to reduce overcrowding while preserving the majesty of Yala's wildlife.
            </p>
          </div>
          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest mb-6 text-sm">Explore</h4>
            <ul className="space-y-4 font-light text-gray-400">
              <li><Link to="/about" className="hover:text-gold">Conservation</Link></li>
              <li><Link to="/map" className="hover:text-gold">Interactive Map</Link></li>
              <li><Link to="/booking" className="hover:text-gold">Book Safari</Link></li>
              <li><Link to="/gallery" className="hover:text-gold">Guest Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest mb-6 text-sm">Connect</h4>
            <div className="flex space-x-6 mb-8">
              <Instagram className="hover:text-gold cursor-pointer" size={20} />
              <Facebook className="hover:text-gold cursor-pointer" size={20} />
              <Twitter className="hover:text-gold cursor-pointer" size={20} />
            </div>
            <p className="text-xs text-gray-500">info@yala360.com</p>
            <p className="text-xs text-gray-500">+94 (0) 77 123 4567</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
          <p>© 2024 YALA360. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-gold">Privacy Policy</span>
            <span className="cursor-pointer hover:text-gold">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
