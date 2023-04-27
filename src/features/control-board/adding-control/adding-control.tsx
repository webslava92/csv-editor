/* eslint-disable no-nested-ternary */
import React from 'react';
import { Field, Form } from 'react-final-form';
import dayjs from 'dayjs';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth } from '@mui/icons-material';
import { SubmitButton } from 'src/ui/submit-button';
import { validateForm } from './validate-form';

interface FormProps {
  data: Record<string, any>[];
  setData: Function;
  format: string;
}

export function AddingControl({ data, setData, format }: FormProps) {
  const fieldOrder = data.length && Object.keys(data[0]);

  const newData =
    data.length &&
    data.map((item: any) => {
      const objCopy = { ...item };
      delete objCopy.isUTF;
      return objCopy;
    });

  const fields =
    newData &&
    Object.entries(newData[0]).map((item: any) => ({
      [item[0]]: !!(
        dayjs(item[1]).isValid() &&
        item[0] !== 'phone' &&
        item[0] !== 'id' &&
        item[0] !== 'isUTF'
      ),
    }));

  const initialValues =
    data.length &&
    Object.fromEntries(
      Object.entries(data[0]).map(([key, value]) => [
        key,
        key !== 'phone' &&
        key !== 'id' &&
        key !== 'isUTF' &&
        dayjs(value).isValid()
          ? dayjs()
          : key === 'id'
            ? data.length
            : key === 'isUTF' ? 'false' : '',
      ])
    );

  const handleReset = ({ form }: any) => {
    if (fields) {
      fields.forEach((field: any) => {
        form.resetFieldState(Object.keys(field)[0]);
      });
    }

    form.reset(initialValues);
  };

  const onSubmit = (values: any, form: any) => {
    const orderedData =
      fieldOrder &&
      fieldOrder.reduce(
        (acc, key: string) => ({
          ...acc,
          [key]:
            dayjs(values[key]).isValid() &&
            key !== 'phone' &&
            key !== 'id' &&
            key !== 'isUTF'
              ? dayjs(values[key]).format(format)
              : values[key],
        }),
        {}
      );
    setData([...data, orderedData]);
    handleReset({ form });
  };

  const subscription = { submitting: true, pristine: true };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validateForm}
      initialValues={initialValues}
      subscription={subscription}
      render={({ handleSubmit, submitting, submitError, form }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.length &&
              fields &&
              fields.map((field: Record<string, any>) => {
                const key = Object.entries(field)[0][0];
                const isDate = Object.entries(field)[0][1];
                if (isDate) {
                  return (
                    <Field
                      key={key}
                      name={key}
                      render={({ input }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Box>
                            <DateTimePicker
                              {...input}
                              label={key}
                              format={format}
                              slotProps={{
                                textField: {
                                  InputProps: {
                                    endAdornment: (
                                      <InputAdornment position='end'>
                                        <CalendarMonth />
                                      </InputAdornment>
                                    ),
                                  },
                                  size: 'small',
                                },
                              }}
                            />
                          </Box>
                        </LocalizationProvider>
                      )}
                    />
                  );
                } return (
                  <Field
                    key={key}
                    name={key}
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        label={key}
                        disabled={key === 'id'}
                        size='small'
                        error={
                              meta.touched &&
                              (meta.error || meta.submitError)
                            }
                        helperText={
                              meta.touched &&
                              (meta.error || meta.submitError)
                            }
                      />
                    )}
                  />
                );
              }
              )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button
                onClick={() => handleReset({ form })}
                variant='contained'
              >
                Reset
              </Button>
              <div>{submitError && <div>{submitError}</div>}</div>
              <SubmitButton submitting={submitting} variant='contained'>
                Submit
              </SubmitButton>
            </Box>
          </Box>
        </form>
      )}
    />
  );
}
