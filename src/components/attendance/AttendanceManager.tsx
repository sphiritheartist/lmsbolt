import { useState } from 'react';
import { AttendanceTable } from './AttendanceTable';
import { AttendanceHistory } from './AttendanceHistory';
import { CalendarDays, History } from 'lucide-react';

interface AttendanceManagerProps {
  courseId: string;
  students: Array<{ id: string; name: string }>;
}

export function AttendanceManager({ courseId, students }: AttendanceManagerProps) {
  const [view, setView] = useState<'mark' | 'history'>('mark');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Attendance Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setView('mark')}
            className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
              view === 'mark'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Mark Attendance
          </button>
          <button
            onClick={() => setView('history')}
            className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
              view === 'history'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <History className="h-4 w-4 mr-2" />
            View History
          </button>
        </div>
      </div>

      {view === 'mark' ? (
        <AttendanceTable courseId={courseId} students={students} />
      ) : (
        <AttendanceHistory courseId={courseId} />
      )}
    </div>
  );
}