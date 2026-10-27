'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import { buildEmailPayload } from '@/lib/message-builders';

export function EmailForm() {
  const { setData } = useQRContext();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    setData(buildEmailPayload(email, subject, body));
  }, [email, subject, body, setData]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">{KOREAN_LABELS.forms.email.email}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={KOREAN_LABELS.forms.email.emailPlaceholder}
          aria-invalid={Boolean(email && !buildEmailPayload(email, subject, body))}
          className="mt-2"
        />
        {email && !buildEmailPayload(email, subject, body) && <p role="alert" className="text-sm text-destructive">올바른 이메일 주소를 입력해주세요</p>}
      </div>

      <div>
        <Label htmlFor="subject">{KOREAN_LABELS.forms.email.subject}</Label>
        <Input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={KOREAN_LABELS.forms.email.subjectPlaceholder}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="body">{KOREAN_LABELS.forms.email.body}</Label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={KOREAN_LABELS.forms.email.bodyPlaceholder}
          className="mt-2 min-h-24"
        />
      </div>
    </div>
  );
}
