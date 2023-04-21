/* eslint-disable @typescript-eslint/no-unused-vars */
import validate from 'validate.js';

export function validateForm(values: any) {
  const presence = {
    type: 'string',
    message: 'field is required',
  };

  const email = { email: { message: 'enter a valid email' } }

  const validationRules = Object.entries(values).map(([key, val]) => {
    
    return {
      [key]: {
      presence,
      key !== 'email' ? email : undefined }
    });
    }
    

  // eslint-disable-next-line no-console
  console.log('validationRules', validationRules);

  return validate(values, {});
}
