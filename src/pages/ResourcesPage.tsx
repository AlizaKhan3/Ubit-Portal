// import React, { useState } from 'react';
// import { Search, Filter, Download, FileText, BookOpen, FileCode, Book, Package } from 'lucide-react';
// import Card, { CardContent } from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import { resources } from '../data/resources';
// import { courses } from '../data/courses';

// type ResourceType = 'all' | 'lecture' | 'assignment' | 'syllabus' | 'book' | 'software';

// const ResourcesPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [typeFilter, setTypeFilter] = useState<ResourceType>('all');
//   const [courseFilter, setCourseFilter] = useState<string>('all');
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate authentication

//   // Filter resources based on search query, type, and course
//   const filteredResources = resources.filter(resource => {
//     const matchesQuery = searchQuery.trim() === '' ? true : 
//       resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//       resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesType = typeFilter === 'all' ? true : resource.type === typeFilter;
//     const matchesCourse = courseFilter === 'all' ? true : resource.courseId === courseFilter;
    
//     return matchesQuery && matchesType && matchesCourse;
//   });

//   // Helper function to get course name by id
//   const getCourseName = (courseId: string) => {
//     const course = courses.find(c => c.id === courseId);
//     return course ? `${course.code}: ${course.title}` : 'Unknown Course';
//   };

//   // Helper function to get resource type icon
//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case 'lecture':
//         return <FileText size={18} />;
//       case 'assignment':
//         return <FileCode size={18} />;
//       case 'syllabus':
//         return <BookOpen size={18} />;
//       case 'book':
//         return <Book size={18} />;
//       case 'software':
//         return <Package size={18} />;
//       default:
//         return <FileText size={18} />;
//     }
//   };

//   return (
//     <div className="pt-16 pb-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
//         <p className="text-gray-600">
//           Access lecture materials, assignments, and other educational resources
//         </p>
//       </div>

//       {!isLoggedIn ? (
//         <Card className="mb-8">
//           <CardContent className="text-center py-12">
//             <h2 className="text-2xl font-bold mb-4">Login Required</h2>
//             <p className="text-gray-600 mb-6 max-w-lg mx-auto">
//               Please log in to access course materials and resources. This helps us ensure that educational content is available only to enrolled students.
//             </p>
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={() => setIsLoggedIn(true)} // Simulate login
//             >
//               Login to Access Resources
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             {/* Search Input */}
//             <div className="relative flex-grow">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={18} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                 placeholder="Search resources..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             {/* Course Filter */}
//             <div className="relative md:w-1/4">
//               <select
//                 className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
//                 value={courseFilter}
//                 onChange={(e) => setCourseFilter(e.target.value)}
//               >
//                 <option value="all">All Courses</option>
//                 {courses.map(course => (
//                   <option key={course.id} value={course.id}>
//                     {course.code}: {course.title}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDown size={18} className="text-gray-400" />
//               </div>
//             </div>
//           </div>

//           {/* Type Filters */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             <button
//               className={`px-4 py-2 rounded-md ${
//                 typeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
//               }`}
//               onClick={() => setTypeFilter('all')}
//             >
//               All Types
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md flex items-center ${
//                 typeFilter === 'lecture' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
//               }`}
//               onClick={() => setTypeFilter('lecture')}
//             >
//               <FileText size={16} className="mr-2" />
//               Lectures
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md flex items-center ${
//                 typeFilter === 'assignment' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
//               }`}
//               onClick={() => setTypeFilter('assignment')}
//             >
//               <FileCode size={16} className="mr-2" />
//               Assignments
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md flex items-center ${
//                 typeFilter === 'syllabus' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
//               }`}
//               onClick={() => setTypeFilter('syllabus')}
//             >
//               <BookOpen size={16} className="mr-2" />
//               Syllabi
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md flex items-center ${
//                 typeFilter === 'book' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
//               }`}
//               onClick={() => setTypeFilter('book')}
//             >
//               <Book size={16} className="mr-2" />
//               Books
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md flex items-center ${
//                 typeFilter === 'software' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
//               }`}
//               onClick={() => setTypeFilter('software')}
//             >
//               <Package size={16} className="mr-2" />
//               Software
//             </button>
//           </div>

//           {/* Results Count */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center">
//               <Filter size={16} className="text-gray-500 mr-2" />
//               <span className="text-sm text-gray-600">
//                 {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
//               </span>
//             </div>
            
//             {(searchQuery || typeFilter !== 'all' || courseFilter !== 'all') && (
//               <button 
//                 className="text-sm text-primary hover:underline"
//                 onClick={() => {
//                   setSearchQuery('');
//                   setTypeFilter('all');
//                   setCourseFilter('all');
//                 }}
//               >
//                 Clear filters
//               </button>
//             )}
//           </div>

//           {/* Resources List */}
//           {filteredResources.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredResources.map(resource => (
//                 <Card key={resource.id} className="hover-scale">
//                   <CardContent>
//                     <div className="flex items-start mb-3">
//                       <div className={`
//                         w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0
//                         ${resource.type === 'lecture' ? 'bg-primary-light/10 text-primary' :
//                           resource.type === 'assignment' ? 'bg-error-light/10 text-error' :
//                           resource.type === 'syllabus' ? 'bg-accent-light/10 text-accent' :
//                           resource.type === 'book' ? 'bg-success-light/10 text-success' :
//                           'bg-secondary-light/10 text-secondary'}
//                       `}>
//                         {getTypeIcon(resource.type)}
//                       </div>
                      
//                       <div>
//                         <span className="text-sm text-gray-500 capitalize">
//                           {resource.type}
//                           {resource.fileSize && ` • ${resource.fileSize}`}
//                         </span>
//                         <h3 className="text-lg font-bold">{resource.title}</h3>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-600 mb-4">{resource.description}</p>
                    
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-gray-600">
//                         {getCourseName(resource.courseId)}
//                       </span>
                      
//                       <Button 
//                         variant="primary"
//                         size="sm"
//                         icon={<Download size={16} />}
//                         onClick={() => {
//                           // In a real application, this would download the file
//                           alert(`Downloading: ${resource.title}`);
//                         }}
//                       >
//                         Download
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center p-12 bg-gray-50 rounded-lg">
//               <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
//               <h3 className="text-xl font-bold mb-2">No Resources Found</h3>
//               <p className="text-gray-600">
//                 {searchQuery 
//                   ? `No resources match your search "${searchQuery}".` 
//                   : typeFilter !== 'all'
//                     ? `No ${typeFilter} resources available.`
//                     : courseFilter !== 'all'
//                       ? `No resources available for the selected course.`
//                       : 'No resources available at the moment.'}
//               </p>
//               <button 
//                 className="mt-4 text-primary hover:underline"
//                 onClick={() => {
//                   setSearchQuery('');
//                   setTypeFilter('all');
//                   setCourseFilter('all');
//                 }}
//               >
//                 Clear all filters
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const ChevronDown = ({ size, className }: { size: number, className?: string }) => {
//   return (
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       width={size} 
//       height={size} 
//       viewBox="0 0 24 24" 
//       fill="none" 
//       stroke="currentColor" 
//       strokeWidth="2" 
//       strokeLinecap="round" 
//       strokeLinejoin="round" 
//       className={className}
//     >
//       <path d="m6 9 6 6 6-6"/>
//     </svg>
//   );
// };

// export default ResourcesPage;



import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Download,
  FileText,
  BookOpen,
  FileCode,
  Book,
  Package,
} from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

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

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ResourceType>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:3001/courses')
      .then(res => res.json())
      .then(data => setCourses(data));

    fetch('http://localhost:3001/resources')
      .then(res => res.json())
      .then(data => setResources(data));
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesQuery = searchQuery.trim() === '' ? true :
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' ? true : resource.type === typeFilter;
    const matchesCourse = courseFilter === 'all' ? true : resource.courseId === courseFilter;

    return matchesQuery && matchesType && matchesCourse;
  });

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? `${course.code}: ${course.title}` : 'Unknown Course';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture': return <FileText size={18} />;
      case 'assignment': return <FileCode size={18} />;
      case 'syllabus': return <BookOpen size={18} />;
      case 'book': return <Book size={18} />;
      case 'software': return <Package size={18} />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="pt-16 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-gray-600">
          Access lecture materials, assignments, and other educational resources
        </p>
      </div>

      {!isLoggedIn ? (
        <Card className="mb-8">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Please log in to access course materials and resources.
            </p>
            <Button variant="primary" size="lg" onClick={() => setIsLoggedIn(true)}>
              Login to Access Resources
            </Button>
          </CardContent>
        </Card>
      ) : (
               <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Course Filter */}
            <div className="relative md:w-1/4">
              <select
                className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code}: {course.title}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-md ${
                typeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTypeFilter('all')}
            >
              All Types
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                typeFilter === 'lecture' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTypeFilter('lecture')}
            >
              <FileText size={16} className="mr-2" />
              Lectures
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                typeFilter === 'assignment' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTypeFilter('assignment')}
            >
              <FileCode size={16} className="mr-2" />
              Assignments
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                typeFilter === 'syllabus' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTypeFilter('syllabus')}
            >
              <BookOpen size={16} className="mr-2" />
              Syllabi
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                typeFilter === 'book' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTypeFilter('book')}
            >
              <Book size={16} className="mr-2" />
              Books
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                typeFilter === 'software' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTypeFilter('software')}
            >
              <Package size={16} className="mr-2" />
              Software
            </button>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
              </span>
            </div>
            
            {(searchQuery || typeFilter !== 'all' || courseFilter !== 'all') && (
              <button 
                className="text-sm text-primary hover:underline"
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setCourseFilter('all');
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Resources List */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map(resource => (
                <Card key={resource.id} className="hover-scale">
                  <CardContent>
                    <div className="flex items-start mb-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                        ${resource.type === 'lecture' ? 'bg-primary-light/10 text-primary' :
                          resource.type === 'assignment' ? 'bg-error-light/10 text-error' :
                          resource.type === 'syllabus' ? 'bg-accent-light/10 text-accent' :
                          resource.type === 'book' ? 'bg-success-light/10 text-success' :
                          'bg-secondary-light/10 text-secondary'}
                      `}>
                        {getTypeIcon(resource.type)}
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 capitalize">
                          {resource.type}
                          {resource.fileSize && ` • ${resource.fileSize}`}
                        </span>
                        <h3 className="text-lg font-bold">{resource.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {getCourseName(resource.courseId)}
                      </span>
                      
                      <Button 
                        variant="primary"
                        size="sm"
                        icon={<Download size={16} />}
                        onClick={() => {
                          // In a real application, this would download the file
                          alert(`Downloading: ${resource.title}`);
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">No Resources Found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? `No resources match your search "${searchQuery}".` 
                  : typeFilter !== 'all'
                    ? `No ${typeFilter} resources available.`
                    : courseFilter !== 'all'
                      ? `No resources available for the selected course.`
                      : 'No resources available at the moment.'}
              </p>
              <button 
                className="mt-4 text-primary hover:underline"
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setCourseFilter('all');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ChevronDown = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default ResourcesPage;
