import { useEffect, useState } from 'react';
import { useCourseStore } from '../../store/courses';
import { useAuthStore } from '../../store/auth';
import { Book, Users, PlusCircle, Pencil } from 'lucide-react';
import { CourseModal } from '../courses/CourseModal';
import { CourseForm } from '../courses/CourseForm';
import { CourseDetails } from '../courses/CourseDetails';
import type { Course, CourseFormData } from '../../types/course';

export function EducatorDashboard() {
  const { user } = useAuthStore();
  const { courses, fetchCourses, loading, addCourse, updateCourse, selectedCourse, selectCourse } = useCourseStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const myCourses = courses.filter(course => course.instructorId === user?.id);
  const totalStudents = myCourses.reduce((acc, course) => acc + course.enrolledStudents, 0);

  const handleCreateCourse = async (data: CourseFormData) => {
    await addCourse(data);
    setIsModalOpen(false);
  };

  const handleUpdateCourse = async (data: CourseFormData) => {
    if (selectedCourse) {
      await updateCourse(selectedCourse.id, data);
      selectCourse(null);
      setIsModalOpen(false);
    }
  };

  const handleEditClick = (course: Course) => {
    selectCourse(course);
    setIsModalOpen(true);
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourseForDetails(course);
  };

  const handleCloseModal = () => {
    selectCourse(null);
    setIsModalOpen(false);
  };

  if (selectedCourseForDetails) {
    return (
      <CourseDetails
        course={selectedCourseForDetails}
        onClose={() => setSelectedCourseForDetails(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Course
        </button>
      </div>

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
                    Total Courses
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {myCourses.length}
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
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Students
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {totalStudents}
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
            Course List
          </h3>
        </div>
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="text-center py-4">Loading courses...</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {myCourses.map((course) => (
                <li key={course.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleViewDetails(course)}
                      className="flex-1 flex items-center text-left hover:bg-gray-50 p-2 rounded-md"
                    >
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {course.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {course.description}
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize" 
                            style={{
                              backgroundColor: course.status === 'active' ? '#DEF7EC' : 
                                            course.status === 'upcoming' ? '#E1EFFE' : '#FDE8E8',
                              color: course.status === 'active' ? '#03543F' :
                                    course.status === 'upcoming' ? '#1E429F' : '#9B1C1C'
                            }}>
                        {course.status}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {course.enrolledStudents} students
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(course);
                        }}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <CourseModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CourseForm
          onSubmit={selectedCourse ? handleUpdateCourse : handleCreateCourse}
          onCancel={handleCloseModal}
          initialData={selectedCourse ?? undefined}
          isEdit={!!selectedCourse}
        />
      </CourseModal>
    </div>
  );
}