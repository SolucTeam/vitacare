
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, Phone, Calendar, Stethoscope, Heart, Clock, Video } from 'lucide-react';

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Stethoscope className="w-12 h-12 text-medical-600" />,
      title: "Primary Care",
      description: "Comprehensive healthcare services for individuals and families, including routine check-ups, preventive care, and management of chronic conditions."
    },
    {
      icon: <Video className="w-12 h-12 text-medical-600" />,
      title: "Telemedicine",
      description: "Virtual consultations with healthcare professionals from the comfort of your home, providing convenient access to medical advice and treatment."
    },
    {
      icon: <Heart className="w-12 h-12 text-medical-600" />,
      title: "Specialized Care",
      description: "Expert medical services in various specialties including cardiology, dermatology, pediatrics, and more for targeted health concerns."
    },
    {
      icon: <Calendar className="w-12 h-12 text-medical-600" />,
      title: "Appointment Scheduling",
      description: "Flexible appointment booking system allowing you to schedule visits with healthcare providers at your convenience."
    },
    {
      icon: <Check className="w-12 h-12 text-medical-600" />,
      title: "Health Screenings",
      description: "Preventive health screenings to detect potential health issues early, enabling timely intervention and better outcomes."
    },
    {
      icon: <Clock className="w-12 h-12 text-medical-600" />,
      title: "24/7 Support",
      description: "Round-the-clock medical assistance for emergencies and urgent health concerns, providing peace of mind whenever you need it."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Healthcare Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of healthcare services designed to meet your medical needs with excellence and compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-md border border-gray-100"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-medical-600 text-white rounded-xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Need Emergency Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our medical team is available 24/7 to provide immediate support for urgent medical situations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-medical-600 w-full sm:w-auto"
            >
              <Phone className="mr-2" />
              Call Now
            </Button>
            <Button 
              variant="medical" 
              size="xl"
              className="w-full sm:w-auto"
            >
              <Calendar className="mr-2" />
              Schedule Appointment
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose VitaCare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Care</h3>
              <p className="text-gray-600">
                Our team of highly qualified healthcare professionals is dedicated to providing exceptional medical services.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Approach</h3>
              <p className="text-gray-600">
                We develop individualized treatment plans tailored to your specific health needs and goals.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Technology</h3>
              <p className="text-gray-600">
                We utilize cutting-edge medical technology and innovative approaches to deliver the highest standard of care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
