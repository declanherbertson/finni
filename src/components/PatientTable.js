import _ from 'lodash';
import {useEffect, useState} from 'react';
import {addOrUpdatePatient, deletePatient} from '../patientActions';
import {DataGrid} from '@mui/x-data-grid';
import {DEFAULT_COLUMNS} from '../utils/patientConstants';
import {getCustomFields} from '../utils/patientUtils';
import {customColumns} from '../utils/patientUtils';
import Box from '@mui/material/Box';
import PatientToolbar from './PatientTableToolbar';
import Patient from './Patient';

export default function PatientTable({patients}) {
  const [rows, setRows] = useState(patients);
  const [modalOpen, setModalOpen] = useState(undefined);

  useEffect(() => {
    setRows(patients);
  }, [patients]);

  const handleRowClick = _.debounce((params, event) => {
    setModalOpen(params.id);
  }, 100);

  const handleAddPatient = _.debounce((params, event) => {
    setModalOpen('NEW');
  }, 100);

  const onSave = async (id, data) => {
    await addOrUpdatePatient(id, data);
    setModalOpen(undefined);
  };

  const onDelete = async (id) => {
    if (id !== 'NEW') {
      await deletePatient(id);
    }
    setModalOpen(undefined);
  };

  const getPatientData = (id) => {
    if (id === 'NEW') {
      return {id: 'NEW'};
    }
    return patients.find((p) => p.id === id);
  };

  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const customFields = getCustomFields(patients);
  const columns = [...DEFAULT_COLUMNS, ...customColumns(customFields)];

  return (
    <Box
      className="PatientTable"
      sx={{
        'width': '95%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {modalOpen && (
        <Patient data={getPatientData(modalOpen)} onExit={() => setModalOpen(undefined)} onSave={onSave} onDelete={onDelete} />
      )}
      <DataGrid
        onRowClick={handleRowClick}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        slots={{
          toolbar: () => <PatientToolbar onAddPatient={handleAddPatient}/>,
        }}
        slotProps={{
          toolbar: {setRows, setRowModesModel},
        }}
      />
    </Box>
  );
}
