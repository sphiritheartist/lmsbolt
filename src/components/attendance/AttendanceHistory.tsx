import { useEffect } from 'react';
import { useAttendanceStore } from '../../store/attendance';
import { Check, X, Clock } from 'lucide-react';

interface AttendanceHistoryProps {
  courseId: string;
}

export function AttendanceHistory({ courseId }: AttendanceHistoryProps) {
  const { records, fetchAttendance, loading } = useAttendanceStore();

  useEffect(() => {
    fetchAttendance(courseId);
  }, [courseId, fetchAttendance]);

  const getStatusIcon = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <X className="h-4 w-4 text-red-500" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading attendance records...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Attendance History</h3>
      <div className="overflow-x-auto">
        {records.map((record) => (
          <div key={record.id} className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">
                {new Date(record.date).toLocaleDateString()}
              </h4>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {record.records.map((attendance) => (
                  <tr key={attendance.studentId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {attendance.studentName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(attendance.status)}
                        <span className="ml-2 text-sm text-gray-500 capitalize">
                          {attendance.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}