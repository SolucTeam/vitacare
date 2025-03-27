
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedDoctors from '@/components/home/FeaturedDoctors';
import { ArrowRight, Calendar, Clock, Headphones, Video, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Finding and consulting with a doctor has never been easier. Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-medical-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Search & Book</h3>
              <p className="text-gray-600">
                Search for doctors by specialty, location, or availability. Book an appointment that fits your schedule.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-medical-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Get Reminders</h3>
              <p className="text-gray-600">
                Receive email and SMS reminders for your upcoming appointments. No more missed consultations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-medical-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Visit or Connect</h3>
              <p className="text-gray-600">
                Visit the doctor in person or connect via secure video consultation. Get the care you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <FeaturedDoctors />

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">
              We offer a wide range of healthcare services to meet your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">In-Person Consultations</h3>
              <p className="text-gray-600 mb-4">
                Visit our network of doctors in their clinics or hospitals for face-to-face consultations.
              </p>
              <Link to="/search" className="text-medical-600 font-medium hover:text-medical-700 inline-flex items-center">
                Find doctors
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Consultations</h3>
              <p className="text-gray-600 mb-4">
                Connect with healthcare professionals from the comfort of your home via secure video calls.
              </p>
              <Link to="/search" className="text-medical-600 font-medium hover:text-medical-700 inline-flex items-center">
                Book online
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 mb-4">
                Get assistance anytime with our round-the-clock customer support for all your healthcare needs.
              </p>
              <Link to="/contact" className="text-medical-600 font-medium hover:text-medical-700 inline-flex items-center">
                Contact us
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose CureLink for Your Healthcare Needs?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're dedicated to providing the best healthcare experience for our patients with our easy-to-use platform and network of trusted medical professionals.
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-medical-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Verified Specialists</h3>
                    <p className="text-gray-600">
                      All doctors on our platform are verified and credentialed to ensure quality care.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-medical-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Convenient Booking</h3>
                    <p className="text-gray-600">
                      Book appointments 24/7 from anywhere, with instant confirmation.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-medical-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Secure Communication</h3>
                    <p className="text-gray-600">
                      Your health information and consultations are protected with end-to-end encryption.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-medical-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Patient-Centered Care</h3>
                    <p className="text-gray-600">
                      Our doctors focus on providing personalized care based on your specific needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-medical-500 rounded-2xl opacity-10"></div>
              <img 
                src="/placeholder.svg" 
                alt="Healthcare benefits" 
                className="relative z-10 w-full h-auto rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg animate-float">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Data Protection</h4>
                    <p className="text-xs text-gray-500">Your information is secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-medical-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to take control of your health?
            </h2>
            <p className="text-xl text-medical-100 mb-8">
              Join thousands of patients who have found the right doctor and received quality care through CureLink.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-white text-medical-600 font-medium rounded-lg hover:bg-medical-50 transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                to="/search"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-medical-700 transition-colors"
              >
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
