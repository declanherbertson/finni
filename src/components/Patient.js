import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon  from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { buildFieldsFromData, handleAddField, getDataWithDefaults } from '../utils/patientUtils';
import { getFormComponents } from './PatientFields';
import { formValidator } from '../utils/validators';



export default function Patient({ data, onExit, onSave, onDelete, editDefault = false }) {
  console.log('patient', data);
  const [edit, setEdit] = useState(editDefault);
  const [formData, setFormData] = useState(getDataWithDefaults(data));

  const handleSave = async (event) => {
    event.preventDefault();
    console.log('saving', formData);
    await onSave(data.id, formData);
    setEdit(false);
  }

  const handleDelete = async () => {
    await onDelete(data.id);
    setEdit(false);
  }

  const [customFields, setCustomFields] = useState(buildFieldsFromData(data));

  const formComponents = getFormComponents(formData, setFormData, edit, customFields, setCustomFields);
  
  return (
    <Dialog open={true} onClose={onExit} fullWidth={true} maxWidth={'xl'}>
      <DialogTitle style={{'display': 'flex', 'justifyContent': 'space-between'}}>
        Patient Record
        <span>
          {edit && <Button
           variant="contained" size='small' color='error' startIcon={<DeleteIcon />} 
           onClick={() => handleDelete()}>
            Delete
          </Button>
          }
          {edit && <Button
           style={{'marginLeft': '1rem'}}
           variant="outlined" size='small' startIcon={<AddIcon />} 
           onClick={() => handleAddField(customFields, setCustomFields)}>
            Add Field
          </Button>
          }
          <Button 
            variant="text" type='submit' style={{'marginLeft': '1rem'}}
            disabled={edit && !formValidator(formData)}
            onClick={(e) => edit ? handleSave(e) : setEdit(true)} 
            startIcon={edit ? <SaveIcon /> : <EditIcon />}>
              {edit ? 'Save' : 'Edit'}
          </Button>
        </span>
      </DialogTitle>
      <DialogContent className='FormContent'>
        {formComponents}
      </DialogContent>
      <DialogActions>
        <Button onClick={onExit}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
