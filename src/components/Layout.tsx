
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Yala', path: '/about' },
    { name: 'Booking', path: '/booking' },
    { name: 'Map', path: '/map' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 lg:px-12 py-4 flex items-center justify-between ${
          isScrolled || location.pathname !== '/' ? 'bg-beige/95 shadow-md py-3' : 'bg-transparent text-white'
        }`}
      >
        <Link to="/" className="flex items-center space-x-2">
          <span className={`text-2xl font-bold tracking-widest serif uppercase ${isScrolled || location.pathname !== '/' ? 'text-gold' : 'text-white'}`}>
            YALA360
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8 uppercase tracking-widest text-xs font-bold">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-gold transition-colors ${location.pathname === link.path ? 'text-gold underline underline-offset-8' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="ml-4 px-5 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-all">
            ADMIN
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-beige z-[60] flex flex-col items-center justify-center space-y-8 text-2xl serif">
          <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-gold">Admin Portal</Link>
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
        <div className="border-t border-gray-800 pt-8 flex flex-col md:row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
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
