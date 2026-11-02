import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingScreen } from './components/common/LoadingScreen';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { StudentLayout } from './layouts/StudentLayout';
import { TeacherLayout } from './layouts/TeacherLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { MarketplacePage } from './pages/public/MarketplacePage';
import { TeacherProfilePage } from './pages/public/TeacherProfilePage';
import { BecomeTeacherPage } from './pages/public/BecomeTeacherPage';
import { PricingPage } from './pages/public/PricingPage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';

// Micro-Learning Pages
import { LearningHomePage } from './pages/learning/LearningHomePage';
import { LessonPlayerPage } from './pages/learning/LessonPlayerPage';

// Virtual Classroom Page
import { ClassroomPage } from './pages/classroom/ClassroomPage';

// Student Portal Pages
import { StudentOverviewPage } from './pages/student/StudentOverviewPage';
import { StudentTeachersPage } from './pages/student/StudentTeachersPage';
import { StudentLessonsPage } from './pages/student/StudentLessonsPage';
import { StudentProgressPage } from './pages/student/StudentProgressPage';
import { StudentMessagesPage } from './pages/student/StudentMessagesPage';
import { StudentSettingsPage } from './pages/student/StudentSettingsPage';

// Teacher Studio Pages
import { TeacherOverviewPage } from './pages/teacher/TeacherOverviewPage';
import { TeacherStudentsPage } from './pages/teacher/TeacherStudentsPage';
import { TeacherSchedulePage } from './pages/teacher/TeacherSchedulePage';
import { TeacherLessonsPage } from './pages/teacher/TeacherLessonsPage';
import { TeacherMessagesPage } from './pages/teacher/TeacherMessagesPage';
import { TeacherEarningsPage } from './pages/teacher/TeacherEarningsPage';
import { TeacherProfileEditorPage } from './pages/teacher/TeacherProfileEditorPage';
import { TeacherSettingsPage } from './pages/teacher/TeacherSettingsPage';

// Admin Portal Pages
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminTeachersPage } from './pages/admin/AdminTeachersPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminLearningCMSPage } from './pages/admin/AdminLearningCMSPage';
import { AdminLessonEditorPage } from './pages/admin/AdminLessonEditorPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ToastProvider>
      <DemoProvider>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        <BrowserRouter>
          <Routes>
            {/* Public Layout */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="teachers" element={<MarketplacePage />} />
              <Route path="teachers/:id" element={<TeacherProfilePage />} />
              <Route path="become-a-teacher" element={<BecomeTeacherPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Micro-Learning Path */}
            <Route path="/learn" element={<PublicLayout />}>
              <Route index element={<LearningHomePage />} />
            </Route>
            <Route path="/learn/lesson/:lessonId" element={<LessonPlayerPage />} />

            {/* Live Virtual Classroom (Stand-alone focused dark layout) */}
            <Route path="/classroom/:lessonId" element={<ClassroomPage />} />

            {/* Student / Parent Portal */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentOverviewPage />} />
              <Route path="teachers" element={<StudentTeachersPage />} />
              <Route path="lessons" element={<StudentLessonsPage />} />
              <Route path="progress" element={<StudentProgressPage />} />
              <Route path="messages" element={<StudentMessagesPage />} />
              <Route path="settings" element={<StudentSettingsPage />} />
            </Route>

            {/* Teacher Studio Portal */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<TeacherOverviewPage />} />
              <Route path="students" element={<TeacherStudentsPage />} />
              <Route path="schedule" element={<TeacherSchedulePage />} />
              <Route path="lessons" element={<TeacherLessonsPage />} />
              <Route path="messages" element={<TeacherMessagesPage />} />
              <Route path="earnings" element={<TeacherEarningsPage />} />
              <Route path="profile" element={<TeacherProfileEditorPage />} />
              <Route path="settings" element={<TeacherSettingsPage />} />
            </Route>

            {/* Platform Admin Web Portal */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="teachers" element={<AdminTeachersPage />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="learning" element={<AdminLearningCMSPage />} />
              <Route path="learning/:courseId/new" element={<AdminLessonEditorPage />} />
              <Route path="learning/:courseId/lesson/:lessonId" element={<AdminLessonEditorPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="payments" element={<AdminPaymentsPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DemoProvider>
    </ToastProvider>
  );
};

export default App;

