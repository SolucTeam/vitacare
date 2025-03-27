
export type Specialty = 
  | 'Cardiology'
  | 'Dermatology'
  | 'Pediatrics'
  | 'Orthopedics'
  | 'Neurology'
  | 'Gynecology'
  | 'Ophthalmology'
  | 'Psychiatry'
  | 'Oncology'
  | 'General Medicine';

export type Doctor = {
  id: string;
  name: string;
  specialty: Specialty;
  avatar: string;
  rating: number;
  reviewCount: number;
  education: string[];
  experience: number;
  languages: string[];
  about: string;
  consultationFee: number;
  availability: {
    [key: string]: string[]; // day: available times
  };
  location: {
    address: string;
    city: string;
    country: string;
  };
  acceptsInsurance: boolean;
  services: string[];
};

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export type AppointmentType = 'in-person' | 'video' | 'phone';

export type Appointment = {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  symptoms?: string;
  notes?: string;
};

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UserProfile = {
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodType?: BloodType;
  allergies?: string[];
  chronicConditions?: string[];
  medications?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

export type User = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  appointments: Appointment[];
  profile?: UserProfile;
};
