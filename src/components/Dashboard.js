import '../App.css';
import EditIcon from '@mui/icons-material/Edit';
import {Box, Button} from '@mui/material';
import {useSignOut, useAuthState} from 'react-firebase-hooks/auth';
import {usePatients} from '../patientActions';
import {auth} from '../firebase';
import PatientTable from './PatientTable';
import {aggregateStatuses} from '../utils/patientUtils';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import _ from 'lodash';

function Dashboard() {
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [value, loading] = usePatients(user);
  let table = <div></div>;
  let metrics = <CircularProgress color="inherit" size={'8rem'} />;
  if (!loading) {
    table = <PatientTable patients={
      value.docs.map((d) => {
        return {id: d.id, ...d.data()};
      })
    } />;

    const statuses = aggregateStatuses(
        value.docs.map((d) => d.data()),
    );
    metrics = Object.keys(statuses).map((key) => {
      return (
        <Box
          className='Metric'
        >
          <p>{_.capitalize(key)}</p>
          <h4>{statuses[key]}</h4>

        </Box>
      );
    });
  }
  return (
    <div className="Main">
      <header className='Header'>
        <h3>Dashboard</h3>
        <Button variant="outlined" color='error' onClick={() => signOut()} startIcon={<EditIcon />}>Log out</Button>
      </header>
      <div className='Title'>
        <Stack direction='row' className='Metrics'>
          {metrics}
        </Stack>
      </div>

      {table}
    </div>
  );
}

export default Dashboard;
