// Random id for client-created records. crypto.randomUUID only exists in secure contexts
// (https or localhost), so opening the dev server from a phone on the LAN needs the fallback.
export function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
