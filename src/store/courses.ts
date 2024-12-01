import { create } from 'zustand';
import { Course, CourseState, CourseTemplate } from '../types/course';

const MOCK_TEMPLATES: CourseTemplate[] = [
  {
    id: 'template1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React development including components, hooks, and state management.',
    category: 'programming',
  },
  {
    id: 'template2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript concepts including closures, prototypes, and async programming.',
    category: 'programming',
  },
  {
    id: 'template3',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the basics of user interface and user experience design.',
    category: 'design',
  },
  {
    id: 'template4',
    title: 'Business Analytics',
    description: 'Learn to analyze business data and make data-driven decisions.',
    category: 'business',
  },
];

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React development including components, hooks, and state management.',
    instructor: 'Jane Smith',
    instructorId: '2',
    enrolledStudents: 25,
    startDate: '2024-03-01',
    endDate: '2024-05-01',
    status: 'active',
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript concepts including closures, prototypes, and async programming.',
    instructor: 'Jane Smith',
    instructorId: '2',
    enrolledStudents: 15,
    startDate: '2024-04-01',
    endDate: '2024-06-01',
    status: 'upcoming',
  },
];

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  templates: [],
  loading: false,
  error: null,
  selectedCourse: null,
  fetchCourses: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ courses: MOCK_COURSES, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch courses', loading: false });
    }
  },
  fetchTemplates: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ templates: MOCK_TEMPLATES, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch templates', loading: false });
    }
  },
  addCourse: async (courseData) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const template = MOCK_TEMPLATES.find(t => t.id === courseData.templateId);
      if (!template) throw new Error('Template not found');

      const newCourse: Course = {
        id: Math.random().toString(),
        title: template.title,
        description: template.description,
        instructor: 'Jane Smith',
        instructorId: '2',
        enrolledStudents: 0,
        startDate: courseData.startDate,
        endDate: courseData.endDate,
        status: courseData.status,
      };
      
      set((state) => ({
        courses: [...state.courses, newCourse],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add course', loading: false });
    }
  },
  updateCourse: async (id, courseData) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set((state) => ({
        courses: state.courses.map((c) =>
          c.id === id ? { ...c, ...courseData } : c
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update course', loading: false });
    }
  },
  selectCourse: (course) => set({ selectedCourse: course }),
}));