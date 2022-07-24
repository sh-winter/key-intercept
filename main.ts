import {
  FindWindowExW,
  SetWindowsHookExW,
  UnhookWindowsHookEx,
  GetMessageW,
  CallNextHookEx,
  TranslateMessage,
  DispatchMessageW,
  WH_KEYBOARD_LL,
  VK_LWIN
} from "./mod.ts";

function MouseHookCallback(nCode: number, wParam: bigint, lParam: bigint): bigint {
  const vkCode = new Deno.UnsafePointerView(lParam).getInt16();

  if (nCode >= 0) {
    if (vkCode === VK_LWIN) {
      console.time('find window');
      const hwnd = FindWindowExW(null, null, null, 'League of Legends (TM) Client');
      if (hwnd !== 0n) 
      console.timeEnd('find window');
      console.log('vkCode: ', vkCode);
      return 1n;
    }
  }
  return CallNextHookEx(nCode, wParam, lParam);
}

let hHook = SetWindowsHookExW(WH_KEYBOARD_LL, MouseHookCallback, null, 0);

globalThis.addEventListener('unload', () => {
  UnhookWindowsHookEx(hHook)
})

let msg = new Uint8Array(48);
while (GetMessageW(msg, null, 0, 0)) {
  TranslateMessage(msg)
  DispatchMessageW(msg)
}
