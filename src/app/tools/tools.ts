export function createGuid(length = 32) {
  const buf = [];
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return buf.join('');
}
