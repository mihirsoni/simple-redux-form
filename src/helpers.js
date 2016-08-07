/*
  This are set of helpers function to make simpleReduxForm work
*/
export function getFieldValue(field, formValues) {
  if (formValues && formValues[field]) {
    return formValues[field].value;
  }
  return undefined;
}
export function simplifiedVlaues(formValues, fields) {
  return fields.reduce((acc, field) => ({
    ...acc,
    [field]: getFieldValue(field, formValues)
  }), Object.create(null));
}
export function createField(field, onChange) {
  const fieldObject = {
    name: field,
    touched: false,
    onChange: ({ target: { type, checked, value } }) => {
      const isCheckbox = type && type.toLowerCase() === 'checkbox';
      onChange(field, isCheckbox ? checked : value);
    }
  };
  return {
    ...fieldObject,
    setValue(value) { // If custome component set value directly
      onChange(field, value);
    }
  };
}
export function hasSyncErrors(errors) {
  let hasError = false;
  const fieldKeys = Object.keys(errors);
  for (let i = 0; i < fieldKeys.length; i++) {
    if (errors[fieldKeys[i]] !== undefined) {
      hasError = true;
      break;
    }
  }
  return hasError;
}
