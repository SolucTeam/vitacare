
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DoctorCard from '../common/DoctorCard';
import { doctors } from '@/data/doctors';

const FeaturedDoctors = () => {
  // Just get the first 3 doctors for featured section
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Featured Doctors</h2>
            <p className="text-gray-600 max-w-xl">
              Meet our highly qualified medical professionals specializing in various fields of healthcare.
            </p>
          </div>
          <Link
            to="/search"
            className="mt-4 md:mt-0 inline-flex items-center text-medical-600 font-medium hover:text-medical-700 transition-colors"
          >
            View all doctors
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDoctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              featured={true}
              className="animate-scale-in"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
