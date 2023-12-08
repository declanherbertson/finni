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
import { STATUS_OPTIONS } from '../utils/patientConstants';

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
    metrics = STATUS_OPTIONS.map(({value, label}) => {
      return (
        <Box
          className='Metric'
        >
          <p>{label}</p>
          <h4>{statuses[value] || 0}</h4>

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
