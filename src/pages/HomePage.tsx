import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Users, Bell, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { announcements } from '../data/announcements';
import deptImg from '../../public/assets/ubit.jpeg'

const HomePage: React.FC = () => {
  // Get only important or recent announcements for the homepage
  const featuredAnnouncements = announcements
    .filter(a => a.important || new Date(a.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    .slice(0, 3);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4 rounded-lg mb-12">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 slide-up">
              Welcome to UBIT Portal
            </h1>
            <p className="text-xl mb-8 opacity-90 slide-up" style={{ animationDelay: '0.1s' }}>
              Department of Computer Science, University of Karachi
            </p>
            <p className="mb-8 slide-up" style={{ animationDelay: '0.2s' }}>
              Access course materials, connect with faculty, and stay updated with the latest announcements
              from the Department of Computer Science.
            </p>
            <div className="flex flex-wrap gap-4 slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/semesters">
                <Button variant="accent" size="lg" icon={<BookOpen size={18} />}>
                  Browse Courses
                </Button>
              </Link>
              <Link to="/faculty">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white">
                  Meet Our Faculty
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore UBIT Portal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-scale">
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary-light/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Course Materials</h3>
                  <p className="text-gray-600 mb-4">
                    Access semester-wise course details, syllabi, and educational resources.
                  </p>
                  <Link to="/semesters" className="text-primary font-medium flex items-center">
                    Browse Courses <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-secondary-light/10 rounded-full flex items-center justify-center text-secondary mb-4">
                    <Users size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Faculty Directory</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about our experienced faculty members and their areas of expertise.
                  </p>
                  <Link to="/faculty" className="text-secondary font-medium flex items-center">
                    View Faculty <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent-light/10 rounded-full flex items-center justify-center text-accent mb-4">
                    <Bell size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Announcements</h3>
                  <p className="text-gray-600 mb-4">
                    Stay updated with the latest news, events, and important notifications.
                  </p>
                  <Link to="/announcements" className="text-accent font-medium flex items-center">
                    View Updates <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-success-light/10 rounded-full flex items-center justify-center text-success mb-4">
                    <MessageSquare size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Student Feedback</h3>
                  <p className="text-gray-600 mb-4">
                    Share your thoughts and suggestions to help us improve our services.
                  </p>
                  <Link to="/feedback" className="text-success font-medium flex items-center">
                    Submit Feedback <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About UBIT Section */}
      <section className="mb-12 bg-gray-50 py-12 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">About UBIT</h2>
              <p className="mb-4 text-gray-700">
                The Department of Computer Science (UBIT) at the University of Karachi is committed to excellence in teaching and research in the field of computer science and information technology.
              </p>
              <p className="mb-4 text-gray-700">
                Founded in 1985, UBIT has grown to become one of the leading computer science departments in the country, offering undergraduate and graduate programs that prepare students for successful careers in the tech industry and academia.
              </p>
              <p className="text-gray-700">
                Our programs combine theoretical knowledge with practical skills, ensuring that our graduates are well-equipped to meet the challenges of the rapidly evolving technological landscape.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={deptImg}
                alt="UBIT Campus" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Announcements Section */}
      <section className="mb-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Announcements</h2>
            <Link to="/announcements" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="hover-scale">
                <CardContent>
                  <div className="flex items-center mb-3">
                    <span className={`
                      w-3 h-3 rounded-full mr-2
                      ${announcement.category === 'academic' ? 'bg-primary' :
                        announcement.category === 'exam' ? 'bg-error' :
                        announcement.category === 'event' ? 'bg-accent' : 'bg-secondary'}
                    `}></span>
                    <span className="text-sm text-gray-500 capitalize">{announcement.category}</span>
                    
                    {announcement.important && (
                      <span className="ml-auto bg-error-light text-error text-xs px-2 py-1 rounded-full">
                        Important
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {announcement.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(announcement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <Link to={`/announcements#${announcement.id}`} className="text-primary hover:underline">
                      Read More
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;