export interface AttendanceRecord {
  id: string;
  courseId: string;
  date: string;
  records: StudentAttendance[];
}

export interface StudentAttendance {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
}

export interface AttendanceState {
  records: AttendanceRecord[];
  loading: boolean;
  error: string | null;
  fetchAttendance: (courseId: string) => Promise<void>;
  markAttendance: (courseId: string, attendance: StudentAttendance[]) => Promise<void>;
}