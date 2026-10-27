import type { VCardData } from '@/types/qr-types';

export function buildVCard(data: VCardData): string {
  const escape = (value: string) => value.replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  if (data.name) {
    lines.push(`FN:${escape(data.name)}`);
    lines.push(`N:;${escape(data.name)};;;`);
  }

  if (data.company) {
    lines.push(`ORG:${escape(data.company)}`);
  }

  if (data.title) {
    lines.push(`TITLE:${escape(data.title)}`);
  }

  if (data.phone) {
    lines.push(`TEL:${escape(data.phone)}`);
  }

  if (data.email) {
    lines.push(`EMAIL:${escape(data.email)}`);
  }

  if (data.website) {
    lines.push(`URL:${escape(data.website)}`);
  }

  if (data.address) {
    lines.push(`ADR:;;${escape(data.address)};;;;`);
  }

  lines.push('END:VCARD');

  return lines.join('\r\n');
}
