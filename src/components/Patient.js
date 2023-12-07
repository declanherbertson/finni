import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon  from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function Patient({ data, onExit, onSave, editDefault = false }) {
  const [edit, setEdit] = useState(editDefault);
  const forms = [];
  for (let key in data) {
    if (key === 'id') continue;
    forms.push({field: key, value: data[key], type: typeof data[key]});
  }
  const formComponents = forms.map((field) => {
    return (
      <TextField
        autoFocus
        margin="normal"
        key={field.field}
        id={field.field}
        label={field.field}
        type={field.type}
        variant="standard"
        value={field.value}
        InputProps={{readOnly: !edit}}
      />
    )
  });

  
  return (
    <Dialog open={true} onClose={onExit} fullWidth={true} maxWidth={'xl'}>
      <DialogTitle style={{'display': 'flex', 'justifyContent': 'space-between'}}>
        Patient Record
        <Button variant="text" onClick={() => setEdit(!edit)} startIcon={edit ? <SaveIcon /> : <EditIcon />}>{edit ? 'Save' : 'Edit'}</Button>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        {formComponents}
      </DialogContent>
      <DialogActions>
        <Button onClick={onExit}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}