import { cache, exists } from 'https://deno.land/x/cache@0.2.13/mod.ts'
import { dirname } from "https://deno.land/std@0.149.0/path/mod.ts";

const exeFileURL = import.meta.resolve("./keyboardHook.exe");

export async function start(config?: string[]) {
  if (config) localStorage.setItem('config', JSON.stringify(config))
  const args = JSON.parse(localStorage.getItem('config') ?? '[]')

  const existFlag = await exists(exeFileURL);
  const { path } = await cache(exeFileURL);

  const command = `Add "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers" /v "${path}" /d "WINXPSP3"`

  if (!existFlag) {
    Deno.spawnSync("reg.exe", {
      args: [command],
      stdout: 'inherit'
    })
  }

  const controller = new AbortController()
  Deno.spawnChild(path, {
    cwd: dirname(path),
    args,
    signal: controller.signal,
    stdout: 'inherit'
  })

  return () => controller.abort()
}

if (import.meta.main) {
  // const { parse } = await import("https://deno.land/std/flags/mod.ts");
  
  const { args } = Deno;

  const config = JSON.parse(localStorage.getItem('config') ?? '[]' );
  localStorage.setItem('config', JSON.stringify(Array.from(new Set([...config, ...args]))));

  start()
}