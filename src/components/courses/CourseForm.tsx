import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Course, CourseFormData } from '../../types/course';
import { useCourseStore } from '../../store/courses';
import { X } from 'lucide-react';

const courseSchema = z.object({
  templateId: z.string().min(1, 'Course template is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  status: z.enum(['active', 'upcoming', 'completed']),
});

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Course;
  isEdit?: boolean;
}

export function CourseForm({ onSubmit, onCancel, initialData, isEdit }: CourseFormProps) {
  const { templates, fetchTemplates } = useCourseStore();

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData ? {
      templateId: templates.find(t => t.title === initialData.title)?.id || '',
      startDate: initialData.startDate,
      endDate: initialData.endDate,
      status: initialData.status,
    } : undefined,
  });

  const selectedTemplateId = watch('templateId');
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          {isEdit ? 'Edit Course' : 'Create New Course'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div>
        <label htmlFor="templateId" className="block text-sm font-medium text-gray-700">
          Course Template
        </label>
        <select
          {...register('templateId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
        </select>
        {errors.templateId && (
          <p className="mt-1 text-sm text-red-600">{errors.templateId.message}</p>
        )}
      </div>

      {selectedTemplate && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-900">Template Details</h4>
          <p className="mt-1 text-sm text-gray-500">{selectedTemplate.description}</p>
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {selectedTemplate.category}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            {...register('startDate')}
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            {...register('endDate')}
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}