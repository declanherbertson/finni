import '../App.css';
import EditIcon  from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Dashboard() {
  const [signOut, loading, error] = useSignOut(auth);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Dashboard!
        </p>
        <Button variant="contained" onClick={() => signOut()} startIcon={<EditIcon />}>Log out</Button>
      </header>
    </div>
  );
}

export default Dashboard;