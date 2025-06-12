export interface Teacher {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  expertise: string[];
  bio: string;
  email: string;
  photo: string;
  linkedin: string;
  courses: string[];
}

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    designation: 'Associate Professor',
    qualification: 'PhD in Computer Science, MIT',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Mining'],
    bio: 'Dr. Sarah Ahmed has over 15 years of experience in computer science research and teaching. She has published numerous papers in top-tier conferences and journals in the field of artificial intelligence and machine learning.',
    email: 'sarah.ahmed@ubit.edu',
    photo: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: 'https://linkedin.com/in/sarahahmed',
    courses: ['CS-101', 'CS-301']
  },
  {
    id: '2',
    name: 'Dr. Muhammad Khan',
    designation: 'Professor',
    qualification: 'PhD in Computer Engineering, Stanford University',
    expertise: ['Computer Architecture', 'Operating Systems', 'Distributed Computing'],
    bio: 'Dr. Muhammad Khan is a renowned expert in computer systems with more than 20 years of academic and industry experience. He has led multiple research projects funded by national and international organizations.',
    email: 'muhammad.khan@ubit.edu',
    photo: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: 'https://linkedin.com/in/muhammadkhan',
    courses: ['CS-102', 'CS-302']
  },
  {
    id: '3',
    name: 'Dr. Fatima Hassan',
    designation: 'Assistant Professor',
    qualification: 'PhD in Mathematics, Oxford University',
    expertise: ['Calculus', 'Linear Algebra', 'Numerical Methods'],
    bio: 'Dr. Fatima Hassan specializes in applied mathematics with applications in computer science. She has been teaching mathematics courses for computer science students for over 10 years.',
    email: 'fatima.hassan@ubit.edu',
    photo: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: 'https://linkedin.com/in/fatimahassan',
    courses: ['MTH-101']
  },
  {
    id: '4',
    name: 'Dr. Ali Raza',
    designation: 'Associate Professor',
    qualification: 'PhD in Computer Science, Carnegie Mellon University',
    expertise: ['Algorithms', 'Data Structures', 'Artificial Intelligence'],
    bio: 'Dr. Ali Raza is an expert in algorithm design and analysis. His research focuses on efficient algorithms for various computational problems and their applications in artificial intelligence.',
    email: 'ali.raza@ubit.edu',
    photo: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: 'https://linkedin.com/in/aliraza',
    courses: ['CS-201', 'CS-401']
  },
  {
    id: '5',
    name: 'Dr. Aisha Malik',
    designation: 'Assistant Professor',
    qualification: 'PhD in Information Systems, University of California',
    expertise: ['Database Systems', 'Information Retrieval', 'Data Warehousing'],
    bio: 'Dr. Aisha Malik has extensive experience in database management systems and data analytics. She has worked with several organizations on designing and optimizing database systems.',
    email: 'aisha.malik@ubit.edu',
    photo: 'https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: 'https://linkedin.com/in/aishamalik',
    courses: ['CS-202']
  }
];