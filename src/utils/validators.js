import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';
import {DEFAULT_FIELDS} from './patientConstants';

export const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});

export const emptyValidator = (value) => {
  return value !== undefined && value !== null && value !== '';
};

export const numberValidator = (value) => {
  return !isNaN(Number(value));
};

export const dateValidator = (value) => {
  return emptyValidator(value) && dayjs(value).isValid() && dayjs(value).isBefore(dayjs());
};

export const formValidator = (formData) => {
  for (const field of Array.from(DEFAULT_FIELDS)) {
    if (field === 'middelName') {
      continue;
    }
    if (!formData[field]) {
      return false;
    }
  };
  return true;
};
