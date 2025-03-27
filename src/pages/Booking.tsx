
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  CheckCircle,
  CreditCard,
  User
} from 'lucide-react';
import { doctors } from '@/data/doctors';
import { Doctor, AppointmentType } from '@/types';
import { useToast } from "@/components/ui/use-toast";

type BookingStep = 'date' | 'info' | 'payment' | 'confirmation';

const Booking = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [step, setStep] = useState<BookingStep>('date');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('in-person');
  
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    symptoms: '',
    notes: '',
  });

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    setTimeout(() => {
      const foundDoctor = doctors.find(d => d.id === doctorId);
      setDoctor(foundDoctor || null);
      setIsLoading(false);
    }, 500);
  }, [doctorId]);

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle appointment type selection
  const handleAppointmentTypeSelect = (type: AppointmentType) => {
    setAppointmentType(type);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (step === 'date') {
      if (!selectedDate || !selectedTime) {
        toast({
          title: "Missing information",
          description: "Please select both date and time for your appointment.",
          variant: "destructive",
        });
        return;
      }
      setStep('info');
    } else if (step === 'info') {
      if (!patientInfo.name || !patientInfo.email || !patientInfo.phone) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields.",
          variant: "destructive",
        });
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      // In a real app, this would process payment
      setStep('confirmation');
    } else if (step === 'confirmation') {
      navigate('/dashboard');
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (step === 'info') {
      setStep('date');
    } else if (step === 'payment') {
      setStep('info');
    }
  };

  // Get available times for the selected date
  const getAvailableTimes = () => {
    if (!doctor || !selectedDate) return [];
    return doctor.availability[selectedDate] || [];
  };

  // Get available dates from doctor
  const getAvailableDates = () => {
    if (!doctor) return [];
    return Object.keys(doctor.availability);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
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
            The doctor you're trying to book with doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-3 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-medical-600 font-medium mb-6 hover:underline"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Doctor Profile
        </button>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
            <p className="text-gray-600">
              Schedule your consultation with {doctor.name}
            </p>
          </div>
        </div>

        {/* Booking Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="w-full absolute top-1/2 h-1 bg-gray-200 -z-10"></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step === 'date' ? 'bg-medical-600 text-white' : (step === 'info' || step === 'payment' || step === 'confirmation') ? 'bg-medical-100 text-medical-700' : 'bg-gray-200 text-gray-700'}`}>
                1
              </div>
              <span className="text-sm font-medium mt-2 text-gray-700">Date & Time</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step === 'info' ? 'bg-medical-600 text-white' : (step === 'payment' || step === 'confirmation') ? 'bg-medical-100 text-medical-700' : 'bg-gray-200 text-gray-700'}`}>
                2
              </div>
              <span className="text-sm font-medium mt-2 text-gray-700">Information</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step === 'payment' ? 'bg-medical-600 text-white' : step === 'confirmation' ? 'bg-medical-100 text-medical-700' : 'bg-gray-200 text-gray-700'}`}>
                3
              </div>
              <span className="text-sm font-medium mt-2 text-gray-700">Payment</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step === 'confirmation' ? 'bg-medical-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                4
              </div>
              <span className="text-sm font-medium mt-2 text-gray-700">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              {/* Date & Time Selection */}
              {step === 'date' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Dates
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {getAvailableDates().map((date) => (
                        <button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          className={`p-3 rounded-lg transition-colors ${
                            selectedDate === date
                              ? 'bg-medical-600 text-white'
                              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Calendar className="w-5 h-5 mx-auto mb-1" />
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Time Slots for {selectedDate}
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {getAvailableTimes().map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`p-2 rounded-lg text-sm transition-colors ${
                              selectedTime === time
                                ? 'bg-medical-600 text-white'
                                : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleAppointmentTypeSelect('in-person')}
                        className={`p-3 rounded-lg flex items-center transition-colors ${
                          appointmentType === 'in-person'
                            ? 'bg-medical-50 border border-medical-200 text-medical-700'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <MapPin className={`w-5 h-5 mr-2 ${appointmentType === 'in-person' ? 'text-medical-600' : 'text-gray-400'}`} />
                        <div className="text-left">
                          <div className="font-medium">In-Person</div>
                          <div className="text-xs text-gray-500">Visit the clinic</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleAppointmentTypeSelect('video')}
                        className={`p-3 rounded-lg flex items-center transition-colors ${
                          appointmentType === 'video'
                            ? 'bg-medical-50 border border-medical-200 text-medical-700'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Video className={`w-5 h-5 mr-2 ${appointmentType === 'video' ? 'text-medical-600' : 'text-gray-400'}`} />
                        <div className="text-left">
                          <div className="font-medium">Video Call</div>
                          <div className="text-xs text-gray-500">Online consultation</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleAppointmentTypeSelect('phone')}
                        className={`p-3 rounded-lg flex items-center transition-colors ${
                          appointmentType === 'phone'
                            ? 'bg-medical-50 border border-medical-200 text-medical-700'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Phone className={`w-5 h-5 mr-2 ${appointmentType === 'phone' ? 'text-medical-600' : 'text-gray-400'}`} />
                        <div className="text-left">
                          <div className="font-medium">Phone Call</div>
                          <div className="text-xs text-gray-500">Talk via telephone</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Patient Information */}
              {step === 'info' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={patientInfo.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={patientInfo.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500"
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={patientInfo.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500"
                        placeholder="+1 (234) 567-8901"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                        Symptoms
                      </label>
                      <textarea
                        id="symptoms"
                        name="symptoms"
                        value={patientInfo.symptoms}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500"
                        placeholder="Describe your symptoms or reason for the appointment"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={patientInfo.notes}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500"
                        placeholder="Any additional information the doctor should know"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Information */}
              {step === 'payment' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                  
                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-medium">${doctor.consultationFee}</span>
                    </div>
                    {appointmentType === 'video' && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-medium">$5.00</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                      <span className="font-medium text-gray-700">Total</span>
                      <span className="font-semibold">${appointmentType === 'video' ? doctor.consultationFee + 5 : doctor.consultationFee}</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                    
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="creditCard"
                          className="w-4 h-4 text-medical-600 focus:ring-medical-500"
                          defaultChecked
                        />
                        <span className="ml-2 flex items-center">
                          <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                          Credit/Debit Card
                        </span>
                      </label>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-200 rounded-md focus:ring-medical-500 focus:border-medical-500"
                              placeholder="4242 4242 4242 4242"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiration Date
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-200 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                placeholder="MM/YY"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVC
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-200 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-200 rounded-md focus:ring-medical-500 focus:border-medical-500"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Confirmation */}
              {step === 'confirmation' && (
                <div className="p-6 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Your appointment with Dr. {doctor.name} has been successfully booked.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <Calendar className="w-5 h-5 text-medical-600 mr-2" />
                          Date & Time
                        </h3>
                        <p className="text-gray-900 ml-7">
                          {selectedDate}, {selectedTime}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-700 flex items-center">
                          {appointmentType === 'in-person' ? (
                            <MapPin className="w-5 h-5 text-medical-600 mr-2" />
                          ) : appointmentType === 'video' ? (
                            <Video className="w-5 h-5 text-medical-600 mr-2" />
                          ) : (
                            <Phone className="w-5 h-5 text-medical-600 mr-2" />
                          )}
                          Appointment Type
                        </h3>
                        <p className="text-gray-900 ml-7 capitalize">
                          {appointmentType === 'in-person' ? (
                            <>
                              In-Person at {doctor.location.address}, {doctor.location.city}
                            </>
                          ) : appointmentType === 'video' ? (
                            <>
                              Video Consultation (link will be sent via email)
                            </>
                          ) : (
                            <>
                              Phone Call to {patientInfo.phone}
                            </>
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <User className="w-5 h-5 text-medical-600 mr-2" />
                          Patient
                        </h3>
                        <p className="text-gray-900 ml-7">
                          {patientInfo.name}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <CreditCard className="w-5 h-5 text-medical-600 mr-2" />
                          Payment
                        </h3>
                        <p className="text-gray-900 ml-7">
                          ${appointmentType === 'video' ? doctor.consultationFee + 5 : doctor.consultationFee} (Paid)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    We've sent a confirmation email to {patientInfo.email} with all the details.
                  </p>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex justify-between">
                  {(step === 'info' || step === 'payment') && (
                    <button
                      onClick={handlePrevStep}
                      className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Back
                    </button>
                  )}
                  
                  {step === 'date' && (
                    <button
                      onClick={() => navigate(`/doctors/${doctor.id}`)}
                      className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Back to Profile
                    </button>
                  )}
                  
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors flex items-center ml-auto"
                  >
                    {step === 'confirmation' ? (
                      'Go to Dashboard'
                    ) : step === 'payment' ? (
                      'Confirm & Pay'
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Doctor Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Summary</h2>
                
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-gray-100">
                    <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-medical-600 text-sm">{doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {selectedDate && selectedTime && (
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-medical-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Date & Time</h4>
                        <p className="text-gray-600">
                          {selectedDate}, {selectedTime}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    {appointmentType === 'in-person' ? (
                      <MapPin className="w-5 h-5 text-medical-600 mt-0.5 mr-3" />
                    ) : appointmentType === 'video' ? (
                      <Video className="w-5 h-5 text-medical-600 mt-0.5 mr-3" />
                    ) : (
                      <Phone className="w-5 h-5 text-medical-600 mt-0.5 mr-3" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">Appointment Type</h4>
                      <p className="text-gray-600 capitalize">
                        {appointmentType} Consultation
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-medium">${doctor.consultationFee}</span>
                  </div>
                  {appointmentType === 'video' && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-medium">$5.00</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                    <span className="font-medium text-gray-700">Total</span>
                    <span className="font-semibold">${appointmentType === 'video' ? doctor.consultationFee + 5 : doctor.consultationFee}</span>
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

export default Booking;
