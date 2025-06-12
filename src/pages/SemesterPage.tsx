import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  FileCode,
  BookOpen,
  Book,
  Package,
} from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

// Types
interface Course {
  id: string;
  code: string;
  title: string;
  semester: number;
  creditHours: number;
  teacherId: string;
  description: string;
}

interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  fileSize?: string;
  courseId: string;
}

type ResourceType = 'all' | 'lecture' | 'assignment' | 'syllabus' | 'book' | 'software';

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<ResourceType>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  // Fetch courses when selectedSemester changes
  useEffect(() => {
    let url = 'http://localhost:3001/courses';
    if (selectedSemester) {
      url += `?semester=${selectedSemester}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Course fetch error:', data.error || 'Invalid response');
          setCourses([]); // fallback to avoid crash
        }
      })
      .catch((err) => {
        console.error('Course fetch failed:', err);
        setCourses([]); // fallback
      });
  }, [selectedSemester]);


  // Fetch all resources once
  useEffect(() => {
    fetch('http://localhost:3001/resources')
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error('Resource fetch error:', err));
      console.log('Selected semester changed:', selectedSemester);
  }, []);

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const matchesSemester = selectedSemester ? course.semester === selectedSemester : true;
    const matchesQuery =
      searchQuery.trim() === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesQuery;
  });

  const filteredResources = resources.filter((resource) => {
    const matchesQuery =
      searchQuery.trim() === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' ? true : resource.type === typeFilter;
    const matchesCourse = courseFilter === 'all' ? true : resource.courseId === courseFilter;
    return matchesQuery && matchesType && matchesCourse;
  });

  // Helpers
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? `${course.code}: ${course.title}` : 'Unknown Course';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return <FileText size={18} />;
      case 'assignment':
        return <FileCode size={18} />;
      case 'syllabus':
        return <BookOpen size={18} />;
      case 'book':
        return <Book size={18} />;
      case 'software':
        return <Package size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  // UI
  return (
    <div className="pt-16 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Browse courses and learning resources by semester or search for specific items.
        </p>
      </div>

      {/* Login Prompt */}
      {!isLoggedIn ? (
        <Card className="mb-8">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please log in to access course and resource materials.
            </p>
            <Button variant="primary" size="lg" onClick={() => setIsLoggedIn(true)}>
              Login to Access
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Semester Dropdown */}
          <div className="mb-6">
            <label htmlFor="semester" className="block mb-2 font-semibold">Select Semester</label>
            <select
              id="semester"
              value={selectedSemester ?? ''}
              onChange={(e) =>
                setSelectedSemester(e.target.value ? parseInt(e.target.value) : null)
              }
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative md:w-2/3 mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              placeholder="Search by title or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtered Courses */}
          <h2 className="text-xl font-bold mb-4">Filtered Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id}>
                <CardContent>
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filtered Resources */}
          <h2 className="text-xl font-bold mt-8 mb-4">Filtered Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(resource.type)}
                    <h3 className="text-lg font-bold">{resource.title}</h3>
                  </div>
                  <p className="text-gray-600">{resource.description}</p>
                  <p className="text-sm text-gray-400 mt-1 italic">
                    {getCourseName(resource.courseId)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
