// Härledda uppslag från config/menu.js. Här finns ingen data att ändra.
import { menu } from '../config/menu.js';

export const groups = menu;

export const pages = menu.flatMap((group) =>
  group.pages.map((page) => ({ ...page, path: page.path ?? page.id, groupId: group.id, groupTitle: group.title })),
);
pages.forEach((page, index) => { page.index = index; });

export const homePage = pages[0];

export const pageById = (id) => pages.find((p) => p.id === id) ?? null;
export const pageByPath = (path) => pages.find((p) => p.path === path) ?? null;
export const hrefFor = (page) => `#/${page.path}`;
export const previousOf = (page) => pages[page.index - 1] ?? null;
export const nextOf = (page) => pages[page.index + 1] ?? null;
