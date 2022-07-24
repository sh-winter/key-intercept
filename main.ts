import { cache } from 'https://deno.land/x/cache@0.2.13/mod.ts'

const file = await cache("https://example.com/file.json");

const text = await Deno.readTextFile(file.path);
console.log(text);