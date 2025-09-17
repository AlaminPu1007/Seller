/**
 * Make a given phone number
 *
 * @param number
 * @returns mask numbers
 */
export function maskMobileNumber(number: string): string {
  if (!number) return '';

  if (number.length <= 3) return number;

  const firstTwo = number.slice(0, 2);
  const lastOne = number.slice(-1);
  const masked = '*'.repeat(number.length - 3);

  return `${firstTwo}${masked}${lastOne}`;
}
