export interface WiFiData { ssid: string; password: string; encryption: 'WPA' | 'WEP' | 'nopass'; hidden: boolean }
export function buildWiFiPayload(data: WiFiData): string {
  const escape = (value: string) => value.replace(/([\\;,:\"])/g, '\\$1');
  if (!data.ssid) return '';
  const password = data.encryption === 'nopass' ? '' : `P:${escape(data.password)};`;
  return `WIFI:T:${data.encryption};S:${escape(data.ssid)};${password}H:${data.hidden};;`;
}
