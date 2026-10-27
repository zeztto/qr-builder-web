'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import { buildVCard } from '@/lib/vcard-builder';
import type { VCardData } from '@/types/qr-types';

export function ContactForm() {
  const { setData } = useQRContext();
  const [formData, setFormData] = useState<VCardData>({
    name: '',
    company: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    address: '',
  });

  useEffect(() => {
    // Only build vCard if name is provided (minimum required field)
    if (formData.name) {
      const vcardString = buildVCard(formData);
      setData(vcardString);
    } else {
      setData('');
    }
  }, [formData, setData]);

  const handleChange = (field: keyof VCardData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const labels = KOREAN_LABELS.forms.contact;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">{labels.name} *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={labels.namePlaceholder}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">{labels.company}</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder={labels.companyPlaceholder}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="title">{labels.title}</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder={labels.titlePlaceholder}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">{labels.phone}</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder={labels.phonePlaceholder}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="email">{labels.email}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder={labels.emailPlaceholder}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="website">{labels.website}</Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder={labels.websitePlaceholder}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="address">{labels.address}</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder={labels.addressPlaceholder}
          className="mt-2"
        />
      </div>

      <p className="text-sm text-muted-foreground">* 필수 항목</p>
    </div>
  );
}
