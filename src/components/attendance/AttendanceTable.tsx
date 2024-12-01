import { useState } from 'react';
import { useAttendanceStore } from '../../store/attendance';
import { StudentAttendance } from '../../types/attendance';
import { Check, X, Clock, Save } from 'lucide-react';

interface AttendanceTableProps {
  courseId: string;
  students: Array<{ id: string; name: string }>;
}

export function AttendanceTable({ courseId, students }: AttendanceTableProps) {
  const { markAttendance, loading } = useAttendanceStore();
  const [attendance, setAttendance] = useState<StudentAttendance[]>(
    students.map(student => ({
      studentId: student.id,
      studentName: student.name,
      status: 'present',
    }))
  );

  const handleStatusChange = (studentId: string, status: StudentAttendance['status']) => {
    setAttendance(current =>
      current.map(record =>
        record.studentId === studentId ? { ...record, status } : record
      )
    );
  };

  const handleSubmit = async () => {
    await markAttendance(courseId, attendance);
  };

  const getStatusIcon = (status: StudentAttendance['status']) => {
    switch (status) {
      case 'present':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <X className="h-5 w-5 text-red-500" />;
      case 'late':
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.map((record) => (
              <tr key={record.studentId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {record.studentName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(record.status)}
                    <span className="ml-2 text-sm text-gray-500 capitalize">
                      {record.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(record.studentId, 'present')}
                      className={`p-1 rounded-full ${
                        record.status === 'present'
                          ? 'bg-green-100 text-green-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(record.studentId, 'absent')}
                      className={`p-1 rounded-full ${
                        record.status === 'absent'
                          ? 'bg-red-100 text-red-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(record.studentId, 'late')}
                      className={`p-1 rounded-full ${
                        record.status === 'late'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Clock className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Attendance'}
        </button>
      </div>
    </div>
  );
}