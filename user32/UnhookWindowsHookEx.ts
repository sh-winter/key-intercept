import { dll } from "./dll.ts";

export function UnhookWindowsHookEx(
  hhk: bigint
) {
  return dll.symbols.UnhookWindowsHookEx(hhk)
}
