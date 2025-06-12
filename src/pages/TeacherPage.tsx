// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Linkedin, Mail, BookOpen, Award } from 'lucide-react';
// import Card, { CardContent } from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import { teachers } from '../data/teachers';
// import { courses } from '../data/courses';

// const TeacherPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const teacher = teachers.find(t => t.id === id);
  
//   if (!teacher) {
//     return (
//       <div className="pt-24 text-center">
//         <h2 className="text-2xl font-bold mb-4">Teacher Not Found</h2>
//         <p className="mb-4">The teacher you are looking for does not exist.</p>
//         <Link to="/faculty">
//           <Button variant="primary">Back to Faculty</Button>
//         </Link>
//       </div>
//     );
//   }

//   // Get courses taught by this teacher
//   const teacherCourses = courses.filter(course => 
//     teacher.courses.includes(course.id) || course.teacherId === teacher.id
//   );

//   return (
//     <div className="pt-16 pb-8">
//       <div className="mb-6">
//         <Link to="/faculty" className="inline-flex items-center text-primary hover:underline mb-4">
//           <ArrowLeft size={16} className="mr-1" />
//           Back to Faculty
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Teacher Profile */}
//         <div className="md:col-span-1">
//           <Card>
//             <CardContent>
//               <div className="flex flex-col items-center">
//                 <img 
//                   src={teacher.photo} 
//                   alt={teacher.name} 
//                   className="w-48 h-48 object-cover rounded-full mb-4 border-4 border-white shadow-md"
//                 />
                
//                 <h1 className="text-2xl font-bold text-center mb-1">{teacher.name}</h1>
//                 <p className="text-gray-600 mb-4">{teacher.designation}</p>
                
//                 <div className="w-full border-t border-gray-100 my-4 pt-4">
//                   <div className="flex items-start mb-3">
//                     <Award size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium">Qualification</p>
//                       <p className="text-gray-600">{teacher.qualification}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start mb-3">
//                     <Mail size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium">Email</p>
//                       <a href={`mailto:${teacher.email}`} className="text-primary hover:underline">
//                         {teacher.email}
//                       </a>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <Linkedin size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium">LinkedIn</p>
//                       <a 
//                         href={teacher.linkedin} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-primary hover:underline"
//                       >
//                         View Profile
//                       </a>
//                     </div>
//                   </div>
//                 </div>
                
//                 <a 
//                   href={teacher.linkedin} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="w-full"
//                 >
//                   <Button 
//                     variant="outline" 
//                     fullWidth 
//                     icon={<Linkedin size={18} />}
//                   >
//                     Connect on LinkedIn
//                   </Button>
//                 </a>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Teacher Details */}
//         <div className="md:col-span-2">
//           <Card className="mb-6">
//             <CardContent>
//               <h2 className="text-2xl font-bold mb-4">About</h2>
//               <p className="text-gray-700 mb-6">{teacher.bio}</p>
              
//               <h3 className="text-xl font-bold mb-3">Areas of Expertise</h3>
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {teacher.expertise.map((area, index) => (
//                   <span 
//                     key={index} 
//                     className="bg-primary-light/10 text-primary px-3 py-1 rounded-full text-sm"
//                   >
//                     {area}
//                   </span>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <h2 className="text-2xl font-bold mb-4">Courses</h2>
//           {teacherCourses.length > 0 ? (
//             <div className="space-y-4">
//               {teacherCourses.map(course => (
//                 <Card key={course.id} className="hover-scale">
//                   <CardContent>
//                     <div className="flex justify-between items-start mb-3">
//                       <span className="inline-block bg-primary-light/10 text-primary px-2 py-1 rounded text-sm font-medium">
//                         {course.code}
//                       </span>
//                       <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
//                         Semester {course.semester}
//                       </span>
//                     </div>
                    
//                     <h3 className="text-xl font-bold mb-2">{course.title}</h3>
//                     <p className="text-gray-600 mb-3">{course.description}</p>
                    
//                     <div className="flex items-center text-gray-700">
//                       <BookOpen size={16} className="mr-2" />
//                       <span>{course.creditHours} Credit Hours</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-gray-50 p-6 rounded-lg text-center">
//               <p className="text-gray-600">No courses currently assigned to this teacher.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherPage;








import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, BookOpen } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import axios from 'axios';

interface Course {
  id: string;
  code: string;
  title: string;
  semester: number;
  creditHours: number;
  teacherId: string;
  description: string;
  teacherName?: string;
}

interface Faculty {
  id: number; // Updated to match database INT type
  name: string;
  designation: string;
  photo: string;
  linkedin?: string;
}

const TeacherPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<Faculty | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherAndCourses = async () => {
      try {
        // Fetch faculty and courses
        const [facultyRes, coursesRes] = await Promise.all([
          axios.get<Faculty[]>('http://localhost:3001/faculty'),
          axios.get<Course[]>('http://localhost:3001/courses'),
        ]);

        // Find teacher by id (ensure types match)
        const teacherData = facultyRes.data.find(f => f.id.toString() === id);
        if (!teacherData) {
          setTeacher(null);
          setCourses([]);
          setLoading(false);
          return;
        }

        // Filter courses taught by this teacher
        const teacherCourses = coursesRes.data.filter(
          course => course.teacherName === teacherData.name
        );

        setTeacher(teacherData);
        setCourses(teacherCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherAndCourses();
  }, [id]);

  // Handle missing teacher
  if (!teacher && !loading) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Teacher Not Found</h2>
        <Link to="/faculty">
          <Button variant="primary">Back to Faculty</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-8">
      <div className="mb-6">
        <Link to="/faculty" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Faculty
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Teacher Profile */}
        {teacher && (
          <div className="md:col-span-1">
            <Card>
              <CardContent>
                <div className="flex flex-col items-center">
                  <img
                    src={teacher.photo || '/assets/default-avatar.png'}
                    alt={teacher.name}
                    className="w-48 h-48 object-cover rounded-full mb-4 border-4 border-white shadow-md"
                  />
                  <h1 className="text-2xl font-bold text-center mb-1">{teacher.name}</h1>
                  <p className="text-gray-600 mb-4">{teacher.designation}</p>

                  {teacher.linkedin && (
                    <div className="w-full border-t border-gray-100 my-4 pt-4">
                      <div className="flex items-start">
                        <Linkedin size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <a
                            href={teacher.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Courses Taught */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Courses Taught</h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading courses...</div>
          ) : courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map(course => (
                <Card key={course.id} className="hover-scale">
                  <CardContent>
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block bg-primary-light/10 text-primary px-2 py-1 rounded text-sm font-medium">
                        {course.code}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        Semester {course.semester}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-3">{course.description}</p>
                    <div className="flex items-center text-gray-700">
                      <BookOpen size={16} className="mr-2" />
                      <span>{course.creditHours} Credit Hours</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-600">No courses currently assigned to this teacher.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
