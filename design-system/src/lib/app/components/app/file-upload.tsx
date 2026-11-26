import { useId, useRef, useState, type ReactNode } from 'react';
import { CloudUpload, FileText, X, RotateCw, CircleCheck, LoaderCircle } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import uploadImage from './assets/file-upload/upload.png';

export type UploadEntry = { id: string; name: string; size: number; state: 'idle' | 'uploading' | 'complete' | 'error'; progress?: number; error?: string };
export type FileUploadProps = {
  accept?: string; maxSize?: number; multiple?: boolean; disabled?: boolean;
  variant?: 'icon' | 'image'; error?: string; label?: string; description?: string;
  value?: UploadEntry[]; defaultValue?: UploadEntry[];
  onValueChange?: (items: UploadEntry[]) => void;
  onFilesSelected?: (files: File[]) => void;
  onReject?: (files: { file: File; reason: string }[]) => void;
  onRemove?: (item: UploadEntry) => void; onRetry?: (item: UploadEntry) => void;
  className?: string;
};
function accepts(file: File, accept: string) {
  return !accept.trim() || accept.split(',').some(raw => {
    const rule = raw.trim().toLowerCase();
    return rule.startsWith('.') ? file.name.toLowerCase().endsWith(rule) : rule.endsWith('/*') ? file.type.toLowerCase().startsWith(rule.slice(0, -1)) : file.type.toLowerCase() === rule;
  });
}
function sizeLabel(size: number) { return size >= 1024 * 1024 ? `${(size / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(size / 1024)} KB`; }
/** State is supplied by the Product. This component does not start an upload. */
export function FileUploadItem({ item, disabled, onRemove, onRetry }: { item: UploadEntry; disabled?: boolean; onRemove?: (item: UploadEntry) => void; onRetry?: (item: UploadEntry) => void }) {
  let detail: ReactNode = sizeLabel(item.size);
  if (item.state === 'uploading') detail = 'Uploading...';
  if (item.state === 'complete') detail = 'Uploaded successfully';
  if (item.state === 'error') detail = item.error || 'Upload failed — try again';
  return <div data-slot="file-upload-item" data-state={item.state} className="w-80 max-w-full rounded-[6px] bg-[var(--cds-on-surface-default)] font-sans text-xs leading-4 text-[var(--cds-content-secondary)]">
    <div className="flex min-h-14 items-center gap-3 px-3 py-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--cds-on-surface-subtle)]">{item.state === 'uploading' ? <LoaderCircle aria-hidden className="size-5 motion-safe:animate-spin" /> : <FileText aria-hidden className="size-5" />}</span>
      <div className="min-w-0 flex-1"><p className="truncate font-medium" title={item.name}>{item.name}</p><p className={cn('mt-0.5 break-words', item.state === 'complete' && 'text-[var(--cds-status-success-content-default)]', item.state === 'error' && 'text-[var(--cds-status-error-content-default)]')}>{detail}</p></div>
      {item.state === 'complete' ? <CircleCheck aria-label="อัปโหลดสำเร็จ" className="size-5 shrink-0" /> : item.state === 'error' ? <Button type="button" size="icon-xs" variant="ghost" color="secondary" aria-label={`ลองอัปโหลด ${item.name} อีกครั้ง`} disabled={disabled || !onRetry} onClick={() => onRetry?.(item)}><RotateCw className="size-5" /></Button> : <Button type="button" size="icon-xs" variant="ghost" color="secondary" aria-label={`ลบ ${item.name}`} disabled={disabled || !onRemove} onClick={() => onRemove?.(item)}><X className="size-5" /></Button>}
    </div>
    {item.state === 'uploading' && <Progress aria-label={`ความคืบหน้า ${item.name}`} value={Math.max(0, Math.min(100, item.progress ?? 0))} className="gap-0 [&_[data-slot=progress-track]]:h-[3px] [&_[data-slot=progress-track]]:rounded-none [&_[data-slot=progress-indicator]]:transition-[width] [&_[data-slot=progress-indicator]]:duration-200 [&_[data-slot=progress-indicator]]:ease-out motion-reduce:[&_[data-slot=progress-indicator]]:transition-none" />}
  </div>;
}
/** Local selection, validation and presentation. Transport/security validation belongs to the Product. */
export function FileUpload({ accept = '.png,.jpg,.jpeg,.pdf', maxSize = 10 * 1024 * 1024, multiple = false, disabled = false, variant = 'icon', error, label = 'Drag & drop files here', description, value, defaultValue = [], onValueChange, onFilesSelected, onReject, onRemove, onRetry, className }: FileUploadProps) {
  const id = useId(); const input = useRef<HTMLInputElement>(null); const depth = useRef(0);
  const [local, setLocal] = useState(defaultValue); const [dragging, setDragging] = useState(false); const [validation, setValidation] = useState('');
  const entries = value ?? local; const problem = error || validation;
  function update(next: UploadEntry[]) { if (value === undefined) setLocal(next); onValueChange?.(next); }
  function select(files: File[]) {
    if (disabled) return;
    const rejected: { file: File; reason: string }[] = [];
    const allowed = files.filter(file => {
      const reason = !accepts(file, accept) ? 'File type not supported' : file.size > maxSize ? `File too large (max ${sizeLabel(maxSize)})` : '';
      if (reason) rejected.push({ file, reason }); return !reason;
    });
    const chosen = multiple ? allowed : allowed.slice(0, 1);
    setValidation(rejected.map(r => `${r.file.name}: ${r.reason}`).join('; '));
    if (rejected.length) onReject?.(rejected);
    if (chosen.length) { update([...(multiple ? entries : []), ...chosen.map(file => ({ id: crypto.randomUUID(), name: file.name, size: file.size, state: 'idle' as const }))]); onFilesSelected?.(chosen); }
  }
  const helper = description ?? `or click to browse · ${accept === '.png,.jpg,.jpeg,.pdf' ? 'PNG, JPG, PDF' : accept || 'All files'} up to ${Number((maxSize / 1024 / 1024).toFixed(1))}MB`;
  return <div data-slot="file-upload" className={cn('w-80 max-w-full font-sans text-[var(--cds-content-secondary)]', className)}>
    <div aria-disabled={disabled || undefined} data-slot="file-upload-dropzone" data-state={disabled ? 'disabled' : problem ? 'error' : dragging ? 'dragging' : 'default'}
      className={cn('flex min-h-40 flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-[var(--cds-border-default)] bg-[var(--cds-on-surface-default)] p-4 text-center', variant === 'image' && 'min-h-[196px]', !disabled && !problem && 'hover:border-[var(--cds-border-strong)]', dragging && !disabled && !problem && 'border-[var(--cds-border-system)] bg-[var(--cds-on-surface-action-selected)]', problem && !disabled && 'border-[var(--cds-border-error)] bg-[var(--cds-status-error-on-surface-subtle)]', disabled && 'border-[var(--cds-border-disabled)] bg-[var(--cds-on-surface-action-disabled)] text-[var(--cds-content-disabled)]')}
      onDragEnter={e => { e.preventDefault(); if (!disabled) { depth.current++; setDragging(true); } }}
      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = disabled ? 'none' : 'copy'; }}
      onDragLeave={e => { e.preventDefault(); if (--depth.current <= 0) { depth.current = 0; setDragging(false); } }}
      onDrop={e => { e.preventDefault(); depth.current = 0; setDragging(false); select(Array.from(e.dataTransfer.files)); }}>
      {variant === 'image' ? <img src={uploadImage} alt="" className="size-14 object-contain" /> : <CloudUpload aria-hidden className="size-6" />}
      <p id={`${id}-label`} className="text-sm leading-5 font-medium">{disabled ? 'Upload unavailable' : dragging ? 'Drop files here' : label}</p>
      <p id={`${id}-help`} className={cn('max-w-full break-words text-xs leading-4', problem && !disabled && 'text-[var(--cds-status-error-content-default)]')}>{problem || helper}</p>
      <input ref={input} className="sr-only" tabIndex={-1} id={id} type="file" accept={accept} multiple={multiple} disabled={disabled} aria-label="เลือกไฟล์เอกสาร" onChange={e => { select(Array.from(e.target.files ?? [])); e.target.value = ''; }} />
      <Button type="button" size="sm" variant="outline" color="secondary" disabled={disabled} aria-describedby={`${id}-label ${id}-help`} onClick={() => input.current?.click()}>อัปโหลด</Button>
    </div>
    <div role="status" aria-live="polite" className="sr-only">{problem || (entries.length ? `เลือก ${entries.length} ไฟล์: ${entries.map(e => e.name).join(', ')}` : 'ยังไม่ได้เลือกไฟล์')}</div>
    {entries.length > 0 && <ul aria-label="รายการไฟล์" className="mt-3 grid gap-2">{entries.map(item => <li key={item.id}><FileUploadItem item={item} disabled={disabled} onRemove={entry => { update(entries.filter(e => e.id !== entry.id)); onRemove?.(entry); }} onRetry={onRetry} /></li>)}</ul>}
  </div>;
}
