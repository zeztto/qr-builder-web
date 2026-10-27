'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import type { QROptions } from '@/types/qr-types';

export function useQRGenerator(text: string, options: QROptions) {
  const [result, setResult] = useState<{ key: string; url: string } | null>(null);
  const [failure, setFailure] = useState<{ key: string; message: string } | null>(null);
  const { errorCorrectionLevel, size, margin } = options;
  const key = JSON.stringify([text, errorCorrectionLevel, size, margin]);

  useEffect(() => {
    if (!text) return;
    let active = true;
    const timer = setTimeout(async () => {
      try {
        const url = await QRCode.toDataURL(text, {
          errorCorrectionLevel, width: size, margin,
          color: { dark: '#000000', light: '#FFFFFF' },
        });
        if (active) setResult({ key, url });
      } catch {
        if (active) setFailure({ key, message: 'QR코드 생성에 실패했습니다. 입력을 줄이거나 오류 수정 레벨을 낮춰주세요.' });
      }
    }, 300);
    return () => { active = false; clearTimeout(timer); };
  }, [text, errorCorrectionLevel, size, margin, key]);

  const qrDataURL = text && result?.key === key ? result.url : null;
  const error = text && failure?.key === key && !qrDataURL ? failure.message : null;
  return { qrDataURL, isGenerating: Boolean(text && !qrDataURL && !error), error };
}
