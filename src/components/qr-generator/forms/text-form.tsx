'use client';

import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';

export function TextForm() {
  const { setData } = useQRContext();
  const [text, setText] = useState('');

  useEffect(() => {
    setData(text);
  }, [text, setData]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text">{KOREAN_LABELS.forms.text.label}</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={KOREAN_LABELS.forms.text.placeholder}
          className="mt-2 min-h-[120px]"
        />
      </div>
    </div>
  );
}
