import type { User } from '../../types';
import StudentDashboard from './StudentDashboard';

interface MomDashboardProps {
  user: User;
  onReturnHome: () => void;
}

export default function MomDashboard({ user, onReturnHome }: MomDashboardProps) {
  return <StudentDashboard user={user} onReturnHome={onReturnHome} audience="mom" />;
}
