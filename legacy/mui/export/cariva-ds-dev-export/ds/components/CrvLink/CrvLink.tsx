'use client';

import { forwardRef } from 'react';
import MuiLink from '@mui/material/Link';
import Box from '@mui/material/Box';
import { getCrvLinkSx } from '../../theme/components/crvLink';
import { buttonSizing } from '../../theme/buttonSizing';
import type { CrvLinkProps } from './CrvLink.types';

/** Defaults for every look prop of `CrvLink` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvLinkVariants = {
  defaultVariants: {
    size: 'medium',
  },
} as const;

export const CrvLink = forwardRef<HTMLAnchorElement, CrvLinkProps>(
  function CrvLink(
    {
      size = crvLinkVariants.defaultVariants.size,
      disabled = false,
      startIcon,
      endIcon,
      children,
      onClick,
      sx,
      ...rest
    },
    ref,
  ) {
    const { iconSize } = buttonSizing[size];

    return (
      <MuiLink
        ref={ref}
        data-slot="link"
        data-size={size}
        underline="always"
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        sx={[getCrvLinkSx(size, disabled), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {startIcon && (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              width: iconSize,
              height: iconSize,
              flexShrink: 0,
              color: 'inherit',
            }}
          >
            {startIcon}
          </Box>
        )}
        {children}
        {endIcon && (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              width: iconSize,
              height: iconSize,
              flexShrink: 0,
              color: 'inherit',
            }}
          >
            {endIcon}
          </Box>
        )}
      </MuiLink>
    );
  },
);
