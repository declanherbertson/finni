import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import {TYPE_OPTIONS} from '../utils/customFormUtils';
import {ValidationTextField, numberValidator} from '../utils/validators';

export default function CustomField({row, onDelete, onUpdate, canEdit = false}) {
  return (
    <div style={{'display': 'flex'}}>
      <span style={{'display': 'grid', 'flex': 10, 'rowGap': '.5em'}}>
        <ValidationTextField
          disabled={!canEdit}
          label="Field"
          value={row.field}
          onChange={(e) => onUpdate(e, 'field', row)}
          size='small'
          InputProps={{readOnly: false}}
        />
        <ValidationTextField
          disabled={!canEdit}
          multiline={row.type === 'string'}
          error={row.type === 'number' && !numberValidator(row.value)}
          label="Value"
          value={row.value}
          onChange={(e) => onUpdate(e, 'value', row)}
          size='small'
          InputProps={{readOnly: false}}
        />
        <ValidationTextField
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
        </ValidationTextField>
      </span>
      {canEdit && <Button
        size='small' variant="text" color="error"
        style={{'flex': 1}}
        onClick={onDelete} startIcon={<DeleteIcon />} />}
    </div>
  );
}
