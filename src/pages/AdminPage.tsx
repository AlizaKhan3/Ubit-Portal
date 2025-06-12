import React, { useState } from 'react';
import { Users, BookOpen, Bell, MessageSquare, Settings } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

type AdminTab = 'dashboard' | 'courses' | 'faculty' | 'announcements' | 'feedback';

const AdminPage: React.FC = () => {
  const { isLoggedIn } = useAppContext();
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [showLogin, setShowLogin] = useState(!isLoggedIn);

  // Simulated login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would verify credentials
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <div className="pt-24 pb-12 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <h2 className="text-2xl font-bold mb-1">Admin Login</h2>
            <p className="text-gray-600">
              Please login to access the admin dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>
              
              <Button type="submit" variant="primary" fullWidth>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage courses, faculty, announcements, and monitor system activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="divide-y divide-gray-100">
                <button
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    currentTab === 'dashboard' ? 'bg-primary-light/10 text-primary border-l-4 border-primary' : 'text-gray-700'
                  }`}
                  onClick={() => setCurrentTab('dashboard')}
                >
                  <Settings size={20} className="mr-3" />
                  Dashboard
                </button>
                
                <button
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    currentTab === 'courses' ? 'bg-primary-light/10 text-primary border-l-4 border-primary' : 'text-gray-700'
                  }`}
                  onClick={() => setCurrentTab('courses')}
                >
                  <BookOpen size={20} className="mr-3" />
                  Courses
                </button>
                
                <button
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    currentTab === 'faculty' ? 'bg-primary-light/10 text-primary border-l-4 border-primary' : 'text-gray-700'
                  }`}
                  onClick={() => setCurrentTab('faculty')}
                >
                  <Users size={20} className="mr-3" />
                  Faculty
                </button>
                
                <button
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    currentTab === 'announcements' ? 'bg-primary-light/10 text-primary border-l-4 border-primary' : 'text-gray-700'
                  }`}
                  onClick={() => setCurrentTab('announcements')}
                >
                  <Bell size={20} className="mr-3" />
                  Announcements
                </button>
                
                <button
                  className={`w-full text-left px-6 py-4 flex items-center ${
                    currentTab === 'feedback' ? 'bg-primary-light/10 text-primary border-l-4 border-primary' : 'text-gray-700'
                  }`}
                  onClick={() => setCurrentTab('feedback')}
                >
                  <MessageSquare size={20} className="mr-3" />
                  Feedback
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {currentTab === 'dashboard' && <AdminDashboard />}
          {currentTab === 'courses' && <AdminCourses />}
          {currentTab === 'faculty' && <AdminFaculty />}
          {currentTab === 'announcements' && <AdminAnnouncements />}
          {currentTab === 'feedback' && <AdminFeedback />}
        </div>
      </div>
    </div>
  );
};

// Dashboard Tab
const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Students', value: 1248, icon: <Users size={24} className="text-primary" /> },
    { title: 'Courses', value: 48, icon: <BookOpen size={24} className="text-secondary" /> },
    { title: 'Faculty Members', value: 32, icon: <Users size={24} className="text-accent" /> },
    { title: 'Announcements', value: 18, icon: <Bell size={24} className="text-error" /> }
  ];

  return (
    <div>
      <Card className="mb-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6">System Overview</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">Recent Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                <div>
                  <p className="font-medium">New Course Added</p>
                  <p className="text-sm text-gray-600">CS-402: Machine Learning</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2 mr-2"></span>
                <div>
                  <p className="font-medium">Faculty Updated</p>
                  <p className="text-sm text-gray-600">Dr. Ahmed Khan's profile updated</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 mr-2"></span>
                <div>
                  <p className="font-medium">New Announcement</p>
                  <p className="text-sm text-gray-600">Fall 2025 Registration Open</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">System Health</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Server Load</span>
                  <span className="text-sm text-gray-600">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database Usage</span>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-gray-600">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-600">Last backup: Today at 03:00 AM</p>
                <p className="text-sm text-gray-600">Next scheduled backup: Tomorrow at 03:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Admin Courses Tab (Simplified)
const AdminCourses: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Courses</h2>
          <Button variant="primary" size="sm">Add New Course</Button>
        </div>
        
        <p className="text-gray-600 mb-4">
          This interface would allow administrators to manage course information, including:
        </p>
        
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
          <li>Adding new courses to the system</li>
          <li>Editing existing course details</li>
          <li>Assigning teachers to courses</li>
          <li>Managing course materials and resources</li>
          <li>Setting up semester schedules</li>
        </ul>
        
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Course management interface would be implemented here in a complete application
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Admin Faculty Tab (Simplified)
const AdminFaculty: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Faculty</h2>
          <Button variant="primary" size="sm">Add New Faculty</Button>
        </div>
        
        <p className="text-gray-600 mb-4">
          This interface would allow administrators to manage faculty information, including:
        </p>
        
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
          <li>Adding new faculty members</li>
          <li>Updating faculty profiles and credentials</li>
          <li>Managing teaching assignments</li>
          <li>Setting up office hours and contact information</li>
        </ul>
        
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Faculty management interface would be implemented here in a complete application
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Admin Announcements Tab (Simplified)
const AdminAnnouncements: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Announcements</h2>
          <Button variant="primary" size="sm">Create Announcement</Button>
        </div>
        
        <p className="text-gray-600 mb-4">
          This interface would allow administrators to manage announcements, including:
        </p>
        
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
          <li>Creating new announcements</li>
          <li>Editing or removing existing announcements</li>
          <li>Setting priority levels (regular or important)</li>
          <li>Scheduling announcements for future publication</li>
          <li>Targeting announcements to specific semesters or courses</li>
        </ul>
        
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Announcement management interface would be implemented here in a complete application
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Admin Feedback Tab (Simplified)
const AdminFeedback: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Student Feedback</h2>
        </div>
        
        <p className="text-gray-600 mb-4">
          This interface would allow administrators to review and respond to student feedback, including:
        </p>
        
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
          <li>Viewing all submitted feedback</li>
          <li>Filtering feedback by type, date, or status</li>
          <li>Responding to student inquiries</li>
          <li>Tracking resolved and pending feedback items</li>
          <li>Generating reports on common feedback themes</li>
        </ul>
        
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Feedback management interface would be implemented here in a complete application
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;