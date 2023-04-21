import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React, { memo } from 'react';

type SubmitButtonProps = ButtonProps & {
  submitting?: boolean;
};

export const SubmitButton = memo(
  ({ submitting, children, disabled, ...props }: SubmitButtonProps) => (
    <Button {...props} disabled={disabled || submitting}>
      {children}
      {submitting && <CircularProgress size={16} />}
    </Button>
  )
);

// @ts-expect-errorf is necessary
SubmitButton.defaultProps = {
  type: 'submit',
  children: 'Submit',
} as any;
