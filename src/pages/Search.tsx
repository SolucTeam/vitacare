
import React, { useState, useEffect } from 'react';
import SearchFilters from '@/components/search/SearchFilters';
import DoctorCard from '@/components/common/DoctorCard';
import { doctors as allDoctors } from '@/data/doctors';
import { Doctor } from '@/types';
import { Search as SearchIcon, MapPin, List, Grid } from 'lucide-react';

const Search = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(allDoctors);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = (filters: {
    query: string;
    specialty: string;
    availability: string;
    appointmentType: string[];
    rating: number;
  }) => {
    // Simulate loading state
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filteredDoctors = [...allDoctors];
      
      // Filter by search query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredDoctors = filteredDoctors.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query) ||
            doctor.location.city.toLowerCase().includes(query) ||
            doctor.location.country.toLowerCase().includes(query)
        );
      }
      
      // Filter by specialty
      if (filters.specialty) {
        filteredDoctors = filteredDoctors.filter(
          (doctor) => doctor.specialty === filters.specialty
        );
      }
      
      // Filter by rating
      if (filters.rating > 0) {
        filteredDoctors = filteredDoctors.filter(
          (doctor) => doctor.rating >= filters.rating
        );
      }
      
      setDoctors(filteredDoctors);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Doctors</h1>
          <p className="text-gray-600">
            Search for doctors by specialty, availability, or location
          </p>
        </div>

        <div className="mb-8">
          <SearchFilters onSearch={handleSearch} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} found
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-medical-100 text-medical-600' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-medical-100 text-medical-600' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse h-64">
                <div className="flex items-start">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : doctors.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  className="!block !p-0"
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any doctors matching your search criteria. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
