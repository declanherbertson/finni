import _ from 'lodash';
import { DEFAULT_FIELDS, IGNORED_FIELDS, DEFAULT_FIELDS_MAP } from './patientConstants';

export const handleAddField = (customFields, setCustomFields) => {
  const newField = {field: `Field ${String(customFields.length + 1)}`, value: '', type: 'string'};
  setCustomFields((f) => [...f, newField]);
};

export const getCustomFields = (patients) => {
  const customFields = new Map();
  for (const patient of patients) {
    for (const key of Object.keys(patient)) {
      const field = { name: key, type: typeof patient[key] };
      const fieldKey = `${field.name}-${field.type}`;
      if (!DEFAULT_FIELDS.has(key) && !customFields.has(fieldKey)) {
        customFields.set(`${field.name}-${field.type}`, field);
      }
    }
  }
  return Array.from(customFields.values());
}

export const customColumns = (customFields) => {
  return customFields.map(field => {
    return {
      field: field.name,
      flex: 1,
      headerName: _.capitalize(field.name),
      type: field.type,
      width: 150,
      editable: false,
    }
  });
}

export const aggregateStatuses = (patients) => {
  const statuses = {};
  for (const patient of patients) {
    if (!patient.status) {
      continue;
    }
    if (statuses[patient.status]) {
      statuses[patient.status] += 1;
    } else {
      statuses[patient.status] = 1;
    }
  }
  return statuses;
}

export const buildFieldsFromData = (data) => {
  const fields = new Map(DEFAULT_FIELDS_MAP);
  if (data.id === 'NEW') {
    return Array.from(fields.values()).map((f) => ({...f, value: ''}));
  }

  for (let key in data) {
    if (IGNORED_FIELDS.has(key)) {
      continue;
    }
    else if (fields.has(key)) {
      fields.get(key).value = data[key];
    } else {
      fields.set(key, { field: key, headerName: _.capitalize(key), value: data[key], type: typeof data[key] });
    }
  }
  return Array.from(fields.values());
}