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
  return (<div class="App">
    {user ? (<Dashboard />) : (<Login />)}
  </div>);
}

export default App;
