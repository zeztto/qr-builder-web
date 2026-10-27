export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) && Boolean(parsed.hostname)
      && !parsed.username && !parsed.password;
  } catch {
    return false;
  }
}

export function normalizeWebURL(value: string): string {
  const input = value.trim();
  if (!input) return '';
  const candidate = /^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`;
  return isValidURL(candidate) ? new URL(candidate).href : '';
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@<>?,;:&#]+@[a-z\d](?:[a-z\d.-]*[a-z\d])?\.[a-z]{2,63}$/i;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?\d{3,15}$/;
  return phoneRegex.test(phone);
}
