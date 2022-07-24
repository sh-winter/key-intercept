#include <stdio.h>
#include <Windows.h>

HHOOK hHook;

LRESULT CALLBACK MouseHookCallback(int nCode, WPARAM wParam, LPARAM lParam) {
    KBDLLHOOKSTRUCT *pkh = (KBDLLHOOKSTRUCT *) lParam;
    if (nCode >= 0) {
        if (pkh->vkCode == VK_LWIN) {
            printf("Left Button Down\n");
            return 1;
        }
    }
    return CallNextHookEx(hHook, nCode, wParam, lParam);
}

int main()
{
    hHook = SetWindowsHookExW(WH_KEYBOARD_LL, MouseHookCallback, 0, 0);

    MSG msg;
    while (GetMessageW(&msg, 0, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessageW(&msg);
    }
}