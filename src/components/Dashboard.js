import '../App.css';
import EditIcon  from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { usePatients } from '../patientActions';
import { auth } from '../firebase';
import Patient from './Patient';

function Dashboard() {
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [value, loading] = usePatients(user);
  return (
    <div className="Main">
      <p>
        Dashboard!
      </p>
      <Button variant="contained" onClick={() => signOut()} startIcon={<EditIcon />}>Log out</Button>
      
      {loading ? (<span>loading...</span>) : (<span>{value.docs.map((doc) => {
        return <Patient key={doc.id} id={doc.id} patientData={doc.data()} />
      })}</span>)}
    </div>
  );
}

export default Dashboard;