// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Home, BookOpen, Users, Bell, Download, MessageSquare, Settings } from 'lucide-react';
// import { useAppContext } from '../../context/AppContext';

// const Sidebar: React.FC = () => {
//   const { sidebarOpen } = useAppContext();

//   const navItems = [
//     { title: 'Home', path: '/', icon: <Home size={20} /> },
//     { title: 'Semesters', path: '/semesters', icon: <BookOpen size={20} /> },
//     { title: 'Faculty', path: '/faculty', icon: <Users size={20} /> },
//     { title: 'Announcements', path: '/announcements', icon: <Bell size={20} /> },
//     { title: 'Resources', path: '/resources', icon: <Download size={20} /> },
//     { title: 'Feedback', path: '/feedback', icon: <MessageSquare size={20} /> },
//     { title: 'Admin', path: '/admin', icon: <Settings size={20} /> },
//   ];

//   return (
//     <aside 
//       className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-20 ${
//         sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0 md:w-0'
//       }`}
//     >
//       <div className="py-6 px-4">
//         <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-4">
//           Navigation
//         </p>
//         <nav className="space-y-1">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) => `
//                 flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
//                 ${isActive 
//                   ? 'bg-primary-light/10 text-primary' 
//                   : 'text-gray-700 hover:bg-gray-100'
//                 }
//               `}
//             >
//               <span className="mr-3">{item.icon}</span>
//               <span>{item.title}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;