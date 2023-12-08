import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { TYPE_OPTIONS } from '../utils/customFormUtils';

export default function CustomField({ row, onDelete, onUpdate, canEdit = false }) {
  console.log('custom row', row)
  return (
    <div style={{'display': 'flex'}}>
      <span style={{'display': 'grid', 'flex': 10, 'rowGap': '.5em'}}>
        <TextField
          disabled={!canEdit}
          label="Field"
          value={row.field}
          onChange={(e) => onUpdate(e, 'field', row)}
          size='small'
          InputProps={{readOnly: false}}
        />
        <TextField
          disabled={!canEdit}
          label="Value"
          value={row.value}
          onChange={(e) => onUpdate(e, 'value', row)}
          size='small'
          InputProps={{readOnly: false}}
        />
        <TextField
          select
          disabled={!canEdit}
          label="Type"
          value={row.type}
          size='small'
          onChange={(e) => onUpdate(e, 'type', row)}
          InputProps={{readOnly: false}}
        >
          {TYPE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
      </span>
      {canEdit && <Button 
        size='small' variant="text" color="error" 
        style={{'flex': 1}}
        onClick={onDelete} startIcon={<DeleteIcon />} />}
    </div>
  );


}