// Bygger siten till dist/. Siten är statisk, så bygget kontrollerar och kopierar src/.
import { rm, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runChecks } from './check.mjs';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = await runChecks();
if (problems.length) {
  console.error('Bygget avbröts:\n- ' + problems.join('\n- '));
  process.exit(1);
}
await rm(path.join(base, 'dist'), { recursive: true, force: true });
await cp(path.join(base, 'src'), path.join(base, 'dist'), { recursive: true });
console.log('Klart: dist/ är redo att publiceras statiskt.');
