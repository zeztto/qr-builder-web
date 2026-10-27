export type QRType = 'url' | 'contact' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'event';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QROptions {
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
}

export interface VCardData {
  name: string;
  company?: string;
  title?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

export interface QRState {
  type: QRType;
  data: string;
  options: QROptions;
}

export interface QRContextValue extends QRState {
  setType: (type: QRType) => void;
  setData: (data: string) => void;
  setOptions: (options: Partial<QROptions>) => void;
  reset: () => void;
}
