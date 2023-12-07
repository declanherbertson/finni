import '../App.css';
import EditIcon  from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { usePatients } from '../patient';
import { auth } from '../firebase';

function Dashboard() {
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [value, loading, error] = usePatients(user);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Dashboard!
        </p>
        <Button variant="contained" onClick={() => signOut()} startIcon={<EditIcon />}>Log out</Button>
        
        {loading ? (<span>loading...</span>) : (<span>{JSON.stringify(value.docs.map(doc => doc.data()))}</span>)}
      </header>
    </div>
  );
}

export default Dashboard;