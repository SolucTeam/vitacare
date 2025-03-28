
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-bold text-medical-700 flex items-center mb-4">
              <span className="bg-medical-500 text-white p-1 rounded-md mr-2">VC</span>
              {t('app.name')}
            </Link>
            <p className="text-gray-600 mb-6">
              {t('footer.connectingPatients')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-medical-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-gray-600 hover:text-medical-600 transition-colors">
                  {t('common.findDoctors')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-medical-600 transition-colors">
                  {t('common.services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-medical-600 transition-colors">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Health Articles
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-medical-600 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('footer.forPatients')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-gray-600 hover:text-medical-600 transition-colors">
                  {t('common.findDoctors')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-medical-600 transition-colors">
                  {t('common.login')}
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-medical-600 transition-colors">
                  {t('common.signup')}
                </Link>
              </li>
              <li>
                <Link to="/booking-guide" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Booking Process
                </Link>
              </li>
              <li>
                <Link to="/patient-dashboard" className="text-gray-600 hover:text-medical-600 transition-colors">
                  Patient Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-medical-600 mt-0.5 mr-3" />
                <span className="text-gray-600">
                  123 Healthcare Avenue, Medical District, City, Country
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-medical-600 mr-3" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-medical-600 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-medical-600 mr-3" />
                <a href="mailto:info@vitacare.com" className="text-gray-600 hover:text-medical-600 transition-colors">
                  info@vitacare.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} {t('app.name')}. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-medical-600 text-sm transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-medical-600 text-sm transition-colors">
                {t('footer.terms')}
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-medical-600 text-sm transition-colors">
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
