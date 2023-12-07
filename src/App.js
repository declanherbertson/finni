import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user, loading, error] = useAuthState(auth);
  return user ? (<Dashboard />) : (<Login />);
}

export default App;
