'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import { buildPhonePayload } from '@/lib/message-builders';

export function PhoneForm() {
  const { setData } = useQRContext();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setData(buildPhonePayload(phone));
  }, [phone, setData]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="phone">{KOREAN_LABELS.forms.phone.phone}</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={KOREAN_LABELS.forms.phone.phonePlaceholder}
          aria-invalid={Boolean(phone && !buildPhonePayload(phone))}
          className="mt-2"
        />
        {phone && !buildPhonePayload(phone) && <p role="alert" className="text-sm text-destructive">올바른 전화번호를 입력해주세요</p>}
      </div>
    </div>
  );
}
