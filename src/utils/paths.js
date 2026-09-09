/** Resolve files in public/ for both Vite dev and a GitHub Pages subdirectory. */
export function publicPath(path) {
  if (typeof path !== 'string' || !/^(images|data)\/[a-zA-Z0-9._/-]+$/.test(path) || path.split('/').includes('..')) {
    throw new Error('Invalid public asset path');
  }
  const base = import.meta.env?.BASE_URL ?? './';
  return `${base}${path}`;
}
