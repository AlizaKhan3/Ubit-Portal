// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, Filter, ArrowUpRight } from 'lucide-react';
// import Card, { CardContent } from '../components/ui/Card';
// import { teachers } from '../data/teachers';

// type FilterOption = 'all' | 'professor' | 'associate' | 'assistant';

// const FacultyPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState<FilterOption>('all');

//   // Filter teachers based on search query and designation filter
//   const filteredTeachers = teachers.filter(teacher => {
//     const matchesQuery = searchQuery.trim() === '' ? true : 
//       teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//       teacher.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));

//     let matchesFilter = true;
//     if (filter === 'professor') {
//       matchesFilter = teacher.designation.toLowerCase().includes('professor') && !teacher.designation.toLowerCase().includes('associate') && !teacher.designation.toLowerCase().includes('assistant');
//     } else if (filter === 'associate') {
//       matchesFilter = teacher.designation.toLowerCase().includes('associate');
//     } else if (filter === 'assistant') {
//       matchesFilter = teacher.designation.toLowerCase().includes('assistant');
//     }

//     return matchesQuery && matchesFilter;
//   });

//   return (
//     <div className="pt-16 pb-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
//         <p className="text-gray-600">
//           Meet our experienced faculty members and explore their areas of expertise
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         {/* Search Input */}
//         <div className="relative flex-grow">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search size={18} className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             placeholder="Search by name or expertise..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Filter Dropdown */}
//         <div className="flex space-x-2">
//           <button
//             className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
//             onClick={() => setFilter('all')}
//           >
//             All
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md ${filter === 'professor' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
//             onClick={() => setFilter('professor')}
//           >
//             Professors
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md ${filter === 'associate' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
//             onClick={() => setFilter('associate')}
//           >
//             Associate
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md ${filter === 'assistant' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
//             onClick={() => setFilter('assistant')}
//           >
//             Assistant
//           </button>
//         </div>
//       </div>

//       {/* Filters and Results Count */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           <Filter size={16} className="text-gray-500 mr-2" />
//           <span className="text-sm text-gray-600">
//             {filteredTeachers.length} {filteredTeachers.length === 1 ? 'faculty member' : 'faculty members'} found
//           </span>
//         </div>

//         {(searchQuery || filter !== 'all') && (
//           <button 
//             className="text-sm text-primary hover:underline"
//             onClick={() => {
//               setSearchQuery('');
//               setFilter('all');
//             }}
//           >
//             Clear filters
//           </button>
//         )}
//       </div>

//       {/* Faculty Cards */}
//       {filteredTeachers.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTeachers.map(teacher => (
//             <Card key={teacher.id} className="hover-scale">
//               <CardContent>
//                 <div className="flex flex-col items-center mb-4">
//                   <img 
//                     src={teacher.photo} 
//                     alt={teacher.name} 
//                     className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-white shadow-md"
//                   />
//                   <h3 className="text-xl font-bold text-center">{teacher.name}</h3>
//                   <p className="text-gray-600 mb-2">{teacher.designation}</p>

//                   <div className="flex flex-wrap justify-center gap-2 mb-3">
//                     {teacher.expertise.slice(0, 2).map((area, index) => (
//                       <span 
//                         key={index} 
//                         className="bg-primary-light/10 text-primary px-2 py-0.5 rounded-full text-xs"
//                       >
//                         {area}
//                       </span>
//                     ))}
//                     {teacher.expertise.length > 2 && (
//                       <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
//                         +{teacher.expertise.length - 2} more
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <a
//                     href={`mailto:${teacher.email}`}
//                     className="text-sm text-gray-600 hover:text-primary"
//                   >
//                     {teacher.email}
//                   </a>

//                   <Link 
//                     to={`/teachers/${teacher.id}`}
//                     className="flex items-center text-primary hover:underline text-sm font-medium"
//                   >
//                     View Profile
//                     <ArrowUpRight size={14} className="ml-1" />
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center p-12 bg-gray-50 rounded-lg">
//           <h3 className="text-xl font-bold mb-2">No Faculty Members Found</h3>
//           <p className="text-gray-600">
//             {searchQuery 
//               ? `No faculty members match your search "${searchQuery}".` 
//               : 'No faculty members available with the selected filter.'}
//           </p>
//           <button 
//             className="mt-4 text-primary hover:underline"
//             onClick={() => {
//               setSearchQuery('');
//               setFilter('all');
//             }}
//           >
//             Clear all filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import axios from 'axios';

type FilterOption = 'all' | 'lecturer' | 'associate' | 'assistant';

type Teacher = {
  id: number;
  name: string;
  designation: string;
  photo: string;
};

const FacultyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/faculty', {
          params: {
            designation: filter,
            search: searchQuery
          }
        });
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [searchQuery, filter]);

  return (
    <div className="pt-16 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
        <p className="text-gray-600">
          Meet our experienced faculty members
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          {['all', 'lecturer', 'associate', 'assistant'].map((role) => (
            <button
              key={role}
              className={`px-4 py-2 rounded-md ${filter === role ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setFilter(role as FilterOption)}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Filter size={16} className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">
            {teachers.length} {teachers.length === 1 ? 'faculty member' : 'faculty members'} found
          </span>
        </div>

        {(searchQuery || filter !== 'all') && (
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => {
              setSearchQuery('');
              setFilter('all');
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : teachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(teacher => (
            <Card key={teacher.id} className="hover-scale">
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={teacher.photo || "/assets/default-avatar.png"}
                    onError={(e) => (e.currentTarget.src = "/assets/default-avatar.png")}
                    alt={teacher.name}
                    className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-white shadow-md"
                  />
                  <h3 className="text-xl font-bold text-center">{teacher.name}</h3>
                  <p className="text-gray-600 mb-2">{teacher.designation}</p>
                </div>

                <div className="flex justify-end">
                  <Link
                    to={`/teachers/${teacher.id}`}
                    className="flex items-center text-primary hover:underline text-sm font-medium"
                  >
                    View Profile
                    <ArrowUpRight size={14} className="ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">No Faculty Members Found</h3>
          <p className="text-gray-600">
            {searchQuery
              ? `No faculty members match your search "${searchQuery}".`
              : 'No faculty members available with the selected filter.'}
          </p>
          <button
            className="mt-4 text-primary hover:underline"
            onClick={() => {
              setSearchQuery('');
              setFilter('all');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;


// import mk as "../assets/bs.jpeg"