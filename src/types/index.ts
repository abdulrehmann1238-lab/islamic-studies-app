export type UserRole = 'student' | 'teacher' | 'admin';

export interface Teacher {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  title: string;
  bio: string;
  specialities: string[];
  languages: string[];
  hourlyRate: number; // in GBP
  rating: number;
  reviewCount: number;
  experienceYears: number;
  verified: boolean;
  avatar: string;
  introVideoFallback?: string;
  qualifications: {
    title: string;
    institution: string;
    year: string;
  }[];
  teachingApproach: {
    title: string;
    description: string;
  }[];
  availabilitySlots: {
    day: string; // e.g. "Monday", "Tuesday", etc.
    times: string[]; // e.g. ["10:00 AM", "02:00 PM", "05:00 PM"]
  }[];
  studentCount: number;
  completedLessonsCount: number;
}

export interface TeacherReview {
  id: string;
  teacherId: string;
  author: string;
  role: string; // e.g. "Parent of Yusuf, 9"
  rating: number;
  date: string;
  comment: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  subject: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "04:00 PM"
  durationMinutes: number;
  hourlyRate: number;
  platformFee: number;
  totalAmount: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'in_progress';
  notes?: string;
}

export type QuestionType = 'multiple_choice' | 'listening' | 'matching' | 'fill_blank' | 'image_select';

export interface MatchingPair {
  id: string;
  arabic: string;
  english: string;
  audioPronunciation?: string;
}

export interface ImageOption {
  id: string;
  label: string;
  arabicLabel?: string;
  imageUrl: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  subprompt?: string;
  arabicText?: string;
  audioHint?: string; // audio key for Web Audio synthesizer or audio tone
  options?: {
    id: string;
    text: string;
    arabicText?: string;
    isCorrect: boolean;
  }[];
  pairs?: MatchingPair[]; // For matching type
  fillBlankSentence?: {
    prefix: string;
    blank: string;
    suffix: string;
    correctAnswer: string;
    options: string[];
  };
  imageOptions?: ImageOption[]; // For image_select type
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  xpReward: number;
  isPublished: boolean;
  questions: Question[];
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  iconName: string;
  totalLessons: number;
  units: Unit[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  parentName: string;
  avatar: string;
  streakDays: number;
  totalXp: number;
  hearts: number;
  maxHearts: number;
  dailyGoalXp: number;
  todayEarnedXp: number;
  completedLessonIds: string[];
  unlockedAchievementIds: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  unlocked: boolean;
}

export interface TeacherApplication {
  id: string;
  fullName: string;
  email: string;
  country: string;
  gender: 'Male' | 'Female';
  bio: string;
  experience: string;
  specialities: string[];
  languages: string[];
  hourlyRate: number;
  availableDays: string[];
  certifications: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  submittedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  type: 'booking' | 'lesson' | 'xp' | 'approval' | 'system';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
  teacherCount: number;
}

