import type { QROptions } from '@/types/qr-types';

export const DEFAULT_QR_OPTIONS: QROptions = {
  size: 256,
  errorCorrectionLevel: 'M',
  margin: 4,
};

export const QR_SIZE_RANGE = {
  min: 128,
  max: 1024,
  step: 64,
};

export const QR_MARGIN_RANGE = {
  min: 0,
  max: 10,
  step: 1,
};
