import { dll } from './dll.ts';
import { cstr2ptrW } from './../util.ts';

export function FindWindowExW(
  hWndParent: Uint8Array | null,
  hWndChildAfter: Uint8Array | null,
  lpszClass: string | null,
  lpszWindow: string | null,
): Deno.UnsafePointer {
  return dll.symbols.FindWindowExW(
    hWndParent,
    hWndChildAfter,
    typeof lpszClass === 'string' ? cstr2ptrW(lpszClass) : lpszClass,
    typeof lpszWindow === 'string' ? cstr2ptrW(lpszWindow) : lpszWindow
  )
}