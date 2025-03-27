
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Users, Award, Shield, Heart } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "15+", label: "Years of Experience" },
    { value: "500+", label: "Healthcare Professionals" },
    { value: "100,000+", label: "Patients Served" },
    { value: "98%", label: "Patient Satisfaction" }
  ];

  const values = [
    {
      icon: <Heart className="w-10 h-10 text-medical-600" />,
      title: "Patient-Centered Care",
      description: "We put patients at the center of everything we do, ensuring personalized and compassionate care for every individual."
    },
    {
      icon: <Award className="w-10 h-10 text-medical-600" />,
      title: "Excellence",
      description: "We strive for excellence in all aspects of healthcare delivery, from clinical expertise to patient experience."
    },
    {
      icon: <Shield className="w-10 h-10 text-medical-600" />,
      title: "Integrity",
      description: "We uphold the highest ethical standards in our practice, ensuring transparency and trust in all interactions."
    },
    {
      icon: <Users className="w-10 h-10 text-medical-600" />,
      title: "Collaboration",
      description: "We believe in collaborative healthcare, working together with patients and professionals for better outcomes."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About VitaCare</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming healthcare through innovation, compassion, and excellence to improve the well-being of individuals and communities.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2009, VitaCare began with a simple mission: to make quality healthcare accessible to everyone. What started as a small clinic with five dedicated physicians has grown into a comprehensive healthcare network serving communities across the country.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we've expanded our services to address the evolving healthcare needs of our patients while maintaining our commitment to personalized care. We've embraced technological advancements to enhance the patient experience and improve healthcare outcomes.
            </p>
            <p className="text-gray-600">
              Today, VitaCare stands as a leader in innovative healthcare solutions, connecting patients with skilled healthcare professionals through both traditional and digital platforms. Our journey continues as we work tirelessly to redefine healthcare delivery for the modern world.
            </p>
          </div>
          <div className="bg-medical-100 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To provide accessible, high-quality healthcare services that empower individuals to achieve optimal health and well-being through personalized care, innovation, and compassion.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-gray-600">
              To be the most trusted healthcare partner, leading the transformation of healthcare delivery through patient-centered approaches, technological innovation, and excellence in clinical practice.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white shadow-sm rounded-xl p-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-medical-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section Preview */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Led by experienced healthcare professionals, our leadership team is committed to advancing our mission and values.
          </p>
          <Button variant="medical" size="lg">
            Meet Our Team
          </Button>
        </div>

        {/* Join Us CTA */}
        <div className="bg-medical-600 text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for talented healthcare professionals who share our passion for improving lives through quality healthcare.
          </p>
          <Button 
            variant="outline" 
            size="xl" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-medical-600"
          >
            View Career Opportunities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
