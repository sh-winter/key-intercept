import { cache, exists } from 'https://deno.land/x/cache@0.2.13/mod.ts'
import { dirname } from "https://deno.land/std@0.149.0/path/mod.ts";

const exeFileURL = import.meta.resolve("./keyboardHook.exe");

export async function start(newConfig?: string[]) {
  let config: string[] = [];
  if (newConfig) {
    const oldConfig = JSON.parse(localStorage.getItem('config') ?? '[]' ) as string[];
    config = Array.from(new Set([...oldConfig, ...newConfig]));
    localStorage.setItem('config', JSON.stringify(config));
  } else {
    config = JSON.parse(localStorage.getItem('config') ?? '[]' ) as string[];
  }

  const { path } = await cache(exeFileURL);

  // if (!(await exists(exeFileURL))) {
  //   // 添加注册表中的程序兼容配置
  //   const keyName = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers';
  //   await Deno.spawn('reg.exe', { args: ['Add', keyName, '/v', path, '/d', 'WINXPSP3', '/f'] });
  // }

  console.log(`当前配置拦截的应用名:\n    ${config.join('\n    ')}`);

  const controller = new AbortController()
  Deno.spawn(path, {
    cwd: dirname(path),
    args: config,
    signal: controller.signal,
    stdout: 'inherit',
    stderr: 'inherit'
  })

  return () => controller.abort()
}

if (import.meta.main) {
  // const { parse } = await import("https://deno.land/std/flags/mod.ts");

  start(Deno.args)
}