import CustomField from "./CustomField";
import { handleCustomFormUpdate, handleDeleteCustomField } from "../utils/customFormUtils";
import { DEFAULT_FIELDS_MAP, STATUS_OPTIONS } from "../utils/patientConstants";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const getFormComponents = (formData, setFormData, edit, customFields, setCustomFields) => {
  return Array.from(customFields.values()).map((field) => {
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
    } else if (field.field === 'dob') {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            label="Date of Birth"
            value={formData[field.field] ? dayjs(formData[field.field]) : undefined}
            onChange={(value) => setFormData({...formData, [field.field]: value.format('MM/DD/YYYY')})}
            disabled={!edit}
          />
        </LocalizationProvider>
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
};