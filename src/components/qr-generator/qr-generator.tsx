'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QRTypeSelector } from './qr-type-selector';
import { QRCustomization } from './qr-customization';
import { QRPreview } from './qr-preview';
import { URLForm } from './forms/url-form';
import { TextForm } from './forms/text-form';
import { ContactForm } from './forms/contact-form';
import { EmailForm } from './forms/email-form';
import { PhoneForm } from './forms/phone-form';
import { SMSForm } from './forms/sms-form';
import { WiFiForm } from './forms/wifi-form';
import { useQRContext } from '@/components/providers/qr-provider';

export function QRGenerator() {
  const { type } = useQRContext();

  // Render the appropriate form based on QR type
  const renderForm = () => {
    switch (type) {
      case 'url':
        return <URLForm />;
      case 'text':
        return <TextForm />;
      case 'contact':
        return <ContactForm />;
      case 'email':
        return <EmailForm />;
      case 'phone':
        return <PhoneForm />;
      case 'sms':
        return <SMSForm />;
      case 'wifi':
        return <WiFiForm />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Input Forms */}
      <div className="space-y-6">
        {/* QR Type Selector */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              QR코드 유형 선택
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <QRTypeSelector />
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">{renderForm()}</CardContent>
        </Card>

        {/* Customization Options */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              커스터마이징
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <QRCustomization />
          </CardContent>
        </Card>
      </div>

      {/* Right Column: QR Preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <QRPreview />
      </div>
    </div>
  );
}
