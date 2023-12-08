import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid';

export default function PatientToolbar({ onAddPatient }) {
  return (
    <GridToolbarContainer style={{'display': 'flex'}}>
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
      <GridToolbarExport />
      <span style={{'flex': '1', 'display': 'flex', 'justifyContent': 'flex-end'}}>
        <Button color="primary" variant='contained'  startIcon={<AddIcon />} onClick={onAddPatient}>
          Add record
        </Button>
      </span>
    </GridToolbarContainer>
  );
}