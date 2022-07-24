import { cache } from 'https://deno.land/x/cache@0.2.13/mod.ts'
import { dirname } from "https://deno.land/std@0.149.0/path/mod.ts";

export async function start(config?: string[]) {
  if (config) localStorage.setItem('config', JSON.stringify(config))
  const args = JSON.parse(localStorage.getItem('config') ?? '[]')

  const { path } = await cache("./keyboardHook.exe")

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