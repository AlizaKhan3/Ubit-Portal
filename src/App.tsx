import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SemesterPage from './pages/SemesterPage';
import TeacherPage from './pages/TeacherPage';
import FacultyPage from './pages/FacultyPage';
import FeedbackPage from './pages/FeedbackPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ResourcesPage from './pages/ResourcesPage';
import AdminPage from './pages/AdminPage';
import { AppProvider } from './context/AppContext';
import './styles/animations.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/semesters" element={<SemesterPage />} />
            <Route path="/teachers/:id" element={<TeacherPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;