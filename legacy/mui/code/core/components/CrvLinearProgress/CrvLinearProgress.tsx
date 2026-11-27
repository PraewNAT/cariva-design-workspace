'use client';

import { forwardRef } from 'react';
import MuiLinearProgress from '@mui/material/LinearProgress';
import { getLinearProgressSx } from '../../crvProgressStyles';
import type { CrvLinearProgressProps } from './CrvLinearProgress.types';

/** Defaults for every look prop of `CrvLinearProgress` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvLinearProgressVariants = {
  defaultVariants: {
    variant: 'determinate',
    color: 'primary',
  },
} as const;

// Ground truth: Figma crv-linear-progress 4456:16573 (Progress section 4457:16647)
export const CrvLinearProgress = forwardRef<HTMLSpanElement, CrvLinearProgressProps>(
  function CrvLinearProgress(
    {
      variant = crvLinearProgressVariants.defaultVariants.variant,
      color = crvLinearProgressVariants.defaultVariants.color,
      value = variant === 'buffer' ? 40 : 60,
      valueBuffer = 70,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <MuiLinearProgress
        ref={ref}
        data-slot="linear-progress"
        data-variant={variant}
        data-color={color}
        variant={variant}
        value={value}
        valueBuffer={variant === 'buffer' ? valueBuffer : undefined}
        sx={[
          getLinearProgressSx(color),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      />
    );
  },
);
