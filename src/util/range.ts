/**
 * Creates an array of i32 values (numbers)
 * @param length 
 * @param startAt 
 * @returns 
 */
export default function range(length: number, startAt = 0) {
  return Array.from({ length }, (_, i) => i + startAt);
}
