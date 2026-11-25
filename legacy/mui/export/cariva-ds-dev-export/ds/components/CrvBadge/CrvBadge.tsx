'use client';

import { forwardRef } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { getBadgeSx } from './crvBadgeStyles';
import type { CrvBadgeProps } from './CrvBadge.types';

const hiddenAnchor = (
  <Box
    component="span"
    aria-hidden
    sx={{ display: 'inline-block', width: 0, height: 0, overflow: 'hidden' }}
  />
);

/** Defaults for every look prop of `CrvBadge` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvBadgeVariants = {
  defaultVariants: {
    variant: 'dot',
    color: 'primary',
  },
} as const;

export const CrvBadge = forwardRef<HTMLSpanElement, CrvBadgeProps>(
  function CrvBadge(
    {
      variant = crvBadgeVariants.defaultVariants.variant,
      color = crvBadgeVariants.defaultVariants.color,
      badgeContent = '1',
      children,
      overlap = 'rectangular',
      anchorOrigin = { vertical: 'top', horizontal: 'right' },
      sx,
      ...rest
    },
    ref,
  ) {
    const isDot = variant === 'dot';

    return (
      <Badge
        ref={ref}
        data-slot="badge"
        data-variant={variant}
        data-color={color}
        variant={variant}
        badgeContent={isDot ? '' : badgeContent}
        overlap={overlap}
        anchorOrigin={anchorOrigin}
        sx={[getBadgeSx(variant, color), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {children ?? hiddenAnchor}
      </Badge>
    );
  },
);
