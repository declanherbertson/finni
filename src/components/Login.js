import '../App.css';
import EditIcon  from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Login!
        </p>
        <Button variant="contained" onClick={() => signInWithGoogle()} startIcon={<EditIcon />}>Login</Button>
      </header>
    </div>
  );
}

export default Login;