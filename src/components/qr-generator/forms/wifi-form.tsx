'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KOREAN_LABELS } from '@/constants/korean-labels';
import { useQRContext } from '@/components/providers/qr-provider';
import { cn } from '@/lib/utils';
import { buildWiFiPayload } from '@/lib/wifi-builder';

type EncryptionType = 'WPA' | 'WEP' | 'nopass';

const ENCRYPTION_OPTIONS: { value: EncryptionType; label: string }[] = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: '암호화 없음' },
];

export function WiFiForm() {
  const { setData } = useQRContext();
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<EncryptionType>('WPA');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (ssid) {
      // WiFi QR code format: WIFI:T:WPA;S:mynetwork;P:mypass;H:false;;
      const wifiString = buildWiFiPayload({ ssid, password, encryption, hidden });
      setData(wifiString);
    } else {
      setData('');
    }
  }, [ssid, password, encryption, hidden, setData]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ssid">{KOREAN_LABELS.forms.wifi.ssid}</Label>
        <Input
          id="ssid"
          type="text"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          placeholder={KOREAN_LABELS.forms.wifi.ssidPlaceholder}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="password">{KOREAN_LABELS.forms.wifi.password}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={KOREAN_LABELS.forms.wifi.passwordPlaceholder}
          className="mt-2"
        />
      </div>

      <div>
        <Label>{KOREAN_LABELS.forms.wifi.encryption}</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {ENCRYPTION_OPTIONS.map((option) => (
            <button
              key={option.value}
              aria-pressed={encryption === option.value}
              onClick={() => setEncryption(option.value)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                encryption === option.value
                  ? "bg-primary text-primary-foreground border-2 border-primary shadow-sm"
                  : "bg-background border border-muted text-foreground hover:bg-accent hover:border-primary/30"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={hidden} onChange={(event) => setHidden(event.target.checked)} />
        숨겨진 네트워크
      </label>
    </div>
  );
}
