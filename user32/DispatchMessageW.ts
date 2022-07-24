import { dll } from "./dll.ts";

export function DispatchMessageW(
  lpMsg: Uint8Array,
) {
  return dll.symbols.DispatchMessageW(lpMsg)
}
