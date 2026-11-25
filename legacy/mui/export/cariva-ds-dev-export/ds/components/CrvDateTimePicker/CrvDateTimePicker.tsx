'use client';

import { forwardRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  crvPickerPopupSx,
  crvPickerTextFieldSx,
  type CrvDateTimePickerSize,
} from './crvDateTimePickerStyles';
import type {
  CrvDatePickerProps,
  CrvDateTimePickerProps,
  CrvTimePickerProps,
} from './CrvDateTimePicker.types';

type SlotProps = Record<string, any>;

interface MergeSlotOptions {
  size: CrvDateTimePickerSize;
  disabled: boolean;
  error: boolean;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  fullWidth: boolean;
}

function mergeSlotProps(slotProps: unknown, options: MergeSlotOptions): SlotProps {
  const rawSlotProps = (slotProps ?? {}) as SlotProps;
  const textField = (rawSlotProps.textField ?? {}) as SlotProps;
  const popper = (rawSlotProps.popper ?? {}) as SlotProps;
  const dialog = (rawSlotProps.dialog ?? {}) as SlotProps;

  const helperContent =
    options.error ? options.errorMessage ?? options.helperText : options.helperText;

  return {
    ...rawSlotProps,
    textField: {
      fullWidth: options.fullWidth,
      size: options.size,
      ...textField,
      error: textField.error ?? options.error,
      helperText: textField.helperText ?? helperContent,
      sx: [
        crvPickerTextFieldSx(options.size, options.disabled),
        textField.sx,
      ],
    },
    popper: {
      ...popper,
      sx: [crvPickerPopupSx, popper.sx],
    },
    dialog: {
      ...dialog,
      sx: [crvPickerPopupSx, dialog.sx],
    },
  };
}

/** Defaults for every look prop of `CrvDatePicker` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvDatePickerVariants = {
  defaultVariants: {
    size: 'medium',
  },
} as const;

export const CrvDatePicker = forwardRef<HTMLDivElement, CrvDatePickerProps>(
  function CrvDatePicker(
    {
      size = crvDatePickerVariants.defaultVariants.size,
      helperText,
      error = false,
      errorMessage,
      fullWidth = true,
      disabled = false,
      slotProps,
      ...rest
    },
    ref,
  ) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          ref={ref}
          data-slot="date-picker"
          data-size={size}
          disabled={disabled}
          slotProps={mergeSlotProps(slotProps, {
            size,
            disabled,
            error,
            helperText,
            errorMessage,
            fullWidth,
          }) as CrvDatePickerProps['slotProps']}
          {...rest}
        />
      </LocalizationProvider>
    );
  },
);

/** Defaults for every look prop of `CrvTimePicker` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvTimePickerVariants = {
  defaultVariants: {
    size: 'medium',
  },
} as const;

export const CrvTimePicker = forwardRef<HTMLDivElement, CrvTimePickerProps>(
  function CrvTimePicker(
    {
      size = crvTimePickerVariants.defaultVariants.size,
      helperText,
      error = false,
      errorMessage,
      fullWidth = true,
      disabled = false,
      slotProps,
      ...rest
    },
    ref,
  ) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          ref={ref}
          data-slot="time-picker"
          data-size={size}
          disabled={disabled}
          slotProps={mergeSlotProps(slotProps, {
            size,
            disabled,
            error,
            helperText,
            errorMessage,
            fullWidth,
          }) as CrvTimePickerProps['slotProps']}
          {...rest}
        />
      </LocalizationProvider>
    );
  },
);

/** Defaults for every look prop of `CrvDateTimePicker` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvDateTimePickerVariants = {
  defaultVariants: {
    size: 'medium',
  },
} as const;

export const CrvDateTimePicker = forwardRef<HTMLDivElement, CrvDateTimePickerProps>(
  function CrvDateTimePicker(
    {
      size = crvDateTimePickerVariants.defaultVariants.size,
      helperText,
      error = false,
      errorMessage,
      fullWidth = true,
      disabled = false,
      slotProps,
      ...rest
    },
    ref,
  ) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          ref={ref}
          data-slot="date-time-picker"
          data-size={size}
          disabled={disabled}
          slotProps={mergeSlotProps(slotProps, {
            size,
            disabled,
            error,
            helperText,
            errorMessage,
            fullWidth,
          }) as CrvDateTimePickerProps['slotProps']}
          {...rest}
        />
      </LocalizationProvider>
    );
  },
);
