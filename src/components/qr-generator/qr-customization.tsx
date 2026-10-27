'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { QR_SIZE_RANGE, QR_MARGIN_RANGE } from '@/constants/qr-config';
import { useQRContext } from '@/components/providers/qr-provider';
import type { ErrorCorrectionLevel } from '@/types/qr-types';
import { cn } from '@/lib/utils';

const ERROR_LEVELS: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: 'L', label: '낮음 (7%)' },
  { value: 'M', label: '중간 (15%)' },
  { value: 'Q', label: '높음 (25%)' },
  { value: 'H', label: '최고 (30%)' },
];

export function QRCustomization() {
  const { options, setOptions } = useQRContext();

  return (
    <div className="space-y-6">
      {/* Size */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>{KOREAN_LABELS.customization.size}</Label>
          <span className="text-sm text-muted-foreground">{options.size}px</span>
        </div>
        <Slider
          aria-label={KOREAN_LABELS.customization.size}
          value={[options.size]}
          onValueChange={(value) => setOptions({ size: value[0] })}
          min={QR_SIZE_RANGE.min}
          max={QR_SIZE_RANGE.max}
          step={QR_SIZE_RANGE.step}
          className="w-full"
        />
      </div>

      {/* Error Correction Level */}
      <div className="space-y-3">
        <Label>{KOREAN_LABELS.customization.errorCorrection}</Label>
        <div className="grid grid-cols-4 gap-2">
          {ERROR_LEVELS.map((level) => (
            <button
              key={level.value}
              aria-label={level.label}
              aria-pressed={options.errorCorrectionLevel === level.value}
              onClick={() => setOptions({ errorCorrectionLevel: level.value })}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                options.errorCorrectionLevel === level.value
                  ? "bg-primary text-primary-foreground border-2 border-primary shadow-sm"
                  : "bg-background border border-muted text-foreground hover:bg-accent hover:border-primary/30"
              )}
            >
              {level.value}
            </button>
          ))}
        </div>
      </div>

      {/* Margin */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>{KOREAN_LABELS.customization.margin}</Label>
          <span className="text-sm text-muted-foreground">{options.margin}</span>
        </div>
        <Slider
          aria-label={KOREAN_LABELS.customization.margin}
          value={[options.margin]}
          onValueChange={(value) => setOptions({ margin: value[0] })}
          min={QR_MARGIN_RANGE.min}
          max={QR_MARGIN_RANGE.max}
          step={QR_MARGIN_RANGE.step}
          className="w-full"
        />
      </div>
    </div>
  );
}
