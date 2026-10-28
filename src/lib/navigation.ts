function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

/** Menentukan apakah item navigasi aktif untuk pathname saat ini (kebijakan trailing slash). */
export function isNavItemActive(pathname: string | null, href: string): boolean {
  const current = withTrailingSlash(pathname || '/');
  const target = withTrailingSlash(href);

  if (target === '/') return current === '/';
  return current === target || current.startsWith(target);
}
