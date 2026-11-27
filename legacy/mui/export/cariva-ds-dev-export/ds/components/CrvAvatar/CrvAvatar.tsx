'use client';

import { forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { colors } from '../../tokens';
import { CrvBadge } from '../CrvBadge';
import { getAvatarOnlineBadgeSx } from '../CrvBadge/crvBadgeStyles';
import { getAvatarSx, getIconSize } from './crvAvatarStyles';
import type { CrvAvatarProps } from './CrvAvatar.types';

/** Defaults for every look prop of `CrvAvatar` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvAvatarVariants = {
  defaultVariants: {
    variant: 'circular',
    content: 'text',
    size: 'large',
  },
} as const;

export const CrvAvatar = forwardRef<HTMLDivElement, CrvAvatarProps>(
  function CrvAvatar(
    {
      variant = crvAvatarVariants.defaultVariants.variant,
      content = crvAvatarVariants.defaultVariants.content,
      size = crvAvatarVariants.defaultVariants.size,
      badge = false,
      initials = 'OP',
      src,
      alt,
      icon,
      sx,
      ...rest
    },
    ref,
  ) {
    const iconSizes = getIconSize(size);
    const resolvedIcon = icon ?? (
      <PersonOutlineIcon
        sx={{
          fontSize: iconSizes.slot,
          color:    colors.content.primary,
        }}
      />
    );

    const avatar = (
      <Avatar
        ref={badge ? undefined : ref}
        data-slot="avatar"
        data-variant={variant}
        data-size={size}
        data-content={content}
        variant={variant}
        src={content === 'image' ? src : undefined}
        alt={alt}
        sx={[getAvatarSx(size, content), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {content === 'text' && initials}
        {content === 'icon' && resolvedIcon}
      </Avatar>
    );

    if (!badge) {
      return avatar;
    }

    return (
      <CrvBadge
        ref={ref}
        variant="dot"
        color="success"
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={getAvatarOnlineBadgeSx()}
      >
        {avatar}
      </CrvBadge>
    );
  },
);
