import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within, waitFor } from 'storybook/test';
import { useState } from 'react';
import { FileUpload, FileUploadItem, type UploadEntry } from './file-upload';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '../ui/dialog';
const meta = { title: 'Core/Components/File Upload', component: FileUpload, tags: ['autodocs'], parameters: { docs: { description: { component: 'Figma File Upload: local selection and validation, icon/image dropzone, controlled upload status. Transport belongs to the Product; examples never send files.' } } }, decorators: [(Story) => <div className="p-6"><Story /></div>] } satisfies Meta<typeof FileUpload>;
export default meta;
type Story = StoryObj<typeof meta>;
export const LocalFile: Story = { args: { onFilesSelected: fn() }, play: async ({ canvas, userEvent, args }) => {
  const file = new File(['mock'], 'document.pdf', { type: 'application/pdf' });
  await userEvent.upload(canvas.getByLabelText('เลือกไฟล์เอกสาร'), file);
  await expect(canvas.getByRole('status')).toHaveTextContent('document.pdf');
  await expect(args.onFilesSelected).toHaveBeenCalledWith([file]);
  await userEvent.click(canvas.getByRole('button', { name: 'ลบ document.pdf' }));
  await expect(canvas.getByRole('status')).not.toHaveTextContent('document.pdf');
  await userEvent.upload(canvas.getByLabelText('เลือกไฟล์เอกสาร'), file);
  await expect(canvas.getByRole('status')).toHaveTextContent('document.pdf');
} };
export const Image: Story = { args: { variant: 'image' } };
export const States: Story = { render: () => <div className="flex flex-wrap gap-6"><FileUpload /><FileUpload variant="image" error="File type not supported or too large" /><FileUpload disabled /><FileUpload variant="image" disabled /></div> };
export const DragAndValidation: Story = { args: { multiple: true, maxSize: 16, onReject: fn() }, play: async ({ canvas, canvasElement, args }) => {
  const zone = canvasElement.querySelector('[data-slot=file-upload-dropzone]')!;
  const transfer = new DataTransfer();
  for (const file of [new File(['a'], 'ok.pdf', { type: 'application/pdf' }), new File(['bad'], 'bad.exe'), new File(['a'.repeat(17)], 'large.pdf', { type: 'application/pdf' })]) transfer.items.add(file);
  zone.dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer: transfer }));
  await waitFor(() => expect(canvas.getByText('Drop files here')).toBeVisible());
  zone.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: transfer }));
  await waitFor(() => expect(canvas.getByRole('status')).toHaveTextContent('File type not supported'));
  await expect(canvas.getByRole('status')).toHaveTextContent('File too large');
  await expect(canvas.getByRole('list')).toHaveTextContent('ok.pdf');
  await expect(args.onReject).toHaveBeenCalled();
} };
const items: UploadEntry[] = [
  { id: '1', name: 'document.pdf', size: 2516582, state: 'idle' },
  { id: '2', name: 'uploading.pdf', size: 2516582, state: 'uploading', progress: 60 },
  { id: '3', name: 'complete.pdf', size: 2516582, state: 'complete' },
  { id: '4', name: 'error.pdf', size: 2516582, state: 'error' },
];
export const ItemStates: Story = { render: () => <div className="grid gap-4">{items.map(item => <FileUploadItem key={item.id} item={item} onRemove={fn()} onRetry={fn()} />)}</div> };
export const Controlled: Story = { render: function Controlled() { const [value, setValue] = useState(items.slice(1)); return <FileUpload value={value} onValueChange={setValue} onRetry={item => setValue(value.map(e => e.id === item.id ? { ...e, state: 'uploading', progress: 0 } : e))} />; }, play: async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button', { name: 'ลองอัปโหลด error.pdf อีกครั้ง' }));
  await expect(canvas.getAllByRole('progressbar')).toHaveLength(2);
} };
export const MobileThai: Story = { render: () => <div className="w-[272px] max-w-full"><FileUpload label="ลากเอกสารประกอบการตรวจรักษามาวางที่นี่" defaultValue={[{ ...items[0], name: 'เอกสารประกอบการตรวจรักษาสำหรับผู้ป่วยชื่อยาวมาก.pdf' }]} /></div> };
export const PageAndDialog: Story = { render: () => <div className="grid gap-6"><FileUpload /><Dialog><DialogTrigger render={<Button />}>แนบเอกสารใน Dialog</DialogTrigger><DialogContent><DialogTitle>แนบเอกสาร</DialogTitle><DialogDescription>เลือกไฟล์ในเครื่อง ยังไม่ส่งไปเซิร์ฟเวอร์</DialogDescription><FileUpload /></DialogContent></Dialog></div>, play: async ({ canvas, userEvent, canvasElement }) => {
  await userEvent.click(canvas.getByRole('button', { name: 'แนบเอกสารใน Dialog' }));
  const dialog = within(canvasElement.ownerDocument.body).getByRole('dialog');
  await userEvent.upload(within(dialog).getByLabelText('เลือกไฟล์เอกสาร'), new File(['x'], 'modal.pdf', { type: 'application/pdf' }));
  await expect(within(dialog).getByRole('status')).toHaveTextContent('modal.pdf');
  await userEvent.keyboard('{Escape}');
} };

export const UploadAnimation: Story = {
  render: function UploadAnimation() {
    const [progress, setProgress] = useState(20);
    const [complete, setComplete] = useState(false);
    return <div className="grid gap-4">
      <FileUploadItem item={{ id: 'animation', name: 'document.pdf', size: 2516582, state: complete ? 'complete' : 'uploading', progress }} onRemove={fn()} />
      <div className="flex flex-wrap gap-3"><Button variant="outline" color="secondary" onClick={() => { setComplete(false); setProgress(p => p >= 80 ? 20 : p + 20); }}>จำลองความคืบหน้า</Button><Button variant="outline" color="secondary" onClick={() => setComplete(true)}>จำลองเสร็จสิ้น</Button></div>
      <p className="text-xs">ข้อมูลจำลองสำหรับดู animation ไม่มีการอัปโหลดจริง</p>
    </div>;
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '20');
    await userEvent.click(canvas.getByRole('button', { name: 'จำลองความคืบหน้า' }));
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40');
    await userEvent.click(canvas.getByRole('button', { name: 'จำลองเสร็จสิ้น' }));
    await expect(canvas.queryByRole('progressbar')).not.toBeInTheDocument();
    await expect(canvas.getByText('Uploaded successfully')).toBeVisible();
  },
};
