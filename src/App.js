import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <CircularProgress color="inherit" />;
  }
  return (<div className="App">
    {user ? (<Dashboard />) : (<Login />)}
  </div>);
}

export default App;
