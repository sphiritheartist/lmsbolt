import { ReactNode } from 'react';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function CourseModal({ isOpen, onClose, children }: CourseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          {children}
        </div>
      </div>
    </div>
  );
}