'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import { buildSMSPayload } from '@/lib/message-builders';

export function SMSForm() {
  const { setData } = useQRContext();
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setData(buildSMSPayload(phone, message));
  }, [phone, message, setData]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="phone">{KOREAN_LABELS.forms.sms.phone}</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={KOREAN_LABELS.forms.sms.phonePlaceholder}
          aria-invalid={Boolean(phone && !buildSMSPayload(phone, message))}
          className="mt-2"
        />
        {phone && !buildSMSPayload(phone, message) && <p role="alert" className="text-sm text-destructive">올바른 전화번호를 입력해주세요</p>}
      </div>

      <div>
        <Label htmlFor="message">{KOREAN_LABELS.forms.sms.message}</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={KOREAN_LABELS.forms.sms.messagePlaceholder}
          className="mt-2 min-h-24"
        />
      </div>
    </div>
  );
}
