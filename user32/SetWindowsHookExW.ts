import { dll } from "./dll.ts";

type Callback = Deno.UnsafeCallback<{
  readonly parameters: readonly ["i32", "i32", "i32"];
  readonly result: "i64";
}>

export function SetWindowsHookExW(
  idHook: number,
  lpfn: Callback,
  hmod: bigint,
  dwThreadId: number
) {
  return dll.symbols.SetWindowsHookExW(
    idHook,
    lpfn.pointer,
    hmod,
    0n
  );
}

export const VK_LWIN = 0x5B;

export const WH_KEYBOARD_LL = 13;