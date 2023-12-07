import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';
import { useState } from 'react';

function Patient({ id, patientData, shouldEdit = false }) {
  const [edit, setEdit] = useState(shouldEdit);
  return edit ? (
    <div>
      <p>
        {JSON.stringify(patientData)}
      </p>
      <Button variant="contained" onClick={() => console.log('save ' + id)} startIcon={<SaveIcon />}>Save</Button>
    </div>
  ) : (
    <div>
      <p>
        {JSON.stringify(patientData)}
      </p>
      <Button variant="contained" onClick={() => setEdit(true)} startIcon={<EditIcon />}>Edit</Button>
    </div>
  );
}

export default Patient;