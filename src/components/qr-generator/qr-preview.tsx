'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import { useQRGenerator } from '@/hooks/use-qr-generator';
import { useDownload } from '@/hooks/use-download';

export function QRPreview() {
  const { data, options, type } = useQRContext();
  const { qrDataURL, isGenerating, error } = useQRGenerator(data, options);
  const { downloadQR } = useDownload();

  const handleDownload = () => {
    if (qrDataURL) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
      const filename = `QR-ing_${KOREAN_LABELS.qrTypes[type]}_${timestamp}.png`;
      downloadQR(qrDataURL, filename);
    }
  };

  return (
    <Card className="p-8 shadow-sm">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-xl font-semibold">
          미리보기
        </h3>

        {/* QR Code Display */}
        <div className="relative w-full max-w-md aspect-square bg-muted/30 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
          {isGenerating && (
            <div className="flex flex-col items-center gap-3 text-primary">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p className="text-sm font-medium">{KOREAN_LABELS.messages.generating}</p>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive text-center px-4 font-medium">{error}</p>
          )}

          {qrDataURL && !isGenerating && !error && (
            <div className="relative w-full h-full p-6">
              <img
                src={qrDataURL}
                alt="생성된 QR코드"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {!qrDataURL && !isGenerating && !error && (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <svg className="w-16 h-16 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14h7v7h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-sm text-center px-4 font-medium">
                {KOREAN_LABELS.messages.inputRequired}
              </p>
            </div>
          )}
        </div>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          disabled={!qrDataURL || isGenerating || Boolean(error)}
          className="w-full max-w-md"
          size="lg"
        >
          <Download className="mr-2 h-5 w-5" />
          {KOREAN_LABELS.actions.download}
        </Button>
      </div>
    </Card>
  );
}
