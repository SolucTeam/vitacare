
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Clock, Video, Phone, MapPin, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Appointment, AppointmentStatus, Doctor } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  doctor: Doctor;
  className?: string;
}

const AppointmentCard = ({ appointment, doctor, className }: AppointmentCardProps) => {
  // Get the relative time (e.g., "2 days from now", "tomorrow", etc.)
  const relativeTime = formatDistanceToNow(new Date(appointment.date), { addSuffix: true });
  
  // Status color and icon
  const statusConfig = {
    upcoming: {
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-100',
      icon: <Calendar className="w-4 h-4" />
    },
    completed: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-100',
      icon: <CheckCircle className="w-4 h-4" />
    },
    cancelled: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-100',
      icon: <XCircle className="w-4 h-4" />
    }
  };

  // Appointment type icon
  const typeIcon = {
    'in-person': <MapPin className="w-4 h-4 text-gray-500" />,
    'video': <Video className="w-4 h-4 text-medical-600" />,
    'phone': <Phone className="w-4 h-4 text-gray-500" />
  };

  const { bgColor, textColor, borderColor, icon } = statusConfig[appointment.status];

  return (
    <div 
      className={cn(
        'bg-white rounded-xl overflow-hidden border transition-all duration-300',
        'hover:shadow-md',
        appointment.status === 'upcoming' ? 'border-medical-200' : 'border-gray-100',
        className
      )}
    >
      <div className="p-5">
        <div className="flex items-start">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-gray-100">
            <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
              <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium flex items-center', bgColor, textColor)}>
                {icon}
                <span className="ml-1 capitalize">{appointment.status}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-medical-600 mr-2" />
            <span className="text-sm text-gray-700">{appointment.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-medical-600 mr-2" />
            <span className="text-sm text-gray-700">{appointment.time}</span>
          </div>
          <div className="flex items-center">
            {typeIcon[appointment.type]}
            <span className="ml-2 text-sm text-gray-700 capitalize">{appointment.type} Consultation</span>
          </div>
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">{relativeTime}</span>
          </div>
        </div>

        {appointment.status === 'upcoming' && (
          <div className="mt-4 flex space-x-3 pt-3 border-t border-gray-100">
            {appointment.type === 'video' && (
              <button className="flex-1 px-3 py-2 bg-medical-600 text-white text-sm font-medium rounded-md hover:bg-medical-700 transition-colors flex items-center justify-center">
                <Video className="w-4 h-4 mr-2" />
                Join Video Call
              </button>
            )}
            <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Reschedule
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        )}

        {appointment.status === 'completed' && (
          <div className="mt-4 flex space-x-3 pt-3 border-t border-gray-100">
            <button className="flex-1 px-3 py-2 bg-medical-600 text-white text-sm font-medium rounded-md hover:bg-medical-700 transition-colors">
              View Summary
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Book Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
