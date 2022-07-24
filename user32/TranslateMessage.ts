import { dll } from "./dll.ts";

export function TranslateMessage(
  lpMsg: Uint8Array,
) {
  return dll.symbols.TranslateMessage(lpMsg)
}
