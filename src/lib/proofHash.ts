/** Cryptographically strong when available; safe fallback for older mobile browsers. */
export function generateProofHash(): string {
  const bytes = new Uint8Array(16);

  try {
    const cryptoApi =
      typeof globalThis.crypto !== "undefined"
        ? globalThis.crypto
        : // Legacy WebKit
          (globalThis as { msCrypto?: Crypto }).msCrypto;

    if (cryptoApi?.getRandomValues) {
      cryptoApi.getRandomValues(bytes);
    } else {
      throw new Error("crypto unavailable");
    }
  } catch {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  let hex = "";
  for (let i = 0; i < bytes.length; i += 1) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return `0x${hex.toUpperCase()}`;
}
