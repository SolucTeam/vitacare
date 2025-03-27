
import React, { useState } from 'react';
import AppointmentCard from '@/components/common/AppointmentCard';
import { doctors } from '@/data/doctors';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { Appointment, AppointmentStatus } from '@/types';
import { Link } from 'react-router-dom';

// Sample appointments data
const sampleAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    date: 'Monday, June 12, 2023',
    time: '10:00',
    type: 'video',
    status: 'upcoming',
    symptoms: 'Chest pain and shortness of breath',
    notes: 'Please bring previous test results'
  },
  {
    id: '2',
    doctorId: '3',
    date: 'Wednesday, June 14, 2023',
    time: '15:30',
    type: 'in-person',
    status: 'upcoming'
  },
  {
    id: '3',
    doctorId: '2',
    date: 'Friday, May 26, 2023',
    time: '09:00',
    type: 'video',
    status: 'completed'
  },
  {
    id: '4',
    doctorId: '5',
    date: 'Tuesday, May 23, 2023',
    time: '11:30',
    type: 'phone',
    status: 'cancelled'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<AppointmentStatus | 'all'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter appointments based on active tab
  const filteredAppointments = activeTab === 'all' 
    ? sampleAppointments
    : sampleAppointments.filter(appointment => appointment.status === activeTab);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        {/* Sidebar - Mobile Toggle */}
        <div className="lg:hidden fixed z-20 top-20 left-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-md"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        
        {/* Sidebar */}
        <aside
          className={`fixed z-10 inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 pt-20 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-4 py-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600 text-sm">john.doe@example.com</p>
            </div>
            
            <nav className="space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-3 text-gray-900 bg-gray-100 rounded-lg"
              >
                <Calendar className="w-5 h-5 mr-3 text-medical-600" />
                <span>Appointments</span>
              </Link>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
              >
                <FileText className="w-5 h-5 mr-3 text-gray-400" />
                <span>Medical Records</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
              >
                <User className="w-5 h-5 mr-3 text-gray-400" />
                <span>Profile</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-400" />
                <span>Settings</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-3 text-gray-400" />
                <span>Logout</span>
              </a>
            </nav>
          </div>
        </aside>
        
        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 ml-0 lg:ml-64 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">My Appointments</h1>
                  <p className="text-gray-600">Manage your upcoming and past appointments</p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-sm relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <Link
                    to="/search"
                    className="px-4 py-2 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Book New
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-4">
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-medical-500 focus:border-medical-500"
                    />
                  </div>
                </div>
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 py-3 text-sm font-medium ${
                      activeTab === 'all'
                        ? 'text-medical-600 border-b-2 border-medical-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    All Appointments
                  </button>
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`flex-1 py-3 text-sm font-medium ${
                      activeTab === 'upcoming'
                        ? 'text-medical-600 border-b-2 border-medical-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`flex-1 py-3 text-sm font-medium ${
                      activeTab === 'completed'
                        ? 'text-medical-600 border-b-2 border-medical-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setActiveTab('cancelled')}
                    className={`flex-1 py-3 text-sm font-medium ${
                      activeTab === 'cancelled'
                        ? 'text-medical-600 border-b-2 border-medical-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
            
            {filteredAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAppointments.map((appointment) => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId);
                  if (!doctor) return null;
                  
                  return (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      doctor={doctor}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {activeTab === 'all'
                    ? "You don't have any appointments yet."
                    : activeTab === 'upcoming'
                    ? "You don't have any upcoming appointments."
                    : activeTab === 'completed'
                    ? "You don't have any completed appointments."
                    : "You don't have any cancelled appointments."}
                </p>
                <Link
                  to="/search"
                  className="px-6 py-3 bg-medical-600 text-white font-medium rounded-lg hover:bg-medical-700 transition-colors inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Book an Appointment
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
