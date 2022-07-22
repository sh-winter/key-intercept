import * as win32 from "./mod.ts";

const callback = new Deno.UnsafeCallback(
  {
    parameters: ["i32", "i32", "i32"],
    result: "i64",
  } as const,
  (
    nCode: number,
    wParam: number,
    lParam: number,
  ) => {
    if (nCode) {
      console.log('nCode: ', nCode);
      if (wParam === win32.VK_LWIN) {
        return 1;
      }
    }
    return 1;
  },
);

win32.SetWindowsHookExW(
  win32.WH_KEYBOARD_LL,
  callback,
  0n,
  0
);

await new Promise(res => setTimeout(res, 5000))
