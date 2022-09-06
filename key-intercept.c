#include <stdio.h>
#include <string.h>
#include <wchar.h>
#include <stdbool.h>
#include <windows.h>
#include "tray.h"

#define TRAY_ICON "icon.ico"

static struct tray tray;

static void quit_cb(struct tray_menu *item) {
  (void)item;
  printf("quit\n");
  tray_exit();
}

// Test tray init
static struct tray tray = {
  .icon = TRAY_ICON,
  .menu =
    (struct tray_menu[]){
      {.text = "退出", .cb = quit_cb},
      {.text = NULL}},
};

HHOOK hHook;
static const char * appName = "League of Legends (TM) Client";

LRESULT CALLBACK KeyboardHookCallback(int nCode, WPARAM wParam, LPARAM lParam) {
  KBDLLHOOKSTRUCT *pkh = (KBDLLHOOKSTRUCT *)lParam;
  if (nCode >= 0) {
    if (pkh->vkCode == VK_LWIN) {
      HWND hwnd = GetForegroundWindow();
      int len = SendMessage(hwnd, WM_GETTEXTLENGTH, 0, 0);
      TCHAR lpString[len];
      SendMessage(hwnd, WM_GETTEXT, len + 1, (LPARAM)lpString);

      if (hwnd != NULL) {
        if (!strcmp(lpString, appName)) {
          printf("已拦截指向进程 \"%s\" 的 win left 指令\n", lpString);
          return 1;
        }
      }
    }
  }
  return CallNextHookEx(hHook, nCode, wParam, lParam);
}

int main(void) {
  if (tray_init(&tray) < 0) {
    printf("failed to create tray\n");
    return 1;
  }

  hHook = SetWindowsHookExW(WH_KEYBOARD_LL, KeyboardHookCallback, 0, 0);

  while (tray_loop(1) == 0) {}
  
  return 0;
}