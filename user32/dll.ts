import { 
  INT,
  UINT,
  DWORD,
  BOOL,
  HHOOK,
  HWND,
  HINSTANCE,
  WPARAM,
  LPARAM,
  LRESULT,
  HOOKPROC,
  MSG,
  LPCWSTR
 } from '../types.ts'

export const dll = Deno.dlopen("user32.dll", {
  FindWindowExW: {
    parameters: [HWND, HWND, LPCWSTR, LPCWSTR] as const,
    result: HWND
  },
  SetWindowsHookExW: {
    parameters: [INT, HOOKPROC, HINSTANCE, DWORD] as const,
    result: HHOOK
  },
  UnhookWindowsHookEx: {
    parameters: [HHOOK] as const,
    result: BOOL
  },
  CallNextHookEx: {
    parameters: [HHOOK, INT, WPARAM, LPARAM] as const,
    result: LRESULT
  },
  GetMessageW: {
    parameters: [MSG, HWND, UINT, UINT] as const,
    result: BOOL
  },
  TranslateMessage: {
    parameters: [MSG] as const,
    result: BOOL
  },
  DispatchMessageW: {
    parameters: [MSG] as const,
    result: LRESULT
  }
});

export function close() {
  dll.close();
}
