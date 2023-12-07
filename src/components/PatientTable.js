import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import {
  DataGrid,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { getCustomFields, DEFAULT_COLUMNS, customColumns } from '../utils/patientUtils';

function EditToolbar(patients) {
  const addFilter = () => {
    // TODO
  }

  const addRecord = (id) => {
    // TODO
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={addRecord}>
        Add record
      </Button>
      <Button color="primary" startIcon={<TuneIcon />} onClick={addFilter}>
        Filter
      </Button>
    </GridToolbarContainer>
  );
}

export default function PatientTable({ patients }) {
  // const patientList = usePatientList({ value });
  const [rows, setRows] = useState(patients);

  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    // TODO: call modal to edit patient
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const customFields = getCustomFields(patients);
  const columns = [...DEFAULT_COLUMNS, ...customColumns(customFields)]
  console.log(columns, rows)

  return (
    <Box
      className="PatientTable"
      sx={{
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        slots={{
          toolbar: () => EditToolbar(patients),
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
