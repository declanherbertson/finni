import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon  from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { DEFAULT_FIELDS_MAP, IGNORED_FIELDS, STATUS_OPTIONS } from '../utils/patientUtils';
import MenuItem from '@mui/material/MenuItem';
import _ from 'lodash';


export default function Patient({ data, onExit, onSave, editDefault = false }) {
  const [edit, setEdit] = useState(editDefault);
  const [formData, setFormData] = useState(data);    

  const handleSave = async (event) => {
    event.preventDefault();
    console.log(formData);
    await onSave(data.id, formData);
    setEdit(false);
  }

  const fields = new Map(DEFAULT_FIELDS_MAP);

  for (let key in data) {
    if (IGNORED_FIELDS.has(key)) {
      continue;
    }
    else if (fields.has(key)) {
      fields.get(key).value = data[key];
      console.warn(data[key])
    } else {
      console.log(key);
      fields.set(key, {field: key, headerName: _.capitalize(key), value: data[key], type: typeof data[key]});
    }
  }
  const formComponents = Array.from(fields.values()).map((field) => {
    if (field.field === 'status') {
      return (
        <TextField
          select
          required={DEFAULT_FIELDS_MAP.has(field.field)}
          label="Select"
          defaultValue={field.value}
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
    }
    return (
      <TextField
        name={field.field}
        key={field.field}
        id={field.field}
        label={field.headerName}
        type={field.type}
        required={DEFAULT_FIELDS_MAP.has(field.field)}
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
  });

  
  return (
    <Dialog open={true} onClose={onExit} fullWidth={true} maxWidth={'xl'}>
      <DialogTitle style={{'display': 'flex', 'justifyContent': 'space-between'}}>
        Patient Record
        <Button variant="text" type='submit' onClick={(e) => edit ? handleSave(e) : setEdit(true)} startIcon={edit ? <SaveIcon /> : <EditIcon />}>{edit ? 'Save' : 'Edit'}</Button>
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