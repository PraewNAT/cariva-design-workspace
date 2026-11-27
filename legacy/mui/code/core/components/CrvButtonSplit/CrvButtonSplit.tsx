'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import {
  getSplitActionSx,
  getSplitDividerSx,
  getSplitRootSx,
  getSplitTriggerSx,
} from './crvButtonSplitStyles';
import type { CrvButtonSplitProps } from './CrvButtonSplit.types';

/** Defaults for every look prop of `CrvButtonSplit` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvButtonSplitVariants = {
  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
} as const;

/**
 * One primary action plus a trigger for its alternatives — see
 * rules/components/crv-button-split.md.
 */
export const CrvButtonSplit = forwardRef<HTMLDivElement, CrvButtonSplitProps>(
  function CrvButtonSplit(
    {
      children,
      color = crvButtonSplitVariants.defaultVariants.color,
      size = crvButtonSplitVariants.defaultVariants.size,
      disabled = false,
      startIcon,
      triggerIcon,
      onClick,
      onTriggerClick,
      triggerLabel,
      className,
    },
    ref,
  ) {
    return (
      <Box data-slot="button-split" data-color={color} data-size={size} ref={ref} className={className} sx={getSplitRootSx(color, size, disabled)}>
        <ButtonBase disabled={disabled} onClick={onClick} sx={getSplitActionSx(size, disabled, color)}>
          {startIcon}
          {children}
        </ButtonBase>
        <Box aria-hidden sx={getSplitDividerSx(color, disabled)} />
        <ButtonBase
          disabled={disabled}
          onClick={onTriggerClick}
          aria-label={triggerLabel}
          aria-haspopup="menu"
          sx={getSplitTriggerSx(size, disabled, color)}
        >
          {triggerIcon ?? <ExpandMoreRoundedIcon />}
        </ButtonBase>
      </Box>
    );
  },
);
