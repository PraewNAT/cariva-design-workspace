import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import SearchRounded from '@mui/icons-material/SearchRounded';
import BusinessRounded from '@mui/icons-material/BusinessRounded';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import { colors, spacing, typography, productStyle, defaultProductStyle } from '../../tokens';
import { CrvButton } from '../CrvButton';
import { CrvInput } from '../CrvInput';
import { CrvTag } from '../CrvTag';
import { CrvModal } from '../CrvModal';
import { CrvAvatar } from '../CrvAvatar';
import { CrvTableCell, CrvTableHead } from '../CrvTable';
import { CrvSidebar } from './CrvSidebar';
import { CrvSidebarMenu } from './CrvSidebarMenu';

const px = (n: number) => `${n}px`;
const panel = { bgcolor: colors.onSurface.default, borderRadius: px(productStyle[defaultProductStyle].containerMd) };
const meta: Meta = {
  title: 'Experiments/Cariva layout comparison',
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Draft comparison only. Original is the existing OrganizationOverview story. Proposed borrows BWC hierarchy and grouping, preserving Cariva colors, radius, typography and Crv/MUI. No Core changes. Both use the same five device fixtures and summary values. Proposed search/status and detail dialog are local mock interactions, not backend functionality.' } } },
};
export default meta;
type Story = StoryObj;
// Identical fixtures to Templates/OrganizationOverview; intentionally not production data.
const devices = [
  { id: 1, status: 'active', platform: 'MacOS', department: 'Emergency Room' },
  { id: 2, status: 'inactive', platform: 'iOS', department: 'Neurology' },
  { id: 3, status: 'active', platform: 'Android', department: 'Oncology' },
  { id: 4, status: 'active', platform: 'Android', department: 'Pediatrics' },
  { id: 5, status: 'suspended', platform: 'Window', department: 'Geriatrics' },
] as const;
const statuses = {
  active: { color: 'success', label: 'Active' },
  inactive: { color: 'error', label: 'Inactive' },
  suspended: { color: 'warning', label: 'Suspended' },
} as const;
const summaries = [['45/50', 'Active Devices'], ['8', 'Departments'], ['12', 'Active keys'], ['2', 'Suspended keys'], ['3', 'Expired keys']];

function ProposedScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<typeof devices[number] | null>(null);
  const visible = devices.filter(d => (filter === 'all' || d.status === filter) && `${d.platform} ${d.department} BHQ0BDSF11 Bangkok Hospital Headquarter`.toLowerCase().includes(query.toLowerCase()));
  return <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: colors.bg.subtle, color: colors.content.primary, fontFamily: typography.fontFamily.ui }}>
    <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexShrink: 0 }}>
      <CrvSidebar logo={<Typography sx={{ fontSize: typography.fontSize.heading.medium, fontWeight: typography.fontWeight.bold, color: colors.brand.primary.content.default }}>CARIVA</Typography>}>
        <CrvSidebarMenu label="Organization" icon={<BusinessRounded />} defaultActive items={[{ label: 'Overview', selected: true }, { label: 'Departments', disabled: true }, { label: 'License keys', disabled: true }]} />
        {['Appointment', 'Patients', 'User Management', 'App Distribution'].map(label => <CrvSidebarMenu key={label} type="default" label={label} disabled />)}
      </CrvSidebar>
    </Box>
    <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
      <Box component="header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: px(spacing.lg), md: px(spacing['3xl']) }, py: px(spacing.lg), bgcolor: colors.onSurface.default, borderBottom: `1px solid ${colors.border.disabled}` }}>
        <Typography sx={{ fontSize: typography.fontSize.body.medium, color: colors.content.secondary }}>Organization / Overview</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: px(spacing.sm) }}><CrvAvatar content="text" initials="OP" size="small" /><Typography sx={{ fontSize: typography.fontSize.label.medium }}>Operator</Typography></Box>
      </Box>
      <Box sx={{ p: { xs: px(spacing.lg), md: px(spacing['3xl']) }, display: 'grid', gap: px(spacing.xl) }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: px(spacing.lg) }}>
          <Box><Typography component="h1" sx={{ fontSize: typography.fontSize.heading.large, fontWeight: typography.fontWeight.semibold, lineHeight: px(typography.lineHeight.heading.large) }}>Cariva Hospital</Typography><Typography sx={{ mt: px(spacing.xs), fontSize: typography.fontSize.body.medium, color: colors.content.secondary }}>Organization overview</Typography></Box>
          <CrvTag color="success" label="Active" />
        </Box>
        <Box sx={{ ...panel, p: px(spacing.xl), display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(5, minmax(0, 1fr))' }, gap: px(spacing.xl) }}>
          {summaries.map(([value, label]) => <Box key={label}><Typography sx={{ fontSize: typography.fontSize.body.medium, color: colors.content.secondary }}>{label}</Typography><Typography sx={{ mt: px(spacing.sm), fontSize: typography.fontSize.heading.large, fontWeight: typography.fontWeight.semibold, fontVariantNumeric: 'tabular-nums' }}>{value}</Typography></Box>)}
        </Box>
        <Box component="section" aria-label="Organization information" sx={{ ...panel, p: px(spacing.xl), display: 'flex', flexWrap: 'wrap', gap: px(spacing['3xl']), alignItems: 'center' }}>
          <Typography component="h2" sx={{ fontSize: typography.fontSize.heading.small, fontWeight: typography.fontWeight.semibold }}>Organization information</Typography>
          {[['Organization name', 'Cariva Hospital'], ['Organization code', 'CRV'], ['Package type', 'Premium']].map(([label, value]) => <Box key={label}><Typography sx={{ fontSize: typography.fontSize.body.small, color: colors.content.secondary }}>{label}</Typography><Typography sx={{ mt: px(spacing.xs), fontSize: typography.fontSize.body.medium, fontWeight: typography.fontWeight.medium }}>{value}</Typography></Box>)}
        </Box>
        <Box component="section" aria-labelledby="devices-title" sx={{ ...panel, overflow: 'hidden' }}>
          <Box sx={{ p: px(spacing.xl), display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: px(spacing.lg) }}>
            <Box><Typography component="h2" id="devices-title" sx={{ fontSize: typography.fontSize.heading.medium, fontWeight: typography.fontWeight.semibold }}>Devices</Typography><Typography sx={{ fontSize: typography.fontSize.body.small, color: colors.content.secondary, mt: px(spacing.xs) }}>Bangkok Hospital Headquarter</Typography></Box>
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}><CrvInput size="small" labelVisible={false} inputProps={{ 'aria-label': 'Search devices' }} placeholder="Search devices or department" startAdornment={<SearchRounded />} value={query} onChange={e => setQuery(e.target.value)} /></Box>
          </Box>
          <Box role="group" aria-label="Device status" sx={{ display: 'flex', flexWrap: 'wrap', gap: px(spacing.sm), px: px(spacing.xl), pb: px(spacing.lg) }}>
            {[['all', 'All devices'], ['active', 'Active'], ['inactive', 'Inactive'], ['suspended', 'Suspended']].map(([value, label]) => <CrvButton key={value} size="small" variant={filter === value ? 'outlined' : 'text'} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</CrvButton>)}
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <Table aria-label="Devices"><TableHead><TableRow>{['Device name', 'Status', 'Platform', 'Department', 'Last active', 'Details'].map(label => <CrvTableHead key={label} label={label} />)}</TableRow></TableHead>
              <TableBody>{visible.map(device => <TableRow key={device.id}>
                <CrvTableCell><Typography sx={{ fontSize: typography.fontSize.body.medium, fontWeight: typography.fontWeight.medium }}>BHQ0BDSF11...</Typography></CrvTableCell>
                <CrvTableCell><CrvTag color={statuses[device.status].color} label={statuses[device.status].label} /></CrvTableCell>
                <CrvTableCell>{device.platform}</CrvTableCell><CrvTableCell>{device.department}</CrvTableCell><CrvTableCell>18/10/2025</CrvTableCell>
                <CrvTableCell><CrvButton variant="text" size="small" aria-label={`View ${device.department} device`} onClick={() => setSelected(device)} startIcon={<VisibilityOutlined />}>View</CrvButton></CrvTableCell>
              </TableRow>)}</TableBody>
            </Table>
          </Box>
          {visible.length === 0 && <Box role="status" sx={{ p: px(spacing['3xl']), textAlign: 'center' }}><Typography>No matching devices</Typography><CrvButton variant="text" onClick={() => { setQuery(''); setFilter('all'); }}>Clear filters</CrvButton></Box>}
          <Typography role="status" sx={{ px: px(spacing.xl), py: px(spacing.lg), fontSize: typography.fontSize.body.small, color: colors.content.secondary }}>Showing {visible.length} of {devices.length} devices</Typography>
        </Box>
      </Box>
    </Box>
    <CrvModal showIcon={false} aria-labelledby="device-detail-title" open={!!selected} onClose={() => setSelected(null)} title={<span id="device-detail-title">Device details</span>} description={selected ? `${selected.department} — ${selected.platform}` : ''} actions={<CrvButton onClick={() => setSelected(null)}>Close</CrvButton>}><Box sx={{ p: px(spacing.lg) }}><Typography>BHQ0BDSF11...</Typography><Typography>Bangkok Hospital Headquarter</Typography><Typography>Last active: 18/10/2025</Typography></Box></CrvModal>
  </Box>;
}

const originalId = 'templates-organizationoverview--composed-from-design-system';
const proposedId = 'experiments-cariva-layout-comparison--proposed';
function Frame({ id, viewport }: { id: string; viewport: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(viewport);
  useEffect(() => { if (!host.current) return; const observer = new ResizeObserver(entries => setWidth(entries[0].contentRect.width)); observer.observe(host.current); return () => observer.disconnect(); }, []);
  const scale = Math.min(1, width / viewport);
  return <Box ref={host} sx={{ width: '100%', overflow: 'hidden', bgcolor: colors.bg.subtle, height: Math.round(1100 * scale) }}><iframe title={id === originalId ? 'Original screen' : 'Proposed screen'} src={`iframe.html?id=${id}&viewMode=story`} style={{ width: viewport, height: 1100, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }} /></Box>;
}
function Comparison() {
  const [viewport, setViewport] = useState(1440);
  return <Box sx={{ p: { xs: px(spacing.lg), md: px(spacing['3xl']) }, bgcolor: colors.bg.subtle, minHeight: '100vh' }}>
    <Typography component="h1" sx={{ fontSize: typography.fontSize.heading.large, fontWeight: typography.fontWeight.semibold }}>ลองจัดหน้าใหม่ โดยใช้ Cariva DS เดิม</Typography>
    <Typography sx={{ mt: px(spacing.sm), color: colors.content.secondary }}>ข้อมูลเดียวกัน สี มุมโค้ง ฟอนต์ และ Crv/MUI เดิม เปรียบเทียบเฉพาะการจัดวางและลำดับข้อมูล</Typography>
    <Box role="group" aria-label="Preview viewport" sx={{ display: 'flex', gap: px(spacing.sm), my: px(spacing.xl) }}>{[[1440, 'Desktop'], [390, 'Mobile']].map(([value, label]) => <CrvButton key={value} size="small" variant={viewport === value ? 'outlined' : 'text'} aria-pressed={viewport === value} onClick={() => setViewport(Number(value))}>{label}</CrvButton>)}</Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: px(spacing.xl) }}>
      {[[originalId, 'แบบเดิม', 'หน้าจอ Organization Overview ที่มีอยู่'], [proposedId, 'แบบทดลอง', 'ยืมการจัดกลุ่มและความโปร่งจาก BWC']].map(([id, title, caption]) => <Box key={id} sx={{ ...panel, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ p: px(spacing.lg), display: 'flex', gap: px(spacing.lg), alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography component="h2" sx={{ fontSize: typography.fontSize.heading.small, fontWeight: typography.fontWeight.semibold }}>{title}</Typography><Typography sx={{ fontSize: typography.fontSize.body.small, color: colors.content.secondary }}>{caption}</Typography></Box><a href={`/?path=/story/${id}`} target="_blank" rel="noopener noreferrer" style={{ color: colors.content.link.default, fontSize: typography.fontSize.body.medium, whiteSpace: 'nowrap' }}>เปิดเต็มจอ</a></Box>
        <Frame id={id} viewport={viewport} />
      </Box>)}
    </Box>
    <Typography sx={{ mt: px(spacing.xl), fontSize: typography.fontSize.body.small, color: colors.content.secondary }}>แบบทดลองใช้ข้อมูลจำลอง ค้นหา กรองสถานะ และเปิดรายละเอียดได้ การย้ายชื่อองค์กรจากทุกแถวไปไว้เหนือทั้งตารางเป็นข้อเสนอสำหรับชุดข้อมูลนี้ ยังไม่เปลี่ยน Core หรือหน้าจอเดิม</Typography>
  </Box>;
}
export const Compare: Story = { render: () => <Comparison /> };
export const Proposed: Story = { render: () => <ProposedScreen /> };
