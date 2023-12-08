export const TYPE_OPTIONS = [
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' },
];

export const handleCustomFormUpdate = (setCustomFields, setFormData, e, field, row) => {
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
  } else if (field === 'type') {
    // update savable state
    setFormData(formData => {
      const newFormData = {...formData};
      delete newFormData[row.field];
      if (e.target.value === 'number' && isNaN(Number(row.value))) {
        row.value = 0;
      }
      return {...newFormData, [row.field]: e.target.value === 'number' ? Number(row.value) : row.value}
    });
    // update display state
    setCustomFields((f) => {
      const newFields = [...f];
      const index = newFields.findIndex((f) => f.field === row.field);
      newFields[index].type = e.target.value;
      if (e.target.value === 'number' && isNaN(Number(newFields[index].value))) {
        newFields[index].value = 0;
      }
      return newFields;
    });
  }
};

export const handleDeleteCustomField = (setCustomFields, setFormData, field) => {
  setCustomFields((f) => f.filter((f) => f.field !== field.field));
  setFormData(formData => {
    const newFormData = {...formData};
    delete newFormData[field.field];
    return newFormData;
  });
}