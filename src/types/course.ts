export interface CourseTemplate {
  id: string;
  title: string;
  description: string;
  category: 'programming' | 'design' | 'business' | 'language';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  enrolledStudents: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  materials?: CourseMaterial[];
  attendance?: CourseAttendance[];
}

export interface CourseAttendance {
  date: string;
  students: {
    studentId: string;
    status: 'present' | 'absent' | 'late';
  }[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'document' | 'video' | 'assignment';
  url: string;
  description?: string;
}

export interface CourseFormData {
  templateId: string;
  startDate: string;
  endDate: string;
  status: Course['status'];
}

export interface CourseState {
  courses: Course[];
  templates: CourseTemplate[];
  loading: boolean;
  error: string | null;
  selectedCourse: Course | null;
  fetchCourses: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  addCourse: (course: CourseFormData) => Promise<void>;
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>;
  selectCourse: (course: Course | null) => void;
}