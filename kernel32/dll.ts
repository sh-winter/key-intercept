import { 
  DWORD,
  LPCVOID,
  LPTSTR,
  FORMAT_MESSAGE_ARGUMENT_ARRAY
 } from '../types.ts'

const dll = Deno.dlopen("kernel32.dll", {
  GetLastError: {
    parameters: [] as const,
    result: DWORD,
  },
  
  FormatMessageW: {
    parameters: [DWORD, LPCVOID, DWORD, DWORD, LPTSTR, DWORD, FORMAT_MESSAGE_ARGUMENT_ARRAY] as const,
    result: DWORD
  },
});

function close() {
  dll.close();
}

export { close, dll };
