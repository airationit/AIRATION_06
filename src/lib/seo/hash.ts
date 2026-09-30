/**
 * Deterministic djb2 string hash — always returns the same number for the same input.
 * Used to pick SEO title/description templates per job without randomness.
 */
export function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0; // Keep as 32-bit unsigned
  }
  return hash;
}

/**
 * Pick an item from an array deterministically using a hash of a seed string.
 */
export function pickByHash<T>(items: T[], seed: string): T {
  const idx = hashString(seed) % items.length;
  return items[idx];
}
