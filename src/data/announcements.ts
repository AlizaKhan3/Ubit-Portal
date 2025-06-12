export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'academic' | 'event' | 'exam' | 'general';
  authorId: string;
  important?: boolean;
}

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Fall 2025 Registration Open',
    content: 'Registration for Fall 2025 semester is now open. Students are advised to register for courses through the university portal before July 31, 2025. Late registration will incur additional fees.',
    date: '2025-07-01',
    category: 'academic',
    authorId: '1',
    important: true
  },
  {
    id: '2',
    title: 'Midterm Examination Schedule',
    content: 'The midterm examinations for Spring 2025 will be held from March 15 to March 25, 2025. The detailed schedule for each course is available on the department notice board and has been emailed to all registered students.',
    date: '2025-02-28',
    category: 'exam',
    authorId: '2',
    important: true
  },
  {
    id: '3',
    title: 'Guest Lecture: Artificial Intelligence in Healthcare',
    content: 'We are pleased to announce a guest lecture on "Artificial Intelligence Applications in Healthcare" by Dr. James Wilson from Harvard Medical School. The lecture will be held on April 10, 2025, at 2:00 PM in the Main Auditorium.',
    date: '2025-04-01',
    category: 'event',
    authorId: '4'
  },
  {
    id: '4',
    title: 'Summer Internship Opportunities',
    content: 'Several companies have opened applications for summer internships for UBIT students. Interested students can check the details and apply through the Career Portal. The deadline for most applications is May 15, 2025.',
    date: '2025-04-15',
    category: 'general',
    authorId: '5'
  },
  {
    id: '5',
    title: 'System Maintenance Notification',
    content: 'The university portal will be unavailable due to scheduled maintenance on Saturday, May 5, 2025, from 10:00 PM to 2:00 AM. We apologize for any inconvenience caused.',
    date: '2025-05-01',
    category: 'general',
    authorId: '3'
  }
];