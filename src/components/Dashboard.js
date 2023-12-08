import '../App.css';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from '@mui/material';
import {useSignOut, useAuthState} from 'react-firebase-hooks/auth';
import {usePatients} from '../patientActions';
import {auth} from '../firebase';
import PatientTable from './PatientTable';
import {STATUS_COLOUR_MAP} from '../utils/patientConstants';
import {aggregateStatuses} from '../utils/patientUtils';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
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
        <Chip
          className='Metric'
          label={`${_.capitalize(key)}: ${statuses[key]}`}
          key={key} color={STATUS_COLOUR_MAP[key]}
        />
      );
    });
  }
  return (
    <div className="Main">
      <header className='Header'>
        <Button variant="contained" onClick={() => signOut()} startIcon={<EditIcon />}>Log out</Button>
      </header>
      <div className='Title'>
        <h2>Dashboard</h2>
        <Stack direction='row' className='Metrics'>
          {metrics}
        </Stack>
      </div>

      {table}
    </div>
  );
}

export default Dashboard;
