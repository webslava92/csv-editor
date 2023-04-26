/* eslint-disable no-nested-ternary */
import React from 'react';
import { Field, Form } from 'react-final-form';
import dayjs from 'dayjs';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth } from '@mui/icons-material';
import { dateToISO } from '@common/dateConverter';
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
        dayjs(dateToISO(item[1], format)).isValid() &&
        item[0] !== 'phone' &&
        item[0] !== 'id' &&
        item[0] !== 'isUTF'
      ),
    }));

  const onSubmit = (values: any) => {
    const orderedData =
      fieldOrder &&
      fieldOrder.reduce(
        (acc, key: string) => ({
          ...acc,
          [key]:
            dayjs(dateToISO(values[key], format)).isValid() &&
            key !== 'phone' &&
            key !== 'id' &&
            key !== 'isUTF'
              ? dayjs(dateToISO(values[key], format)).format(format)
              : values[key],
        }),
        {}
      );
    setData([...data, orderedData]);
  };

  const initialValues =
    data.length &&
    Object.fromEntries(
      Object.entries(data[0]).map(([key, value]) => [
        key,
        dayjs(dateToISO(value, format)).isValid() &&
        key !== 'phone' &&
        key !== 'id' &&
        key !== 'isUTF'
          ? dayjs()
          : key === 'id'
            ? data.length
            : '',
      ])
    );

  const subscription = { submitting: true, pristine: true };

  const handleReset = ({ form }: any) => {
    if (fields) {
      fields.forEach((field: any) => {
        form.resetFieldState(Object.keys(field)[0]);
      });
    }

    form.reset(initialValues);
  };

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
              fields.map((field: Record<string, any>) =>
                (Object.entries(field)[0][1] ? (
                  <Field
                    key={Object.entries(field)[0][0]}
                    name={Object.entries(field)[0][0]}
                    render={({ input }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box>
                          <DateTimePicker
                            {...input}
                            label={Object.entries(field)[0][0]}
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
                ) : (
                  <Field
                    key={Object.entries(field)[0][0]}
                    name={Object.entries(field)[0][0]}
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        label={Object.entries(field)[0][0]}
                        disabled={Object.entries(field)[0][0] === 'id'}
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
                )))}
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
