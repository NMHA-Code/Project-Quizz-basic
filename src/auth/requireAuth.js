import { Navigate} from 'react-router-dom';
import { useAuth } from './auth';

export default function RequireAuth({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/Login"/>;
  }

  return children;
}
