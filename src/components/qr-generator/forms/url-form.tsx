'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import { normalizeWebURL } from '@/lib/validators';

export function URLForm() {
  const { setData } = useQRContext();
  const [url, setUrl] = useState('');

  const handleUrlChange = (value: string) => {
    setUrl(value);
  };

  const handleUrlBlur = () => {
    if (url && url.trim()) {
      const processedUrl = normalizeWebURL(url);
      if (processedUrl) setUrl(processedUrl);
    }
  };

  useEffect(() => {
    setData(normalizeWebURL(url));
  }, [url, setData]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="url">{KOREAN_LABELS.forms.url.label}</Label>
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          onBlur={handleUrlBlur}
          placeholder={KOREAN_LABELS.forms.url.placeholder}
          className="mt-2"
          aria-invalid={Boolean(url && !normalizeWebURL(url))}
        />
        {url && !normalizeWebURL(url) && <p role="alert" className="text-sm text-destructive">{KOREAN_LABELS.forms.url.error}</p>}
      </div>
    </div>
  );
}
