import { cstr2ptrW } from "../util.ts";
import { dll } from "./dll.ts";

export function CreateWindow(
  dwExStyle: number,
  lpClassName: string,
  lpWindowName: string,
  dwStyle: number,
  x: number,
  y: number,
  nWidth: number,
  nHeight: number,
  hWndParent: bigint,
  hMenu: bigint,
  hInstance: bigint,
  lpParam: bigint,
): bigint {
  return dll.symbols.CreateWindowExW(
    dwExStyle,
    cstr2ptrW(lpClassName),
    cstr2ptrW(lpWindowName),
    dwStyle,
    x,
    y,
    nWidth,
    nHeight,
    hWndParent,
    hMenu,
    hInstance,
    lpParam,
  );
}