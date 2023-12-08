import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomField({ row, onDelete, onUpdate, canEdit = false }) {
  console.log('custom row', row)
  return (
    <div style={{'display': 'flex'}}>
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
        disabled={!canEdit}
        label="Type"
        value={row.type}
        size='small'
        onChange={(e) => onUpdate(e, 'type', row)}
        InputProps={{readOnly: false}}
      />
      {canEdit && <Button size='small' variant="text" color="error" onClick={onDelete} startIcon={<DeleteIcon />}></Button>}
    </div>
  );


}