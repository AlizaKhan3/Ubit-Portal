export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'lecture' | 'assignment' | 'syllabus' | 'book' | 'software';
  courseId: string;
  url: string;
  uploadDate: string;
  fileSize?: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Computing - Lecture Slides',
    description: 'Lecture slides covering the basic concepts of computing, computer organization, and problem-solving.',
    type: 'lecture',
    courseId: '1',
    url: '/resources/CS101-Lecture1.pdf',
    uploadDate: '2025-01-15',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    title: 'Programming Fundamentals - Assignment 1',
    description: 'First assignment for CS-102 covering variables, data types, and basic operations in programming.',
    type: 'assignment',
    courseId: '2',
    url: '/resources/CS102-Assignment1.pdf',
    uploadDate: '2025-01-20',
    fileSize: '1.1 MB'
  },
  {
    id: '3',
    title: 'Database Management Systems - Course Syllabus',
    description: 'Detailed syllabus for CS-202 including course objectives, grading policy, and weekly schedule.',
    type: 'syllabus',
    courseId: '5',
    url: '/resources/CS202-Syllabus.pdf',
    uploadDate: '2025-01-10',
    fileSize: '680 KB'
  },
  {
    id: '4',
    title: 'Data Structures and Algorithms Textbook',
    description: 'Recommended textbook for CS-201: "Data Structures and Algorithm Analysis in C++" by Mark Allen Weiss.',
    type: 'book',
    courseId: '4',
    url: '/resources/DS-Textbook-Info.pdf',
    uploadDate: '2025-01-05',
    fileSize: '520 KB'
  },
  {
    id: '5',
    title: 'Software Engineering - Project Requirements',
    description: 'Detailed requirements document for the semester project in CS-301.',
    type: 'assignment',
    courseId: '6',
    url: '/resources/CS301-Project.pdf',
    uploadDate: '2025-02-15',
    fileSize: '1.8 MB'
  },
  {
    id: '6',
    title: 'DBMS Lab Software Installation Guide',
    description: 'Step-by-step guide for installing and configuring MySQL for database labs.',
    type: 'software',
    courseId: '5',
    url: '/resources/MySQL-Installation-Guide.pdf',
    uploadDate: '2025-01-18',
    fileSize: '1.2 MB'
  }
];