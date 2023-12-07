import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? (<Dashboard />) : (<Login />);
}

export default App;
