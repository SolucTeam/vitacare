
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="pt-24 pb-32 md:pt-28 md:pb-40 bg-gradient-to-b from-medical-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero.title', 'Get high-quality service with quality medicine')}
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle', 'Take control of your health and experience the benefits of healthcare with our platform.')}
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link to="/about">
              <Button variant="default" className="bg-medical-600 text-white px-8 py-6 text-lg rounded-full hover:bg-medical-700 transition-colors">
                {t('common.aboutUs', 'About Us')}
              </Button>
            </Link>
            <Link to="/booking">
              <Button variant="outline" className="bg-white border-2 border-gray-300 text-gray-800 px-8 py-6 text-lg rounded-full hover:bg-gray-50 transition-colors">
                {t('common.bookAppointment', 'Book an Appointment')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: New client */}
          <div className="flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden animate-scale-in">
            <div className="bg-medical-600 text-white p-8 md:w-1/2">
              <h3 className="text-xl font-semibold mb-3">{t('features.newClient', 'New client')}</h3>
              <div className="text-5xl font-bold">292</div>
            </div>
            <div className="bg-gray-100 p-8 md:w-1/2">
              <p className="text-gray-700">
                {t('features.newClientDesc', 'Join our growing community of satisfied clients who trust our medical services.')}
              </p>
            </div>
          </div>
          
          {/* Feature 2: Virtual consultation */}
          <div className="bg-white rounded-xl p-8 shadow-lg animate-scale-in stagger-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t('features.virtualConsultation', 'Virtual consultation')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('features.virtualConsultationDesc', 'Timely care with virtual consultation typically being scheduled.')}
            </p>
            <Link to="/services" className="text-medical-600 font-semibold inline-flex items-center">
              {t('common.learnMore', 'Learn more')} <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
