#include <stdio.h>
#include <string.h>
#include <wchar.h>
#include <stdbool.h>
#include <Windows.h>

HHOOK hHook;

int main(int argc, char *argv[]) {
  if (argc <= 1) return 1;

  LRESULT CALLBACK KeyboardHookCallback(int nCode, WPARAM wParam, LPARAM lParam) {
    KBDLLHOOKSTRUCT *pkh = (KBDLLHOOKSTRUCT *)lParam;
    if (nCode >= 0) {
      if (pkh->vkCode == VK_LWIN) {

        HWND hwnd = GetForegroundWindow();

        int len = SendMessage(hwnd, WM_GETTEXTLENGTH, 0, 0);

        TCHAR lpString[len];

        SendMessage(hwnd, WM_GETTEXT, len + 1, (LPARAM)lpString);

        bool flag = false;
        int i;
        for (i = 1; i < argc; i++) {
          if (hwnd != NULL) {
            if (!strcmp(lpString, argv[i])) {
              flag = true;
              break;
            }
          }
        } 

        if (flag) {
          printf("已拦截指向进程 \"%s\" 的 win left 指令\n", lpString);
          return 1;
        }
      }
    }
    return CallNextHookEx(hHook, nCode, wParam, lParam);
  }

  hHook = SetWindowsHookExW(WH_KEYBOARD_LL, KeyboardHookCallback, 0, 0);

  MSG msg;
  while (GetMessageW(&msg, 0, 0, 0)) {
    TranslateMessage(&msg); 
    DispatchMessageW(&msg);
  }
}