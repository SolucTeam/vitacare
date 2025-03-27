
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedDoctors from '@/components/home/FeaturedDoctors';
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, Headphones, Video, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('services.ourServices', 'Our Services')}</h2>
            <p className="text-lg text-gray-600">
              {t('services.description', 'We offer a wide range of healthcare services to meet your needs.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden border-none shadow-md">
              <div className="h-40 bg-medical-50 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-medical-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('services.inPersonConsultations', 'In-Person Consultations')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('services.inPersonDesc', 'Visit our network of doctors in their clinics or hospitals for face-to-face consultations.')}
                </p>
                <Link to="/search" className="text-medical-600 font-medium hover:text-medical-700 inline-flex items-center">
                  {t('common.findDoctors', 'Find doctors')}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden border-none shadow-md">
              <div className="h-40 bg-medical-50 flex items-center justify-center">
                <Video className="w-16 h-16 text-medical-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('services.videoConsultations', 'Video Consultations')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('services.videoDesc', 'Connect with healthcare professionals from the comfort of your home via secure video calls.')}
                </p>
                <Link to="/search" className="text-medical-600 font-medium hover:text-medical-700 inline-flex items-center">
                  {t('common.bookOnline', 'Book online')}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden border-none shadow-md">
              <div className="h-40 bg-medical-50 flex items-center justify-center">
                <Headphones className="w-16 h-16 text-medical-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('services.support', '24/7 Support')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('services.supportDesc', 'Get assistance anytime with our round-the-clock customer support for all your healthcare needs.')}
                </p>
                <Link to="/contact" className="text-medical-600 font-medium hover:text-medical-700 inline-flex items-center">
                  {t('common.contactUs', 'Contact us')}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <FeaturedDoctors />

      {/* CTA Section */}
      <section className="py-16 bg-medical-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('cta.ready', 'Ready to take control of your health?')}
            </h2>
            <p className="text-xl text-medical-100 mb-8">
              {t('cta.joinText', 'Join thousands of patients who have found the right doctor and received quality care through VitaCare.')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button variant="default" className="px-8 py-3 bg-white text-medical-600 font-medium rounded-lg hover:bg-medical-50 transition-colors">
                  {t('auth.signUp', 'Sign Up Now')}
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-medical-700 transition-colors">
                  {t('common.findDoctor', 'Find a Doctor')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
