import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Calendar, AlertCircle, Megaphone, BookOpen, Flag } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'event' | 'exam' | 'general';
  authorName: string;
  authorPhoto: string;
  important: boolean;
  createdAt: string;
  updatedAt: string;
}

type AnnouncementCategory = 'all' | 'academic' | 'event' | 'exam' | 'general';

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<AnnouncementCategory>('all');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get<Announcement[]>('http://localhost:3001/announcements');
        setAnnouncements(response.data);
        console.log('Fetched Announcements:', response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const sortedAnnouncements = [...announcements].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredAnnouncements = sortedAnnouncements.filter((announcement) => {
    const matchesQuery = searchQuery.trim() === '' || 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <BookOpen size={18} />;
      case 'event':
        return <Calendar size={18} />;
      case 'exam':
        return <AlertCircle size={18} />;
      default:
        return <Megaphone size={18} />;
    }
  };

  return (
    <div className="pt-16 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-gray-600">
          Stay updated with the latest news, events, and academic announcements
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {['all', 'academic', 'event', 'exam', 'general'].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                categoryFilter === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCategoryFilter(cat as AnnouncementCategory)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      {filteredAnnouncements.length > 0 ? (
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`${
                announcement.important ? 'border-l-4 border-error' : ''
              } hover:shadow-lg transition-shadow duration-300`}
            >
              <CardContent>
                <div className="flex items-center mb-3">
                  <img
                    src={announcement.authorPhoto}
                    alt={announcement.authorName}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <span className="text-sm text-gray-500 capitalize">{announcement.category}</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">{announcement.createdAt}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">By {announcement.authorName}</span>
                    </div>
                  </div>
                </div>
                {announcement.important && (
                  <span className="ml-auto flex items-center bg-error-light/10 text-error text-xs px-3 py-1 rounded-full">
                    <Flag size={12} className="mr-1" />
                    Important
                  </span>
                )}
                <h3 className="text-xl font-bold mb-3">{announcement.title}</h3>
                <p className="text-gray-700 mb-4 whitespace-pre-line">{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <Megaphone size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">No Announcements Found</h3>
          <p className="text-gray-600">
            {searchQuery ? `No announcements match your search "${searchQuery}".` : 'No announcements available at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
