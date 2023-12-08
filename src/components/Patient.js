import _ from 'lodash';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon  from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { DEFAULT_FIELDS_MAP, STATUS_OPTIONS } from '../utils/patientConstants';
import MenuItem from '@mui/material/MenuItem';
import CustomField from './CustomField';
import { handleCustomFormUpdate, handleDeleteCustomField } from '../utils/customFormUtils';
import { buildFieldsFromData, handleAddField } from '../utils/patientUtils';


export default function Patient({ data, onExit, onSave, onDelete, editDefault = false }) {
  const [edit, setEdit] = useState(editDefault);
  const [formData, setFormData] = useState(data);

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

  const formComponents = Array.from(customFields.values()).map((field) => {
    if (field.field === 'status') {
      return (
        <TextField
          select
          required={DEFAULT_FIELDS_MAP.has(field.field)}
          label="Select"
          key={field.field}
          value={formData[field.field]}
          helperText="Patient Status"
          InputProps={{readOnly: !edit}}
          disabled={!edit}
          onChange={(event) => setFormData({...formData, [field.field]: event.target.value})}
          multiline={true}
          minRows={3}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )
    } else if (field.default) {
        return (
          <TextField
            name={field.field}
            key={field.field}
            id={field.field}
            label={field.headerName}
            type={field.type}
            required={true}
            value={formData[field.field]}
            multiline={field.type === 'string'}
            minRows={3}
            onChange={(event) => setFormData({...formData, [field.field]: event.target.value})}
            margin="normal"
            variant="standard"
            disabled={!edit}
            InputProps={{readOnly: !edit, disableUnderline: true}}
          />
        )
    } else {
      return (
        <CustomField 
          onUpdate={(e, field, row) => handleCustomFormUpdate(setCustomFields, setFormData, e, field, row)}
          onDelete={() => handleDeleteCustomField(setCustomFields, setFormData, field)}
          row={field} canEdit={edit} 
      />)
    }

  });
  
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
