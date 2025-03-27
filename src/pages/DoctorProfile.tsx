
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  Briefcase, 
  Languages, 
  DollarSign, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { doctors } from '@/data/doctors';
import { Doctor } from '@/types';
import { useToast } from "@/components/ui/use-toast";

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    setTimeout(() => {
      const foundDoctor = doctors.find(d => d.id === id);
      setDoctor(foundDoctor || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Get available times for the selected date
    if (doctor && doctor.availability[date]) {
      setAvailableTimes(doctor.availability[date]);
    } else {
      setAvailableTimes([]);
    }
  };

  // Get available dates from doctor
  const getAvailableDates = () => {
    if (!doctor) return [];
    return Object.keys(doctor.availability);
  };

  // Handle quick book
  const handleQuickBook = () => {
    toast({
      title: "Quick booking initiated",
      description: "You'll be redirected to the booking page for the next available slot.",
    });
    // In a real app, this would navigate to booking page with pre-selected time
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-8 animate-pulse">
          <div className="flex flex-col md:flex-row">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 md:mb-0 md:mr-6"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Doctor Not Found</h1>
          <p className="text-gray-600 mb-6">
            The doctor you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/search"
            className="px-6 py-3 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors inline-block"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Doctor Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 flex justify-center md:justify-start mb-6 md:mb-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-medical-100">
                    <img 
                      src={doctor.avatar} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-medical-50 px-3 py-1 rounded-full border border-medical-200">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-medical-700">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                    <p className="text-medical-600 font-medium mb-3">{doctor.specialty}</p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {doctor.location.city}, {doctor.location.country}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1 text-gray-400" />
                        {doctor.experience} years experience
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {doctor.rating} ({doctor.reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <button
                      onClick={handleQuickBook}
                      className="px-5 py-2 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors flex items-center justify-center"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Quick Book
                    </button>
                    <Link
                      to={`/booking/${doctor.id}`}
                      className="px-5 py-2 border border-medical-600 text-medical-600 font-medium rounded-lg hover:bg-medical-50 transition-colors flex items-center justify-center"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      See All Slots
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Consultation Fee</p>
                    <p className="text-lg font-semibold text-gray-900">${doctor.consultationFee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Languages</p>
                    <p className="text-base text-gray-900">{doctor.languages.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Insurance</p>
                    <p className="text-base text-gray-900">
                      {doctor.acceptsInsurance ? 'Accepted' : 'Not Accepted'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Availability</p>
                    <p className="text-base text-gray-900">
                      {Object.keys(doctor.availability).length} days a week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About Doctor</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {doctor.about}
                </p>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                      <Award className="w-5 h-5 text-medical-600 mr-2" />
                      Education
                    </h3>
                    <ul className="space-y-2 pl-7">
                      {doctor.education.map((edu, index) => (
                        <li key={index} className="text-gray-700 list-disc">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                      <Briefcase className="w-5 h-5 text-medical-600 mr-2" />
                      Experience
                    </h3>
                    <p className="text-gray-700 pl-7">
                      {doctor.experience} years of professional experience
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                      <Languages className="w-5 h-5 text-medical-600 mr-2" />
                      Languages
                    </h3>
                    <p className="text-gray-700 pl-7">
                      {doctor.languages.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {doctor.services.map((service, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-medical-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Reviews Section - Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{doctor.rating}</span>
                    <span className="text-gray-500 ml-1">({doctor.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Simple placeholder for reviews */}
                  <div className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                      <div>
                        <div className="font-medium">Patient Name</div>
                        <div className="text-sm text-gray-500">2 weeks ago</div>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Great doctor! Very knowledgeable and took time to explain everything clearly.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                      <div>
                        <div className="font-medium">Another Patient</div>
                        <div className="text-sm text-gray-500">1 month ago</div>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Professional service and very helpful. Would definitely recommend!
                    </p>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  View All Reviews
                </button>
              </div>
            </div>
          </div>
          
          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Book an Appointment</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {getAvailableDates().map((date) => (
                      <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`p-2 text-sm rounded-md transition-colors ${
                          selectedDate === date
                            ? 'bg-medical-600 text-white'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Time Slots
                  </label>
                  {selectedDate ? (
                    availableTimes.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            className="p-2 text-sm border border-gray-200 rounded-md text-gray-700 hover:bg-medical-50 hover:border-medical-200 transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No available slots for this date.</p>
                    )
                  ) : (
                    <p className="text-gray-500 text-sm">Please select a date to view available slots.</p>
                  )}
                </div>
                
                <Link
                  to={`/booking/${doctor.id}`}
                  className="w-full py-3 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Consultation Fee</span>
                    <span className="font-semibold text-gray-900">${doctor.consultationFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Insurance</span>
                    <span className="text-sm text-gray-900">
                      {doctor.acceptsInsurance ? 'Accepted' : 'Not Accepted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
