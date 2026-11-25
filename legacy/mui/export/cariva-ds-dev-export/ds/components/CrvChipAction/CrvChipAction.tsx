'use client';

import { forwardRef } from 'react';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import { CrvAvatar } from '../CrvAvatar';
import { CHIP_AVATAR_SIZE, getChipActionSx } from './crvChipActionStyles';
import type { CrvChipActionProps } from './CrvChipAction.types';

/** Defaults for every look prop of `CrvChipAction` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvChipActionVariants = {
  defaultVariants: {
    size: 'medium',
    color: 'default',
    variant: 'filled',
  },
} as const;

// Ground truth from Figma (crv-chip-action, node 4459:62796)
export const CrvChipAction = forwardRef<HTMLDivElement, CrvChipActionProps>(
  function CrvChipAction(
    {
      label = 'Chip',
      thumbnailVisible = false,
      deleteVisible = false,
      thumbnailInitials = 'OP',
      thumbnailIcon,
      size = crvChipActionVariants.defaultVariants.size,
      color = crvChipActionVariants.defaultVariants.color,
      variant = crvChipActionVariants.defaultVariants.variant,
      disabled = false,
      onDelete,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <Chip
        ref={ref}
        data-slot="chip-action"
        data-variant={variant}
        data-color={color}
        data-size={size}
        label={label}
        // MUI only knows filled and outlined; `surface` rides on filled so MUI
        // adds no border of its own, and getChipActionSx paints the white.
        variant={variant === 'outlined' ? 'outlined' : 'filled'}
        size={size}
        disabled={disabled}
        avatar={
          thumbnailVisible ? (
            thumbnailIcon != null ? (
              <CrvAvatar size={CHIP_AVATAR_SIZE[size]} content="icon" icon={thumbnailIcon} />
            ) : (
              <CrvAvatar size={CHIP_AVATAR_SIZE[size]} content="text" initials={thumbnailInitials} />
            )
          ) : undefined
        }
        deleteIcon={<CancelIcon />}
        onDelete={deleteVisible ? onDelete : undefined}
        sx={{
          ...getChipActionSx(size, color, variant, Boolean(disabled)),
          ...sx,
        }}
        {...rest}
      />
    );
  },
);
