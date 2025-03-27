
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User, Calendar, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: t('common.home'), path: '/' },
    { name: t('common.findDoctors'), path: '/search' },
    { name: t('common.services'), path: '/services' },
    { name: t('common.about'), path: '/about' },
    { name: t('common.contact'), path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-medical-700 flex items-center"
        >
          <span className="bg-medical-500 text-white p-1 rounded-md mr-2">VC</span>
          {t('app.name')}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    'font-medium transition-colors hover:text-medical-600',
                    location.pathname === link.path
                      ? 'text-medical-600'
                      : 'text-gray-700'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-medical-600 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-1" />
            {t('common.myAppointments')}
          </Link>
          <Link
            to="/settings"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-medical-600 transition-colors"
          >
            <Settings className="w-4 h-4 mr-1" />
            {t('common.settings')}
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-md text-medical-600 font-medium hover:bg-medical-50 transition-colors"
          >
            {t('common.login')}
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-medical-600 text-white font-medium hover:bg-medical-700 transition-colors"
          >
            {t('common.signup')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-up">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={cn(
                      'block font-medium py-2 transition-colors',
                      location.pathname === link.path
                        ? 'text-medical-600'
                        : 'text-gray-700'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-100">
                <Link
                  to="/dashboard"
                  className="block py-2 text-gray-700 font-medium hover:text-medical-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.myAppointments')}
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="block py-2 text-gray-700 font-medium hover:text-medical-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.settings')}
                </Link>
              </li>
              <li className="flex space-x-4 pt-4">
                <Link
                  to="/login"
                  className="px-4 py-2 w-1/2 text-center rounded-md border border-medical-600 text-medical-600 font-medium hover:bg-medical-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 w-1/2 text-center rounded-md bg-medical-600 text-white font-medium hover:bg-medical-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.signup')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
