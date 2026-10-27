'use client';

import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import type { QRType } from '@/types/qr-types';
import { cn } from '@/lib/utils';

const QR_TYPES: QRType[] = ['url', 'text', 'contact', 'email', 'phone', 'sms', 'wifi'];

export function QRTypeSelector() {
  const { type, setType } = useQRContext();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {QR_TYPES.map((qrType) => (
        <button
          key={qrType}
          aria-pressed={type === qrType}
          onClick={() => setType(qrType)}
          className={cn(
            "px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
            type === qrType
              ? "bg-primary text-primary-foreground border-2 border-primary shadow-md"
              : "bg-background border border-muted text-foreground hover:bg-accent hover:border-primary/30"
          )}
        >
          {KOREAN_LABELS.qrTypes[qrType]}
        </button>
      ))}
    </div>
  );
}
