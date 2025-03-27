
import React, { useState } from 'react';
import { Search, Sliders, X } from 'lucide-react';
import { specialties } from '@/data/doctors';

interface SearchFiltersProps {
  onSearch: (filters: {
    query: string;
    specialty: string;
    availability: string;
    appointmentType: string[];
    rating: number;
  }) => void;
}

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    query: '',
    specialty: '',
    availability: '',
    appointmentType: ['in-person', 'video', 'phone'],
    rating: 0,
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFilters((prev) => {
      if (checked) {
        return { ...prev, appointmentType: [...prev.appointmentType, value] };
      } else {
        return { ...prev, appointmentType: prev.appointmentType.filter(type => type !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      query: '',
      specialty: '',
      availability: '',
      appointmentType: ['in-person', 'video', 'phone'],
      rating: 0,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="query"
              value={filters.query}
              onChange={handleInputChange}
              placeholder="Search doctors by name, specialty, or location"
              className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="px-3 py-2 mr-1 bg-gray-50 text-gray-700 rounded-md flex items-center hover:bg-gray-100 transition-colors"
              >
                <Sliders className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>

          {isFiltersOpen && (
            <div className="mt-4 border-t border-gray-100 pt-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={filters.specialty}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-200 rounded-md focus:ring-medical-500 focus:border-medical-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={filters.availability}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-200 rounded-md focus:ring-medical-500 focus:border-medical-500"
                  >
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="this-week">This Week</option>
                    <option value="next-week">Next Week</option>
                  </select>
                </div>

                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="in-person"
                        checked={filters.appointmentType.includes('in-person')}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-medical-600 border-gray-300 rounded focus:ring-medical-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">In-person</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="video"
                        checked={filters.appointmentType.includes('video')}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-medical-600 border-gray-300 rounded focus:ring-medical-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Video</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="phone"
                        checked={filters.appointmentType.includes('phone')}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-medical-600 border-gray-300 rounded focus:ring-medical-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Phone</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Rating
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    value={filters.rating}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-200 rounded-md focus:ring-medical-500 focus:border-medical-500"
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-medical-600 rounded-md hover:bg-medical-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {filters.specialty || filters.availability || filters.rating > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {filters.specialty && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-medical-50 text-medical-700">
                  {filters.specialty}
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, specialty: '' }))}
                    className="ml-1.5 hover:text-medical-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.availability && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-medical-50 text-medical-700">
                  {filters.availability.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, availability: '' }))}
                    className="ml-1.5 hover:text-medical-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.rating > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-medical-50 text-medical-700">
                  {filters.rating}+ Stars
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                    className="ml-1.5 hover:text-medical-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default SearchFilters;
