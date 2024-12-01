import { useEffect } from 'react';
import { Course } from '../../types/course';
import { AttendanceManager } from '../attendance/AttendanceManager';
import { Users, Calendar, BookOpen } from 'lucide-react';

// Mock student data (replace with actual data from API)
const MOCK_STUDENTS = [
  { id: 'student1', name: 'John Doe' },
  { id: 'student2', name: 'Jane Smith' },
  { id: 'student3', name: 'Alice Johnson' },
];

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
}

export function CourseDetails({ course, onClose }: CourseDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back to Courses
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Enrolled Students
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {course.enrolledStudents}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Start Date
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {new Date(course.startDate).toLocaleDateString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Status
                  </dt>
                  <dd>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                      style={{
                        backgroundColor: course.status === 'active' ? '#DEF7EC' :
                          course.status === 'upcoming' ? '#E1EFFE' : '#FDE8E8',
                        color: course.status === 'active' ? '#03543F' :
                          course.status === 'upcoming' ? '#1E429F' : '#9B1C1C'
                      }}>
                      {course.status}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <AttendanceManager courseId={course.id} students={MOCK_STUDENTS} />
      </div>
    </div>
  );
}