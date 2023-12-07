import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon  from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { DEFAULT_COLUMNS_MAP, IGNORED_FIELDS } from '../utils/patientUtils';
import _ from 'lodash';


export default function Patient({ data, onExit, onSave, editDefault = false }) {
  const [edit, setEdit] = useState(editDefault);
  const [formData, setFormData] = useState(data);    

  const handleSave = async (event) => {
    event.preventDefault();
    console.log(formData);
    // TODO: loading
    await onSave(data.id, formData);
    setEdit(false);
  }

  const fields = new Map(DEFAULT_COLUMNS_MAP);

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
    return (
      <TextField
        name={field.field}
        key={field.field}
        id={field.field}
        label={field.headerName}
        type={field.type}
        value={formData[field.field]}
        multiline={field.type === 'string'}
        minRows={3}
        onChange={(event) => setFormData({...formData, [field.field]: event.target.value})}
        margin="normal"
        variant="standard"
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