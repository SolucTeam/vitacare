
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Doctor } from '@/types';
import { cn } from '@/lib/utils';

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
  featured?: boolean;
}

const DoctorCard = ({ doctor, className, featured = false }: DoctorCardProps) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-xl overflow-hidden transition-all duration-300',
        'border border-gray-100 hover:shadow-md hover:border-medical-100',
        featured ? 'shadow-md' : 'shadow-sm',
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start">
          <div 
            className={cn(
              'relative w-20 h-20 rounded-full overflow-hidden mr-4 border-2 border-medical-100',
              featured && 'ring-2 ring-medical-500 ring-offset-2'
            )}
          >
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-medical-600 font-medium text-sm">{doctor.specialty}</p>
              </div>
              {featured && (
                <span className="bg-medical-100 text-medical-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium text-gray-700">{doctor.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">{doctor.reviewCount} reviews</span>
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              {doctor.location.city}, {doctor.location.country}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="text-lg font-semibold text-gray-900">${doctor.consultationFee}</p>
            </div>
            <div className="flex space-x-2">
              <Link 
                to={`/doctors/${doctor.id}`} 
                className="px-4 py-2 text-sm font-medium text-medical-600 bg-medical-50 rounded-md hover:bg-medical-100 transition-colors"
              >
                View Profile
              </Link>
              <Link 
                to={`/booking/${doctor.id}`} 
                className="px-4 py-2 text-sm font-medium text-white bg-medical-600 rounded-md hover:bg-medical-700 transition-colors flex items-center"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
