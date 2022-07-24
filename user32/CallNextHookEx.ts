import { dll } from "./dll.ts";

export function CallNextHookEx(
  nCode: number,
  wParam: bigint,
  lParam: bigint,
) {
  return dll.symbols.CallNextHookEx(null, nCode, wParam, lParam)
}
