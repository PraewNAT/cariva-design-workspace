'use client';

import { forwardRef } from 'react';
import MuiButton from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import { typography, productStyle, defaultProductStyle } from '../../tokens';
import { buttonSizing } from '../../theme/buttonSizing';
import {
  getCrvButtonDisabledSx,
  getCrvButtonElevatedSx,
  getCrvButtonOutlinedSx,
  getCrvButtonTextSx,
} from '../../theme/components/crvButton';
import type {
  CrvButtonColor,
  CrvButtonProps,
  CrvButtonSize,
  CrvButtonVariant,
} from './CrvButton.types';

/**
 * Every look the button can take, in one table — the MUI counterpart of the
 * dev team's `cva` variant maps. `size` holds Figma's metrics; `variant` turns
 * a colour into that variant's styles.
 */
export const crvButtonVariants = {
  defaultVariants: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  } satisfies { variant: CrvButtonVariant; color: CrvButtonColor; size: CrvButtonSize },
  size: buttonSizing,
  variant: {
    contained: () => [getCrvButtonDisabledSx('contained')],
    outlined: (color: CrvButtonColor) => [
      getCrvButtonDisabledSx('outlined'),
      getCrvButtonOutlinedSx(color),
    ],
    text: (color: CrvButtonColor) => [
      getCrvButtonDisabledSx('text'),
      color === 'neutral' ? getCrvButtonTextSx(color) : {},
    ],
    elevated: (color: CrvButtonColor) => [
      getCrvButtonDisabledSx('contained'),
      getCrvButtonElevatedSx(color),
    ],
  } satisfies Record<CrvButtonVariant, (color: CrvButtonColor) => SxProps<Theme>[]>,
};

type CrvButtonLook = {
  variant?: CrvButtonVariant;
  color?: CrvButtonColor;
  size?: CrvButtonSize;
};

/**
 * Cariva button styles as an `sx` array, like calling `buttonVariants()` in the
 * dev codebase. Use it to give a non-button MUI element the button's look.
 */
export function crvButtonSx({
  variant = crvButtonVariants.defaultVariants.variant,
  color = crvButtonVariants.defaultVariants.color,
  size = crvButtonVariants.defaultVariants.size,
}: CrvButtonLook = {}): SxProps<Theme>[] {
  const metrics = crvButtonVariants.size[size];
  // Figma's outlined stroke sits outside the frame and takes no layout space;
  // a CSS border does, so give its 1px back from the side padding.
  const paddingX = metrics.paddingX - (variant === 'outlined' ? 1 : 0);

  return [
    {
      height: metrics.height,
      minHeight: metrics.height,
      paddingTop: `${metrics.paddingY}px`,
      paddingBottom: `${metrics.paddingY}px`,
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      gap: `${metrics.gap}px`,
      '& .MuiSvgIcon-root': { fontSize: metrics.iconSize },
      // MUI puts its own margins on the icon slots (and an 18px icon on size=small);
      // `gap` above is the only icon↔label spacing Figma has.
      // Doubled class: MUI's slot styles load after ours at equal specificity.
      '& .MuiButton-startIcon.MuiButton-startIcon, & .MuiButton-endIcon.MuiButton-endIcon': { margin: 0 },
      '& .MuiButton-startIcon.MuiButton-startIcon > *:nth-of-type(1), & .MuiButton-endIcon.MuiButton-endIcon > *:nth-of-type(1)': {
        fontSize: metrics.iconSize,
      },
      borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
      textTransform: 'none',
      fontSize: `${typography.fontSize.label[metrics.label]}px`,
      lineHeight: `${typography.lineHeight.label[metrics.label]}px`,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.ui,
    },
    ...crvButtonVariants.variant[variant](color),
  ];
}

export const CrvButton = forwardRef<HTMLButtonElement, CrvButtonProps>(
  function CrvButton(
    {
      variant = crvButtonVariants.defaultVariants.variant,
      color = crvButtonVariants.defaultVariants.color,
      size = crvButtonVariants.defaultVariants.size,
      loading = false,
      startIcon,
      endIcon,
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    // `elevated` and `neutral` are DS-only — MUI has no such variant or palette
    // entry, so they render on a neutral MUI base and take their look from sx.
    const muiVariant = variant === 'elevated' ? 'text' : variant;
    const muiColor = color === 'neutral' ? 'primary' : color;

    return (
      <MuiButton
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-color={color}
        data-size={size}
        variant={muiVariant}
        color={muiColor}
        size={size}
        loading={loading}
        loadingPosition="start"
        startIcon={loading ? undefined : startIcon}
        endIcon={loading ? undefined : endIcon}
        sx={[
          ...crvButtonSx({ variant, color, size }),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);
