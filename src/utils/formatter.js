export const toPersianDigits = (str) => {
  return str.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}