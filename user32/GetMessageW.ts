import { dll } from "./dll.ts";

export function GetMessageW(
  lpMsg: Uint8Array,
  hWnd: bigint | null,
  wMsgFilterMin: number,
  wMsgFilterMax: number,
) {
  return dll.symbols.GetMessageW(lpMsg, hWnd, wMsgFilterMin, wMsgFilterMax)
}
