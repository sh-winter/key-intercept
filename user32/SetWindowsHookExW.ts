import { dll } from "./dll.ts";
import { INT, WPARAM, LPARAM, LRESULT } from '../types.ts';

const CallbackDefinition = {
  parameters: [INT, WPARAM, LPARAM],
  result: LRESULT
} as const

type Callback = Deno.UnsafeCallback<typeof CallbackDefinition>

export const VK_LWIN = 0x5B;

export const WH_KEYBOARD_LL = 13;

export const WM_LBUTTONDOWN = 0x0201;

export const WM_LBUTTONUP = 0x0202;

export const WH_MOUSE_LL = 14;

export function SetWindowsHookExW(
  idHook: number,
  lpfn: Callback["callback"],
  hmod: Uint8Array | null,
  dwThreadId: number
) {
  const callback = new Deno.UnsafeCallback(CallbackDefinition, lpfn)

  return dll.symbols.SetWindowsHookExW(
    idHook,
    callback.pointer,
    hmod,
    dwThreadId
  );
}
