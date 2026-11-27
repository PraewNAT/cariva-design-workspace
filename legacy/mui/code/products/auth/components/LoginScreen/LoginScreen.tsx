'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CrvButton } from '../../../../core/components/CrvButton';
import { CrvInput } from '../../../../core/components/CrvInput';
import { CrvCheckbox } from '../../../../core/components/CrvCheckbox';
import { CrvLink } from '../../../../core/components/CrvLink';
import { colors, spacing, typography, radius } from '../../../../core/tokens';

export interface LoginScreenProps {
  /** Show the error state on the password field. */
  error?: boolean;
  /** Narrow (mobile) layout: card fills the width. */
  compact?: boolean;
}

/** Email + password sign-in screen built only from DS components and tokens. */
export function LoginScreen({ error = false, compact = false }: LoginScreenProps) {
  return (
    <Box
      data-slot="login-screen"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing.xl}px`,
        backgroundColor: colors.bg.subtle,
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          width: '100%',
          maxWidth: compact ? 'none' : 400,
          display: 'flex',
          flexDirection: 'column',
          gap: `${spacing.xl}px`,
          padding: `${spacing['3xl']}px`,
          backgroundColor: colors.bg.white,
          borderRadius: `${radius['16']}px`,
          border: `1px solid ${colors.neutral.border.default}`,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${spacing.xs}px` }}>
          <Typography
            component="h1"
            sx={{
              fontSize: typography.fontSize.heading.large,
              lineHeight: `${typography.lineHeight.heading.large}px`,
              fontWeight: typography.fontWeight.semibold,
              color: colors.content.primary,
            }}
          >
            เข้าสู่ระบบ
          </Typography>
          <Typography
            sx={{
              fontSize: typography.fontSize.body.medium,
              lineHeight: `${typography.lineHeight.body.medium}px`,
              color: colors.content.secondary,
            }}
          >
            ยินดีต้อนรับกลับมา กรอกอีเมลและรหัสผ่านเพื่อดำเนินการต่อ
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${spacing.lg}px` }}>
          <CrvInput
            label="อีเมล"
            placeholder="name@example.com"
            type="email"
            startAdornment={<MailOutlineIcon fontSize="small" />}
          />
          <CrvInput
            label="รหัสผ่าน"
            placeholder="อย่างน้อย 8 ตัวอักษร"
            type="password"
            startAdornment={<LockOutlinedIcon fontSize="small" />}
            error={error}
            errorMessage={error ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' : undefined}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CrvCheckbox label="จดจำฉันไว้" descriptionVisible={false} />
            <CrvLink href="#" size="small" sx={{ whiteSpace: 'nowrap' }}>ลืมรหัสผ่าน?</CrvLink>
          </Box>
        </Box>

        <CrvButton type="submit" size="large" fullWidth>
          เข้าสู่ระบบ
        </CrvButton>

        <Typography
          sx={{
            textAlign: 'center',
            fontSize: typography.fontSize.body.medium,
            lineHeight: `${typography.lineHeight.body.medium}px`,
            color: colors.content.secondary,
          }}
        >
          ยังไม่มีบัญชี? <CrvLink href="#" size="small">สมัครสมาชิก</CrvLink>
        </Typography>
      </Box>
    </Box>
  );
}
