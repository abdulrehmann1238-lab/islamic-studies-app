import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserRole,
  Teacher,
  Booking,
  Course,
  Lesson,
  StudentProfile,
  Achievement,
  TeacherApplication,
  Message,
  Notification,
  Category,
} from '../types';
import {
  INITIAL_TEACHERS,
  INITIAL_CATEGORIES,
  INITIAL_COURSES,
  INITIAL_STUDENT_PROFILE,
  INITIAL_ACHIEVEMENTS,
  INITIAL_BOOKINGS,
  INITIAL_APPLICATIONS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';
import { useToast } from './ToastContext';
import { playSound } from '../utils/soundEffects';

interface DemoContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  // Teachers
  teachers: Teacher[];
  favoriteTeacherIds: string[];
  toggleFavoriteTeacher: (teacherId: string) => void;
  isFavoriteTeacher: (teacherId: string) => boolean;
  updateTeacherProfile: (teacherId: string, updates: Partial<Teacher>) => void;
  // Bookings
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'status' | 'platformFee' | 'totalAmount'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  // Learning & Gamification
  courses: Course[];
  studentProfile: StudentProfile;
  achievements: Achievement[];
  completeLesson: (lessonId: string, scoreAccuracy: number, earnedXp: number) => void;
  loseHeart: () => boolean; // returns true if hearts remaining > 0, false if game over
  refillHearts: () => void;
  // Admin CMS
  addLessonToCourse: (courseId: string, unitId: string, lesson: Omit<Lesson, 'id'>) => Lesson;
  updateLessonInCourse: (courseId: string, unitId: string, lessonId: string, updates: Partial<Lesson>) => void;
  deleteLessonFromCourse: (courseId: string, unitId: string, lessonId: string) => void;
  reorderLessonsInUnit: (courseId: string, unitId: string, direction: 'up' | 'down', lessonIndex: number) => void;
  togglePublishLesson: (courseId: string, unitId: string, lessonId: string) => void;
  // Teacher Onboarding & Approval
  teacherApplications: TeacherApplication[];
  submitTeacherApplication: (application: Omit<TeacherApplication, 'id' | 'status' | 'submittedAt'>) => void;
  updateApplicationStatus: (appId: string, status: 'approved' | 'rejected' | 'suspended') => void;
  // Categories
  categories: Category[];
  toggleCategoryActive: (catId: string) => void;
  addCategory: (name: string, description: string) => void;
  // Payments & Commission
  commissionRate: number; // percentage, e.g. 15
  setCommissionRate: (rate: number) => void;
  // Messages
  messages: Message[];
  sendMessage: (recipientId: string, recipientName: string, content: string) => void;
  // Notifications
  notifications: Notification[];
  markNotificationRead: (notifId: string) => void;
  addNotification: (title: string, message: string, link?: string, type?: Notification['type']) => void;
  // Demo Reset
  resetDemoData: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'noor_role_v1',
  TEACHERS: 'noor_teachers_v1',
  FAVORITES: 'noor_favorites_v1',
  BOOKINGS: 'noor_bookings_v1',
  COURSES: 'noor_courses_v1',
  STUDENT: 'noor_student_v1',
  ACHIEVEMENTS: 'noor_achievements_v1',
  APPLICATIONS: 'noor_applications_v1',
  CATEGORIES: 'noor_categories_v1',
  COMMISSION: 'noor_commission_v1',
  MESSAGES: 'noor_messages_v1',
  NOTIFICATIONS: 'noor_notifications_v1',
};

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  // Role
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'student';
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
    playSound('click');
    showToast({
      type: 'info',
      title: `Switched to ${newRole === 'student' ? 'Student / Parent' : newRole === 'teacher' ? 'Teacher' : 'Platform Admin'} View`,
      message: 'Demo role updated. Context and navigation adapted.',
      duration: 3000,
    });
  };

  // Teachers
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [favoriteTeacherIds, setFavoriteTeacherIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return saved ? JSON.parse(saved) : ['teacher-1'];
  });

  // Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Courses / CMS
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  // Student Profile
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  // Applications
  const [teacherApplications, setTeacherApplications] = useState<TeacherApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Commission Rate
  const [commissionRate, setCommissionRateState] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMMISSION);
    return saved ? Number(saved) : 15;
  });

  // Messages
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteTeacherIds));
  }, [favoriteTeacherIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(teacherApplications));
  }, [teacherApplications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMISSION, commissionRate.toString());
  }, [commissionRate]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Favorite toggle
  const toggleFavoriteTeacher = useCallback((teacherId: string) => {
    playSound('click');
    setFavoriteTeacherIds((prev) => {
      const exists = prev.includes(teacherId);
      if (exists) {
        showToast({ type: 'info', title: 'Removed from Saved Teachers' });
        return prev.filter((id) => id !== teacherId);
      } else {
        showToast({ type: 'success', title: 'Saved Teacher to Shortlist' });
        return [...prev, teacherId];
      }
    });
  }, [showToast]);

  const isFavoriteTeacher = useCallback(
    (teacherId: string) => favoriteTeacherIds.includes(teacherId),
    [favoriteTeacherIds]
  );

  const updateTeacherProfile = useCallback((teacherId: string, updates: Partial<Teacher>) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, ...updates } : t))
    );
    showToast({ type: 'success', title: 'Teacher Profile Updated' });
  }, [showToast]);

  // Notifications
  const addNotification = useCallback((title: string, message: string, link?: string, type: Notification['type'] = 'system') => {
    const newNotif: Notification = {
      id: 'notif-' + Date.now(),
      title,
      message,
      timestamp: 'Just now',
      read: false,
      link,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const markNotificationRead = useCallback((notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  }, []);

  // Bookings creation
  const createBooking = useCallback(
    (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'status' | 'platformFee' | 'totalAmount'>) => {
      const platformFee = Number(((bookingData.hourlyRate * commissionRate) / 100).toFixed(2));
      const totalAmount = bookingData.hourlyRate;
      const bookingRef = 'NOOR-BK-' + Math.floor(10000 + Math.random() * 90000);
      const newBooking: Booking = {
        ...bookingData,
        id: 'booking-' + Date.now(),
        bookingRef,
        status: 'upcoming',
        platformFee,
        totalAmount,
      };

      setBookings((prev) => [newBooking, ...prev]);
      playSound('complete');

      addNotification(
        'Booking Confirmed!',
        `Your lesson on ${bookingData.subject} with ${bookingData.teacherName} is set for ${bookingData.date} at ${bookingData.time}.`,
        `/classroom/${newBooking.id}`,
        'booking'
      );

      showToast({
        type: 'success',
        title: 'Lesson Booked Successfully!',
        message: `Reference: ${bookingRef}. Visible on both Student & Teacher dashboards.`,
        duration: 5000,
      });

      return newBooking;
    },
    [commissionRate, addNotification, showToast]
  );

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    showToast({ type: 'info', title: 'Lesson Booking Cancelled' });
  }, [showToast]);

  // Gamification & Lesson Completion
  const completeLesson = useCallback(
    (lessonId: string, _scoreAccuracy: number, earnedXp: number) => {
      setStudentProfile((prev) => {
        const isFirstTime = !prev.completedLessonIds.includes(lessonId);
        const updatedCompleted = isFirstTime ? [...prev.completedLessonIds, lessonId] : prev.completedLessonIds;
        const newTotalXp = prev.totalXp + earnedXp;
        const newTodayXp = prev.todayEarnedXp + earnedXp;

        return {
          ...prev,
          totalXp: newTotalXp,
          todayEarnedXp: newTodayXp,
          completedLessonIds: updatedCompleted,
        };
      });

      playSound('complete');

      // Check achievements
      setAchievements((prev) =>
        prev.map((ach) => {
          if (ach.id === 'ach-first-lesson' && !ach.unlocked) {
            return { ...ach, unlocked: true };
          }
          if (ach.id === 'ach-consistent-learner' && studentProfile.completedLessonIds.length >= 9) {
            return { ...ach, unlocked: true };
          }
          return ach;
        })
      );

      addNotification(
        'Lesson Completed! 🌟',
        `You earned +${earnedXp} XP and continued your daily streak. Keep up the dedication!`,
        '/student/progress',
        'xp'
      );
    },
    [studentProfile.completedLessonIds, addNotification]
  );

  const loseHeart = useCallback(() => {
    playSound('wrong');
    let remaining = 5;
    setStudentProfile((prev) => {
      remaining = Math.max(0, prev.hearts - 1);
      return {
        ...prev,
        hearts: remaining,
      };
    });
    return remaining > 0;
  }, []);

  const refillHearts = useCallback(() => {
    setStudentProfile((prev) => ({
      ...prev,
      hearts: prev.maxHearts,
    }));
    playSound('correct');
    showToast({ type: 'success', title: 'Hearts Refilled', message: 'Full 5 hearts restored for learning!' });
  }, [showToast]);

  // Admin CMS - Lesson & Course Management
  const addLessonToCourse = useCallback(
    (courseId: string, unitId: string, lessonData: Omit<Lesson, 'id'>) => {
      const newLessonId = 'lesson-' + Date.now();
      const newLesson: Lesson = {
        ...lessonData,
        id: newLessonId,
        courseId,
        unitId,
      };

      setCourses((prev) =>
        prev.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            units: course.units.map((unit) => {
              if (unit.id !== unitId) return unit;
              return {
                ...unit,
                lessons: [...unit.lessons, newLesson],
              };
            }),
          };
        })
      );

      playSound('correct');
      showToast({
        type: 'success',
        title: 'New Lesson Created & Added to Curriculum',
        message: `"${newLesson.title}" is now available in the learning path.`,
      });

      return newLesson;
    },
    [showToast]
  );

  const updateLessonInCourse = useCallback(
    (courseId: string, unitId: string, lessonId: string, updates: Partial<Lesson>) => {
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            units: course.units.map((unit) => {
              if (unit.id !== unitId) return unit;
              return {
                ...unit,
                lessons: unit.lessons.map((l) => (l.id === lessonId ? { ...l, ...updates } : l)),
              };
            }),
          };
        })
      );
      showToast({ type: 'success', title: 'Lesson Updated Successfully' });
    },
    [showToast]
  );

  const deleteLessonFromCourse = useCallback(
    (courseId: string, unitId: string, lessonId: string) => {
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            units: course.units.map((unit) => {
              if (unit.id !== unitId) return unit;
              return {
                ...unit,
                lessons: unit.lessons.filter((l) => l.id !== lessonId),
              };
            }),
          };
        })
      );
      showToast({ type: 'info', title: 'Lesson Removed' });
    },
    [showToast]
  );

  const reorderLessonsInUnit = useCallback(
    (courseId: string, unitId: string, direction: 'up' | 'down', lessonIndex: number) => {
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            units: course.units.map((unit) => {
              if (unit.id !== unitId) return unit;
              const newLessons = [...unit.lessons];
              const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;
              if (targetIndex < 0 || targetIndex >= newLessons.length) return unit;
              const temp = newLessons[lessonIndex];
              newLessons[lessonIndex] = newLessons[targetIndex];
              newLessons[targetIndex] = temp;
              // update orders
              newLessons.forEach((l, idx) => {
                l.order = idx + 1;
              });
              return { ...unit, lessons: newLessons };
            }),
          };
        })
      );
      playSound('click');
      showToast({ type: 'info', title: 'Curriculum Sequence Updated' });
    },
    [showToast]
  );

  const togglePublishLesson = useCallback(
    (courseId: string, unitId: string, lessonId: string) => {
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            units: course.units.map((unit) => {
              if (unit.id !== unitId) return unit;
              return {
                ...unit,
                lessons: unit.lessons.map((l) =>
                  l.id === lessonId ? { ...l, isPublished: !l.isPublished } : l
                ),
              };
            }),
          };
        })
      );
      showToast({ type: 'success', title: 'Lesson Visibility Toggled' });
    },
    [showToast]
  );

  // Teacher Onboarding & Approval
  const submitTeacherApplication = useCallback(
    (appData: Omit<TeacherApplication, 'id' | 'status' | 'submittedAt'>) => {
      const newApp: TeacherApplication = {
        ...appData,
        id: 'app-' + Date.now(),
        status: 'pending',
        submittedAt: new Date().toISOString().split('T')[0],
      };

      setTeacherApplications((prev) => [newApp, ...prev]);
      playSound('complete');

      addNotification(
        'Teacher Application Submitted',
        `Your teaching application for ${appData.fullName} is under review by the NOOR admin team.`,
        '/admin/teachers',
        'approval'
      );

      showToast({
        type: 'success',
        title: 'Application Submitted!',
        message: 'Your profile is awaiting verification in the Admin Portal.',
        duration: 5000,
      });
    },
    [addNotification, showToast]
  );

  const updateApplicationStatus = useCallback(
    (appId: string, status: 'approved' | 'rejected' | 'suspended') => {
      setTeacherApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status } : app))
      );

      // If approved, dynamically add to Teachers marketplace
      if (status === 'approved') {
        const app = teacherApplications.find((a) => a.id === appId);
        if (app) {
          const newTeacher: Teacher = {
            id: 'teacher-' + Date.now(),
            name: app.fullName,
            gender: app.gender,
            title: 'Verified Instructor in ' + app.specialities.join(' & '),
            bio: app.bio,
            specialities: app.specialities,
            languages: app.languages,
            hourlyRate: app.hourlyRate,
            rating: 5.0,
            reviewCount: 0,
            experienceYears: 5,
            verified: true,
            avatar:
              app.gender === 'Female'
                ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
                : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
            qualifications: [
              { title: 'Verified Instructor Credentials', institution: app.country, year: '2024' },
            ],
            teachingApproach: [
              { title: 'Student-Centred Pedagogy', description: 'Patient, methodical guidance tailored to individual learning styles.' },
            ],
            availabilitySlots: [
              { day: 'Monday', times: ['03:00 PM', '05:00 PM'] },
              { day: 'Thursday', times: ['03:00 PM', '05:00 PM'] },
            ],
            studentCount: 0,
            completedLessonsCount: 0,
          };
          setTeachers((prev) => [newTeacher, ...prev]);
        }
      }

      playSound('correct');
      showToast({
        type: 'success',
        title: `Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        message: status === 'approved' ? 'Teacher is now live in the public marketplace!' : undefined,
      });
    },
    [teacherApplications, showToast]
  );

  // Categories
  const toggleCategoryActive = useCallback((catId: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, active: !c.active } : c))
    );
    showToast({ type: 'info', title: 'Marketplace Category Updated' });
  }, [showToast]);

  const addCategory = useCallback((name: string, description: string) => {
    const newCat: Category = {
      id: 'cat-' + name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description,
      icon: 'BookOpen',
      active: true,
      teacherCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast({ type: 'success', title: 'New Subject Category Added' });
  }, [showToast]);

  // Commission
  const setCommissionRate = useCallback((rate: number) => {
    setCommissionRateState(rate);
    showToast({ type: 'info', title: `Platform Commission Set to ${rate}%` });
  }, [showToast]);

  // Messages
  const sendMessage = useCallback(
    (recipientId: string, recipientName: string, content: string) => {
      const newMsg: Message = {
        id: 'msg-' + Date.now(),
        conversationId: 'conv-' + recipientId,
        senderId: role === 'student' ? 'student-adam' : 'teacher-1',
        senderName: role === 'student' ? 'Adam (Tariq Ahmed)' : 'Aisha Rahman',
        senderRole: role,
        recipientId,
        recipientName,
        content,
        timestamp: 'Just now',
        read: true,
      };
      setMessages((prev) => [...prev, newMsg]);
      playSound('pop');

      // Simulate a natural response from teacher if student sent it
      if (role === 'student') {
        setTimeout(() => {
          const autoReply: Message = {
            id: 'msg-' + (Date.now() + 1),
            conversationId: 'conv-' + recipientId,
            senderId: recipientId,
            senderName: recipientName,
            senderRole: 'teacher',
            recipientId: 'student-adam',
            recipientName: 'Adam (Tariq Ahmed)',
            content: 'Wa Alaikum Assalam! Thank you for the message. I have reviewed your notes and will cover this in detail in our next live lesson.',
            timestamp: 'Just now',
            read: false,
          };
          setMessages((prev) => [...prev, autoReply]);
          playSound('correct');
          addNotification(
            `New message from ${recipientName}`,
            autoReply.content,
            '/student/messages',
            'system'
          );
        }, 1500);
      }
    },
    [role, addNotification]
  );

  // Reset Demo
  const resetDemoData = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setRoleState('student');
    setTeachers(INITIAL_TEACHERS);
    setFavoriteTeacherIds(['teacher-1']);
    setBookings(INITIAL_BOOKINGS);
    setCourses(INITIAL_COURSES);
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setTeacherApplications(INITIAL_APPLICATIONS);
    setCategories(INITIAL_CATEGORIES);
    setCommissionRateState(15);
    setMessages(INITIAL_MESSAGES);
    setNotifications(INITIAL_NOTIFICATIONS);

    playSound('complete');
    showToast({
      type: 'success',
      title: 'Demo Data Reset',
      message: 'All sample data, bookings, and progress restored to default.',
      duration: 4000,
    });
  }, [showToast]);

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        teachers,
        favoriteTeacherIds,
        toggleFavoriteTeacher,
        isFavoriteTeacher,
        updateTeacherProfile,
        bookings,
        createBooking,
        cancelBooking,
        courses,
        studentProfile,
        achievements,
        completeLesson,
        loseHeart,
        refillHearts,
        addLessonToCourse,
        updateLessonInCourse,
        deleteLessonFromCourse,
        reorderLessonsInUnit,
        togglePublishLesson,
        teacherApplications,
        submitTeacherApplication,
        updateApplicationStatus,
        categories,
        toggleCategoryActive,
        addCategory,
        commissionRate,
        setCommissionRate,
        messages,
        sendMessage,
        notifications,
        markNotificationRead,
        addNotification,
        resetDemoData,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

