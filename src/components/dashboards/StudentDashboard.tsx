import { useEffect } from 'react';
import { useCourseStore } from '../../store/courses';
import { Book, Clock, Calendar } from 'lucide-react';

export function StudentDashboard() {
  const { courses, fetchCourses, loading } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const activeCourses = courses.filter(course => course.status === 'active');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Book className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Courses
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {activeCourses.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My Courses
          </h3>
        </div>
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="text-center py-4">Loading courses...</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {activeCourses.map((course) => (
                <li key={course.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {course.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {course.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{new Date(course.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(course.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}