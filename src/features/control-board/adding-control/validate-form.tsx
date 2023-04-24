import validate from 'validate.js';

export function validateForm(values: any) {
  const rules = {
    presence: {
      type: 'string',
      message: 'field is required',
    }
  };

  const rulesForEmail = {
    presence: {
      type: 'string',
      message: 'field is required',
    },
    email: {
      email: { message: 'enter a valid email' }
    } };

  const validationRules = Object.assign(
    {},
    ...Object.keys(values).map((key: any) => ({
      [key]: key !== 'email' ? rules : rulesForEmail
    }))
  );

  return validate(values, validationRules);
}
