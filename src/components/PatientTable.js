import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import { addOrUpdatePatient } from '../patientActions';
import _ from 'lodash';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { getCustomFields, DEFAULT_COLUMNS, customColumns } from '../utils/patientUtils';
import Patient from './Patient';

function EditToolbar(patients) {
  const addRecord = (id) => {
    // TODO
  };

  return (
    <GridToolbarContainer style={{'display': 'flex'}}>
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
      <GridToolbarExport />
      <span style={{'flex': '1', 'display': 'flex', 'justifyContent': 'flex-end'}}>
        <Button color="primary" variant='contained'  startIcon={<AddIcon />} onClick={addRecord}>
          Add record
        </Button>
      </span>
    </GridToolbarContainer>
  );
}

export default function PatientTable({ patients }) {
  console.log(patients.map(p => p.firstName));
  const [rows, setRows] = useState(patients);
  const [modalOpen, setModalOpen] = useState(undefined);

  useEffect(() => {
    setRows(patients);
  }, [patients]);

  const handleRowClick = _.debounce((params, event) => {
    setModalOpen(params.id);
  }, 100);

  const onSave = async (id, data) => {
    await addOrUpdatePatient(id, data);
    setModalOpen(undefined);
  }

  const getPatientData = (id) => {
    return patients.find(p => p.id === id);
  }

  const [rowModesModel, setRowModesModel] = useState({});

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
      {modalOpen && (<Patient data={getPatientData(modalOpen)} onExit={() => setModalOpen(undefined)} onSave={onSave} />)}
      <DataGrid
        onRowClick={handleRowClick}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        slots={{
          toolbar: () => <EditToolbar/>,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
