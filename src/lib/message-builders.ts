import { isValidEmail, isValidPhoneNumber } from './validators';

export function normalizePhone(phone: string): string {
  if (!/^[+\d\s().-]+$/.test(phone)) return '';
  const normalized = phone.replace(/[\s().-]/g, '');
  return isValidPhoneNumber(normalized) ? normalized : '';
}
export function buildPhonePayload(phone: string): string {
  const normalized = normalizePhone(phone);
  return normalized ? `tel:${normalized}` : '';
}
export function buildSMSPayload(phone: string, message: string): string {
  const normalized = normalizePhone(phone);
  return normalized ? `sms:${normalized}${message ? `?body=${encodeURIComponent(message)}` : ''}` : '';
}
export function buildEmailPayload(email: string, subject: string, body: string): string {
  const recipient = email.trim();
  if (!isValidEmail(recipient)) return '';
  const encoded = encodeURIComponent(recipient).replace(/%40/gi, '@');
  const params = [subject ? `subject=${encodeURIComponent(subject)}` : '', body ? `body=${encodeURIComponent(body)}` : ''].filter(Boolean);
  return `mailto:${encoded}${params.length ? '?'+params.join('&') : ''}`;
}
