import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon  from '@mui/icons-material/Add';

import SaveIcon from '@mui/icons-material/Save';
import { DEFAULT_FIELDS_MAP, IGNORED_FIELDS, STATUS_OPTIONS } from '../utils/patientUtils';
import MenuItem from '@mui/material/MenuItem';
import _ from 'lodash';
import CustomField from './CustomField';


export default function Patient({ data, onExit, onSave, editDefault = false }) {
  const [edit, setEdit] = useState(editDefault);
  const [formData, setFormData] = useState(data);    

  const handleSave = async (event) => {
    event.preventDefault();
    console.log('saving', formData);
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
    } else {
      fields.set(key, {field: key, headerName: _.capitalize(key), value: data[key], type: typeof data[key]});
    }
  }

  const [customFields, setCustomFields] = useState(Array.from(fields.values()));
  const handleAddField = () => {
    const newField = {field: `Field ${'7'}`, value: '', type: 'string'};
    setCustomFields((f) => [...f, newField]);
  };

  const handleCustomFormUpdate = (e, field, row) => {
    if (field === 'field') {
      // update savable state
      setFormData(formData => {
        const newFormData = {...formData};
        delete newFormData[row.field];
        console.log('change field name', {...newFormData, [e.target.value]: row.value})
        return {...newFormData, [e.target.value]: row.value}
      });
      // update display state
      setCustomFields((f) => {
        const newFields = [...f];
        const index = newFields.findIndex((f) => f.field === row.field);
        newFields[index].field = e.target.value;
        return newFields;
      });
    } else if (field === 'value') {
      // update savable state
      setFormData(formData => {
        console.log('change field value', {...formData, [row.field]: e.target.value})
        return {...formData, [row.field]: e.target.value}
      });
      // update display state
      setCustomFields((f) => {
        const newFields = [...f];
        const index = newFields.findIndex((f) => f.field === row.field);
        newFields[index].value = e.target.value;
        return newFields;
      });
    }
  };

  const handleDeleteCustomField = (field) => {
    setCustomFields((f) => f.filter((f) => f.field !== field.field));
    setFormData(formData => {
      const newFormData = {...formData};
      delete newFormData[field.field];
      return newFormData;
    });
  }

  const formComponents = Array.from(customFields.values()).map((field) => {
    if (field.field === 'status') {
      return (
        <TextField
          select
          required={DEFAULT_FIELDS_MAP.has(field.field)}
          label="Select"
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
          onUpdate={(e, field, row) => handleCustomFormUpdate(e, field, row)}
          onDelete={() => handleDeleteCustomField(field)}
          row={field} canEdit={edit} 
      />)
    }

  });

  // console.log(formComponents);

  
  return (
    <Dialog open={true} onClose={onExit} fullWidth={true} maxWidth={'xl'}>
      <DialogTitle style={{'display': 'flex', 'justifyContent': 'space-between'}}>
        Patient Record
        <span>
          {edit && <Button variant="outlined" size='small' startIcon={<AddIcon />} onClick={() => handleAddField()}>Add Field</Button>}
          <Button variant="text" type='submit' style={{'paddingLeft': '1.6rem'}} onClick={(e) => edit ? handleSave(e) : setEdit(true)} startIcon={edit ? <SaveIcon /> : <EditIcon />}>{edit ? 'Save' : 'Edit'}</Button>
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