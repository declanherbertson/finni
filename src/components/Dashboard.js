import '../App.css';
import EditIcon  from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { usePatients } from '../patientActions';
import { auth } from '../firebase';
import PatientTable from './PatientTable';
import { aggregateStatuses } from '../utils/patientUtils';
import React from 'react';

function Dashboard() {
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [value, loading] = usePatients(user);
  let table = <span>loading...</span>;
  let metrics = <span>loading...</span>;
  if (!loading) {
    table = <PatientTable patients={
      value.docs.map(d => {
        return { id: d.id, ...d.data() }
      })
      } />;
    
    const statuses = aggregateStatuses(
      value.docs.map(d => d.data())
    );
    metrics = Object.keys(statuses).map((key) => {
      return (
        <div className='Metric'>
          <p>{key}:</p>
          <span>{statuses[key]}</span>
        </div>
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
        <div className='Metrics'>
          {metrics}
        </div>
      </div>
      
      {table}
    </div>
  );
}

export default Dashboard;