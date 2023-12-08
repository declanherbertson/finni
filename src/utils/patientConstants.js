import _ from 'lodash';

export const STATUS_OPTIONS = [
  { value: 'inquiry', label: 'Inquiry' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'active', label: 'Active' },
  { value: 'churned', label: 'Churned' },
];

export const STATUS_COLOUR_MAP = {
  'inquiry': 'secondary',
  'onboarding': 'primary',
  'active': 'success',
  'churned': 'error',
}

export const DEFAULT_FIELDS = new Set([
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

export const DEFAULT_COLUMNS = [
  { field: 'lastName',
    headerName: 'Full Name',
    type: 'string',
    width: 180,
    flex: 1,
    default: true,
    editable: false,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}` },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    type: 'date',
    width: 150,
    flex: 1,
    default: true,
    editable: false,
    valueGetter: (params) => new Date(params.row.dob),
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    width: 150,
    flex: 1,
    default: true,
    editable: false,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    width: 250,
    flex: 1,
    default: true,
    editable: false,
    valueGetter: (params) => `${params.row.address?.join(', ') || ''}`,
  },
];

export const DEFAULT_NAME_FIELDS = [
  { field: 'firstName',
    headerName: 'First Name',
    type: 'string',
    width: 150,
    flex: 1,
    default: true,
    editable: false,
  },
  { field: 'middleName',
    headerName: 'Middle Name',
    type: 'string',
    width: 150,
    flex: 1,
    default: true,
    editable: false,
  },
  { field: 'lastName',
    headerName: 'Last Name',
    type: 'string',
    width: 150,
    flex: 1,
    default: true,
    editable: false,
  },
]

export const DEFAULT_FIELDS_MAP = new Map([...DEFAULT_NAME_FIELDS.map(c => [c.field, c]), ...DEFAULT_COLUMNS.slice(1).map(c => [c.field, c])]);
