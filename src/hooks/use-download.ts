'use client';

import { useCallback } from 'react';

export function useDownload() {
  const downloadQR = useCallback((dataURL: string, filename: string = 'QR코드.png') => {
    try {
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
      alert('다운로드에 실패했습니다');
    }
  }, []);

  return { downloadQR };
}
