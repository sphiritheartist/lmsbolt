import { useAuthStore } from '../store/auth';
import { DashboardLayout } from '../components/DashboardLayout';
import { StudentDashboard } from '../components/dashboards/StudentDashboard';
import { EducatorDashboard } from '../components/dashboards/EducatorDashboard';

export function DashboardPage() {
  const { user } = useAuthStore();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'educator':
        return <EducatorDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <DashboardLayout>
      {getDashboardComponent()}
    </DashboardLayout>
  );
}