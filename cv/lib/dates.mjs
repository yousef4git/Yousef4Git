const MONTHS = {
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
};
const PRESENT = { en: 'Present', ar: 'حتى الآن' };
const TO = { en: 'to', ar: 'إلى' };

export function fmtDate(value, lang) {
  if (!value) return '';
  if (value === 'present') return PRESENT[lang];
  const [y, m] = String(value).split('-');
  if (m) return `${MONTHS[lang][Number(m) - 1]} ${y}`;
  return y;
}

export function fmtRange(start, end, lang) {
  const s = fmtDate(start, lang), e = fmtDate(end, lang);
  if (s && e && s !== e) return `${s} ${TO[lang]} ${e}`;
  return s || e;
}
