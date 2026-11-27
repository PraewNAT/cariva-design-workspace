'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { getTagColorSx, getTagSx } from './crvTagStyles';
import type { CrvTagColorProps, CrvTagProps } from './CrvTag.types';

const defaultIcon = <RadioButtonUncheckedRoundedIcon />;

function mergeSx(base: SxProps<Theme>, sx?: SxProps<Theme>): SxProps<Theme> {
  if (!sx) return base;
  return (Array.isArray(sx) ? [base, ...sx] : [base, sx]) as SxProps<Theme>;
}

/** Defaults for every look prop of `CrvTag` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvTagVariants = {
  defaultVariants: {
    variant: 'filled',
    color: 'default',
    content: 'label',
    size: 'small',
  },
} as const;

export const CrvTag = forwardRef<HTMLSpanElement, CrvTagProps>(
  function CrvTag(
    {
      variant = crvTagVariants.defaultVariants.variant,
      color = crvTagVariants.defaultVariants.color,
      content = crvTagVariants.defaultVariants.content,
      size = crvTagVariants.defaultVariants.size,
      label = 'Label',
      badgeContent = '8',
      startIconVisible = false,
      endIconVisible = false,
      startIcon = defaultIcon,
      endIcon = defaultIcon,
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    const isNumber = content === 'number';
    const body = children ?? (isNumber ? badgeContent : label);

    return (
      <Box
        ref={ref}
        data-slot="tag"
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-content={content}
        component="span"
        sx={mergeSx(getTagSx(variant, color, content, size), sx)}
        {...rest}
      >
        {!isNumber && startIconVisible && startIcon}
        {body}
        {!isNumber && endIconVisible && endIcon}
      </Box>
    );
  },
);

/** Defaults for every look prop of `CrvTagColor` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvTagColorVariants = {
  defaultVariants: {
    color: 'primary',
  },
} as const;

export const CrvTagColor = forwardRef<HTMLSpanElement, CrvTagColorProps>(
  function CrvTagColor(
    {
      color = crvTagColorVariants.defaultVariants.color,
      label = 'Label',
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        data-slot="tag-color"
        data-color={color}
        component="span"
        sx={mergeSx(getTagColorSx(color), sx)}
        {...rest}
      >
        {children ?? label}
      </Box>
    );
  },
);
