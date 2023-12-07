import _ from 'lodash';

const DEFAULT_FIELDS = new Set([
  'id',
  'firstName',
  'middleName',
  'lastName',
  'dob',
  'address',
  'status',
  'owner',
])

export const IGNORED_FIELDS = new Set([
  'id',
  'owner',
]);

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

export const DEFAULT_COLUMNS = [
  { field: 'lastName',
    headerName: 'Full Name',
    type: 'string',
    width: 180,
    flex: 1,
    editable: false,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}` },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    type: 'date',
    width: 150,
    flex: 1,
    editable: false,
    valueGetter: (params) => new Date(params.row.dob),
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    width: 250,
    flex: 1,
    editable: false,
    valueGetter: (params) => `${params.row.address?.join(', ') || ''}`,
  },
];

export const DEFAULT_COLUMNS_MAP = new Map(DEFAULT_COLUMNS.map(c => [c.field, c]));

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

export const STATUS_COLOUR_MAP = {
  'inquiry': 'secondary',
  'onboarding': 'primary',
  'active': 'success',
  'churned': 'error',
}