import i18n from '../i18n';

// Generic helper to chọn giá trị tiếng Việt nếu có
export function localizeField<T extends Record<string, any>>(obj: T, enKey: string, viKey: string) {
  const lang = i18n.language;
  if (lang === 'vi' && obj[viKey]) return obj[viKey];
  return obj[enKey] || obj[viKey] || '';
} 