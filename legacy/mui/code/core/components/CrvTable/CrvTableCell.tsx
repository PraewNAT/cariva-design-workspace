'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import { getTableCellSx } from './crvTableStyles';
import type { CrvTableCellProps } from './CrvTable.types';

/** Defaults for every look prop of `CrvTableCell` — the DS counterpart of a `cva` map's `defaultVariants`. */
export const crvTableCellVariants = {
  defaultVariants: {
    size: 'small',
    state: 'default',
  },
} as const;

// Ground truth: Figma crv-table-cell 4582:11271
export const CrvTableCell = forwardRef<HTMLTableCellElement, CrvTableCellProps>(
  function CrvTableCell(
    {
      size = crvTableCellVariants.defaultVariants.size,
      state = crvTableCellVariants.defaultVariants.state,
      alternate = false,
      compact = false,
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <TableCell
        ref={ref}
        data-slot="table-cell"
        data-size={size}
        data-state={state}
        sx={[
          getTableCellSx(size, state, alternate, compact),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        <Box className="crv-table-cell__inner">{children}</Box>
      </TableCell>
    );
  },
);
