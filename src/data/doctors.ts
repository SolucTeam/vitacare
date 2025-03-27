
import { Doctor, Specialty } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    avatar: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 124,
    education: [
      'MD, Harvard Medical School',
      'Residency, Massachusetts General Hospital',
      'Fellowship, Johns Hopkins Hospital'
    ],
    experience: 12,
    languages: ['English', 'French'],
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with 12 years of experience. She specializes in preventive cardiology and heart failure management. Her patient-centered approach has earned her numerous awards and recognitions in the field.',
    consultationFee: 150,
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['09:00', '10:00', '11:00']
    },
    location: {
      address: '123 Medical Center Dr',
      city: 'Boston',
      country: 'USA'
    },
    acceptsInsurance: true,
    services: ['Cardiac consultations', 'ECG interpretations', 'Heart failure management', 'Preventive cardiology']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    avatar: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 98,
    education: [
      'MD, Stanford University School of Medicine',
      'Residency, University of California San Francisco',
      'Fellowship, Mayo Clinic'
    ],
    experience: 8,
    languages: ['English', 'Mandarin'],
    about: 'Dr. Michael Chen is a dermatologist specializing in cosmetic dermatology and skin cancer treatments. His approach combines the latest medical advances with traditional healing practices.',
    consultationFee: 120,
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['09:00', '10:00', '11:00']
    },
    location: {
      address: '456 Dermatology Clinic',
      city: 'San Francisco',
      country: 'USA'
    },
    acceptsInsurance: true,
    services: ['Skin cancer screenings', 'Acne treatment', 'Cosmetic procedures', 'Eczema management']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    avatar: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 156,
    education: [
      'MD, Yale School of Medicine',
      'Residency, Children\'s Hospital of Philadelphia',
      'Fellowship, Boston Children\'s Hospital'
    ],
    experience: 10,
    languages: ['English', 'Spanish'],
    about: 'Dr. Emily Rodriguez is a pediatrician with extensive experience in childhood development and behavioral pediatrics. Her gentle approach makes children feel comfortable during visits.',
    consultationFee: 100,
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Wednesday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Friday': ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    location: {
      address: '789 Children\'s Medical Center',
      city: 'New York',
      country: 'USA'
    },
    acceptsInsurance: true,
    services: ['Well-child visits', 'Vaccinations', 'Developmental assessments', 'Behavioral consultations']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    avatar: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 87,
    education: [
      'MD, Johns Hopkins School of Medicine',
      'Residency, Hospital for Special Surgery',
      'Fellowship, Andrews Sports Medicine & Orthopaedic Center'
    ],
    experience: 15,
    languages: ['English'],
    about: 'Dr. James Wilson is an orthopedic surgeon specializing in sports medicine and joint replacements. He has worked with several professional sports teams throughout his career.',
    consultationFee: 180,
    availability: {
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['09:00', '10:00', '11:00']
    },
    location: {
      address: '321 Orthopedic Institute',
      city: 'Chicago',
      country: 'USA'
    },
    acceptsInsurance: true,
    services: ['Joint replacements', 'Sports injury treatment', 'Rehabilitation therapy', 'Minimally invasive surgery']
  },
  {
    id: '5',
    name: 'Dr. Aisha Patel',
    specialty: 'Neurology',
    avatar: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 112,
    education: [
      'MD, University of Pennsylvania School of Medicine',
      'Residency, Massachusetts General Hospital',
      'Fellowship, Cleveland Clinic'
    ],
    experience: 9,
    languages: ['English', 'Hindi', 'Gujarati'],
    about: 'Dr. Aisha Patel is a neurologist specializing in headache disorders and multiple sclerosis. Her research has been published in several prestigious medical journals.',
    consultationFee: 170,
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['09:00', '10:00', '11:00', '14:00']
    },
    location: {
      address: '567 Neurology Center',
      city: 'Philadelphia',
      country: 'USA'
    },
    acceptsInsurance: true,
    services: ['Neurological evaluations', 'Headache management', 'Multiple sclerosis treatment', 'EEG interpretations']
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialty: 'Gynecology',
    avatar: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 134,
    education: [
      'MD, Columbia University College of Physicians and Surgeons',
      'Residency, New York-Presbyterian Hospital',
      'Fellowship, Memorial Sloan Kettering Cancer Center'
    ],
    experience: 11,
    languages: ['English', 'Korean'],
    about: 'Dr. Robert Kim is a gynecologist specializing in minimally invasive surgery and women\'s reproductive health. He is known for his compassionate care and excellent surgical outcomes.',
    consultationFee: 160,
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    location: {
      address: '890 Women\'s Health Center',
      city: 'Los Angeles',
      country: 'USA'
    },
    acceptsInsurance: true,
    services: ['Annual gynecological exams', 'Contraception counseling', 'Minimally invasive surgery', 'Fertility assessments']
  }
];

export const specialties: Specialty[] = [
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Gynecology',
  'Ophthalmology',
  'Psychiatry',
  'Oncology',
  'General Medicine'
];
