import { create } from 'zustand';
import { AttendanceRecord, AttendanceState, StudentAttendance } from '../types/attendance';

// Mock student data
const MOCK_STUDENTS = [
  { id: 'student1', name: 'John Doe' },
  { id: 'student2', name: 'Jane Smith' },
  { id: 'student3', name: 'Alice Johnson' },
];

// Mock attendance records
const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att1',
    courseId: '1',
    date: '2024-03-15',
    records: MOCK_STUDENTS.map(student => ({
      studentId: student.id,
      studentName: student.name,
      status: 'present',
    })),
  },
  {
    id: 'att2',
    courseId: '1',
    date: '2024-03-14',
    records: MOCK_STUDENTS.map(student => ({
      studentId: student.id,
      studentName: student.name,
      status: Math.random() > 0.5 ? 'present' : 'absent',
    })),
  },
];

export const useAttendanceStore = create<AttendanceState>((set) => ({
  records: [],
  loading: false,
  error: null,
  fetchAttendance: async (courseId: string) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const records = MOCK_ATTENDANCE.filter(record => record.courseId === courseId);
      set({ records, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch attendance records', loading: false });
    }
  },
  markAttendance: async (courseId: string, attendance: StudentAttendance[]) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newRecord: AttendanceRecord = {
        id: Math.random().toString(),
        courseId,
        date: new Date().toISOString().split('T')[0],
        records: attendance,
      };
      set((state) => ({
        records: [newRecord, ...state.records],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to mark attendance', loading: false });
    }
  },
}));