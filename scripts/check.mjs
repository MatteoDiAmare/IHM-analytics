// Kontrollerar menykonfigurationen mot sidfilerna. Körs av "npm run check" och "npm run build".
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = path.join(base, 'src/js/pages');

export async function runChecks() {
  const problems = [];
  const { menu } = await import(pathToFileURL(path.join(base, 'src/js/config/menu.js')));
  const { renderers } = await import(pathToFileURL(path.join(base, 'src/js/components/blocks.js')));

  const all = menu.flatMap((g) => g.pages);
  const ids = new Set();
  const paths = new Set();
  for (const p of all) {
    const slug = p.path ?? p.id;
    if (ids.has(p.id)) problems.push(`Dubblett id i menyn: ${p.id}`);
    if (paths.has(slug)) problems.push(`Dubblett adress i menyn: ${slug}`);
    ids.add(p.id);
    paths.add(slug);
    if (!p.title || !p.summary) problems.push(`Sidan ${p.id} saknar title eller summary`);
  }

  const files = (await readdir(pagesDir)).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
  for (const f of files) {
    if (!ids.has(f.replace(/\.js$/, ''))) problems.push(`Sidfilen ${f} finns men saknas i menyn`);
  }

  const seenBlocks = (blocks, where) => {
    for (const b of blocks ?? []) {
      if (!renderers[b.type]) problems.push(`${where}: okänd blocktyp "${b.type}"`);
      if (b.blocks) seenBlocks(b.blocks, where);
    }
  };
  for (const id of ids) {
    let mod;
    try {
      mod = (await import(pathToFileURL(path.join(pagesDir, `${id}.js`)))).default;
    } catch (e) {
      problems.push(`Sidfilen pages/${id}.js kunde inte läsas: ${e.message}`);
      continue;
    }
    if (!mod) {
      problems.push(`pages/${id}.js saknar default-export`);
      continue;
    }
    for (const r of mod.related ?? []) {
      if (!ids.has(r)) problems.push(`pages/${id}.js: related pekar på okänd sida "${r}"`);
    }
    seenBlocks(mod.blocks, `pages/${id}.js`);
  }
  return problems;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const problems = await runChecks();
  if (problems.length) {
    console.error('Problem hittades:\n- ' + problems.join('\n- '));
    process.exit(1);
  }
  console.log('Kontrollen gick bra: menyn och sidfilerna stämmer överens.');
}
