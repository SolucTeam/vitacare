
import React from 'react';
import { Search, Calendar, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-medical-50 via-blue-50 to-indigo-50 opacity-60"></div>
      
      {/* Animated background circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-medical-100 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:max-w-lg animate-fade-in">
            <div className="inline-block bg-medical-50 rounded-full px-3 py-1 text-medical-700 text-sm font-medium mb-6">
              Your Health, Our Priority
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find and Book the <span className="text-medical-600">Best Doctors</span> Near You
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connect with top medical specialists for in-person visits or remote consultations. Quality healthcare at your fingertips with simplified booking.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link
                to="/search"
                className="px-6 py-3 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors flex items-center justify-center"
              >
                Find a Doctor
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-medical-50 rounded-full flex items-center justify-center mb-2">
                  <Search className="w-5 h-5 text-medical-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Search Doctors</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-medical-50 rounded-full flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 text-medical-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Book Appointment</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-medical-50 rounded-full flex items-center justify-center mb-2">
                  <Video className="w-5 h-5 text-medical-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Video Consult</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-full max-w-lg">
              {/* Main image */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-medical-500 rounded-2xl opacity-10"></div>
              <div className="relative z-10 bg-white rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Doctor consultation" 
                  className="w-full h-auto rounded-t-2xl"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-medical-100 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-medical-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Easy Appointment Booking</h3>
                      <p className="text-sm text-gray-600">Find available slots instantly</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-medical-100 flex items-center justify-center">
                        <Video className="w-6 h-6 text-medical-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Video Consultations</h3>
                      <p className="text-sm text-gray-600">Connect with doctors remotely</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src="/placeholder.svg" alt="Patient" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-xs text-gray-500">Great service! Highly recommended.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Missing Star component
const Star = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default Hero;
